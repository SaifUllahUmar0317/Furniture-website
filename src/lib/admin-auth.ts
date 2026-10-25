// Web Crypto API helper for SHA-256 password hashing
export async function hashPassword(plain: string): Promise<string> {
  const enc = new TextEncoder();
  const data = enc.encode(plain);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

const STORAGE_KEY_AUTH = 'thf_admin_auth_token';
const STORAGE_KEY_PASS_HASH = 'thf_admin_password_hash';
const STORAGE_KEY_USERNAME = 'thf_admin_username';
const STORAGE_KEY_RECOVERY_KEY = 'thf_admin_recovery_key';

const DEFAULT_HASH = 'b938f60f9f16d793c81e4743e41dad45d2c4f6e4e67318584632ac8968283297'; // 'hafsa2026'
const DEFAULT_USER = 'admin';
const DEFAULT_RECOVERY_KEY = 'TehkalHafsa2026Reset';

export function getAdminUsername(): string {
  if (typeof window === 'undefined') return DEFAULT_USER;
  return localStorage.getItem(STORAGE_KEY_USERNAME) || DEFAULT_USER;
}

export function isSessionAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  return sessionStorage.getItem(STORAGE_KEY_AUTH) === 'authenticated';
}

export function setSessionAuthenticated(auth: boolean) {
  if (typeof window === 'undefined') return;
  if (auth) {
    sessionStorage.setItem(STORAGE_KEY_AUTH, 'authenticated');
  } else {
    sessionStorage.removeItem(STORAGE_KEY_AUTH);
  }
}

export function getStoredRecoveryKey(): string {
  if (typeof window === 'undefined') return DEFAULT_RECOVERY_KEY;
  return localStorage.getItem(STORAGE_KEY_RECOVERY_KEY) || DEFAULT_RECOVERY_KEY;
}

export function setStoredRecoveryKey(key: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY_RECOVERY_KEY, key.trim());
}

export async function verifyCredentials(username: string, pass: string): Promise<boolean> {
  const inputHash = await hashPassword(pass);

  // 1. Try Cloud Verification via Neon API
  try {
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'verify', username, passwordHash: inputHash }),
    });
    if (res.ok) {
      const data = await res.json();
      if (typeof data.success === 'boolean') {
        if (data.success) {
          localStorage.setItem(STORAGE_KEY_USERNAME, username.trim());
          localStorage.setItem(STORAGE_KEY_PASS_HASH, inputHash);
        }
        return data.success;
      }
    }
  } catch {
    // Fall back to local check
  }

  // 2. Client fallback verification
  const currentUsername = getAdminUsername();
  if (username.trim().toLowerCase() !== currentUsername.toLowerCase()) {
    return false;
  }

  const storedHash = localStorage.getItem(STORAGE_KEY_PASS_HASH);

  if (!storedHash || storedHash === DEFAULT_HASH) {
    if (pass === 'hafsa2026') {
      localStorage.setItem(STORAGE_KEY_PASS_HASH, DEFAULT_HASH);
      return true;
    }
  }

  return inputHash === storedHash || (inputHash === DEFAULT_HASH && !storedHash);
}

export async function changeAdminPassword(
  currentPass: string,
  newPass: string,
  newUsername?: string
): Promise<{ success: boolean; error?: string }> {
  if (!newPass || newPass.length < 6) {
    return { success: false, error: 'New password must be at least 6 characters long.' };
  }

  const currentHash = await hashPassword(currentPass);
  const newHash = await hashPassword(newPass);

  // 1. Try Cloud Update
  try {
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'change_password',
        currentPasswordHash: currentHash,
        newPasswordHash: newHash,
        newUsername,
      }),
    });
    if (res.ok) {
      const data = await res.json();
      if (!data.success && data.error) {
        return { success: false, error: data.error };
      }
    }
  } catch {
    // Fall back to local update
  }

  // 2. Local Update
  const storedHash = localStorage.getItem(STORAGE_KEY_PASS_HASH) || DEFAULT_HASH;
  const matchesCurrent =
    currentHash === storedHash ||
    (currentPass === 'hafsa2026' && (storedHash === DEFAULT_HASH || !storedHash));

  if (!matchesCurrent) {
    return { success: false, error: 'Current password is incorrect.' };
  }

  localStorage.setItem(STORAGE_KEY_PASS_HASH, newHash);
  if (newUsername && newUsername.trim()) {
    localStorage.setItem(STORAGE_KEY_USERNAME, newUsername.trim());
  }

  return { success: true };
}

export async function resetPasswordWithKey(
  username: string,
  recoveryKey: string,
  newPassword: string
): Promise<{ success: boolean; error?: string }> {
  if (!newPassword || newPassword.length < 6) {
    return { success: false, error: 'New password must be at least 6 characters long.' };
  }

  const newHash = await hashPassword(newPassword);

  // 1. Try Cloud Reset
  try {
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'reset_password',
        recoveryKey,
        newPasswordHash: newHash,
      }),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success) {
        localStorage.setItem(STORAGE_KEY_PASS_HASH, newHash);
        return { success: true };
      } else if (data.error) {
        return { success: false, error: data.error };
      }
    }
  } catch {
    // Fall back to local reset
  }

  // 2. Local Fallback Reset
  const currentUsername = getAdminUsername();
  if (username.trim().toLowerCase() !== currentUsername.toLowerCase()) {
    return { success: false, error: 'Incorrect admin username.' };
  }

  const validKey = getStoredRecoveryKey();
  if (recoveryKey.trim() !== validKey) {
    return { success: false, error: 'Invalid secret recovery key. Authorization rejected.' };
  }

  localStorage.setItem(STORAGE_KEY_PASS_HASH, newHash);
  return { success: true };
}
