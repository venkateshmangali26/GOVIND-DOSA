import React from 'react';
import { ShoppingBag, Flame, ArrowRight, IndianRupee } from 'lucide-react';

export default function StickyMobileBar({ cartItems, onOpenCart, onOrderNowClick }) {
  const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div className="sticky-mobile-bar" role="region" aria-label="Quick order mobile bar">
      {totalCount > 0 ? (
        <button className="sticky-cart-btn" onClick={onOpenCart}>
          <div className="sticky-cart-left">
            <span className="sticky-cart-badge">{totalCount}</span>
            <div className="sticky-cart-info">
              <span className="sticky-label">View Your Order</span>
              <span className="sticky-price">
                <IndianRupee size={12} /> {subtotal} + Taxes
              </span>
            </div>
          </div>
          <div className="sticky-cart-right">
            <span>Proceed to Checkout</span>
            <ArrowRight size={16} />
          </div>
        </button>
      ) : (
        <button className="sticky-order-btn" onClick={onOrderNowClick}>
          <Flame size={18} className="flame-icon" />
          <span className="sticky-order-text">🛒 Order Now • Fresh Butter Dosa</span>
          <ArrowRight size={16} />
        </button>
      )}
    </div>
  );
}
