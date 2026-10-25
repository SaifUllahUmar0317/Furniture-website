import { useEffect, useState, type FormEvent } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { formatPrice, type Product } from '@/data/products';

type OrderFormDialogProps = {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function OrderFormDialog({ product, open, onOpenChange }: OrderFormDialogProps) {
  const [submissionState, setSubmissionState] = useState<
    'idle' | 'submitting' | 'success' | 'error'
  >('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setSubmissionState('idle');
    setErrorMessage('');
  }, [open, product?.slug]);

  if (!product) return null;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!product || submissionState === 'submitting') return;

    const rawFormId = import.meta.env.VITE_FORMSPREE_FORM_ID || 'xzeebqnz';
    const formSlug = rawFormId.replace(/^https?:\/\/formspree\.io\/f\//, '').trim();
    const endpoint = rawFormId.startsWith('http') && !rawFormId.includes('formspree.io/f/')
      ? rawFormId
      : `https://formspree.io/f/${encodeURIComponent(formSlug)}`;

    setSubmissionState('submitting');
    setErrorMessage('');

    const formData = new FormData(event.currentTarget);
    const customerEmail = formData.get('email');
    // Formspree special fields — subject, reply-to customer
    formData.append('_subject', `Custom Order Request: ${product.name} — Tehkal Hafsa Furniture`);
    if (typeof customerEmail === 'string' && customerEmail) {
      formData.append('_replyto', customerEmail);
    }

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Formspree did not accept the order request.');
      }

      setSubmissionState('success');
    } catch {
      setSubmissionState('error');
      setErrorMessage(
        'We couldn’t send your request. Please check your connection and try again.',
      );
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl border-border bg-background text-foreground sm:rounded-none">
        {submissionState === 'success' ? (
          <div className="py-8 text-center" role="status" aria-live="polite">
            <span className="mb-4 inline-flex h-12 w-12 items-center justify-center border border-primary/40 text-primary">✓</span>
            <DialogHeader className="mb-4">
              <DialogTitle className="font-serif text-2xl">Request sent</DialogTitle>
              <DialogDescription className="mx-auto max-w-sm">
                Your request for {product.name} has been sent to the workshop. They will contact you to confirm your order.
              </DialogDescription>
            </DialogHeader>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="mt-4 border border-primary px-6 py-3 text-xs uppercase tracking-[0.2em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <p className="text-xs uppercase tracking-[0.25em] text-primary">Order inquiry</p>
              <DialogTitle className="font-serif text-2xl">Request this piece</DialogTitle>
              <DialogDescription>
                The product details are ready. Add your contact and delivery information.
              </DialogDescription>
            </DialogHeader>

            <div className="border border-border bg-card p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-medium text-foreground">{product.name}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{product.category}</p>
                </div>
                <p className="shrink-0 text-right text-sm font-medium text-primary">
                  {product.priceQualifier === 'starting' ? 'From ' : ''}
                  {formatPrice(product.price)}
                </p>
              </div>
              <p className="mt-3 border-t border-border pt-3 text-xs leading-relaxed text-muted-foreground">
                These are sample details. The workshop will confirm the final price and availability.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="hidden" name="productName" value={product.name} />
              <input type="hidden" name="productSlug" value={product.slug} />
              <input type="hidden" name="samplePricePKR" value={product.price} />
              <input
                type="hidden"
                name="samplePriceDisplay"
                value={`${product.priceQualifier === 'starting' ? 'From ' : ''}${formatPrice(product.price)}`}
              />
              <input type="hidden" name="sampleStockStatus" value={product.stock} />
              <input
                type="hidden"
                name="sampleAvailability"
                value={product.stock === 'in-stock' ? 'Listed as in stock' : 'Listed as out of stock'}
              />
              <input type="hidden" name="productCategory" value={product.category} />
              <input type="hidden" name="productDescription" value={product.description} />
              <input
                type="hidden"
                name="productSpecifications"
                value={product.specs.map((spec) => `${spec.label}: ${spec.value}`).join('; ')}
              />
              <input
                type="hidden"
                name="_subject"
                value={`Furniture order request: ${product.name}`}
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2 text-xs uppercase tracking-widest text-foreground/70">
                  Full name
                  <input
                    autoComplete="name"
                    required
                    name="name"
                    className="w-full border border-border bg-card px-3 py-3 text-sm normal-case tracking-normal text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
                    placeholder="Your name"
                  />
                </label>
                <label className="space-y-2 text-xs uppercase tracking-widest text-foreground/70">
                  Phone / WhatsApp
                  <input
                    autoComplete="tel"
                    required
                    name="phone"
                    type="tel"
                    className="w-full border border-border bg-card px-3 py-3 text-sm normal-case tracking-normal text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
                    placeholder="+92 300 0000000"
                  />
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2 text-xs uppercase tracking-widest text-foreground/70">
                  Email
                  <input
                    autoComplete="email"
                    required
                    name="email"
                    type="email"
                    className="w-full border border-border bg-card px-3 py-3 text-sm normal-case tracking-normal text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
                    placeholder="you@example.com"
                  />
                </label>
                <label className="space-y-2 text-xs uppercase tracking-widest text-foreground/70">
                  Quantity
                  <input
                    required
                    name="quantity"
                    type="number"
                    min="1"
                    max="99"
                    defaultValue="1"
                    className="w-full border border-border bg-card px-3 py-3 text-sm normal-case tracking-normal text-foreground outline-none transition-colors focus:border-primary"
                  />
                </label>
              </div>

              <label className="block space-y-2 text-xs uppercase tracking-widest text-foreground/70">
                Delivery address / city
                <input
                  autoComplete="street-address"
                  required
                  name="deliveryAddress"
                  className="w-full border border-border bg-card px-3 py-3 text-sm normal-case tracking-normal text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
                  placeholder="City and delivery address"
                />
              </label>

              <label className="block space-y-2 text-xs uppercase tracking-widest text-foreground/70">
                Notes or changes
                <textarea
                  name="notes"
                  rows={3}
                  className="w-full resize-y border border-border bg-card px-3 py-3 text-sm normal-case tracking-normal text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
                  placeholder="Preferred size, finish, or other details"
                />
              </label>

              <p className="text-xs leading-relaxed text-muted-foreground">
                The price and availability are examples. The workshop will confirm them.
              </p>

              {submissionState === 'error' && (
                <p className="text-sm text-destructive" role="alert" aria-live="assertive">
                  {errorMessage}
                </p>
              )}

              <button
                type="submit"
                disabled={submissionState === 'submitting'}
                className="w-full bg-primary px-6 py-4 text-sm font-medium uppercase tracking-[0.2em] text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-wait disabled:opacity-60"
              >
                {submissionState === 'submitting' ? 'Sending request…' : 'Submit order request'}
              </button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
