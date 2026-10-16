import React, { useState } from 'react';
import { 
  Users, 
  Flame, 
  Sparkles, 
  Award, 
  Clock, 
  Activity, 
  ArrowLeft, 
  ShieldCheck, 
  TrendingUp, 
  IndianRupee, 
  CheckCircle2,
  Calendar
} from 'lucide-react';
import CrmPipeline from './CrmPipeline';
import KitchenKds from './KitchenKds';
import DashboardView from './DashboardView';
import CustomersView from './CustomersView';
import ReservationsView from './ReservationsView';

export default function AdminPortal({
  allOrders,
  crmLeads,
  crmAnalytics,
  onUpdateOrderStatus,
  onRefreshOrders,
  onAddLead,
  onUpdateLeadStage,
  onDeleteLead,
  onTriggerCampaign,
  onExitAdmin
}) {
  const [adminTab, setAdminTab] = useState('kds');

  return (
    <div className="admin-portal-wrapper">
      {/* Admin Top Banner */}
      <div className="admin-top-banner">
        <div className="admin-banner-left">
          <button className="admin-exit-btn" onClick={onExitAdmin}>
            <ArrowLeft size={16} /> Exit to Customer Website
          </button>
          <div className="admin-title-badge">
            <ShieldCheck size={16} className="text-amber" />
            <span>Govind Dosa • Staff Operations & CRM Portal</span>
          </div>
        </div>

        {/* Internal KPI quick bar */}
        <div className="admin-kpi-pills">
          <div className="admin-kpi-pill">
            <span className="kpi-label">Pipeline Value:</span>
            <span className="kpi-val text-amber">₹{(crmAnalytics?.kpis?.totalPipelineValue || 331500).toLocaleString('en-IN')}</span>
          </div>
          <div className="admin-kpi-pill">
            <span className="kpi-label">Active Leads:</span>
            <span className="kpi-val">{crmAnalytics?.kpis?.activeLeads || 4}</span>
          </div>
          <div className="admin-kpi-pill">
            <span className="kpi-label">Conv. Rate:</span>
            <span className="kpi-val">{crmAnalytics?.kpis?.conversionRate || 20}%</span>
          </div>
          <a href="/api/health" target="_blank" rel="noreferrer" className="admin-health-badge">
            <Activity size={12} className="pulse-dot" /> API Health Online
          </a>
        </div>
      </div>

      {/* Admin Navigation Subtabs */}
      <div className="admin-subnav-bar">
        <div className="admin-nav-tabs">
          <button 
            className={`admin-nav-btn ${adminTab === 'kds' ? 'active' : ''}`}
            onClick={() => setAdminTab('kds')}
          >
            <Flame size={16} /> Kitchen KDS Display ({allOrders.length})
          </button>
          <button 
            className={`admin-nav-btn ${adminTab === 'crm' ? 'active' : ''}`}
            onClick={() => setAdminTab('crm')}
          >
            <Users size={16} /> CRM & Catering Pipeline ({crmLeads.length})
          </button>
          <button 
            className={`admin-nav-btn ${adminTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setAdminTab('dashboard')}
          >
            <Sparkles size={16} /> Sales & KPI Analytics
          </button>
          <button 
            className={`admin-nav-btn ${adminTab === 'customers' ? 'active' : ''}`}
            onClick={() => setAdminTab('customers')}
          >
            <Award size={16} /> VIP Customers & Loyalty
          </button>
          <button 
            className={`admin-nav-btn ${adminTab === 'reservations' ? 'active' : ''}`}
            onClick={() => setAdminTab('reservations')}
          >
            <Calendar size={16} /> Table Reservations
          </button>
        </div>
      </div>

      {/* Active Admin View */}
      <div className="admin-content-area">
        {adminTab === 'kds' && (
          <KitchenKds orders={allOrders} onUpdateStatus={onUpdateOrderStatus} onRefresh={onRefreshOrders} />
        )}
        {adminTab === 'crm' && (
          <CrmPipeline 
            leads={crmLeads} 
            analytics={crmAnalytics} 
            onAddLead={onAddLead} 
            onUpdateLeadStage={onUpdateLeadStage} 
            onDeleteLead={onDeleteLead} 
            onTriggerCampaign={onTriggerCampaign} 
          />
        )}
        {adminTab === 'dashboard' && <DashboardView />}
        {adminTab === 'customers' && <CustomersView />}
        {adminTab === 'reservations' && <ReservationsView />}
      </div>
    </div>
  );
}
