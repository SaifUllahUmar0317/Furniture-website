import React, { useState } from 'react';
import { useLocation } from 'wouter';
import {
  Package,
  Image as ImageIcon,
  FolderKanban,
  Plus,
  Trash2,
  Edit,
  Eye,
  LogOut,
  Save,
  CheckCircle,
  X,
  Upload,
  Lock,
  User,
  ShieldCheck,
  KeyRound,
  ArrowRight,
  EyeOff,
  RotateCcw,
} from 'lucide-react';
import {
  useLiveProducts,
  useLiveProjects,
  useLiveGallery,
  type ProjectItem,
  type GalleryItem,
} from '@/lib/admin-store';
import { productCategories, type Product } from '@/data/products';
import {
  isSessionAuthenticated,
  setSessionAuthenticated,
  verifyCredentials,
  changeAdminPassword,
  getAdminUsername,
  resetToDefault,
  resetCredentialsNow,
} from '@/lib/admin-auth';

export default function Admin() {
  const [, setLocation] = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(() => isSessionAuthenticated());

  // Password visibility states
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  // Password reset modal state
  const [showResetModal, setShowResetModal] = useState(false);
  const [recoveryKeyInput, setRecoveryKeyInput] = useState('');
  const [resetStatus, setResetStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Login form state
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  // Tab state
  const [activeTab, setActiveTab] = useState<'products' | 'projects' | 'gallery' | 'security'>('products');

  // Security / Password change modal & state
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [securityMessage, setSecurityMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Data stores
  const [products, setProducts] = useLiveProducts();
  const [projects, setProjects] = useLiveProjects();
  const [gallery, setGallery] = useLiveGallery();

  // Modals
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isNewProduct, setIsNewProduct] = useState(false);

  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [isNewProject, setIsNewProject] = useState(false);

  const [editingGallery, setEditingGallery] = useState<GalleryItem | null>(null);
  const [isNewGallery, setIsNewGallery] = useState(false);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setLoginError('');

    try {
      const ok = await verifyCredentials(usernameInput, passwordInput);
      if (ok) {
        setSessionAuthenticated(true);
        setIsAuthenticated(true);
        setLoginError('');
      } else {
        setLoginError('Invalid username or password. Please verify your credentials.');
      }
    } catch {
      setLoginError('Authentication service encountered an error.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setResetStatus(null);
    const ok = resetToDefault(recoveryKeyInput);
    if (ok) {
      setResetStatus({
        type: 'success',
        text: 'Credentials have been reset to factory default! (Username: admin, Password: hafsa2026)',
      });
      setUsernameInput('admin');
      setPasswordInput('hafsa2026');
      setRecoveryKeyInput('');
    } else {
      setResetStatus({
        type: 'error',
        text: 'Invalid recovery key. Please enter the master key.',
      });
    }
  };

  const handleLogout = () => {
    setSessionAuthenticated(false);
    setIsAuthenticated(false);
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setSecurityMessage(null);

    if (newPass !== confirmPass) {
      setSecurityMessage({ type: 'error', text: 'New passwords do not match.' });
      return;
    }

    const res = await changeAdminPassword(currentPass, newPass, newUsername || undefined);
    if (res.success) {
      setSecurityMessage({ type: 'success', text: 'Admin credentials successfully updated!' });
      setCurrentPass('');
      setNewPass('');
      setConfirmPass('');
      setNewUsername('');
      showToast('Credentials updated successfully');
    } else {
      setSecurityMessage({ type: 'error', text: res.error || 'Failed to update credentials.' });
    }
  };

  // Convert uploaded image file into persistent base64 data URL
  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    onLoad: (base64: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 6 * 1024 * 1024) {
        alert('File size exceeds 6MB. Please select an optimized image.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onLoad(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-36 pb-20 flex items-center justify-center px-6">
        <div className="w-full max-w-md bg-card border border-border p-8 md:p-12 shadow-2xl relative">
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-full border border-primary/30 bg-primary/5 flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-6 h-6 text-primary" />
            </div>
            <span className="text-primary text-xs uppercase tracking-[0.3em] font-medium block mb-2">
              Management Portal
            </span>
            <h1 className="font-serif text-3xl text-foreground">Workshop Admin</h1>
            <p className="text-muted-foreground text-xs mt-2 font-light">
              Secure authorization required to modify catalog, projects, and gallery.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="text-xs uppercase tracking-widest text-muted-foreground block mb-2 font-medium">
                Admin Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  placeholder="admin"
                  className="w-full bg-background border border-border px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none transition-colors"
                />
                <User className="absolute right-3.5 top-3.5 text-muted-foreground w-4 h-4" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setShowResetModal(true);
                    setResetStatus(null);
                  }}
                  className="text-xs text-primary hover:underline font-light focus:outline-none"
                >
                  Forgot / Reset Password?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showLoginPassword ? 'text' : 'password'}
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-background border border-border px-4 py-3 pr-11 text-sm text-foreground focus:border-primary focus:outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowLoginPassword(!showLoginPassword)}
                  className="absolute right-3.5 top-3.5 text-muted-foreground hover:text-foreground transition-colors focus:outline-none"
                  aria-label={showLoginPassword ? 'Hide password' : 'Show password'}
                  title={showLoginPassword ? 'Hide password' : 'Show password'}
                >
                  {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {loginError && (
                <p className="text-destructive text-xs mt-2 font-medium">{loginError}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isVerifying}
              className="w-full bg-primary hover:bg-foreground text-primary-foreground hover:text-background py-3.5 uppercase tracking-widest text-xs font-semibold transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              <span>{isVerifying ? 'Verifying...' : 'Sign In to Portal'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {showResetModal && (
            <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-card border border-border w-full max-w-md p-6 md:p-8 relative shadow-2xl">
                <button
                  type="button"
                  onClick={() => setShowResetModal(false)}
                  className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
                    <RotateCcw className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="font-serif text-xl text-foreground">Reset Admin Password</h2>
                    <p className="text-xs text-muted-foreground">Restore credentials to factory default</p>
                  </div>
                </div>

                {resetStatus && (
                  <div
                    className={`p-3 mb-4 border text-xs font-medium ${
                      resetStatus.type === 'success'
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
                        : 'bg-destructive/10 border-destructive/30 text-destructive'
                    }`}
                  >
                    {resetStatus.text}
                  </div>
                )}

                <form onSubmit={handleResetPassword} className="space-y-4">
                  <div>
                    <label className="text-xs uppercase tracking-wider text-muted-foreground block mb-1">
                      Master Recovery Phrase
                    </label>
                    <input
                      type="text"
                      required
                      value={recoveryKeyInput}
                      onChange={(e) => setRecoveryKeyInput(e.target.value)}
                      placeholder="Enter recovery key"
                      className="w-full bg-background border border-border px-3 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none"
                    />
                    <p className="text-[11px] text-muted-foreground mt-1.5">
                      Recovery Key: <span className="text-primary font-mono select-all">TehkalHafsa2026Reset</span>
                    </p>
                  </div>

                  <div className="p-3 bg-muted/40 border border-border/60 text-xs text-muted-foreground space-y-1">
                    <p className="font-medium text-foreground">Restores default credentials:</p>
                    <p>• Username: <span className="text-primary font-medium">admin</span></p>
                    <p>• Password: <span className="text-primary font-medium">hafsa2026</span></p>
                  </div>

                  <div className="flex items-center space-x-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowResetModal(false)}
                      className="flex-1 border border-border py-2.5 text-xs uppercase tracking-wider hover:bg-muted transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground py-2.5 text-xs uppercase tracking-wider font-semibold transition-colors flex items-center justify-center space-x-1.5"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Confirm Reset</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-border/50 text-center text-xs text-muted-foreground space-y-1">
            <p>Initial Username: <span className="text-primary font-medium">admin</span></p>
            <p>Initial Password: <span className="text-primary font-medium">hafsa2026</span></p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  resetCredentialsNow();
                  setUsernameInput('admin');
                  setPasswordInput('hafsa2026');
                  setLoginError('');
                  showToast('Credentials reset to default: admin / hafsa2026');
                }}
                className="inline-flex items-center space-x-1.5 text-xs text-primary hover:underline font-medium focus:outline-none"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to Default Password (hafsa2026)</span>
              </button>
            </div>
            <p className="text-[11px] text-muted-foreground/60 pt-2">
              (You can change your password anytime inside the Security tab)
            </p>
          </div>
        </div>
      </div>
    );
  }

  // --- Handlers for Products ---
  const saveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    if (isNewProduct) {
      const newId = products.length ? Math.max(...products.map((p) => p.id)) + 1 : 1;
      const slug =
        editingProduct.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '') || `product-${newId}`;
      const toAdd: Product = { ...editingProduct, id: newId, slug };
      setProducts([toAdd, ...products]);
      showToast('Product added successfully!');
    } else {
      setProducts(products.map((p) => (p.id === editingProduct.id ? editingProduct : p)));
      showToast('Product updated successfully!');
    }
    setEditingProduct(null);
  };

  const deleteProduct = (id: number) => {
    if (confirm('Are you sure you want to remove this product from the website?')) {
      setProducts(products.filter((p) => p.id !== id));
      showToast('Product removed.');
    }
  };

  // --- Handlers for Projects ---
  const saveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    if (isNewProject) {
      const newId = projects.length ? Math.max(...projects.map((p) => p.id)) + 1 : 1;
      setProjects([ ...projects, { ...editingProject, id: newId } ]);
      showToast('Project created successfully!');
    } else {
      setProjects(projects.map((p) => (p.id === editingProject.id ? editingProject : p)));
      showToast('Project updated successfully!');
    }
    setEditingProject(null);
  };

  const deleteProject = (id: number) => {
    if (confirm('Remove this project from the showcase?')) {
      setProjects(projects.filter((p) => p.id !== id));
      showToast('Project removed.');
    }
  };

  // --- Handlers for Gallery ---
  const saveGallery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingGallery) return;

    if (isNewGallery) {
      const newId = gallery.length ? Math.max(...gallery.map((g) => g.id)) + 1 : 1;
      setGallery([ { ...editingGallery, id: newId }, ...gallery ]);
      showToast('Photo added to gallery!');
    } else {
      setGallery(gallery.map((g) => (g.id === editingGallery.id ? editingGallery : g)));
      showToast('Gallery item updated!');
    }
    setEditingGallery(null);
  };

  const deleteGallery = (id: number) => {
    if (confirm('Delete this photo from the gallery?')) {
      setGallery(gallery.filter((g) => g.id !== id));
      showToast('Photo deleted.');
    }
  };

  return (
    <div className="w-full pt-28 pb-24 min-h-screen bg-background">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-primary text-primary-foreground px-6 py-3 shadow-xl flex items-center space-x-3 text-sm font-medium animate-in slide-in-from-bottom duration-300">
          <CheckCircle className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-border">
          <div>
            <div className="flex items-center space-x-3">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-primary text-xs uppercase tracking-[0.3em] font-medium">
                Authorized Admin: {getAdminUsername()}
              </span>
            </div>
            <h1 className="font-serif text-3xl md:text-5xl text-foreground mt-2">
              Website Manager
            </h1>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setActiveTab('security')}
              className={`flex items-center space-x-2 border px-4 py-2.5 text-xs uppercase tracking-wider transition-colors ${
                activeTab === 'security'
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border text-muted-foreground hover:text-foreground hover:border-foreground'
              }`}
            >
              <KeyRound className="w-4 h-4" />
              <span>Security & Password</span>
            </button>
            <button
              onClick={() => setLocation('/products')}
              className="flex items-center space-x-2 border border-border px-4 py-2.5 text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
            >
              <Eye className="w-4 h-4" />
              <span>Live Website</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 bg-destructive/10 text-destructive border border-destructive/20 px-4 py-2.5 text-xs uppercase tracking-wider hover:bg-destructive hover:text-destructive-foreground transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex space-x-1 border-b border-border mt-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab('products')}
            className={`flex items-center space-x-2 px-6 py-4 text-xs uppercase tracking-widest font-medium border-b-2 transition-all ${
              activeTab === 'products'
                ? 'border-primary text-primary bg-primary/5'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Products ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`flex items-center space-x-2 px-6 py-4 text-xs uppercase tracking-widest font-medium border-b-2 transition-all ${
              activeTab === 'projects'
                ? 'border-primary text-primary bg-primary/5'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <FolderKanban className="w-4 h-4" />
            <span>Projects ({projects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('gallery')}
            className={`flex items-center space-x-2 px-6 py-4 text-xs uppercase tracking-widest font-medium border-b-2 transition-all ${
              activeTab === 'gallery'
                ? 'border-primary text-primary bg-primary/5'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Gallery ({gallery.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`flex items-center space-x-2 px-6 py-4 text-xs uppercase tracking-widest font-medium border-b-2 transition-all ${
              activeTab === 'security'
                ? 'border-primary text-primary bg-primary/5'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <KeyRound className="w-4 h-4" />
            <span>Password & Security</span>
          </button>
        </div>

        {/* TAB 1: PRODUCTS */}
        {activeTab === 'products' && (
          <div className="mt-8 space-y-6">
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground font-light">
                Add, edit, or remove catalog items shown on the store catalog.
              </p>
              <button
                onClick={() => {
                  setIsNewProduct(true);
                  setEditingProduct({
                    id: 0,
                    slug: '',
                    name: '',
                    category: 'Living Room',
                    image: '',
                    badge: '',
                    price: 50000,
                    stock: 'in-stock',
                    description: '',
                    specs: [{ label: 'Dimensions', value: '' }],
                  });
                }}
                className="flex items-center space-x-2 bg-primary text-primary-foreground px-5 py-3 uppercase tracking-widest text-xs font-semibold hover:bg-foreground hover:text-background transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Product</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((p) => (
                <div
                  key={p.id}
                  className="bg-card border border-border p-5 flex flex-col justify-between group hover:border-primary/50 transition-colors"
                >
                  <div>
                    <div className="relative aspect-[4/3] bg-muted mb-4 overflow-hidden">
                      {p.image ? (
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">
                          No Image
                        </div>
                      )}
                      <span className="absolute top-2 left-2 bg-background/90 text-[10px] uppercase tracking-wider px-2 py-1 text-primary border border-border">
                        {p.category}
                      </span>
                      {p.stock === 'out-of-stock' && (
                        <span className="absolute top-2 right-2 bg-destructive text-destructive-foreground text-[10px] uppercase tracking-wider px-2 py-1">
                          Out of Stock
                        </span>
                      )}
                    </div>

                    <h3 className="font-serif text-lg text-foreground truncate">{p.name}</h3>
                    <p className="text-primary font-medium text-sm mt-1">
                      Rs. {p.price.toLocaleString()}
                    </p>
                    <p className="text-muted-foreground text-xs line-clamp-2 mt-2 font-light">
                      {p.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 mt-4 border-t border-border">
                    <button
                      onClick={() => {
                        setIsNewProduct(false);
                        setEditingProduct(p);
                      }}
                      className="flex items-center space-x-1.5 text-xs text-foreground/80 hover:text-primary transition-colors"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => deleteProduct(p.id)}
                      className="flex items-center space-x-1.5 text-xs text-destructive hover:opacity-80 transition-opacity"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: PROJECTS */}
        {activeTab === 'projects' && (
          <div className="mt-8 space-y-6">
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground font-light">
                Showcase bespoke residential and commercial woodworking works.
              </p>
              <button
                onClick={() => {
                  setIsNewProject(true);
                  setEditingProject({
                    id: 0,
                    title: '',
                    type: '',
                    desc: '',
                    img: '',
                  });
                }}
                className="flex items-center space-x-2 bg-primary text-primary-foreground px-5 py-3 uppercase tracking-widest text-xs font-semibold hover:bg-foreground hover:text-background transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Project</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="bg-card border border-border p-5 flex flex-col justify-between hover:border-primary/50 transition-colors"
                >
                  <div>
                    <div className="aspect-[16/9] bg-muted mb-4 overflow-hidden">
                      {proj.img ? (
                        <img
                          src={proj.img}
                          alt={proj.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">
                          No Image
                        </div>
                      )}
                    </div>
                    <span className="text-[10px] uppercase tracking-widest text-primary">
                      {proj.type}
                    </span>
                    <h3 className="font-serif text-lg text-foreground mt-1">{proj.title}</h3>
                    <p className="text-muted-foreground text-xs line-clamp-3 mt-2 font-light">
                      {proj.desc}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 mt-4 border-t border-border">
                    <button
                      onClick={() => {
                        setIsNewProject(false);
                        setEditingProject(proj);
                      }}
                      className="flex items-center space-x-1.5 text-xs text-foreground/80 hover:text-primary transition-colors"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => deleteProject(proj.id)}
                      className="flex items-center space-x-1.5 text-xs text-destructive hover:opacity-80 transition-opacity"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: GALLERY */}
        {activeTab === 'gallery' && (
          <div className="mt-8 space-y-6">
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground font-light">
                High-resolution photographs featured on the public Gallery page.
              </p>
              <button
                onClick={() => {
                  setIsNewGallery(true);
                  setEditingGallery({
                    id: 0,
                    title: '',
                    src: '',
                    className: 'aspect-square',
                  });
                }}
                className="flex items-center space-x-2 bg-primary text-primary-foreground px-5 py-3 uppercase tracking-widest text-xs font-semibold hover:bg-foreground hover:text-background transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Photo</span>
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {gallery.map((g) => (
                <div
                  key={g.id}
                  className="bg-card border border-border p-3 flex flex-col justify-between group"
                >
                  <div className="aspect-square bg-muted overflow-hidden relative">
                    {g.src ? (
                      <img src={g.src} alt={g.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">
                        No Image
                      </div>
                    )}
                  </div>
                  <div className="pt-2">
                    <h4 className="text-xs font-medium text-foreground truncate">{g.title || 'Photo'}</h4>
                  </div>
                  <div className="flex items-center justify-between pt-2 mt-2 border-t border-border">
                    <button
                      onClick={() => {
                        setIsNewGallery(false);
                        setEditingGallery(g);
                      }}
                      className="text-xs text-muted-foreground hover:text-primary transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteGallery(g.id)}
                      className="text-xs text-destructive hover:opacity-80"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: PASSWORD & SECURITY */}
        {activeTab === 'security' && (
          <div className="mt-8 max-w-xl">
            <div className="bg-card border border-border p-8 md:p-10 shadow-lg">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 rounded-full border border-primary/30 bg-primary/10 flex items-center justify-center">
                  <KeyRound className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="font-serif text-2xl text-foreground">Change Password & Credentials</h2>
                  <p className="text-xs text-muted-foreground">
                    Protect your administrative access with cryptographic SHA-256 hashing.
                  </p>
                </div>
              </div>

              {securityMessage && (
                <div
                  className={`p-4 mb-6 border text-xs font-medium ${
                    securityMessage.type === 'success'
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
                      : 'bg-destructive/10 border-destructive/30 text-destructive'
                  }`}
                >
                  {securityMessage.text}
                </div>
              )}

              <form onSubmit={handlePasswordChange} className="space-y-5">
                <div>
                  <label className="text-xs uppercase tracking-wider text-muted-foreground block mb-1">
                    New Username (Optional)
                  </label>
                  <input
                    type="text"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    placeholder={`Current: ${getAdminUsername()}`}
                    className="w-full bg-background border border-border px-3 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-muted-foreground block mb-1">
                    Current Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showCurrentPass ? 'text' : 'password'}
                      required
                      value={currentPass}
                      onChange={(e) => setCurrentPass(e.target.value)}
                      placeholder="Enter current password"
                      className="w-full bg-background border border-border px-3 py-2.5 pr-10 text-sm text-foreground focus:border-primary focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPass(!showCurrentPass)}
                      className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors focus:outline-none"
                      title={showCurrentPass ? 'Hide password' : 'Show password'}
                    >
                      {showCurrentPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="pt-2 border-t border-border/50">
                  <label className="text-xs uppercase tracking-wider text-muted-foreground block mb-1">
                    New Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPass ? 'text' : 'password'}
                      required
                      minLength={6}
                      value={newPass}
                      onChange={(e) => setNewPass(e.target.value)}
                      placeholder="Minimum 6 characters"
                      className="w-full bg-background border border-border px-3 py-2.5 pr-10 text-sm text-foreground focus:border-primary focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPass(!showNewPass)}
                      className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors focus:outline-none"
                      title={showNewPass ? 'Hide password' : 'Show password'}
                    >
                      {showNewPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-muted-foreground block mb-1">
                    Confirm New Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPass ? 'text' : 'password'}
                      required
                      minLength={6}
                      value={confirmPass}
                      onChange={(e) => setConfirmPass(e.target.value)}
                      placeholder="Repeat new password"
                      className="w-full bg-background border border-border px-3 py-2.5 pr-10 text-sm text-foreground focus:border-primary focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPass(!showConfirmPass)}
                      className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors focus:outline-none"
                      title={showConfirmPass ? 'Hide password' : 'Show password'}
                    >
                      {showConfirmPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-4 bg-primary hover:bg-foreground text-primary-foreground hover:text-background py-3 uppercase tracking-widest text-xs font-semibold transition-all duration-300"
                >
                  Update Credentials
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* MODAL: EDIT/ADD PRODUCT */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-card border border-border w-full max-w-2xl my-8 p-6 md:p-8 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setEditingProduct(null)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="font-serif text-2xl text-foreground mb-6">
              {isNewProduct ? 'Add New Product' : `Edit: ${editingProduct.name}`}
            </h2>

            <form onSubmit={saveProduct} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs uppercase tracking-wider text-muted-foreground block mb-1">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProduct.name}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, name: e.target.value })
                    }
                    className="w-full bg-background border border-border px-3 py-2 text-foreground focus:border-primary focus:outline-none"
                    placeholder="e.g. Royal Walnut Bed"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-muted-foreground block mb-1">
                    Category *
                  </label>
                  <select
                    value={editingProduct.category}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, category: e.target.value })
                    }
                    className="w-full bg-background border border-border px-3 py-2 text-foreground focus:border-primary focus:outline-none"
                  >
                    {productCategories
                      .filter((c) => c !== 'All')
                      .map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs uppercase tracking-wider text-muted-foreground block mb-1">
                    Price (PKR) *
                  </label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={editingProduct.price}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        price: Number(e.target.value) || 0,
                      })
                    }
                    className="w-full bg-background border border-border px-3 py-2 text-foreground focus:border-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-muted-foreground block mb-1">
                    Badge / Tag
                  </label>
                  <input
                    type="text"
                    value={editingProduct.badge || ''}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, badge: e.target.value })
                    }
                    placeholder="Popular, Bespoke, New"
                    className="w-full bg-background border border-border px-3 py-2 text-foreground focus:border-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-muted-foreground block mb-1">
                    Stock Availability
                  </label>
                  <select
                    value={editingProduct.stock}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        stock: e.target.value as 'in-stock' | 'out-of-stock',
                      })
                    }
                    className="w-full bg-background border border-border px-3 py-2 text-foreground focus:border-primary focus:outline-none"
                  >
                    <option value="in-stock">In Stock / Available</option>
                    <option value="out-of-stock">Out of Stock</option>
                  </select>
                </div>
              </div>

              {/* Image Uploader & Preview */}
              <div>
                <label className="text-xs uppercase tracking-wider text-muted-foreground block mb-1">
                  Product Image *
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-muted border border-border shrink-0 overflow-hidden">
                    {editingProduct.image ? (
                      <img
                        src={editingProduct.image}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[10px] text-muted-foreground">
                        No image
                      </div>
                    )}
                  </div>
                  <div className="flex-1 space-y-2">
                    <label className="inline-flex items-center space-x-2 bg-secondary text-secondary-foreground px-4 py-2 text-xs uppercase tracking-wider cursor-pointer hover:bg-secondary/80">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload from Device</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) =>
                          handleImageUpload(e, (base64) =>
                            setEditingProduct({ ...editingProduct, image: base64 })
                          )
                        }
                      />
                    </label>
                    <input
                      type="text"
                      placeholder="Or enter Image URL"
                      value={editingProduct.image}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, image: e.target.value })
                      }
                      className="w-full bg-background border border-border px-3 py-1.5 text-xs text-foreground focus:border-primary focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider text-muted-foreground block mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={editingProduct.description}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, description: e.target.value })
                  }
                  className="w-full bg-background border border-border px-3 py-2 text-foreground focus:border-primary focus:outline-none resize-none"
                  placeholder="Details regarding materials, wood quality, and finish..."
                />
              </div>

              {/* Specs Editor */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs uppercase tracking-wider text-muted-foreground">
                    Specifications (Dimensions, Wood, Polish)
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      setEditingProduct({
                        ...editingProduct,
                        specs: [
                          ...editingProduct.specs,
                          { label: 'Feature', value: '' },
                        ],
                      })
                    }
                    className="text-xs text-primary hover:underline"
                  >
                    + Add Spec
                  </button>
                </div>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {editingProduct.specs.map((spec, i) => (
                    <div key={i} className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Label (e.g. Frame)"
                        value={spec.label}
                        onChange={(e) => {
                          const updated = [...editingProduct.specs];
                          updated[i].label = e.target.value;
                          setEditingProduct({ ...editingProduct, specs: updated });
                        }}
                        className="w-1/3 bg-background border border-border px-3 py-1.5 text-xs text-foreground"
                      />
                      <input
                        type="text"
                        placeholder="Value (e.g. Solid Walnut)"
                        value={spec.value}
                        onChange={(e) => {
                          const updated = [...editingProduct.specs];
                          updated[i].value = e.target.value;
                          setEditingProduct({ ...editingProduct, specs: updated });
                        }}
                        className="flex-1 bg-background border border-border px-3 py-1.5 text-xs text-foreground"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updated = editingProduct.specs.filter((_, idx) => idx !== i);
                          setEditingProduct({ ...editingProduct, specs: updated });
                        }}
                        className="text-muted-foreground hover:text-destructive px-1"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-border">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-5 py-2.5 border border-border text-xs uppercase tracking-wider hover:bg-muted"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center space-x-2 bg-primary text-primary-foreground px-6 py-2.5 text-xs uppercase tracking-wider font-semibold hover:bg-foreground hover:text-background transition-colors"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Product</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT/ADD PROJECT */}
      {editingProject && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border border-border w-full max-w-lg p-6 md:p-8 relative">
            <button
              onClick={() => setEditingProject(null)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="font-serif text-2xl text-foreground mb-6">
              {isNewProject ? 'Add Project Showcase' : `Edit: ${editingProject.title}`}
            </h2>

            <form onSubmit={saveProject} className="space-y-4">
              <div>
                <label className="text-xs uppercase tracking-wider text-muted-foreground block mb-1">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  value={editingProject.title}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, title: e.target.value })
                  }
                  className="w-full bg-background border border-border px-3 py-2 text-foreground focus:border-primary focus:outline-none"
                  placeholder="e.g. University Town Residence"
                />
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider text-muted-foreground block mb-1">
                  Project Scope / Type *
                </label>
                <input
                  type="text"
                  required
                  value={editingProject.type}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, type: e.target.value })
                  }
                  className="w-full bg-background border border-border px-3 py-2 text-foreground focus:border-primary focus:outline-none"
                  placeholder="Whole-home woodwork, Kitchen & Wardrobes"
                />
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider text-muted-foreground block mb-1">
                  Project Image *
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-14 bg-muted border border-border shrink-0 overflow-hidden">
                    {editingProject.img ? (
                      <img
                        src={editingProject.img}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[10px] text-muted-foreground">
                        No image
                      </div>
                    )}
                  </div>
                  <div className="flex-1 space-y-2">
                    <label className="inline-flex items-center space-x-2 bg-secondary text-secondary-foreground px-4 py-2 text-xs uppercase tracking-wider cursor-pointer hover:bg-secondary/80">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload Photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) =>
                          handleImageUpload(e, (base64) =>
                            setEditingProject({ ...editingProject, img: base64 })
                          )
                        }
                      />
                    </label>
                    <input
                      type="text"
                      placeholder="Or paste image URL"
                      value={editingProject.img}
                      onChange={(e) =>
                        setEditingProject({ ...editingProject, img: e.target.value })
                      }
                      className="w-full bg-background border border-border px-3 py-1.5 text-xs text-foreground focus:border-primary focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider text-muted-foreground block mb-1">
                  Story / Description *
                </label>
                <textarea
                  rows={4}
                  required
                  value={editingProject.desc}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, desc: e.target.value })
                  }
                  className="w-full bg-background border border-border px-3 py-2 text-foreground focus:border-primary focus:outline-none resize-none"
                  placeholder="Summarize the work executed in Peshawar..."
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-border">
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="px-5 py-2.5 border border-border text-xs uppercase tracking-wider hover:bg-muted"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center space-x-2 bg-primary text-primary-foreground px-6 py-2.5 text-xs uppercase tracking-wider font-semibold hover:bg-foreground hover:text-background transition-colors"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Project</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT/ADD GALLERY */}
      {editingGallery && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border border-border w-full max-w-md p-6 md:p-8 relative">
            <button
              onClick={() => setEditingGallery(null)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="font-serif text-2xl text-foreground mb-6">
              {isNewGallery ? 'Add Gallery Photo' : 'Edit Gallery Photo'}
            </h2>

            <form onSubmit={saveGallery} className="space-y-4">
              <div>
                <label className="text-xs uppercase tracking-wider text-muted-foreground block mb-1">
                  Caption / Title
                </label>
                <input
                  type="text"
                  value={editingGallery.title}
                  onChange={(e) =>
                    setEditingGallery({ ...editingGallery, title: e.target.value })
                  }
                  className="w-full bg-background border border-border px-3 py-2 text-foreground focus:border-primary focus:outline-none"
                  placeholder="e.g. Handcrafted Walnut Polish"
                />
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider text-muted-foreground block mb-1">
                  Photo *
                </label>
                <div className="space-y-3">
                  <div className="aspect-[4/3] bg-muted border border-border overflow-hidden">
                    {editingGallery.src ? (
                      <img
                        src={editingGallery.src}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">
                        No photo selected
                      </div>
                    )}
                  </div>

                  <label className="inline-flex items-center space-x-2 bg-secondary text-secondary-foreground px-4 py-2 text-xs uppercase tracking-wider cursor-pointer hover:bg-secondary/80">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        handleImageUpload(e, (base64) =>
                          setEditingGallery({ ...editingGallery, src: base64 })
                        )
                      }
                    />
                  </label>

                  <input
                    type="text"
                    placeholder="Or enter Image URL"
                    value={editingGallery.src}
                    onChange={(e) =>
                      setEditingGallery({ ...editingGallery, src: e.target.value })
                    }
                    className="w-full bg-background border border-border px-3 py-1.5 text-xs text-foreground focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-border">
                <button
                  type="button"
                  onClick={() => setEditingGallery(null)}
                  className="px-5 py-2.5 border border-border text-xs uppercase tracking-wider hover:bg-muted"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center space-x-2 bg-primary text-primary-foreground px-6 py-2.5 text-xs uppercase tracking-wider font-semibold hover:bg-foreground hover:text-background transition-colors"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Photo</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
