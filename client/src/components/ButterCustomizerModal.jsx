import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Flame, Check, Plus, Minus, X } from 'lucide-react';

const butterOptions = [
  { id: 'Regular', name: 'Standard Amul Butter', price: 0, desc: 'Classic golden roast' },
  { id: 'Extra', name: 'Extra Butter Splash', price: 20, desc: '+₹20 • Rich aromatic melt' },
  { id: 'Bath', name: "Govind Ji's Butter Bath", price: 40, desc: '+₹40 • Double dollop sizzle' }
];
const spiceOptions = [
  { id: 'Mild', name: 'Mild & Subtle', desc: 'Gentle warmth without sting', heat: 1 },
  { id: 'Mysore Karam', name: 'Authentic Mysore Karam', desc: 'Signature fiery-sweet red chutney', heat: 2 },
  { id: 'Extra Fiery', name: 'Gunpowder Fiery Karam', desc: 'Heavy spiced garlic chili kick', heat: 3 }
];
const extraOptions = [
  { id: 'Cheese', name: 'Grated Amul Cheese', price: 35 },
  { id: 'Podi', name: 'Roasted Gunpowder Podi', price: 15 },
  { id: 'ExtraChutney', name: 'Extra Sambar & Chutney', price: 20 },
  { id: 'ExtraMasala', name: 'Extra Aloo Masala Portion', price: 25 }
];

export default function ButterCustomizerModal({ item, onClose, onAddToCart }) {
  const [butterLevel, setButterLevel] = useState('Regular');
  const [spiceLevel, setSpiceLevel] = useState('Mysore Karam');
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');

  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useEffect(() => {
    const onKey = e => e.key === 'Escape' && closeRef.current();
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = prev; };
  }, []);

  if (!item) return null; // safe: all hooks are above

  const toggleExtra = id =>
    setSelectedExtras(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const butterPrice = (butterOptions.find(b => b.id === butterLevel) || butterOptions[0]).price;
  const extrasTotal = selectedExtras.reduce((s, id) => s + (extraOptions.find(e => e.id === id)?.price || 0), 0);
  const unitPrice = item.price + butterPrice + extrasTotal;
  const totalPrice = unitPrice * quantity;

  const handleAdd = () => {
    onAddToCart({
      ...item,
      cartId: `${item.id}-${Date.now()}`,
      basePrice: item.price,
      unitPrice,
      price: unitPrice,
      quantity,
      customizations: {
        butter: butterLevel,
        spice: spiceLevel,
        extraIds: selectedExtras,
        extras: selectedExtras.map(id => extraOptions.find(e => e.id === id)?.name).filter(Boolean),
        notes: notes.trim().slice(0, 200)
      }
    });
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-sheet" role="dialog" aria-modal="true" aria-label={`Customize ${item.name}`} onClick={e => e.stopPropagation()}>
        <button className="modal-close-btn" aria-label="Close" onClick={onClose}><X size={20} /></button>

        <div className="customizer-header">
          {item.image && <img src={item.image} alt={item.name} className="customizer-dish-thumb" />}
          <div>
            <h3>Customize Your {item.name}</h3>
            <p className="base-price">Base: ₹{item.price}</p>
          </div>
        </div>

        <div className="custom-section">
          <label className="section-title"><Sparkles size={16} /> Butter Quotient (Amul)</label>
          <div className="pill-grid">
            {butterOptions.map(o => (
              <button key={o.id} className={`custom-pill ${butterLevel === o.id ? 'active' : ''}`} onClick={() => setButterLevel(o.id)}>
                <div className="pill-name">{o.name}</div>
                <div className="pill-desc">{o.desc}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="custom-section">
          <label className="section-title"><Flame size={16} /> Mysore Karam & Heat</label>
          <div className="pill-grid">
            {spiceOptions.map(o => (
              <button key={o.id} className={`custom-pill ${spiceLevel === o.id ? 'active' : ''}`} onClick={() => setSpiceLevel(o.id)}>
                <div className="pill-name">{o.name}</div>
                <div className="heat-meter" aria-label={`Heat level ${o.heat} of 3`}>
                  {[1, 2, 3].map(n => <Flame key={n} size={14} className={n <= o.heat ? 'on' : ''} />)}
                </div>
                <div className="pill-desc">{o.desc}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="custom-section">
          <label className="section-title"><Plus size={16} /> Extra Toppings</label>
          <div className="pill-grid">
            {extraOptions.map(o => {
              const on = selectedExtras.includes(o.id);
              return (
                <button key={o.id} className={`custom-pill ${on ? 'active' : ''}`} onClick={() => toggleExtra(o.id)} aria-pressed={on}>
                  <div className="pill-name">{on && <Check size={14} />} {o.name}</div>
                  <div className="pill-desc">+₹{o.price}</div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="custom-section">
          <label className="section-title" htmlFor="order-notes">Special Instructions</label>
          <textarea id="order-notes" value={notes} maxLength={200} rows={2}
            placeholder="e.g. crispy edges, less oil" onChange={e => setNotes(e.target.value)} />
        </div>

        <div className="price-breakdown">
          <span>Base ₹{item.price}</span>
          {butterPrice > 0 && <span>Butter +₹{butterPrice}</span>}
          {extrasTotal > 0 && <span>Extras +₹{extrasTotal}</span>}
          {quantity > 1 && <span>× {quantity}</span>}
        </div>

        <div className="customizer-footer">
          <div className="qty-control">
            <button aria-label="Decrease" onClick={() => setQuantity(q => Math.max(1, q - 1))}><Minus size={16} /></button>
            <span>{quantity}</span>
            <button aria-label="Increase" onClick={() => setQuantity(q => Math.min(50, q + 1))}><Plus size={16} /></button>
          </div>
          <button className="btn-primary add-to-cart-btn" onClick={handleAdd}>
            Add to Order • <b key={totalPrice} className="price-pop">₹{totalPrice}</b>
          </button>
        </div>
      </div>
    </div>
  );
}
