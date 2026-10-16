import React, { useState, useEffect, useRef } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, Tag, Check, ArrowRight, MessageSquare, Sparkles } from 'lucide-react';
import { apiFetch } from '../api';

export default function CartDrawer({ isOpen, onClose, cartItems, onUpdateQty, onRemoveItem, onOrderPlaced }) {
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');
  const [tipPercentage, setTipPercentage] = useState(10);
  const [customTip, setCustomTip] = useState('');
  const [diningMode, setDiningMode] = useState('Dine-In'); // 'Dine-In', 'Takeaway', 'Delivery'
  const [tableNumber, setTableNumber] = useState('T-04');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useEffect(() => {
    if (!isOpen) return;
    const onKey = e => e.key === 'Escape' && closeRef.current();
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // Discount calculation
  let discount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.type === 'percentage') {
      discount = Math.round((subtotal * appliedCoupon.value) / 100);
    } else if (appliedCoupon.type === 'flat') {
      discount = appliedCoupon.value;
    }
  }

  const tax = Math.round((subtotal - discount) * 0.05); // 5% GST
  const tipAmount = customTip !== '' ? Number(customTip) || 0 : Math.round(((subtotal - discount) * tipPercentage) / 100);
  const grandTotal = Math.max(0, subtotal - discount + tax + tipAmount);

  const handleApplyCoupon = async () => {
    setCouponError('');
    if (!couponCode.trim()) return;
    try {
      const res = await apiFetch('/api/coupons/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: couponCode.trim(), subtotal })
      });
      const data = await res.json();
      if (data.valid) {
        setAppliedCoupon({
          code: data.code,
          type: data.discountType,
          value: data.discount,
          description: data.description
        });
        setCouponCode('');
      } else {
        setCouponError(data.error || 'Invalid coupon code');
      }
    } catch {
      // Fallback local coupon check if offline
      if (couponCode.toUpperCase() === 'GOVIND50' && subtotal >= 300) {
        setAppliedCoupon({ code: 'GOVIND50', type: 'percentage', value: 20, description: '20% Off Royal Feast' });
        setCouponCode('');
      } else {
        setCouponError('Invalid or minimum order not met');
      }
    }
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;
    if (!customerName.trim() || !customerPhone.trim()) {
      setErrorMsg('Please enter your name and phone number for order tracking.');
      return;
    }
    setErrorMsg('');
    setIsSubmitting(true);

    try {
      const payload = {
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        diningMode,
        orderType: diningMode,
        tableNumber: diningMode === 'Dine-In' ? tableNumber : 'N/A',
        tableNo: diningMode === 'Dine-In' ? tableNumber : null,
        items: cartItems.map(item => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          customizations: item.customizations || {}
        })),
        subtotal,
        discount,
        tax,
        tip: tipAmount,
        total: grandTotal,
        couponApplied: appliedCoupon ? appliedCoupon.code : null,
        notes: cartItems.map(it => it.customizations?.notes).filter(Boolean).join('; ')
      };

      const res = await apiFetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (data.success) {
        // Instant WhatsApp order notification dispatch
        if (customerPhone.trim()) {
          apiFetch('/api/notifications/whatsapp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              phone: customerPhone.trim(),
              message: `🧈 Govind Dosa Order #${data.order.id} confirmed! Total: ₹${grandTotal}. Preparing fresh on Govind ji's live tawa.`
            })
          }).catch(() => {});
        }
        onOrderPlaced(data.order);
        onClose();
      } else {
        setErrorMsg(data.error || 'Failed to place order. Please try again.');
      }
    } catch (err) {
      setErrorMsg('Network error. Please check your connection.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="cart-backdrop" onClick={onClose}>
      <div className="cart-drawer" role="dialog" aria-modal="true" aria-label="Shopping Cart" onClick={e => e.stopPropagation()}>
        
        {/* Header */}
        <div className="cart-header">
          <div className="cart-title-wrap">
            <ShoppingBag className="cart-header-icon" size={22} />
            <h2>Govind Ji’s Tawa Tray</h2>
            <span className="cart-badge">{cartItems.reduce((s, i) => s + i.quantity, 0)}</span>
          </div>
          <button className="cart-close-btn" aria-label="Close cart" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Dining Mode Selector */}
        <div className="dining-mode-bar">
          {['Dine-In', 'Takeaway', 'Delivery'].map(mode => (
            <button
              key={mode}
              className={`dining-mode-btn ${diningMode === mode ? 'active' : ''}`}
              onClick={() => setDiningMode(mode)}
            >
              {mode}
            </button>
          ))}
        </div>

        {diningMode === 'Dine-In' && (
          <div className="table-input-row">
            <label htmlFor="table-number-input">Table Number:</label>
            <input
              id="table-number-input"
              type="text"
              value={tableNumber}
              onChange={e => setTableNumber(e.target.value)}
              placeholder="e.g. T-04 or VIP Lounge"
              maxLength={15}
            />
          </div>
        )}

        {/* Cart Items List */}
        <div className="cart-items-list">
          {cartItems.length === 0 ? (
            <div className="cart-empty-state">
              <Sparkles size={40} className="empty-sparkle" />
              <p>Your tray is currently empty.</p>
              <span>Add a legendary Amul Butter Dosa to begin your feast!</span>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.cartId || `${item.id}-${Math.random()}`} className="cart-item-card">
                <div className="cart-item-info">
                  <h4>{item.name}</h4>
                  {item.customizations && (
                    <div className="cart-item-customs">
                      {item.customizations.butter && <span>Butter: {item.customizations.butter}</span>}
                      {item.customizations.spice && <span> • Heat: {item.customizations.spice}</span>}
                      {item.customizations.extras?.length > 0 && (
                        <div className="extra-pills-list">
                          {item.customizations.extras.map((ex, idx) => (
                            <span key={idx} className="mini-pill">+{ex}</span>
                          ))}
                        </div>
                      )}
                      {item.customizations.notes && <p className="item-note">Note: "{item.customizations.notes}"</p>}
                    </div>
                  )}
                  <div className="cart-item-pricing">
                    <span className="unit-price">₹{item.price} each</span>
                  </div>
                </div>

                <div className="cart-item-actions">
                  <div className="qty-pill">
                    <button aria-label="Decrease quantity" onClick={() => onUpdateQty(item.cartId, Math.max(1, item.quantity - 1))}>
                      <Minus size={14} />
                    </button>
                    <span>{item.quantity}</span>
                    <button aria-label="Increase quantity" onClick={() => onUpdateQty(item.cartId, item.quantity + 1)}>
                      <Plus size={14} />
                    </button>
                  </div>
                  <span className="line-total">₹{item.price * item.quantity}</span>
                  <button className="remove-item-btn" aria-label="Remove item" onClick={() => onRemoveItem(item.cartId)}>
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-footer-section">
            
            {/* Customer Details */}
            <div className="customer-details-box">
              <h4>Diner Credentials</h4>
              <div className="input-group-row">
                <input
                  type="text"
                  placeholder="Your Full Name *"
                  value={customerName}
                  onChange={e => setCustomerName(e.target.value)}
                />
                <input
                  type="tel"
                  placeholder="Mobile Number (for WhatsApp updates) *"
                  value={customerPhone}
                  onChange={e => setCustomerPhone(e.target.value)}
                />
              </div>
            </div>

            {/* Coupon Code Box */}
            <div className="coupon-box">
              <div className="coupon-input-wrap">
                <Tag size={16} />
                <input
                  type="text"
                  placeholder="Enter promo code (e.g. GOVIND1988)"
                  value={couponCode}
                  onChange={e => setCouponCode(e.target.value)}
                />
                <button type="button" onClick={handleApplyCoupon}>Apply</button>
              </div>
              {couponError && <span className="coupon-error">{couponError}</span>}
              {appliedCoupon && (
                <div className="coupon-success">
                  <Check size={14} /> <span>{appliedCoupon.description || appliedCoupon.code} applied successfully!</span>
                </div>
              )}
            </div>

            {/* Tip Selector */}
            <div className="tip-section">
              <label>Tip Govind Ji’s Tawa Masters</label>
              <div className="tip-buttons">
                {[5, 10, 15].map(pct => (
                  <button
                    key={pct}
                    type="button"
                    className={`tip-btn ${tipPercentage === pct && customTip === '' ? 'active' : ''}`}
                    onClick={() => { setTipPercentage(pct); setCustomTip(''); }}
                  >
                    {pct}%
                  </button>
                ))}
                <button
                  type="button"
                  className={`tip-btn ${tipPercentage === 0 && customTip === '' ? 'active' : ''}`}
                  onClick={() => { setTipPercentage(0); setCustomTip(''); }}
                >
                  None
                </button>
              </div>
            </div>

            {/* Bill Summary */}
            <div className="bill-summary">
              <div className="bill-row">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              {discount > 0 && (
                <div className="bill-row discount-row">
                  <span>Discount</span>
                  <span>-₹{discount}</span>
                </div>
              )}
              <div className="bill-row">
                <span>GST (5%)</span>
                <span>₹{tax}</span>
              </div>
              <div className="bill-row">
                <span>Tawa Master Tip</span>
                <span>₹{tipAmount}</span>
              </div>
              <div className="bill-row grand-total">
                <span>Grand Total</span>
                <span>₹{grandTotal}</span>
              </div>
            </div>

            {errorMsg && <div className="checkout-error-banner">{errorMsg}</div>}

            <button
              className="btn-primary place-order-btn"
              disabled={isSubmitting}
              onClick={handleCheckout}
            >
              {isSubmitting ? 'Dispatching to Tawa…' : `Place Order • ₹${grandTotal}`}
              <ArrowRight size={18} />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
