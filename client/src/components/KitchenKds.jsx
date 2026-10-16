import React from 'react';
import { Flame, Construction } from 'lucide-react';

export default function KitchenKds({ orders, onUpdateStatus, onRefresh }) {
  return (
    <div className="view-container">
      <div className="view-header">
        <h1><Flame size={24} /> Kitchen Display System</h1>
        <p>Govind ji's tawa queue — live order board</p>
      </div>
      <div className="placeholder-banner">
        <Construction size={48} />
        <h3>Coming in Day 3 Build</h3>
        <p>KDS Kanban board will be built on Oct 2, 2026.</p>
      </div>
      {orders?.length > 0 && <div className="info-card"><strong>{orders.length}</strong> orders in kitchen pipeline.</div>}
    </div>
  );
}
