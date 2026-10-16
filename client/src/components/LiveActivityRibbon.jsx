import React, { useState, useEffect } from 'react';
import { Flame, Clock, Sparkles, Activity } from 'lucide-react';

export default function LiveActivityRibbon() {
  const [preparedCount, setPreparedCount] = useState(23);
  const [soldHour, setSoldHour] = useState(17);
  const [waitTime, setWaitTime] = useState(8);

  // Subtle real-time simulation so the ticker feels dynamically alive
  useEffect(() => {
    const timer = setInterval(() => {
      setPreparedCount(prev => prev + 1);
    }, 45000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="live-activity-ribbon">
      <div className="live-activity-inner">
        <div className="live-pulse-badge">
          <span className="live-dot" />
          <Activity size={14} />
          <span>LIVE TAWA PULSE</span>
        </div>

        <div className="activity-tickers">
          <div className="ticker-item">
            <Flame size={16} className="ticker-icon flame-pulse" />
            <span><strong>{preparedCount} orders</strong> prepared in last 30 mins</span>
          </div>

          <div className="ticker-divider">•</div>

          <div className="ticker-item">
            <Sparkles size={16} className="ticker-icon butter-shine" />
            <span><strong>{soldHour} Govind Dosas</strong> sold this hour</span>
          </div>

          <div className="ticker-divider">•</div>

          <div className="ticker-item">
            <Clock size={16} className="ticker-icon clock-tick" />
            <span>Cast-iron queue: <strong>~{waitTime} mins wait time</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
}
