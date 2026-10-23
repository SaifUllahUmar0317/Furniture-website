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
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!open) setSubmitted(false);
  }, [open, product?.slug]);

  if (!product) return null;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl border-border bg-background text-foreground sm:rounded-none">
        {submitted ? (
          <div className="py-8 text-center" role="status" aria-live="polite">
            <span className="mb-4 inline-flex h-12 w-12 items-center justify-center border border-primary/40 text-primary">✓</span>
            <DialogHeader className="mb-4">
              <DialogTitle className="font-serif text-2xl">Order request prepared</DialogTitle>
              <DialogDescription className="mx-auto max-w-sm">
                This preview does not send or save orders yet. Formspree can be connected later to email this request to your team.
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
                Product information is filled in for you. Add your contact and delivery details to continue.
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
                Sample listing details only. Confirm final pricing, specifications, and availability with the workshop.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="hidden" name="productName" value={product.name} />
              <input type="hidden" name="productSlug" value={product.slug} />
              <input type="hidden" name="samplePricePKR" value={product.price} />
              <input type="hidden" name="sampleStockStatus" value={product.stock} />
              <input
                type="hidden"
                name="productSpecifications"
                value={product.specs.map((spec) => `${spec.label}: ${spec.value}`).join('; ')}
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
                Notes or customization
                <textarea
                  name="notes"
                  rows={3}
                  className="w-full resize-y border border-border bg-card px-3 py-3 text-sm normal-case tracking-normal text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
                  placeholder="Preferred size, finish, or other details"
                />
              </label>

              <p className="text-xs leading-relaxed text-muted-foreground">
                Sample pricing and stock are not a confirmed quote. Submitting this preview form will not send an email yet.
              </p>

              <button
                type="submit"
                className="w-full bg-primary px-6 py-4 text-sm font-medium uppercase tracking-[0.2em] text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Submit order request
              </button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
