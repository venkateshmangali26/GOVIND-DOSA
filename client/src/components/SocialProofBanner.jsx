import React from 'react';
import { Star, Users, Award, ShieldCheck, Sparkles } from 'lucide-react';

export default function SocialProofBanner() {
  const proofs = [
    {
      icon: <Star size={20} className="proof-icon text-amber" fill="#f59e0b" />,
      title: '4.9 Rating',
      subtitle: '12,400+ Verified Reviews'
    },
    {
      icon: <Users size={20} className="proof-icon text-orange" />,
      title: '12,400+ Customers',
      subtitle: 'Loved Across Hyderabad'
    },
    {
      icon: <Award size={20} className="proof-icon text-gold" />,
      title: 'Serving Since 1988',
      subtitle: '38+ Years Culinary Legacy'
    },
    {
      icon: <ShieldCheck size={20} className="proof-icon text-emerald" />,
      title: '100% Pure Amul Butter',
      subtitle: 'No Palm Oil • Pure Ghee'
    }
  ];

  return (
    <section className="social-proof-banner">
      <div className="proof-container">
        {proofs.map((item, idx) => (
          <div key={idx} className="proof-item">
            <div className="proof-icon-box">{item.icon}</div>
            <div className="proof-text">
              <span className="proof-title">{item.title}</span>
              <span className="proof-subtitle">{item.subtitle}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
