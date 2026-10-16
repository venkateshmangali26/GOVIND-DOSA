import React from 'react';
import { Flame, Sparkles, ShieldCheck, Heart, Award } from 'lucide-react';

export default function WhyGovindSection({ onOrderClick }) {
  const pillars = [
    {
      icon: <Flame size={24} className="pillar-icon" />,
      title: 'Live 200°C Cast-Iron Tawa',
      desc: 'Seasoned over three decades. Cooked in front of your eyes at high heat for that unmatched blistered golden crunch.'
    },
    {
      icon: <Sparkles size={24} className="pillar-icon" />,
      title: 'Generous Pure Amul Butter',
      desc: 'No palm oil, no margarine, zero compromises. Each dosa gets drenched in genuine yellow Amul butter fresh from the slab.'
    },
    {
      icon: <Award size={24} className="pillar-icon" />,
      title: '14-Hour Naturally Fermented Batter',
      desc: 'Stone-ground urad dal and aged rice, naturally fermented without artificial leaveners. Crispy outside, pillowy soft inside.'
    },
    {
      icon: <ShieldCheck size={24} className="pillar-icon" />,
      title: 'Secret Gunpowder Podi & Chutney',
      desc: 'Govind ji’s handcrafted spice blend with roasted lentils, Guntur chillies, and unlimited thick garlic-peanut chutney.'
    }
  ];

  return (
    <section className="why-govind-section">
      <div className="why-govind-container">
        <div className="why-text-col">
          <span className="section-eyebrow">
            <Heart size={14} /> The Heritage & The Craft
          </span>
          <h2 className="why-title">
            Why Hyderabad Queues Up For <span className="title-accent">Govind Dosa</span>
          </h2>
          <p className="why-lead">
            What started in 1988 as a humble cart in Abids near Taj Mahal Hotel has grown into a legendary culinary pilgrimage. It is not just breakfast — it’s an emotion passed down through three generations of Hyderabadis.
          </p>

          <div className="pillars-list">
            {pillars.map((p, idx) => (
              <div key={idx} className="pillar-item">
                <div className="pillar-icon-wrap">{p.icon}</div>
                <div>
                  <h4 className="pillar-title">{p.title}</h4>
                  <p className="pillar-desc">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="why-cta-row">
            <button className="cta-primary" onClick={onOrderClick}>
              <Flame size={18} /> Taste The Difference • Order Now
            </button>
          </div>
        </div>

        <div className="why-visual-col">
          <div className="tawa-feature-card">
            <img
              src="/images/hero_dosa.jpg"
              alt="Live Cast Iron Butter Dosa Sizzle"
              className="tawa-feature-img"
              onError={(e) => {
                e.currentTarget.src = '/images/govind-dosa.jpg';
              }}
            />
            <div className="tawa-feature-overlay">
              <span className="tawa-badge">
                <Flame size={14} /> Live Tawa Sizzle
              </span>
              <h3>6:00 AM – 1:30 AM Daily</h3>
              <p>Hot, buttery street bliss served around the clock in Abids</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
