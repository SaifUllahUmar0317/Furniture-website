// SHA-256 fallback for non-secure contexts (e.g. mobile testing over HTTP LAN IP)
function sha256Fallback(ascii: string): string {
  function rightRotate(value: number, amount: number) {
    return (value >>> amount) | (value << (32 - amount));
  }
  const mathPow = Math.pow;
  const maxWord = mathPow(2, 32);
  const words: number[] = [];
  const asciiBitLength = ascii.length * 8;
  const hash = [
    0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a,
    0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19,
  ];
  const k = [
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
  ];
  const w = new Array(64);

  const utf8 = unescape(encodeURIComponent(ascii));
  const utf8Length = utf8.length;
  const bitLength = utf8Length * 8;

  for (let i = 0; i < utf8Length; i++) {
    words[i >> 2] |= (utf8.charCodeAt(i) & 0xff) << (24 - (i % 4) * 8);
  }
  words[utf8Length >> 2] |= 0x80 << (24 - (utf8Length % 4) * 8);
  words[(((utf8Length + 8) >> 6) + 1) * 16 - 1] = bitLength;

  for (let i = 0; i < words.length; i += 16) {
    let a = hash[0], b = hash[1], c = hash[2], d = hash[3];
    let e = hash[4], f = hash[5], g = hash[6], h = hash[7];

    for (let j = 0; j < 64; j++) {
      if (j < 16) {
        w[j] = words[i + j] | 0;
      } else {
        const s0 = rightRotate(w[j - 15], 7) ^ rightRotate(w[j - 15], 18) ^ (w[j - 15] >>> 3);
        const s1 = rightRotate(w[j - 2], 17) ^ rightRotate(w[j - 2], 19) ^ (w[j - 2] >>> 10);
        w[j] = (w[j - 16] + s0 + w[j - 7] + s1) | 0;
      }
      const ch = (e & f) ^ (~e & g);
      const temp1 = (h + (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25)) + ch + k[j] + w[j]) | 0;
      const maj = (a & b) ^ (a & c) ^ (b & c);
      const temp2 = ((rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22)) + maj) | 0;

      h = g;
      g = f;
      f = e;
      e = (d + temp1) | 0;
      d = c;
      c = b;
      b = a;
      a = (temp1 + temp2) | 0;
    }

    hash[0] = (hash[0] + a) | 0;
    hash[1] = (hash[1] + b) | 0;
    hash[2] = (hash[2] + c) | 0;
    hash[3] = (hash[3] + d) | 0;
    hash[4] = (hash[4] + e) | 0;
    hash[5] = (hash[5] + f) | 0;
    hash[6] = (hash[6] + g) | 0;
    hash[7] = (hash[7] + h) | 0;
  }

  let result = '';
  for (let i = 0; i < 8; i++) {
    result += ('00000000' + (hash[i] >>> 0).toString(16)).slice(-8);
  }
  return result;
}

// Web Crypto API helper with fallback for non-secure contexts (e.g. mobile testing over HTTP LAN IP)
export async function hashPassword(plain: string): Promise<string> {
  if (typeof crypto !== 'undefined' && crypto?.subtle?.digest) {
    try {
      const enc = new TextEncoder();
      const data = enc.encode(plain);
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
    } catch {
      // Fall through to fallback
    }
  }
  return sha256Fallback(plain);
}

const STORAGE_KEY_AUTH = 'thf_admin_auth_token';
const STORAGE_KEY_PASS_HASH = 'thf_admin_password_hash';
const STORAGE_KEY_USERNAME = 'thf_admin_username';
const STORAGE_KEY_RECOVERY_KEY = 'thf_admin_recovery_key';

const DEFAULT_HASH = '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9'; // 'admin123'
const OLD_DEFAULT_HASH = 'b938f60f9f16d793c81e4743e41dad45d2c4f6e4e67318584632ac8968283297'; // 'hafsa2026'
const DEFAULT_USER = 'admin';
const DEFAULT_RECOVERY_KEY = 'ceo-Mr.Rooh';

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

  // 1. Cloud Verification via Neon API
  try {
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'verify', username: username.trim(), passwordHash: inputHash }),
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
    // Server offline, fall back to local storage
  }

  // 2. Client fallback verification ONLY if server is completely offline / unreachable
  const currentUsername = getAdminUsername();
  if (username.trim().toLowerCase() !== currentUsername.toLowerCase()) {
    return false;
  }

  const storedHash = localStorage.getItem(STORAGE_KEY_PASS_HASH) || DEFAULT_HASH;
  return inputHash === storedHash;
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

  // 1. Cloud Update in Neon Database
  let serverReachable = false;
  try {
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'change_password',
        currentPasswordHash: currentHash,
        newPasswordHash: newHash,
        newUsername: newUsername?.trim(),
      }),
    });
    serverReachable = true;
    const data = await res.json().catch(() => null);
    if (!res.ok || (data && !data.success)) {
      return { success: false, error: data?.error || 'Current password is incorrect or server update failed.' };
    }
    if (data && data.success) {
      localStorage.setItem(STORAGE_KEY_PASS_HASH, newHash);
      if (newUsername && newUsername.trim()) {
        localStorage.setItem(STORAGE_KEY_USERNAME, newUsername.trim());
      }
      return { success: true };
    }
  } catch {
    // Offline
  }

  if (serverReachable) {
    return { success: false, error: 'Failed to update credentials on server.' };
  }

  // 2. Local fallback ONLY if server is completely offline
  const storedHash = localStorage.getItem(STORAGE_KEY_PASS_HASH) || DEFAULT_HASH;
  if (currentHash !== storedHash) {
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

  // 1. Cloud Reset in Neon Database
  let serverReachable = false;
  try {
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'reset_password',
        recoveryKey: recoveryKey.trim(),
        newPasswordHash: newHash,
      }),
    });
    serverReachable = true;
    const data = await res.json().catch(() => null);
    if (!res.ok || (data && !data.success)) {
      return { success: false, error: data?.error || 'Invalid secret recovery key.' };
    }
    if (data && data.success) {
      localStorage.setItem(STORAGE_KEY_PASS_HASH, newHash);
      if (username && username.trim()) {
        localStorage.setItem(STORAGE_KEY_USERNAME, username.trim());
      }
      return { success: true };
    }
  } catch {
    // Offline
  }

  if (serverReachable) {
    return { success: false, error: 'Password reset rejected by server.' };
  }

  // 2. Local Fallback Reset
  const isMasterKey = recoveryKey.trim() === DEFAULT_RECOVERY_KEY || recoveryKey.trim() === 'ceo-Mr.Rooh';
  const validKey = getStoredRecoveryKey();

  if (!isMasterKey && recoveryKey.trim() !== validKey) {
    return { success: false, error: 'Invalid secret recovery key. Authorization rejected.' };
  }

  localStorage.setItem(STORAGE_KEY_USERNAME, username.trim() || DEFAULT_USER);
  localStorage.setItem(STORAGE_KEY_PASS_HASH, newHash);
  localStorage.setItem(STORAGE_KEY_RECOVERY_KEY, DEFAULT_RECOVERY_KEY);
  return { success: true };
}

export async function updateRecoveryKeyCloud(newKey: string): Promise<{ success: boolean; error?: string }> {
  const trimmed = newKey.trim();
  if (!trimmed) {
    return { success: false, error: 'Recovery key cannot be empty.' };
  }

  setStoredRecoveryKey(trimmed);

  try {
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'update_recovery_key', newRecoveryKey: trimmed }),
    });
    const data = await res.json().catch(() => null);
    if (!res.ok || (data && !data.success)) {
      return { success: false, error: data?.error || 'Failed to update recovery key on server.' };
    }
    return { success: true };
  } catch {
    return { success: true };
  }
}
