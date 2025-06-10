import React from 'react';
import { Card, List } from 'antd';
import { University } from '@/models/Admin/University';
import { UniversityMajors } from '@/models/Admin/UniversityMajors';
import { Application } from '@/services/Admin/Applications';
import { EnvironmentOutlined, TrophyOutlined } from '@ant-design/icons';

interface Props {
  universities: University[];
  universityMajors: UniversityMajors[];
  applications: Application[];
}

const TopUniversities: React.FC<Props> = ({ universities }) => {
  const topUniversities = universities.slice(0, 5);
  return (
    <Card
      title={
        <span>
          <TrophyOutlined style={{ color: '#faad14', marginRight: 8 }} />
          Top trường đại học
        </span>
      }
      style={{ flex: 1 }}
    >
      <List
        dataSource={topUniversities}
        renderItem={(item, idx) => (
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
              <div>
                <div style={{ fontWeight: 700, fontSize: 16 }}>{item.name}</div>
                <div style={{ color: '#888', display: 'flex', alignItems: 'center', marginTop: 4 }}>
                  <EnvironmentOutlined style={{ marginRight: 4 }} />
                  <span>{item.address}</span>
                </div>
              </div>
            </div>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default TopUniversities;
