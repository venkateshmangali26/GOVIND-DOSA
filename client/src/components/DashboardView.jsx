import React, { useState, useEffect } from 'react';
import { Sparkles, IndianRupee, TrendingUp, ShoppingBag, Users, Construction } from 'lucide-react';
import { apiFetch } from '../api';

export default function DashboardView() {
  const [data, setData] = useState(null);
  useEffect(() => {
    apiFetch('/api/dashboard').then(r => r.json()).then(d => setData(d)).catch(err => console.error('Dashboard load failed:', err));
  }, []);
  return (
    <div className="view-container">
      <div className="view-header">
        <h1><Sparkles size={24} /> Analytics Dashboard</h1>
        <p>Live KPIs, top items, and customer segments</p>
      </div>
      {data ? (
        <div className="dashboard-grid">
          <div className="kpi-card"><IndianRupee size={20} /><div><span className="kpi-value">₹{data.kpis.totalRevenue.toLocaleString('en-IN')}</span><span className="kpi-label">Total Revenue</span></div></div>
          <div className="kpi-card"><ShoppingBag size={20} /><div><span className="kpi-value">{data.kpis.totalOrders}</span><span className="kpi-label">Total Orders</span></div></div>
          <div className="kpi-card"><Users size={20} /><div><span className="kpi-value">{data.kpis.activeCustomers}</span><span className="kpi-label">Active Customers</span></div></div>
          <div className="kpi-card"><TrendingUp size={20} /><div><span className="kpi-value">₹{data.kpis.avgOrderValue}</span><span className="kpi-label">Avg Order Value</span></div></div>
        </div>
      ) : (
        <div className="placeholder-banner"><Construction size={48} /><h3>Loading dashboard...</h3></div>
      )}
    </div>
  );
}
