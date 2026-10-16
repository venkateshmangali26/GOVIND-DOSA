import React from 'react';
import { Star, CheckCircle, ThumbsUp, MessageSquare, Award } from 'lucide-react';

export default function CustomerReviewsSection() {
  const reviews = [
    {
      name: 'Rohit K.',
      title: 'Food Blogger & Regular since 2012',
      location: 'Hyderabad',
      rating: 5,
      review: 'The best butter dosa in Hyderabad. The crispness combined with the melting Amul butter and that spicy peanut chutney is completely unbeatable. Worth standing in the queue every single Sunday!',
      favoriteItem: 'Govind Dosa (Butter Bath)'
    },
    {
      name: 'Sandeep R.',
      title: 'Tech Lead • Gachibowli',
      location: 'Hyderabad',
      rating: 5,
      review: 'Been eating here since childhood with my grandfather at Abids. The aroma of butter hitting the cast iron tawa is unmistakable. The taste and quality have stayed 100% consistent across 30 years.',
      favoriteItem: 'Tawa Mysore Bajji & Masala Dosa'
    },
    {
      name: 'Priya M.',
      title: 'Medical Resident • Osmania',
      location: 'Hyderabad',
      rating: 5,
      review: 'Worth every rupee and every minute in line. The Cheese Burst Schezwan Dosa is pure comfort food after a grueling 12-hour hospital shift. Nothing compares in all of South India.',
      favoriteItem: 'Cheese Burst Schezwan Dosa'
    },
    {
      name: 'Venkat Reddy',
      title: 'Frequent Patron',
      location: 'Banjara Hills',
      rating: 5,
      review: 'Govind Dosa is not just breakfast, it is an emotion for every true Hyderabadi. The spot idli and tawa wada soaked in ghee and podi are legendary. Absolute 10/10.',
      favoriteItem: 'Spot Idli & Filter Coffee'
    }
  ];

  return (
    <section className="customer-reviews-section" id="reviews-section">
      <div className="reviews-header">
        <span className="section-eyebrow">
          <Award size={14} /> Real Foodie Experiences
        </span>
        <h2 className="section-heading">Loved By 12,400+ Hyderabadis</h2>
        <p className="section-subheading">
          Read what food critics, midnight road-trippers, and three generations of loyal patrons say about our butter dosas.
        </p>

        <div className="aggregate-rating-pill">
          <div className="aggregate-stars">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} size={18} fill="#f59e0b" color="#f59e0b" />
            ))}
          </div>
          <span className="aggregate-score">4.9 / 5.0</span>
          <span className="aggregate-count">• 12,400+ Verified Google & Zomato Reviews</span>
        </div>
      </div>

      <div className="reviews-grid">
        {reviews.map((rev, idx) => (
          <div key={idx} className="review-card">
            <div className="review-top-row">
              <div className="review-stars">
                {Array.from({ length: rev.rating }).map((_, i) => (
                  <Star key={i} size={15} fill="#fbbf24" color="#fbbf24" />
                ))}
              </div>
              <span className="review-verified-badge">
                <CheckCircle size={13} /> Verified Eater
              </span>
            </div>

            <p className="review-quote">“{rev.review}”</p>

            <div className="review-author-row">
              <div className="author-avatar">{rev.name.charAt(0)}</div>
              <div>
                <h4 className="author-name">{rev.name}</h4>
                <p className="author-title">{rev.title}</p>
              </div>
            </div>

            <div className="review-fav-tag">
              <span>Favorite:</span> <strong>{rev.favoriteItem}</strong>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
