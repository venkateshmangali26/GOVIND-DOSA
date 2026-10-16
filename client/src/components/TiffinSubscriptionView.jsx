import React, { useState } from 'react';
import { 
  Wallet, 
  Calendar, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  ArrowUpRight, 
  PauseCircle, 
  PlayCircle, 
  PlusCircle, 
  MessageSquare, 
  Flame, 
  Sparkles, 
  Truck,
  RotateCcw
} from 'lucide-react';

export default function TiffinSubscriptionView() {
  const [walletBalance, setWalletBalance] = useState(2200);
  const [isTopupOpen, setIsTopupOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const mealCost = 95;

  const [weekPlan, setWeekPlan] = useState([
    { id: 1, day: 'Wednesday', date: 'Oct 16', meal: "Govind Ji's Signature Butter Dosa", type: 'Signature', status: 'active', calories: 480 },
    { id: 2, day: 'Thursday', date: 'Oct 17', meal: 'Tawa Mysore Bajji & Coconut Chutney', type: 'Crisp Tawa', status: 'active', calories: 390 },
    { id: 3, day: 'Friday', date: 'Oct 18', meal: 'Spot Idly with Roasted Hyderabad Masala', type: 'Bestseller', status: 'active', calories: 420 },
    { id: 4, day: 'Saturday', date: 'Oct 19', meal: 'Cheese Burst Dosa & Filter Kaapi', type: 'Weekend Feast', status: 'active', calories: 590 },
    { id: 5, day: 'Sunday', date: 'Oct 20', meal: 'Ghee Sambar Idly & Crunchy Wada', type: 'Traditional', status: 'active', calories: 440 },
    { id: 6, day: 'Monday', date: 'Oct 21', meal: 'Flavourful Tawa Upma with Cashews', type: 'Healthy', status: 'active', calories: 380 }
  ]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const togglePause = (id) => {
    setWeekPlan(prev => prev.map(day => {
      if (day.id === id) {
        if (day.status === 'active') {
          setWalletBalance(b => b + mealCost);
          showToast(`₹${mealCost} refunded to your Tiffin Wallet! Delivery for ${day.day} skipped.`);
          return { ...day, status: 'paused' };
        } else {
          if (walletBalance < mealCost) {
            showToast('Insufficient wallet balance to resume.');
            return day;
          }
          setWalletBalance(b => b - mealCost);
          showToast(`₹${mealCost} deducted from your Tiffin Wallet. Delivery for ${day.day} resumed!`);
          return { ...day, status: 'active' };
        }
      }
      return day;
    }));
  };

  const handleTopup = (amount, bonus) => {
    const totalCredit = amount + bonus;
    setWalletBalance(b => b + totalCredit);
    setIsTopupOpen(false);
    showToast(`Recharged ₹${amount.toLocaleString('en-IN')} + ₹${bonus} bonus cash added!`);
  };

  return (
    <div className="view-container tiffin-dashboard-page">
      {/* View Header with Wallet Summary */}
      <div className="tiffin-top-ribbon">
        <div>
          <span className="tiffin-badge"><Sparkles size={14} /> Daily Morning Tiffin Subscriptions</span>
          <h1>Fresh Tiffins From Govind Ji's Live Tawa</h1>
          <p>Delivered piping hot between 7:00 AM – 8:30 AM across Hyderabad</p>
        </div>

        {/* The Tiffin Wallet Card */}
        <div className="tiffin-wallet-card">
          <div className="wallet-card-header">
            <span className="wallet-card-label"><Wallet size={16} /> Prepaid Tiffin Wallet</span>
            <span className="wallet-bonus-badge">10% Free Bonus Active</span>
          </div>
          <div className="wallet-card-balance">
            <h2>₹{walletBalance.toLocaleString('en-IN')}</h2>
            <span className="wallet-balance-sub">Available purchasing power</span>
          </div>
          <button className="btn-wallet-topup" onClick={() => setIsTopupOpen(true)}>
            <PlusCircle size={16} /> Add Money (+10% Extra)
          </button>
        </div>
      </div>

      {/* Top-up Modal */}
      {isTopupOpen && (
        <div className="modal-backdrop" onClick={() => setIsTopupOpen(false)}>
          <div className="modal-sheet tiffin-modal" onClick={e => e.stopPropagation()}>
            <div className="tiffin-modal-header">
              <h3><Wallet size={20} /> Recharge Your Tiffin Wallet</h3>
              <p>Lock in your morning breakfast and enjoy instant wholesale cashback bonuses.</p>
            </div>
            
            <div className="wallet-plans-grid">
              <div className="topup-option-card" onClick={() => handleTopup(1000, 50)}>
                <div className="topup-pill">Starter Pack</div>
                <h4>Pay ₹1,000</h4>
                <p className="bonus-text">Get ₹1,050 in Wallet (+₹50)</p>
                <button className="btn-select-topup">Select Pack</button>
              </div>

              <div className="topup-option-card featured" onClick={() => handleTopup(2000, 200)}>
                <div className="topup-pill popular">Most Popular</div>
                <h4>Pay ₹2,000</h4>
                <p className="bonus-text">Get ₹2,200 in Wallet (+₹200 Extra)</p>
                <button className="btn-select-topup highlight">Recharge ₹2,000</button>
              </div>

              <div className="topup-option-card" onClick={() => handleTopup(3500, 450)}>
                <div className="topup-pill">Family Monthly</div>
                <h4>Pay ₹3,500</h4>
                <p className="bonus-text">Get ₹3,950 in Wallet (+₹450 Free)</p>
                <button className="btn-select-topup">Select Pack</button>
              </div>
            </div>

            <button className="btn-secondary close-modal-btn" onClick={() => setIsTopupOpen(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Live Order Tracker Section */}
      <section className="tiffin-live-tracker-box">
        <div className="tracker-box-header">
          <div>
            <span className="tracker-sub-tag"><Clock size={14} /> Today's Delivery (Wed, 16 Oct)</span>
            <h3>Govind Ji's Butter Burst Dosa & 2 Tawa Idlis</h3>
            <p>Packed on fresh banana leaf with Coconut Chutney & Piping Hot Sambar</p>
          </div>
          <span className="live-status-pill out-for-delivery">
            <Truck size={14} /> Out For Delivery (Rider: Raju)
          </span>
        </div>

        {/* Animated Progress Bar */}
        <div className="tiffin-progress-container">
          <div className="tiffin-progress-bar" style={{ width: '70%' }}></div>
        </div>
        <div className="tiffin-progress-steps">
          <span className="step done"><CheckCircle size={14} /> On Live Tawa (6:15 AM)</span>
          <span className="step done"><CheckCircle size={14} /> Dispatched from Abids (6:40 AM)</span>
          <span className="step current"><Truck size={14} /> Arriving at your doorstep (7:15 AM)</span>
        </div>
      </section>

      {/* Visual Weekly Calendar */}
      <section className="tiffin-calendar-section">
        <div className="calendar-section-title-row">
          <div>
            <h2><Calendar size={20} /> Your Morning Tiffin Roster</h2>
            <p>Going to the office or travelling? Click <strong>"Skip Day"</strong> to automatically pause delivery and credit ₹95 back to your wallet.</p>
          </div>
          <div className="calendar-quick-stat">
            <span>Daily Rate: <strong>₹95 / meal</strong></span>
          </div>
        </div>

        <div className="tiffin-calendar-grid">
          {weekPlan.map(day => {
            const isPaused = day.status === 'paused';
            return (
              <div key={day.id} className={`tiffin-day-card ${isPaused ? 'paused' : 'active'}`}>
                <div className="day-card-top">
                  <span className="day-name">{day.day}</span>
                  <span className="day-date">{day.date}</span>
                </div>

                <div className="day-badge-row">
                  <span className={`meal-type-tag ${day.type.toLowerCase().replace(/\s+/g, '-')}`}>{day.type}</span>
                  <span className="calorie-tag">{day.calories} cal</span>
                </div>

                <h4 className={`day-meal-name ${isPaused ? 'strikethrough' : ''}`}>
                  {day.meal}
                </h4>

                <div className="day-card-footer">
                  {isPaused ? (
                    <button className="btn-resume-day" onClick={() => togglePause(day.id)}>
                      <PlayCircle size={15} /> Resume (+₹{mealCost})
                    </button>
                  ) : (
                    <button className="btn-skip-day" onClick={() => togglePause(day.id)}>
                      <PauseCircle size={15} /> Skip (+Refund ₹{mealCost})
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* WhatsApp Quick Controls & Smart Dispatch Card */}
      <section className="tiffin-bottom-tools-grid">
        <div className="tool-card whatsapp-tool">
          <div className="tool-icon-wrap"><MessageSquare size={24} /></div>
          <div>
            <h4>WhatsApp Bot Assistant</h4>
            <p>Send <strong>"PAUSE TOMORROW"</strong> or <strong>"MENU"</strong> to +91-98491-00000 to manage your breakfast on the go without logging in.</p>
          </div>
          <a 
            href="https://wa.me/919849100000?text=PAUSE%20TOMORROW" 
            target="_blank" 
            rel="noreferrer"
            className="btn-whatsapp-action"
          >
            Open WhatsApp
          </a>
        </div>

        <div className="tool-card packaging-tool">
          <div className="tool-icon-wrap"><Sparkles size={24} /></div>
          <div>
            <h4>QR-Coded Smart Packaging</h4>
            <p>Every tiffin box features a daily QR sticker. Scan while eating to check today's chef notes and give instant 1-to-5 star feedback.</p>
          </div>
          <span className="tool-badge">Printed on Every Box</span>
        </div>
      </section>

      {toast && <div className="toast" role="status">🧈 {toast}</div>}
    </div>
  );
}
