import React, { useState, useEffect } from 'react';
import { useAccount, ADMIN_GOOGLE_EMAIL } from '@/lib/account-context';
import { X, ShieldCheck, User, LogOut, CheckCircle2 } from 'lucide-react';

export function GoogleAuthModal() {
  const {
    account,
    isAdmin,
    isAuthModalOpen,
    closeAuthModal,
    loginWithGoogleEmail,
    logout,
  } = useAccount();

  const [inputEmail, setInputEmail] = useState('');
  const [inputName, setInputName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isAuthModalOpen) {
      setError('');
      // Render official Google button if GIS client is loaded & container exists
      const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
      if (clientId && (window as any).google?.accounts?.id) {
        try {
          const btnDiv = document.getElementById('google-native-signin-btn');
          if (btnDiv) {
            btnDiv.innerHTML = '';
            (window as any).google.accounts.id.renderButton(btnDiv, {
              theme: 'outline',
              size: 'large',
              width: 320,
              text: 'continue_with',
              shape: 'rectangular',
            });
          }
        } catch {}
      }
    }
  }, [isAuthModalOpen]);

  if (!isAuthModalOpen) return null;

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const email = inputEmail.trim();
    if (!email || !email.includes('@')) {
      setError('Please enter a valid Google email address.');
      return;
    }
    loginWithGoogleEmail(email, inputName.trim() || undefined);
    setInputEmail('');
    setInputName('');
  };

  const handleQuickAdminLogin = () => {
    loginWithGoogleEmail(ADMIN_GOOGLE_EMAIL, 'Rooh (Admin)');
  };

  return (
    <div className="fixed inset-0 z-[120] bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-card border border-border w-full max-w-md p-6 sm:p-8 relative shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors p-1"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mb-3 text-primary">
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
          </div>
          <h2 className="font-serif text-2xl text-foreground">Google Account Sign-In</h2>
          <p className="text-xs text-muted-foreground mt-1 font-light">
            Sign in with your Google Account to preserve your cart and unlock administrator features.
          </p>
        </div>

        {/* Current Active Account View */}
        {account ? (
          <div className="bg-muted/50 border border-border p-4 mb-6">
            <div className="flex items-center gap-3">
              {account.picture ? (
                <img
                  src={account.picture}
                  alt={account.name}
                  className="w-10 h-10 rounded-full border border-border object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-semibold text-sm">
                  {account.name ? account.name.charAt(0).toUpperCase() : 'U'}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-foreground truncate">{account.name}</p>
                  {isAdmin && (
                    <span className="inline-flex items-center gap-1 text-[10px] bg-primary/15 text-primary border border-primary/30 px-1.5 py-0.5 font-medium uppercase tracking-wider">
                      <ShieldCheck size={11} /> Admin
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground truncate">{account.email}</p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between">
              <span className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-medium">
                <CheckCircle2 size={13} /> Active Session
              </span>
              <button
                onClick={logout}
                className="text-xs text-destructive hover:underline flex items-center gap-1"
              >
                <LogOut size={13} /> Sign Out
              </button>
            </div>
          </div>
        ) : null}

        {/* GIS Native Button if Client ID Configured */}
        <div id="google-native-signin-btn" className="flex justify-center mb-4 min-h-[40px]"></div>

        {/* Quick Admin Connect Option */}
        <div className="mb-5">
          <button
            type="button"
            onClick={handleQuickAdminLogin}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-primary/50 bg-primary/10 hover:bg-primary/20 text-primary transition-all text-xs uppercase tracking-wider font-semibold"
          >
            <ShieldCheck size={16} />
            <span>Connect as Admin ({ADMIN_GOOGLE_EMAIL})</span>
          </button>
          <p className="text-[10px] text-muted-foreground text-center mt-1.5">
            Instantly verifies ownership and reveals the Admin Workshop Portal.
          </p>
        </div>

        <div className="relative my-5">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground tracking-widest text-[10px]">
              Or Sign In with Any Google Account
            </span>
          </div>
        </div>

        {/* Custom Email Form */}
        <form onSubmit={handleManualSubmit} className="space-y-3">
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-muted-foreground mb-1">
              Google Email Address *
            </label>
            <input
              type="email"
              required
              value={inputEmail}
              onChange={(e) => setInputEmail(e.target.value)}
              placeholder="e.g. name@gmail.com"
              className="w-full bg-background border border-border px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-wider text-muted-foreground mb-1">
              Your Name (Optional)
            </label>
            <input
              type="text"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              placeholder="e.g. Saifullah"
              className="w-full bg-background border border-border px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
            />
          </div>

          {error && <p className="text-xs text-destructive">{error}</p>}

          <button
            type="submit"
            className="w-full bg-foreground text-background hover:bg-primary hover:text-primary-foreground py-2.5 text-xs uppercase tracking-widest font-semibold transition-colors mt-2"
          >
            Continue with this Account
          </button>
        </form>

        <p className="text-[10px] text-muted-foreground/75 text-center mt-5 font-light">
          Cart items will be preserved and synchronized to your account in real-time.
        </p>
      </div>
    </div>
  );
}
