import React from 'react';
import { 
  Flame, 
  Star, 
  ArrowDown, 
  Award, 
  Sparkles, 
  BookOpen, 
  Clock, 
  IndianRupee, 
  ShieldCheck, 
  Calendar,
  UtensilsCrossed,
  Activity
} from 'lucide-react';

export default function HeroSection({ 
  onOrderNow, 
  onViewMenu, 
  onOpenMenuCard, 
  onReserveTable, 
  onTrackQueue,
  onSelectFeaturedItem 
}) {
  // Customer-facing trust badges replacing internal CRM metrics
  const customerBadges = [
    { label: '38+ Years Legacy', value: 'Since 1988', icon: <Award size={18} />, accent: 'gold' },
    { label: 'Verified Reviews', value: '12,400+', icon: <Star size={18} fill="#f59e0b" color="#f59e0b" />, accent: 'amber' },
    { label: 'Google & Zomato', value: '4.9 ★', icon: <ShieldCheck size={18} />, accent: 'green' },
    { label: 'Daily Foodies', value: '500+ Orders', icon: <Flame size={18} />, accent: 'orange' }
  ];

  return (
    <section className="hero-section">
      <div className="hero-bg-overlay" />
      <div className="hero-content">
        {/* Left Column: Conversion Copy & CTAs */}
        <div className="hero-headline">
          <div className="hero-badge-row">
            <span className="hero-badge">
              <Award size={14} /> Hyderabad's Most Loved Butter Dosa Since 1988
            </span>
            <span className="hero-live-pill">
              <span className="live-dot" /> Live Tawa Ready
            </span>
          </div>

          <h1 className="hero-title">
            Hyderabad's Most Loved <br />
            <span className="title-accent">Butter Dosa Since 1988</span>
          </h1>

          <p className="hero-subtitle">
            Freshly made on a live 200°C cast-iron tawa, drenched in genuine Amul butter, dusted with our generational secret podi, and paired with unlimited coconut & peanut chutney. Taste the Abids street legend.
          </p>

          {/* Primary High-Conversion CTAs */}
          <div className="hero-ctas">
            <button className="cta-primary cta-glow" onClick={onOrderNow}>
              <Flame size={20} className="flame-icon-pulse" />
              <span>Order Online Now</span>
              <ArrowDown size={18} />
            </button>

            <button className="cta-secondary" onClick={onViewMenu}>
              <BookOpen size={18} />
              <span>View Full Menu</span>
            </button>

            <button className="cta-tertiary" onClick={onReserveTable}>
              <Calendar size={16} />
              <span>Reserve Table</span>
            </button>

            <button className="cta-tertiary queue-badge-btn" onClick={onTrackQueue}>
              <Activity size={15} className="pulse-dot-green" />
              <span>Track Live Queue (~8 min)</span>
            </button>
          </div>

          {/* Social Proof Line */}
          <div className="hero-rating-strip">
            <div className="rating-stars">
              <Star size={16} fill="#fbbf24" color="#fbbf24" />
              <Star size={16} fill="#fbbf24" color="#fbbf24" />
              <Star size={16} fill="#fbbf24" color="#fbbf24" />
              <Star size={16} fill="#fbbf24" color="#fbbf24" />
              <Star size={16} fill="#fbbf24" color="#fbbf24" />
            </div>
            <span className="hero-rating-text">
              <strong>4.9 / 5.0</strong> based on 12,400+ authentic Hyderabad reviews
            </span>
          </div>
        </div>

        {/* Right Column: Appetizing Food Showcase Above the Fold */}
        <div className="hero-right-column">
          {/* Main Dish Spotlight: Signature Govind Dosa */}
          <div
            className="hero-dish-spotlight"
            onClick={() => onSelectFeaturedItem && onSelectFeaturedItem('GD-D02')}
            role="button"
            tabIndex={0}
            title="Click to customize Govind Dosa"
          >
            <div className="spotlight-img-wrap">
              <img
                src="/images/govind-dosa.jpg"
                alt="Signature Govind Dosa with Melting Amul Butter"
                className="spotlight-img"
                onError={(e) => {
                  e.currentTarget.src = '/images/hero_dosa.jpg';
                }}
              />
              <div className="spotlight-badge">
                <Sparkles size={12} /> #1 Bestseller • Pure Amul Butter
              </div>
              <div className="spotlight-price-tag">
                <IndianRupee size={15} />
                <span>115</span>
              </div>
              <div className="spotlight-live-sizzle">
                <Flame size={13} className="text-amber" /> Sizzling on Tawa
              </div>
            </div>

            <div className="spotlight-body">
              <div className="spotlight-title-row">
                <div>
                  <h3>Signature Govind Dosa</h3>
                  <span className="spotlight-subtitle">Abids Flagship Original</span>
                </div>
                <span className="spotlight-rating">
                  <Star size={13} fill="#fbbf24" color="#fbbf24" /> 4.9
                </span>
              </div>
              <p className="spotlight-desc">
                Govind ji’s legendary signature creation — crisp golden crepe drenched in molten Amul butter, roasted spiced aloo masala, and fresh coriander.
              </p>
              <div className="spotlight-footer">
                <span className="spotlight-pill">🧈 Extra Butter Available</span>
                <span className="spotlight-action-text">
                  <Flame size={14} /> Customize & Order &rarr;
                </span>
              </div>
            </div>
          </div>

          {/* Quick Photo Strip of Sizzling Specialties */}
          <div className="hero-mini-food-strip">
            <div 
              className="mini-food-card" 
              onClick={() => onSelectFeaturedItem && onSelectFeaturedItem('GD-D07')}
              role="button"
            >
              <img src="/images/cheese-dosa.jpg" alt="Cheese Burst Dosa" />
              <div className="mini-food-info">
                <strong>Cheese Burst Dosa</strong>
                <span>₹135 • Melted Amul</span>
              </div>
            </div>

            <div 
              className="mini-food-card" 
              onClick={() => onSelectFeaturedItem && onSelectFeaturedItem('GD-B01')}
              role="button"
            >
              <img src="/images/tawa-mysore-bajji.jpg" alt="Tawa Mysore Bajji" />
              <div className="mini-food-info">
                <strong>Tawa Mysore Bajji</strong>
                <span>₹85 • Hot & Crispy</span>
              </div>
            </div>

            <div 
              className="mini-food-card" 
              onClick={() => onSelectFeaturedItem && onSelectFeaturedItem('GD-I01')}
              role="button"
            >
              <img src="/images/butter-idly.jpg" alt="Steaming Butter Idli" />
              <div className="mini-food-info">
                <strong>Ghee Butter Idli</strong>
                <span>₹80 • Podi Loaded</span>
              </div>
            </div>
          </div>

          {/* Customer Trust Badges (Replaces CRM Metrics) */}
          <div className="hero-stats-grid">
            {customerBadges.map((badge, idx) => (
              <div key={idx} className={`hero-stat-card accent-${badge.accent}`}>
                <div className="stat-icon-wrap">{badge.icon}</div>
                <div className="stat-meta">
                  <span className="stat-value">{badge.value}</span>
                  <span className="stat-label">{badge.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Marquee Ticker */}
      <div className="hero-marquee">
        <div className="marquee-track">
          {[
            '100% Genuine Amul Butter',
            'Live 200°C Cast Iron Tawa',
            'Stone Ground 14-Hour Batter',
            'Signature Gunpowder Podi',
            'Unlimited Chutney & Sambar',
            'Abids Street Legend Since 1988',
            'Midnight Dosa Till 1:30 AM'
          ].map((text, i) => (
            <span key={i} className="marquee-item">
              <Flame size={14} /> {text}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
