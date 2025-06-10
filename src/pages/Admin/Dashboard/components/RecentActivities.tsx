import React from 'react';
import { Card, List, Tag } from 'antd';

interface Application {
  _id: string;
  userId?: { name: string };
  universityMajorId?: { name: string };
  status: string;
}

interface Props {
  applications: Application[];
}

const RecentActivities: React.FC<Props> = ({ applications }) => {
  const recentActivities = applications.slice(0, 5);
  return (
    <Card title="Hoạt động gần đây">
      <List
        dataSource={recentActivities}
        renderItem={(item) => (
          <List.Item>
            <span>{item.userId?.name || 'Ẩn danh'} - {item.universityMajorId?.name || 'Ngành không xác định'}</span>
            <Tag color={
              item.status === 'cho_duyet' ? 'orange' :
              item.status === 'da_duyet' ? 'green' :
              item.status === 'tu_choi' ? 'red' : 'blue'
            }>
              {item.status === 'cho_duyet' ? 'Chờ duyệt' :
               item.status === 'da_duyet' ? 'Đã duyệt' :
               item.status === 'tu_choi' ? 'Từ chối' : 'Mới'}
            </Tag>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default RecentActivities;
