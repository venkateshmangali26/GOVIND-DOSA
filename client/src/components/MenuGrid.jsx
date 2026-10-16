import React, { useState, useMemo } from 'react';
import { 
  Flame, 
  Star, 
  Search, 
  Filter, 
  IndianRupee, 
  Plus, 
  Sparkles,
  Info
} from 'lucide-react';

const FILTER_TABS = [
  { id: 'all', label: 'All Items', icon: '🍽️' },
  { id: 'bestsellers', label: '🔥 Best Sellers', icon: '⭐' },
  { id: 'butter', label: '🧈 Butter Loaded', icon: '🧈' },
  { id: 'cheese', label: '🧀 Cheese Specials', icon: '🧀' },
  { id: 'spicy', label: '🌶️ Spicy & Karam', icon: '🌶️' },
  { id: 'healthy', label: '🥗 Healthy & Light', icon: '🥗' },
  { id: 'dosas', label: '🥞 Dosas', icon: '🥞' },
  { id: 'idly', label: '🥟 Idly', icon: '🥟' },
  { id: 'wada', label: '🍩 Wada', icon: '🍩' },
  { id: 'bajji', label: '🥢 Mysore Bajji', icon: '🥢' },
  { id: 'upma', label: '🍲 Upma', icon: '🍲' }
];

export default function MenuGrid({ menuItems, onSelectItem }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = useMemo(() => {
    let items = [...menuItems];

    // Filter by Tab
    if (activeFilter === 'bestsellers') {
      items = items.filter(i => i.isBestseller);
    } else if (activeFilter === 'butter') {
      items = items.filter(i => 
        (i.name || '').toLowerCase().includes('butter') ||
        (i.description || '').toLowerCase().includes('butter') ||
        (i.tags && i.tags.some(t => t.toLowerCase().includes('butter')))
      );
    } else if (activeFilter === 'cheese') {
      items = items.filter(i => 
        (i.name || '').toLowerCase().includes('cheese') ||
        (i.description || '').toLowerCase().includes('cheese') ||
        (i.tags && i.tags.some(t => t.toLowerCase().includes('cheese')))
      );
    } else if (activeFilter === 'spicy') {
      items = items.filter(i => 
        (i.name || '').toLowerCase().includes('spicy') ||
        (i.name || '').toLowerCase().includes('karam') ||
        (i.name || '').toLowerCase().includes('schezwan') ||
        (i.description || '').toLowerCase().includes('spicy') ||
        (i.tags && i.tags.some(t => t.toLowerCase().includes('spicy') || t.toLowerCase().includes('karam') || t.toLowerCase().includes('schezwan')))
      );
    } else if (activeFilter === 'healthy') {
      items = items.filter(i => 
        (i.name || '').toLowerCase().includes('diet') ||
        (i.name || '').toLowerCase().includes('plain idly') ||
        (i.description || '').toLowerCase().includes('zero oil') ||
        (i.description || '').toLowerCase().includes('healthy') ||
        (i.tags && i.tags.some(t => t.toLowerCase().includes('healthy') || t.toLowerCase().includes('diet')))
      );
    } else if (activeFilter === 'dosas') {
      items = items.filter(i => i.category === 'Dosas');
    } else if (activeFilter === 'idly') {
      items = items.filter(i => i.category === 'Idly');
    } else if (activeFilter === 'wada') {
      items = items.filter(i => i.category === 'Wada');
    } else if (activeFilter === 'bajji') {
      items = items.filter(i => i.category === 'Mysore Bajji');
    } else if (activeFilter === 'upma') {
      items = items.filter(i => i.category === 'Upma');
    }

    // Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter(i => 
        (i.name || '').toLowerCase().includes(q) || 
        (i.description || '').toLowerCase().includes(q) || 
        (i.tags && i.tags.some(t => t.toLowerCase().includes(q)))
      );
    }

    return items;
  }, [menuItems, activeFilter, searchQuery]);

  return (
    <section className="menu-section" id="menu-section">
      <div className="menu-section-header">
        <div className="menu-title-block">
          <span className="menu-eyebrow">
            <Flame size={14} /> The Live Tawa Menu
          </span>
          <h2>Hand-Poured Sizzling Tawa Delicacies</h2>
          <p className="menu-intro">
            Every dosa is made to order on a seasoned cast-iron tawa with genuine Amul butter, accompanied by hot sambar and freshly ground coconut & peanut chutneys.
          </p>
        </div>

        {/* Search Box */}
        <div className="menu-controls">
          <div className="search-box">
            <Search size={16} />
            <input 
              type="text" 
              placeholder="Search dosa, idli, schezwan, cheese..." 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)} 
              aria-label="Search menu"
            />
            {searchQuery && (
              <button className="clear-search-btn" onClick={() => setSearchQuery('')}>×</button>
            )}
          </div>
        </div>
      </div>

      {/* Improved Multi-Dimensional Filters */}
      <div className="category-strip-wrapper">
        <div className="category-strip">
          {FILTER_TABS.map(tab => (
            <button
              key={tab.id}
              className={`category-chip ${activeFilter === tab.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(tab.id)}
            >
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {filteredItems.length === 0 ? (
        <div className="menu-empty">
          <Filter size={40} />
          <h3>No delicacies match your filter</h3>
          <p>Try switching to "All Items" or searching for a different dish.</p>
          <button className="reset-filter-btn" onClick={() => { setActiveFilter('all'); setSearchQuery(''); }}>
            Show All Delicacies
          </button>
        </div>
      ) : (
        /* Reduced Density High-Conversion Menu Grid */
        <div className="menu-grid">
          {filteredItems.map(item => (
            <article 
              key={item.id} 
              className={`menu-card-streamlined ${item.isBestseller ? 'bestseller' : ''}`}
              onClick={() => onSelectItem(item)}
              role="button"
              tabIndex={0}
              title={`Click to customize ${item.name}`}
            >
              {/* Dish Photo */}
              <div className="card-image-wrap">
                <img
                  src={item.image}
                  alt={item.name}
                  className="card-img"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = '/images/govind-dosa.jpg';
                  }}
                />
                {item.isBestseller && (
                  <span className="card-bestseller-tag">
                    <Star size={11} fill="#fff" /> Bestseller
                  </span>
                )}
                <span className="card-veg-indicator" title="100% Pure Vegetarian">
                  <span className="veg-circle" />
                </span>
              </div>

              {/* Clean Card Body: Photo, Name, Price, Rating, Add to Cart */}
              <div className="card-body-streamlined">
                <div className="card-header-row">
                  <h3 className="card-dish-name">{item.name}</h3>
                  <div className="card-rating-badge">
                    <Star size={12} fill="#fbbf24" color="#fbbf24" />
                    <span>{item.rating || '4.8'}</span>
                  </div>
                </div>

                <div className="card-cta-row">
                  <div className="card-price-display">
                    <IndianRupee size={15} />
                    <span className="price-num">{item.price}</span>
                  </div>

                  <button 
                    className="add-to-cart-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectItem(item);
                    }}
                    aria-label={`Add ${item.name} to cart`}
                  >
                    <Plus size={15} />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
