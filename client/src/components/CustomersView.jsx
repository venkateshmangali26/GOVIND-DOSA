import React, { useState, useEffect } from 'react';
import { Award, Construction, Search } from 'lucide-react';
import { apiFetch } from '../api';

export default function CustomersView() {
  const [customers, setCustomers] = useState([]);
  const [segment, setSegment] = useState('All');
  const [query, setQuery] = useState('');
  useEffect(() => {
    apiFetch(`/api/customers?segment=${segment}&q=${query}`).then(r => r.json()).then(d => d.success && setCustomers(d.customers)).catch(err => console.error('Customers load failed:', err));
  }, [segment, query]);
  return (
    <div className="view-container">
      <div className="view-header">
        <h1><Award size={24} /> Customers & Loyalty</h1>
        <p>Segment-wise customer insights & loyalty points</p>
      </div>
      <div className="filter-bar">
        <select value={segment} onChange={e => setSegment(e.target.value)}>
          <option>All</option><option>VIP</option><option>Regular</option><option>New</option>
        </select>
        <div className="search-box"><Search size={16} /><input placeholder="Search by name, phone, email..." value={query} onChange={e => setQuery(e.target.value)} /></div>
      </div>
      {customers.length === 0 ? (
        <div className="placeholder-banner"><Construction size={48} /><h3>No customers found</h3></div>
      ) : (
        <div className="customer-table-wrap">
          <table className="data-table">
            <thead><tr><th>Name</th><th>Phone</th><th>Segment</th><th>Loyalty Pts</th><th>Total Orders</th><th>Total Spent</th><th>Last Visit</th></tr></thead>
            <tbody>
              {customers.map(c => (
                <tr key={c.id}>
                  <td>{c.name}</td><td>{c.phone}</td>
                  <td><span className={`segment-badge ${c.segment.toLowerCase()}`}>{c.segment}</span></td>
                  <td>{c.loyaltyPoints}</td><td>{c.totalOrders}</td>
                  <td>₹{c.totalSpent.toLocaleString('en-IN')}</td><td>{c.lastVisit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
