import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { type CartItem } from '@/lib/cart-context';
import { formatPrice } from '@/data/products';
import { useAccount } from '@/lib/account-context';
import { Check, MessageSquare, Send, CheckCircle2 } from 'lucide-react';

interface CartCheckoutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  orderItems: CartItem[];
  orderType: 'selected' | 'all';
  onOrderCompleted?: () => void;
}

export function CartCheckoutDialog({
  open,
  onOpenChange,
  orderItems,
  orderType,
  onOrderCompleted,
}: CartCheckoutDialogProps) {
  const { account } = useAccount();

  const [customerName, setCustomerName] = useState(account?.name || '');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState(account?.email || '');
  const [deliveryCity, setDeliveryCity] = useState('Peshawar');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [customNotes, setCustomNotes] = useState('');

  const [submissionState, setSubmissionState] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  if (!open || orderItems.length === 0) return null;

  const totalAmount = orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalQuantity = orderItems.reduce((acc, item) => acc + item.quantity, 0);

  const generateWhatsAppMessage = () => {
    let msg = `*NEW FURNITURE ORDER INQUIRY*\n`;
    msg += `----------------------------------------\n`;
    msg += `*Customer:* ${customerName || 'Customer'}\n`;
    msg += `*Phone:* ${customerPhone || 'Not provided'}\n`;
    if (customerEmail) msg += `*Email:* ${customerEmail}\n`;
    msg += `*City:* ${deliveryCity}\n`;
    if (deliveryAddress) msg += `*Address:* ${deliveryAddress}\n`;
    if (customNotes) msg += `*Notes:* ${customNotes}\n`;
    msg += `----------------------------------------\n`;
    msg += `*ORDER ITEMS (${totalQuantity} pcs):*\n`;

    orderItems.forEach((item, index) => {
      msg += `\n${index + 1}. *${item.name}* (Qty: ${item.quantity})\n`;
      msg += `   Category: ${item.category}\n`;
      msg += `   Price: ${formatPrice(item.price * item.quantity)}\n`;
    });

    msg += `\n----------------------------------------\n`;
    msg += `*ESTIMATED TOTAL: ${formatPrice(totalAmount)}*\n`;
    msg += `----------------------------------------\n`;
    msg += `Sent via Tehkal Hafsa Furniture Official Portal.`;

    return encodeURIComponent(msg);
  };

  const handleWhatsAppCheckout = () => {
    const text = generateWhatsAppMessage();
    const workshopPhone = '923165960886';
    const waUrl = `https://wa.me/${workshopPhone}?text=${text}`;
    window.open(waUrl, '_blank');
    setSubmissionState('success');
    if (onOrderCompleted) onOrderCompleted();
  };

  const handleDirectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submissionState === 'submitting') return;

    setSubmissionState('submitting');
    setErrorMsg('');

    const rawFormId = import.meta.env.VITE_FORMSPREE_FORM_ID || 'xzeebqnz';
    const formSlug = rawFormId.replace(/^https?:\/\/formspree\.io\/f\//, '').trim();
    const endpoint = rawFormId.startsWith('http') && !rawFormId.includes('formspree.io/f/')
      ? rawFormId
      : `https://formspree.io/f/${encodeURIComponent(formSlug)}`;

    const formData = new FormData();
    formData.append('customerName', customerName);
    formData.append('customerPhone', customerPhone);
    formData.append('customerEmail', customerEmail);
    formData.append('deliveryCity', deliveryCity);
    formData.append('deliveryAddress', deliveryAddress);
    formData.append('customNotes', customNotes);
    formData.append('totalAmountPKR', String(totalAmount));
    formData.append('totalPieces', String(totalQuantity));
    formData.append(
      'orderSummary',
      orderItems.map((i) => `${i.name} (Qty: ${i.quantity}) - ${formatPrice(i.price * i.quantity)}`).join('\n')
    );
    formData.append('_subject', `Cart Order Request (${orderItems.length} items) - Tehkal Hafsa`);

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
      });

      if (!res.ok) throw new Error('Submission failed');
      setSubmissionState('success');
      if (onOrderCompleted) onOrderCompleted();
    } catch {
      // Fallback directly to WhatsApp on network issue
      handleWhatsAppCheckout();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl max-h-[92vh] overflow-y-auto border-border bg-card text-foreground sm:rounded-none p-6 sm:p-8">
        {submissionState === 'success' ? (
          <div className="py-8 text-center">
            <span className="mb-4 inline-flex h-12 w-12 items-center justify-center border border-primary/40 text-primary rounded-full">
              <CheckCircle2 size={24} />
            </span>
            <DialogHeader className="mb-4">
              <DialogTitle className="font-serif text-2xl">Order Inquiry Received!</DialogTitle>
              <DialogDescription className="mx-auto max-w-sm mt-2">
                Your order for {totalQuantity} item(s) has been prepared. Our workshop master will contact you to verify dimensions, wood polish, and delivery schedule.
              </DialogDescription>
            </DialogHeader>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                type="button"
                onClick={() => {
                  setSubmissionState('idle');
                  onOpenChange(false);
                }}
                className="border border-primary px-6 py-3 text-xs uppercase tracking-[0.2em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        ) : (
          <>
            <DialogHeader>
              <span className="text-[10px] uppercase tracking-[0.25em] text-primary font-medium">
                {orderType === 'selected' ? 'Checkout Selected Pieces' : 'Checkout Complete Cart'}
              </span>
              <DialogTitle className="font-serif text-2xl">Confirm Your Furniture Order</DialogTitle>
              <DialogDescription>
                Review your items and enter delivery details. You can dispatch directly via WhatsApp or submit online.
              </DialogDescription>
            </DialogHeader>

            {/* Items Summary Box */}
            <div className="border border-border bg-background p-4 my-2 max-h-48 overflow-y-auto space-y-3">
              {orderItems.map((item) => (
                <div key={item.cartId} className="flex items-center justify-between text-xs gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-10 h-10 object-cover border border-border shrink-0"
                    />
                    <div className="truncate">
                      <p className="font-medium text-foreground truncate">{item.name}</p>
                      <p className="text-[11px] text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-medium text-primary shrink-0">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Price Total Banner */}
            <div className="flex justify-between items-center py-2 px-3 bg-primary/10 border border-primary/20 text-xs">
              <span className="uppercase tracking-wider text-muted-foreground font-medium">
                Total Estimated Price ({totalQuantity} pieces):
              </span>
              <span className="text-base font-serif font-semibold text-primary">
                {formatPrice(totalAmount)}
              </span>
            </div>

            <form onSubmit={handleDirectSubmit} className="space-y-3.5 mt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-muted-foreground block mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Full Name"
                    className="w-full bg-background border border-border px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-muted-foreground block mb-1">
                    WhatsApp / Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="03XX XXXXXXX"
                    className="w-full bg-background border border-border px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-muted-foreground block mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="name@gmail.com"
                    className="w-full bg-background border border-border px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-muted-foreground block mb-1">
                    Delivery City *
                  </label>
                  <input
                    type="text"
                    required
                    value={deliveryCity}
                    onChange={(e) => setDeliveryCity(e.target.value)}
                    placeholder="e.g. Peshawar, Islamabad"
                    className="w-full bg-background border border-border px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-wider text-muted-foreground block mb-1">
                  Delivery Address / Area
                </label>
                <input
                  type="text"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  placeholder="Street / Phase / House No."
                  className="w-full bg-background border border-border px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-wider text-muted-foreground block mb-1">
                  Custom Notes (Dimensions, Wood Finish, Polish)
                </label>
                <textarea
                  rows={2}
                  value={customNotes}
                  onChange={(e) => setCustomNotes(e.target.value)}
                  placeholder="Optional custom requirements..."
                  className="w-full bg-background border border-border px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none resize-none"
                />
              </div>

              {errorMsg && <p className="text-xs text-destructive">{errorMsg}</p>}

              <div className="pt-3 border-t border-border flex flex-col sm:flex-row gap-3">
                {/* Instant WhatsApp Order Dispatch */}
                <button
                  type="button"
                  onClick={handleWhatsAppCheckout}
                  className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white py-3 px-4 text-xs uppercase tracking-widest font-semibold transition-colors shadow-md"
                >
                  <MessageSquare size={16} />
                  <span>Order via WhatsApp</span>
                </button>

                {/* Direct Online Submit */}
                <button
                  type="submit"
                  disabled={submissionState === 'submitting'}
                  className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground py-3 px-4 text-xs uppercase tracking-widest font-semibold transition-colors disabled:opacity-50"
                >
                  <Send size={15} />
                  <span>{submissionState === 'submitting' ? 'Submitting...' : 'Submit Inquiry'}</span>
                </button>
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
