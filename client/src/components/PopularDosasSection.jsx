import React from 'react';
import { Flame, Star, Plus, IndianRupee, Sparkles, ArrowRight } from 'lucide-react';

export default function PopularDosasSection({ menuItems, onSelectItem, onScrollToMenu }) {
  // Select top 4 bestsellers or fallback defaults
  const popularIds = ['GD-D02', 'GD-D07', 'GD-D09', 'GD-I05'];
  let featured = menuItems.filter(item => popularIds.includes(item.id));
  
  if (featured.length < 4) {
    featured = menuItems.filter(item => item.isBestseller).slice(0, 4);
  }

  return (
    <section className="popular-dosas-section">
      <div className="section-head-row">
        <div>
          <span className="section-eyebrow">
            <Sparkles size={14} /> Hyderabad's Favorites
          </span>
          <h2 className="section-heading">Most Popular Butter Dosas</h2>
          <p className="section-subheading">
            The legendary items ordered by thousands every morning and late night at Abids.
          </p>
        </div>
        <button className="view-all-link" onClick={onScrollToMenu}>
          View Full Menu ({menuItems.length} items) <ArrowRight size={16} />
        </button>
      </div>

      <div className="popular-cards-grid">
        {featured.map(item => (
          <div key={item.id} className="popular-card" onClick={() => onSelectItem(item)}>
            <div className="popular-card-media">
              <img
                src={item.image}
                alt={item.name}
                className="popular-card-img"
                onError={(e) => {
                  e.currentTarget.src = '/images/govind-dosa.jpg';
                }}
              />
              <div className="popular-badge">
                <Star size={12} fill="#fff" /> Bestseller
              </div>
              <div className="popular-price-pill">
                <IndianRupee size={13} /> {item.price}
              </div>
            </div>

            <div className="popular-card-content">
              <div className="popular-title-row">
                <h3 className="popular-title">{item.name}</h3>
                <span className="popular-rating">
                  <Star size={13} fill="#fbbf24" /> {item.rating || '4.9'}
                </span>
              </div>
              <p className="popular-snippet">
                {item.description ? item.description.slice(0, 75) + '…' : 'Signature butter-soaked street delicacy.'}
              </p>
              <div className="popular-card-action">
                <span className="popular-tag">100% Amul Butter</span>
                <button
                  className="popular-add-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectItem(item);
                  }}
                  aria-label={`Order ${item.name}`}
                >
                  <Plus size={15} /> Order Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
