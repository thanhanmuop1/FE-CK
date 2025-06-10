import React, { useState } from 'react';
import moment from 'moment';
import './AdmissionList.less';

const tabs = [
  { key: 'all', label: 'Tất cả' },
  { key: 'pending', label: 'Chờ duyệt' },
  { key: 'approved', label: 'Đã duyệt' },
  { key: 'rejected', label: 'Từ chối' },
];

const statusMap = {
  pending: 'cho_duyet',
  approved: 'da_duyet',
  rejected: 'tu_choi',
};

const statusLabelMap = {
  cho_duyet: { color: '#eab308', label: 'Chờ duyệt' },
  da_duyet: { color: '#c00', label: 'Đã duyệt' },
  tu_choi: { color: '#888', label: 'Từ chối' },
};

const AdmissionList = ({ admissions, universityMajors, subjectCombinations }) => {
  const [tab, setTab] = useState('all');

  // Map id sang tên ngành
  const getMajorName = (universityMajorId) => {
    if (!universityMajorId) return '---';
    if (typeof universityMajorId === 'object') {
      return universityMajorId.name || '---';
    }
    const major = universityMajors.find(m => m._id === universityMajorId);
    return major ? major.name : '---';
  };

  // Map id sang tên tổ hợp môn
  const getCombinationName = (subjectCombinationId) => {
    if (!subjectCombinationId) return '---';
    if (typeof subjectCombinationId === 'object') {
      return subjectCombinationId.code || '---';
    }
    const comb = subjectCombinations.find(c => c._id === subjectCombinationId);
    return comb ? comb.code : '---';
  };

  

  const filtered = tab === 'all'
    ? admissions
    : admissions.filter(item => item.status === statusMap[tab]);

  return (
    <div className="admission-list-section">
      <div className="admission-list-title">Hồ sơ xét tuyển</div>
      <div className="admission-tabs">
        {tabs.map(t => (
          <div
            key={t.key}
            className={`tab${tab === t.key ? ' active' : ''}`}
            onClick={() => setTab(t.key)}
          >
            {t.label}
          </div>
        ))}
      </div>
        <div>
          {filtered.length === 0 && <div style={{ color: '#888', textAlign: 'center', marginTop: 60 }}>Không có hồ sơ nào.</div>}
          {filtered.map((item) => (
            console.log('Admission item render:', item),
            <div key={item.id || item._id} style={{
              background: '#fff',
              borderRadius: 8,
              padding: 20,
              marginBottom: 18,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              border: '1px solid #eee'
            }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 4 }}>{item.university}</div>
                <div style={{ color: '#555', marginBottom: 2 }}>Ngành: <b>{getMajorName(item.universityMajorId)}</b></div>
                <div style={{ color: '#555', marginBottom: 2 }}>Tổ hợp xét tuyển: <b>{getCombinationName(item.subjectCombinationId)}</b></div>
                <div style={{ color: '#888', fontSize: 14 }}>
                  Ngày nộp: {item.created_at ? moment(item.created_at).format('DD/MM/YYYY') : '---'}
                </div>
                <div style={{ color: '#888', fontSize: 14 }}>
                  Ngày cập nhật: {item.updated_at ? moment(item.updated_at).format('DD/MM/YYYY') : '---'}
                </div>
              </div>
              <div style={{ textAlign: 'right', minWidth: 180 }}>
                <span style={{
                  background: statusLabelMap[item.status]?.color || '#ccc',
                  color: '#fff',
                  borderRadius: 6,
                  padding: '4px 14px',
                  marginRight: 8,
                  fontWeight: 600,
                  fontSize: 15
                }}>
                  {statusLabelMap[item.status]?.label || item.status}
                </span>
                <button
                  style={{
                    background: '#fff',
                    color: '#c00',
                    border: '1.5px solid #c00',
                    borderRadius: 6,
                    padding: '6px 16px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    marginLeft: 8,
                    fontSize: 15
                  }}
                  onClick={() => {
                    window.location.href = `/user/applications/${item._id || item.id}`;
                  }}
                >
                  Xem chi tiết
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
  );
};

export default AdmissionList;