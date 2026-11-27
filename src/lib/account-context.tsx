import React, { createContext, useContext, useEffect, useState } from 'react';

export const ADMIN_GOOGLE_EMAIL = 'roohk700@gmail.com';

export interface UserAccount {
  email: string;
  name: string;
  picture?: string;
  isAdmin: boolean;
  provider: 'google' | 'direct';
}

interface AccountContextType {
  account: UserAccount | null;
  isAdmin: boolean;
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  loginWithGoogleEmail: (email: string, name?: string, picture?: string) => void;
  logout: () => void;
}

const AccountContext = createContext<AccountContextType | undefined>(undefined);

const STORAGE_ACCOUNT_KEY = 'thf_active_user_account';

export function isAuthorizedAdminEmail(email?: string | null): boolean {
  if (!email) return false;
  return email.trim().toLowerCase() === ADMIN_GOOGLE_EMAIL.toLowerCase();
}

export function AccountProvider({ children }: { children: React.ReactNode }) {
  const [account, setAccount] = useState<UserAccount | null>(() => {
    if (typeof window === 'undefined') return null;
    try {
      const stored = localStorage.getItem(STORAGE_ACCOUNT_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.email) {
          return {
            ...parsed,
            isAdmin: isAuthorizedAdminEmail(parsed.email),
          };
        }
      }
    } catch {}
    return null;
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Sync to local storage
  useEffect(() => {
    if (account) {
      localStorage.setItem(STORAGE_ACCOUNT_KEY, JSON.stringify(account));
    } else {
      localStorage.removeItem(STORAGE_ACCOUNT_KEY);
    }
  }, [account]);

  // Google Identity Services (GIS) integration if client ID is configured
  useEffect(() => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    if (typeof window === 'undefined' || !clientId) return;

    function initGis() {
      if ((window as any).google?.accounts?.id) {
        try {
          (window as any).google.accounts.id.initialize({
            client_id: clientId,
            callback: (response: any) => {
              if (response?.credential) {
                try {
                  const base64Url = response.credential.split('.')[1];
                  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                  const jsonPayload = decodeURIComponent(
                    atob(base64)
                      .split('')
                      .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                      .join('')
                  );
                  const payload = JSON.parse(jsonPayload);
                  if (payload.email) {
                    loginWithGoogleEmail(payload.email, payload.name, payload.picture);
                  }
                } catch (e) {
                  console.error('Failed to parse Google JWT credential', e);
                }
              }
            },
          });
        } catch (e) {
          console.warn('Google Identity initialization notice:', e);
        }
      }
    }

    if ((window as any).google?.accounts?.id) {
      initGis();
    } else {
      const interval = setInterval(() => {
        if ((window as any).google?.accounts?.id) {
          clearInterval(interval);
          initGis();
        }
      }, 500);
      return () => clearInterval(interval);
    }
  }, []);

  const loginWithGoogleEmail = (email: string, name?: string, picture?: string) => {
    const cleanEmail = email.trim();
    if (!cleanEmail) return;

    const isAdmin = isAuthorizedAdminEmail(cleanEmail);
    const user: UserAccount = {
      email: cleanEmail,
      name: name || cleanEmail.split('@')[0],
      picture: picture || undefined,
      isAdmin,
      provider: 'google',
    };

    setAccount(user);
    setIsAuthModalOpen(false);
  };

  const logout = () => {
    setAccount(null);
    localStorage.removeItem(STORAGE_ACCOUNT_KEY);
  };

  const value: AccountContextType = {
    account,
    isAdmin: Boolean(account?.isAdmin),
    isAuthModalOpen,
    openAuthModal: () => setIsAuthModalOpen(true),
    closeAuthModal: () => setIsAuthModalOpen(false),
    loginWithGoogleEmail,
    logout,
  };

  return <AccountContext.Provider value={value}>{children}</AccountContext.Provider>;
}

export function useAccount() {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error('useAccount must be used within an AccountProvider');
  }
  return context;
}
