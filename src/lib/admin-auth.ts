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

// Default initial credentials (hashed):
// Username: admin
// Default Password: "hafsa2026"
// SHA-256 for "hafsa2026": b938f60f9f16d793c81e4743e41dad45d2c4f6e4e67318584632ac8968283297
const DEFAULT_HASH = 'b938f60f9f16d793c81e4743e41dad45d2c4f6e4e67318584632ac8968283297';
const DEFAULT_USER = 'admin';

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

export async function verifyCredentials(username: string, pass: string): Promise<boolean> {
  const currentUsername = getAdminUsername();
  if (username.trim().toLowerCase() !== currentUsername.toLowerCase()) {
    return false;
  }

  const storedHash = localStorage.getItem(STORAGE_KEY_PASS_HASH);

  // If no password has been customized yet:
  if (!storedHash || storedHash === DEFAULT_HASH || storedHash === 'b0d69116e0ca584fe3be98aa45f3df05bf9be18d363d596bb051fc9bb759d57a') {
    if (pass === 'hafsa2026') {
      // Normalize stored hash to proper hash
      localStorage.setItem(STORAGE_KEY_PASS_HASH, DEFAULT_HASH);
      return true;
    }
  }

  const inputHash = await hashPassword(pass);
  return inputHash === storedHash || (inputHash === DEFAULT_HASH && (!storedHash || storedHash === 'b0d69116e0ca584fe3be98aa45f3df05bf9be18d363d596bb051fc9bb759d57a'));
}

export async function changeAdminPassword(
  currentPass: string,
  newPass: string,
  newUsername?: string
): Promise<{ success: boolean; error?: string }> {
  if (!newPass || newPass.length < 6) {
    return { success: false, error: 'New password must be at least 6 characters long.' };
  }

  const storedHash = localStorage.getItem(STORAGE_KEY_PASS_HASH) || DEFAULT_HASH;
  const currentHash = await hashPassword(currentPass);

  // Check if current password matches either current hash or default password
  const matchesCurrent =
    currentHash === storedHash ||
    (currentPass === 'hafsa2026' && (storedHash === DEFAULT_HASH || storedHash === 'b0d69116e0ca584fe3be98aa45f3df05bf9be18d363d596bb051fc9bb759d57a'));

  if (!matchesCurrent) {
    return { success: false, error: 'Current password is incorrect.' };
  }

  const newHash = await hashPassword(newPass);
  localStorage.setItem(STORAGE_KEY_PASS_HASH, newHash);

  if (newUsername && newUsername.trim()) {
    localStorage.setItem(STORAGE_KEY_USERNAME, newUsername.trim());
  }

  return { success: true };
}

/**
 * Resets admin credentials to factory defaults.
 * After reset: username=admin, password=hafsa2026
 */
export function resetCredentialsNow(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY_PASS_HASH);
  localStorage.removeItem(STORAGE_KEY_USERNAME);
  localStorage.setItem(STORAGE_KEY_PASS_HASH, DEFAULT_HASH);
}

export function resetToDefault(recoveryPhrase: string): boolean {
  const RECOVERY_PHRASE = 'TehkalHafsa2026Reset';
  if (recoveryPhrase.trim() !== RECOVERY_PHRASE) {
    return false;
  }
  resetCredentialsNow();
  return true;
}
