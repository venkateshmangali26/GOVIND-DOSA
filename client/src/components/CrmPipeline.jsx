import React from 'react';
import { Users, Construction } from 'lucide-react';

export default function CrmPipeline({ leads, analytics, onAddLead, onUpdateLeadStage, onDeleteLead, onTriggerCampaign }) {
  return (
    <div className="view-container">
      <div className="view-header">
        <h1><Users size={24} /> CRM Pipeline</h1>
        <p>Lead management, deal tracking & marketing campaigns</p>
      </div>
      <div className="placeholder-banner">
        <Construction size={48} />
        <h3>Coming in Day 4 Build</h3>
        <p>CRM Kanban board will be built on Oct 3, 2026.</p>
      </div>
      {leads?.length > 0 && <div className="info-card"><strong>{leads.length}</strong> leads loaded from API.</div>}
    </div>
  );
}
