import React from 'react';
import { FileTextOutlined, ClockCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import './StatsBox.less';

const StatsBox = ({ stats }: { stats: any }) => (
<div className="stats-container">
    <div className="stats-box">
      <FileTextOutlined className="stats-icon" />
      <div className="stats-label">Hồ sơ đã tạo</div>
      <div className="stats-value">{stats.created}</div>
    </div>
    <div className="stats-box">
      <ClockCircleOutlined className="stats-icon" />
      <div className="stats-label">Đang xét duyệt</div>
      <div className="stats-value">{stats.pending}</div>
    </div>
    <div className="stats-box">
      <CheckCircleOutlined className="stats-icon" />
      <div className="stats-label">Đã duyệt</div>
      <div className="stats-value">{stats.approved}</div>
    </div>
  </div>
);

export default StatsBox;