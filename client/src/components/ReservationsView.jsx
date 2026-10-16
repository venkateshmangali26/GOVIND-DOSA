import React, { useState, useEffect } from 'react';
import { Clock, Construction, Calendar } from 'lucide-react';
import { apiFetch } from '../api';

export default function ReservationsView() {
  const [reservations, setReservations] = useState([]);
  useEffect(() => {
    apiFetch('/api/reservations').then(r => r.json()).then(d => d.success && setReservations(d.reservations)).catch(err => console.error('Reservations load failed:', err));
  }, []);
  return (
    <div className="view-container">
      <div className="view-header">
        <h1><Calendar size={24} /> Table Reservations</h1>
        <p>Upcoming bookings & table assignments</p>
      </div>
      {reservations.length === 0 ? (
        <div className="placeholder-banner"><Construction size={48} /><h3>No reservations found</h3></div>
      ) : (
        <div className="reservations-grid">
          {reservations.map(r => (
            <div key={r.id} className={`reservation-card status-${r.status}`}>
              <div className="res-header"><h3>{r.name}</h3><span className={`res-status ${r.status}`}>{r.status}</span></div>
              <div className="res-meta">
                <p><Calendar size={14} /> {r.date}</p>
                <p><Clock size={14} /> {r.timeSlot}</p>
                <p>Party of {r.partySize}</p>
                <p>Table: {r.tableNo || 'TBD'}</p>
              </div>
              {r.notes && <p className="res-notes"><em>Note:</em> {r.notes}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
