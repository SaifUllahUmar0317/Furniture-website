import { useState, useEffect } from 'react';

const ADMIN_DEVICE_KEY = 'thf_admin_device';

/**
 * Checks whether the current browser is recognized as the admin's device.
 * A browser is recognized as the admin browser if:
 * 1) localStorage flag 'thf_admin_device' is 'true'
 * 2) Current URL path is /admin
 * 3) Current URL contains ?admin=1 or ?admin=true or ?staff=1
 */
export function checkIsAdminDevice(): boolean {
  if (typeof window === 'undefined') return false;

  try {
    const isExplicitPath = window.location.pathname.startsWith('/admin');
    const params = new URLSearchParams(window.location.search);
    const hasAdminQuery =
      params.get('admin') === 'true' ||
      params.get('admin') === '1' ||
      params.get('staff') === '1';

    if (isExplicitPath || hasAdminQuery) {
      localStorage.setItem(ADMIN_DEVICE_KEY, 'true');
      return true;
    }

    return localStorage.getItem(ADMIN_DEVICE_KEY) === 'true';
  } catch {
    return false;
  }
}

export function setAdminDevice(enabled: boolean): void {
  if (typeof window === 'undefined') return;
  try {
    if (enabled) {
      localStorage.setItem(ADMIN_DEVICE_KEY, 'true');
    } else {
      localStorage.removeItem(ADMIN_DEVICE_KEY);
    }
    window.dispatchEvent(new Event('thf_admin_device_changed'));
  } catch {}
}

export function useAdminDevice(): [boolean, (val: boolean) => void] {
  const [isAdmin, setIsAdmin] = useState<boolean>(() => checkIsAdminDevice());

  useEffect(() => {
    if (checkIsAdminDevice()) {
      setIsAdmin(true);
    }

    const handler = () => {
      setIsAdmin(checkIsAdminDevice());
    };

    window.addEventListener('thf_admin_device_changed', handler);
    window.addEventListener('storage', handler);
    return () => {
      window.removeEventListener('thf_admin_device_changed', handler);
      window.removeEventListener('storage', handler);
    };
  }, []);

  return [isAdmin, setAdminDevice];
}
