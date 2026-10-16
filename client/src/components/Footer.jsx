import React from 'react';
import { 
  Flame, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Award, 
  Heart, 
  Sparkles, 
  ShieldCheck, 
  MessageSquare,
  ArrowUp,
  Star,
  Instagram,
  ExternalLink
} from 'lucide-react';

export default function Footer({ onOpenTab, onOpenHeritage, onScrollToSection, onOpenAdmin }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="app-footer">
      {/* Upper Footer Highlights */}
      <div className="footer-highlights-ribbon">
        <div className="footer-highlight-item">
          <Sparkles className="highlight-icon" size={20} />
          <div>
            <h4>100% Genuine Amul Butter</h4>
            <p>Every single dosa & idli is roasted in pure Amul butter since 1988.</p>
          </div>
        </div>
        <div className="footer-highlight-item">
          <Clock className="highlight-icon" size={20} />
          <div>
            <h4>Live Cast-Iron Tawa</h4>
            <p>6:00 AM – 1:30 AM Daily. Piping hot, roasted right in front of you.</p>
          </div>
        </div>
        <div className="footer-highlight-item">
          <ShieldCheck className="highlight-icon" size={20} />
          <div>
            <h4>100% Pure Vegetarian</h4>
            <p>Natural 14-hour fermented batter & fresh daily peanut chutney.</p>
          </div>
        </div>
      </div>

      {/* Main Customer Footer Grid */}
      <div className="footer-main-grid">
        {/* Brand Column */}
        <div className="footer-brand-col">
          <div className="footer-brand-header">
            <div className="brand-badge-icon"><Flame size={24} /></div>
            <div>
              <h3>Govind Dosa</h3>
              <span className="brand-subtitle">Legendary Hyderabad Street Delicacy Since 1988</span>
            </div>
          </div>
          <p className="footer-brand-bio">
            From a humble tawa cart near Taj Mahal Hotel in Abids to Hyderabad's premier breakfast & midnight dining institution. Drenched in authentic Amul butter and spiced with 38 years of culinary passion.
          </p>
          <div className="footer-fssai-badge">
            <Award size={16} />
            <span>FSSAI Certified • Quality Assured #13621014000452</span>
          </div>
        </div>

        {/* Restaurant Menu & Quick Links */}
        <div className="footer-links-col">
          <h4>Menu & Dining</h4>
          <ul>
            <li><button onClick={() => { onOpenTab('store'); onScrollToSection('menu-section'); }}>Full Tawa Menu</button></li>
            <li><button onClick={() => { onOpenTab('menucard'); scrollToTop(); }}>Digital Restaurant Card</button></li>
            <li><button onClick={() => { onOpenTab('tiffin'); scrollToTop(); }}>Morning Tiffin Subscriptions</button></li>
            <li><button onClick={() => { onOpenTab('tracking'); scrollToTop(); }}>Live Queue & Order Tracker</button></li>
            <li><button onClick={() => { onOpenTab('reservations'); scrollToTop(); }}>Table Reservations</button></li>
            <li><button onClick={onOpenHeritage}>Our 1988 Heritage Story</button></li>
          </ul>
        </div>

        {/* Social Proof & Reviews */}
        <div className="footer-links-col">
          <h4>Reviews & Social</h4>
          <ul>
            <li><button onClick={() => { onOpenTab('store'); onScrollToSection('reviews-section'); }}>⭐ 4.9 Google Reviews (12,400+)</button></li>
            <li>
              <a 
                href="https://www.instagram.com" 
                target="_blank" 
                rel="noreferrer" 
                className="footer-ext-link"
              >
                <Instagram size={15} /> Instagram @GovindDosaAbids
              </a>
            </li>
            <li>
              <a 
                href="https://wa.me/919849100000?text=Hi%20Govind%20Ji%2C%20I%20want%20to%20order" 
                target="_blank" 
                rel="noreferrer" 
                className="footer-ext-link"
              >
                <MessageSquare size={15} /> WhatsApp Direct Order
              </a>
            </li>
            <li><span className="footer-badge-text">Abids Flagship • Taj Mahal Hotel Lane</span></li>
            <li><span className="footer-badge-text">Open Everyday 6:00 AM – 1:30 AM</span></li>
          </ul>
        </div>

        {/* Visit & Connect Column */}
        <div className="footer-contact-col">
          <h4>Visit & Order</h4>
          <div className="contact-item">
            <MapPin size={18} className="contact-icon" />
            <div>
              <strong>Original Flagship Tawa:</strong>
              <p>Taj Mahal Hotel Lane, Bogulkunta, Abids, Hyderabad, Telangana 500001</p>
            </div>
          </div>
          <div className="contact-item">
            <Phone size={18} className="contact-icon" />
            <div>
              <strong>Instant Orders & Catering:</strong>
              <p>+91 98491 00000 / +91 90000 55441</p>
            </div>
          </div>
          <a 
            href="https://wa.me/919849100000?text=Hi%20Govind%20Ji%2C%20I%20want%20to%20order" 
            target="_blank" 
            rel="noreferrer"
            className="btn-whatsapp-footer"
          >
            <MessageSquare size={16} /> Chat on WhatsApp
          </a>
        </div>
      </div>

      {/* Bottom Legal & Staff Link */}
      <div className="footer-bottom-bar">
        <p className="copyright-text">
          © {new Date().getFullYear()} Govind Dosa. Handcrafted with <Heart size={14} className="heart-icon" /> in Hyderabad. All rights reserved.
        </p>
        
        <div className="footer-bottom-actions">
          <span className="footer-timing-badge">
            <Clock size={13} /> Open Today: 6:00 AM – 1:30 AM
          </span>

          {/* Discreet Staff Portal link moved away from customer eye */}
          <button 
            className="footer-staff-link" 
            onClick={onOpenAdmin}
            title="Kitchen Display & Staff Operations"
          >
            <ShieldCheck size={13} /> Staff / Admin Portal
          </button>

          <button className="btn-back-to-top" onClick={scrollToTop} aria-label="Back to top">
            Back to top <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
