import React from 'react';
import { Award, Construction } from 'lucide-react';

export default function HeritageModal({ isOpen, onClose, onExploreMenu }) {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content heritage-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2><Award size={20} /> Our Heritage Story</h2>
          <button className="modal-close-btn" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          <div className="placeholder-banner">
            <Construction size={48} />
            <h3>Coming in Day 2 Build</h3>
            <p>Full heritage story will be enriched on Oct 1, 2026.</p>
          </div>
          <div className="heritage-preview">
            <h3>Since 1988 — A Hyderabad Legend</h3>
            <p>Govind ji started with a single tawa on Abids street corner in 1988, serving fresh Amul butter dosas to morning office-goers.</p>
            <p>Today, three decades later, the same recipe, the same Amul butter, and the same smile welcomes every customer.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
