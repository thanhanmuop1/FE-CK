import React from 'react';
import { Card, List, Tag } from 'antd';
import { UniversityMajors } from '@/models/Admin/UniversityMajors';
import { University } from '@/models/Admin/University';
import { Application } from '@/services/Admin/Applications';
import { FireOutlined } from '@ant-design/icons';


interface Props {
  majors: UniversityMajors[];
  universities: University[];
  applications: Application[];
}

const HotMajors: React.FC<Props> = ({ majors, universities, applications }) => {
  const hotMajors = [...majors]
    .sort((a, b) => {
      const countA = applications.filter(app => String(app.universityMajorId._id) === String(a._id)).length;
      const countB = applications.filter(app => String(app.universityMajorId._id) === String(b._id)).length;
      return countB - countA;
    })
    .slice(0, 5);
    console.log(hotMajors);
  return (
    <Card
      title={
        <span>
          <FireOutlined style={{ color: 'orange', marginRight: 8, fontSize: 22, verticalAlign: 'middle' }} />
          Ngành học hot nhất
        </span>
      }
      style={{ flex: 1 }}
    >
      <List
        dataSource={hotMajors}
        renderItem={(item, idx) => {
          const university = universities.find(u => u._id === item.university_id);
          const applicationCount = applications.filter(
            app => String(app.universityMajorId._id) === String(item._id)
          ).length;

          return (
            <List.Item style={{ alignItems: 'flex-start', padding: '16px 0' }}>
              <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    background: '#6C63FF',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: 18,
                    marginRight: 16,
                    flexShrink: 0,
                  }}
                >
                  {idx + 1}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 16 }}>{item.name}</div>
                  <div style={{ color: '#888', fontSize: 13, marginTop: 4 }}>
                    {university?.name || 'Không rõ trường'}
                  </div>
                </div>
                <Tag color="blue" style={{ fontSize: 15, padding: '2px 10px' }}>
                  {applicationCount} đơn
                </Tag>
              </div>
            </List.Item>
          );
        }}
      />
    </Card>
  );
};

export default HotMajors;
