import React from 'react';
import { Clock, Construction } from 'lucide-react';

export default function OrderTracker({ activeOrder, allOrders, onRefreshOrders, onUpdateOrderStatus }) {
  return (
    <div className="view-container">
      <div className="view-header">
        <h1><Clock size={24} /> Order Tracker</h1>
        <p>Live order status & timeline tracking</p>
      </div>
      <div className="placeholder-banner">
        <Construction size={48} />
        <h3>Coming in Day 3 Build</h3>
        <p>Order tracker with live status timeline will be built on Oct 2, 2026.</p>
      </div>
      {activeOrder && <div className="info-card"><strong>Active Order:</strong> {activeOrder.id} — {activeOrder.customerName} ({activeOrder.status})</div>}
    </div>
  );
}
