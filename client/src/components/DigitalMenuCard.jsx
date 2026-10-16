import React, { useState } from 'react';
import { 
  Printer, 
  Download, 
  Sparkles, 
  Flame, 
  Star, 
  UtensilsCrossed, 
  Search, 
  SlidersHorizontal,
  ChevronRight,
  Maximize2,
  Award,
  Layers,
  Image as ImageIcon
} from 'lucide-react';

export default function DigitalMenuCard({ menuItems, onSelectItem }) {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMode, setFilterMode] = useState('all'); // all, chefs, fusion, budget, spicy
  const [viewMode, setViewMode] = useState('interactive'); // 'interactive' or 'poster'

  // Categorize items
  const dosas = menuItems.filter(i => i.categoryCode === 'DOSAS' || i.category === 'Dosas');
  const idlys = menuItems.filter(i => i.categoryCode === 'IDLY' || i.category === 'Idly');
  const wadas = menuItems.filter(i => i.categoryCode === 'WADA' || i.category === 'Wada');
  const upmas = menuItems.filter(i => i.categoryCode === 'UPMA' || i.category === 'Upma');

  const filterItem = (item) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = item.name.toLowerCase().includes(q);
      const matchDesc = (item.description || '').toLowerCase().includes(q);
      const matchTag = (item.tags || []).some(t => t.toLowerCase().includes(q));
      if (!matchName && !matchDesc && !matchTag) return false;
    }

    if (filterMode === 'chefs') {
      return item.name.includes("Govind Dosa") || (item.tags && item.tags.includes("Chef's Special"));
    }
    if (filterMode === 'fusion') {
      return item.price >= 135 || item.name.toLowerCase().includes('cheese') || item.name.toLowerCase().includes('schezwan') || item.name.toLowerCase().includes('pizza');
    }
    if (filterMode === 'budget') {
      return item.price <= 95;
    }
    if (filterMode === 'spicy') {
      return (item.tags && item.tags.some(t => t.toLowerCase().includes('spicy') || t.toLowerCase().includes('karam'))) ||
        item.name.toLowerCase().includes('karam') ||
        item.name.toLowerCase().includes('schezwan') ||
        item.name.toLowerCase().includes('65');
    }

    return true;
  };

  const handlePrint = () => {
    window.print();
  };

  const renderSection = (title, icon, items, subtitle) => {
    const filtered = items.filter(filterItem);
    if (filtered.length === 0) return null;

    return (
      <div className="menu-card-section" key={title}>
        <div className="card-section-header">
          <div className="section-title-wrap">
            <span className="section-icon">{icon}</span>
            <div>
              <h3 className="section-title">{title}</h3>
              {subtitle && <span className="section-subtitle">{subtitle}</span>}
            </div>
          </div>
          <span className="section-item-count">{filtered.length} Varieties</span>
        </div>

        <div className="menu-card-items-grid">
          {filtered.map(item => {
            const isSpicy = item.tags?.some(t => t.toLowerCase().includes('spicy') || t.toLowerCase().includes('karam')) || 
                            item.name.toLowerCase().includes('karam') || 
                            item.name.toLowerCase().includes('65') || 
                            item.name.toLowerCase().includes('schezwan');
            const isChefs = item.tags?.includes("Chef's Special") || item.name.includes("Govind Dosa");
            const isBestseller = item.isBestseller;

            return (
              <div 
                key={item.id} 
                className={`menu-card-row-item ${isChefs ? 'card-item-featured' : ''}`}
                onClick={() => onSelectItem && onSelectItem(item)}
                role="button"
                tabIndex={0}
              >
                {item.image && (
                  <div className="card-row-thumb-wrap">
                    <img src={item.image} alt={item.name} className="card-row-thumb" />
                    {isChefs && <div className="card-thumb-crown">👑</div>}
                  </div>
                )}
                
                <div className="card-row-content">
                  <div className="card-row-header-line">
                    <div className="card-row-name-wrap">
                      <span className="card-veg-symbol">🟢</span>
                      <h4 className="card-item-name">{item.name}</h4>
                      {isChefs && <span className="card-mini-tag chef-tag">★ Chef's Special</span>}
                      {isSpicy && <span className="card-mini-tag spicy-tag">🌶️ Spicy</span>}
                      {isBestseller && !isChefs && <span className="card-mini-tag best-tag">🔥 Popular</span>}
                    </div>

                    <div className="card-dot-leader"></div>

                    <div className="card-item-price">
                      <span className="currency-symbol">₹</span>
                      <span className="price-num">{item.price}</span>
                    </div>
                  </div>

                  {item.description && (
                    <p className="card-item-desc">{item.description}</p>
                  )}

                  <div className="card-row-hover-action">
                    <span>Click to customize butter & spice →</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="digital-menu-card-page">
      {/* Top Utility Ribbon */}
      <div className="menu-card-toolbar no-print">
        <div className="toolbar-left">
          <div className="toolbar-title-wrap">
            <span className="toolbar-badge"><Award size={14} /> Official 2026 Menu</span>
            <h2>Digital Restaurant Menu Card</h2>
          </div>
          <span className="toolbar-caption">Handcrafted Street Delights with Pure Amul Butter • Abids, Hyderabad</span>
        </div>

        <div className="toolbar-actions">
          {/* Switch interactive vs poster view */}
          <div className="mode-segmented-control">
            <button 
              className={`segmented-btn ${viewMode === 'interactive' ? 'active' : ''}`}
              onClick={() => setViewMode('interactive')}
            >
              <UtensilsCrossed size={14} />
              <span>Interactive Card</span>
            </button>
            <button 
              className={`segmented-btn ${viewMode === 'poster' ? 'active' : ''}`}
              onClick={() => setViewMode('poster')}
            >
              <ImageIcon size={14} />
              <span>Royal Poster Card</span>
            </button>
          </div>

          <button className="card-action-btn btn-print" onClick={handlePrint} title="Print or save as PDF">
            <Printer size={16} />
            <span>Print / PDF</span>
          </button>
        </div>
      </div>

      {viewMode === 'poster' ? (
        <div className="poster-view-container">
          <div className="poster-card-frame">
            <div className="poster-banner-info no-print">
              <Sparkles size={16} className="text-amber-400" />
              <span>Royal Laminated Board Style — Suitable for Tabletop QR Displays & Dining Frames</span>
              <a 
                href="/images/digital-menu-card-graphic.jpg" 
                download="Govind-Dosa-Official-Menu-Card.jpg"
                className="poster-download-link"
              >
                <Download size={14} /> Download Poster
              </a>
            </div>
            <img 
              src="/images/digital-menu-card-graphic.jpg" 
              alt="Govind Dosa Official Royal Digital Menu Card" 
              className="royal-poster-image"
            />
          </div>
        </div>
      ) : (
        <>
          {/* Filter Bar */}
          <div className="menu-card-filters-bar no-print">
            <div className="filter-search-box">
              <Search size={16} />
              <input 
                type="text" 
                placeholder="Search dish (e.g. Cheese Burst, Govind Dosa, Spot Idly, Wada)..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button className="clear-search-btn" onClick={() => setSearchQuery('')}>×</button>
              )}
            </div>

            <div className="filter-chips-list">
              <button 
                className={`card-filter-chip ${filterMode === 'all' ? 'active' : ''}`}
                onClick={() => setFilterMode('all')}
              >
                All Items ({menuItems.length})
              </button>
              <button 
                className={`card-filter-chip ${filterMode === 'chefs' ? 'active' : ''}`}
                onClick={() => setFilterMode('chefs')}
              >
                ★ Chef's Special
              </button>
              <button 
                className={`card-filter-chip ${filterMode === 'fusion' ? 'active' : ''}`}
                onClick={() => setFilterMode('fusion')}
              >
                🧀 Cheese & Fusion (₹135-₹165)
              </button>
              <button 
                className={`card-filter-chip ${filterMode === 'budget' ? 'active' : ''}`}
                onClick={() => setFilterMode('budget')}
              >
                ⚡ Classics (₹65-₹95)
              </button>
              <button 
                className={`card-filter-chip ${filterMode === 'spicy' ? 'active' : ''}`}
                onClick={() => setFilterMode('spicy')}
              >
                🌶️ Spicy Delights
              </button>
            </div>
          </div>

          {/* The Physical / Printable Card Canvas */}
          <div className="printable-menu-card-wrapper" id="printable-menu-card">
            {/* Ornamental Frame Border */}
            <div className="card-ornament-corner top-left"></div>
            <div className="card-ornament-corner top-right"></div>
            <div className="card-ornament-corner bottom-left"></div>
            <div className="card-ornament-corner bottom-right"></div>

            {/* Menu Card Header */}
            <header className="card-vintage-header">
              <div className="card-vintage-crest">
                <span className="crest-crown">👑</span>
                <span className="crest-year">ESTD. 1988 • ABIDS HYDERABAD</span>
              </div>
              <h1 className="card-brand-title">GOVIND DOSA</h1>
              <p className="card-brand-subtitle">
                LEGENDARY AMUL BUTTER SOUTH INDIAN STREET DELICACIES
              </p>
              <div className="card-divider-flourish">
                <span className="flourish-line"></span>
                <span className="flourish-symbol">✦ ✦ ✦</span>
                <span className="flourish-line"></span>
              </div>
              <div className="card-highlights-row">
                <span>✓ Pure Amul Butter</span>
                <span>•</span>
                <span>✓ Live Hot Tawa Preparation</span>
                <span>•</span>
                <span>✓ Fresh Daily Fermented Batter</span>
                <span>•</span>
                <span>✓ Authentic Hyderabad Karam</span>
              </div>
            </header>

            {/* Menu Layout: 2 Columns */}
            <div className="menu-card-columns-grid">
              {/* Column 1: Dosas */}
              <div className="card-column">
                {renderSection('DOSAS', '🥞', dosas, 'Thin, golden & crackling crepes')}
              </div>

              {/* Column 2: Idly, Wada, Upma */}
              <div className="card-column">
                {renderSection('IDLY', '🥣', idlys, 'Steamed soft or tawa-crisped cakes')}
                {renderSection('WADA', '🍩', wadas, 'Golden crisp medu lentil donuts')}
                {renderSection('UPMA', '🍚', upmas, 'Savory roasted semolina creations')}
              </div>
            </div>

            {/* Menu Card Footer */}
            <footer className="card-vintage-footer">
              <div className="footer-legend">
                <div className="legend-item"><span className="card-veg-symbol">🟢</span> 100% Pure Vegetarian</div>
                <div className="legend-item"><span className="card-mini-tag chef-tag">★ Chef's Special</span> Govind Ji's Signature</div>
                <div className="legend-item"><span className="card-mini-tag spicy-tag">🌶️ Spicy</span> Hyderabad Karam Masala</div>
              </div>
              <div className="footer-closing-note">
                <p>All items served fresh with our signature Roasted Peanut-Coconut Chutney & Piping Hot Hyderabad Sambar.</p>
                <span className="footer-contact">Tawa Timings: 6:00 AM – 1:30 AM Daily • Location: Taj Mahal Hotel Lane, Abids, Hyderabad</span>
              </div>
            </footer>
          </div>
        </>
      )}
    </div>
  );
}
