import React from 'react';
import { 
  Flame, 
  ShoppingBag, 
  UtensilsCrossed, 
  Clock, 
  Award, 
  BookOpen, 
  Calendar, 
  Star,
  ShieldCheck,
  Phone
} from 'lucide-react';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  cartCount, 
  openCart, 
  onOpenHeritage,
  onScrollToSection
}) {
  return (
    <header className="app-header">
      <div className="header-container">
        {/* Brand Logo & Tagline */}
        <div 
          className="brand-wrapper" 
          onClick={() => { setActiveTab('store'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          role="button"
          tabIndex={0}
        >
          <div className="brand-badge-icon">
            <Flame size={24} />
          </div>
          <div className="brand-titles">
            <div className="brand-title-line">
              <h1>Govind Dosa</h1>
              <span className="brand-pill-legacy">Since 1988</span>
            </div>
            <span className="tagline">Legendary Amul Butter Street Delicacy • Hyderabad</span>
          </div>
        </div>

        {/* Customer Focused Navigation Tabs */}
        <nav className="nav-tabs" aria-label="Main Navigation">
          <button 
            className={`nav-tab-btn ${activeTab === 'store' ? 'active' : ''}`} 
            onClick={() => { setActiveTab('store'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          >
            <UtensilsCrossed size={15} />
            <span>Home</span>
          </button>

          <button 
            className="nav-tab-btn" 
            onClick={() => onScrollToSection('menu-section')}
          >
            <Flame size={15} />
            <span>Full Menu</span>
          </button>

          <button 
            className={`nav-tab-btn ${activeTab === 'menucard' ? 'active' : ''}`} 
            onClick={() => setActiveTab('menucard')}
          >
            <BookOpen size={15} />
            <span>Digital Menu Card</span>
          </button>

          <button 
            className={`nav-tab-btn ${activeTab === 'tiffin' ? 'active' : ''}`} 
            onClick={() => setActiveTab('tiffin')}
          >
            <Calendar size={15} />
            <span>Tiffin Plans</span>
          </button>

          <button 
            className={`nav-tab-btn ${activeTab === 'tracking' ? 'active' : ''}`} 
            onClick={() => setActiveTab('tracking')}
          >
            <Clock size={15} />
            <span>Live Queue</span>
          </button>

          <button 
            className={`nav-tab-btn ${activeTab === 'reservations' ? 'active' : ''}`} 
            onClick={() => setActiveTab('reservations')}
          >
            <Calendar size={15} />
            <span>Reservations</span>
          </button>

          <button 
            className="nav-tab-btn" 
            onClick={() => onScrollToSection('reviews-section')}
          >
            <Star size={15} />
            <span>Reviews</span>
          </button>
        </nav>

        {/* Header Action Buttons */}
        <div className="header-actions">
          {/* Heritage Story Button */}
          <button 
            className="action-pill-btn btn-heritage" 
            onClick={onOpenHeritage}
            title="Our 1988 Heritage Story"
          >
            <Award size={16} />
            <span className="hide-on-mobile">Our Story</span>
          </button>

          {/* Cart Button */}
          <button 
            className="action-pill-btn btn-cart" 
            onClick={openCart}
            aria-label={`Open Cart (${cartCount} items)`}
          >
            <ShoppingBag size={18} />
            <span className="cart-btn-label hide-on-mobile">Cart</span>
            {cartCount > 0 && <span className="cart-count-badge">{cartCount}</span>}
          </button>

          {/* Discreet Admin / Staff Portal Button */}
          <button
            className={`action-pill-btn btn-admin-toggle ${activeTab === 'admin' ? 'active' : ''}`}
            onClick={() => setActiveTab(activeTab === 'admin' ? 'store' : 'admin')}
            title="Kitchen KDS & Staff Operations Portal"
          >
            <ShieldCheck size={16} />
            <span className="hide-on-mobile">{activeTab === 'admin' ? 'Customer View' : 'Staff / KDS'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
