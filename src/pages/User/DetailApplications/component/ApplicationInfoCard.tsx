import React from 'react';
import { Card, Descriptions, Badge } from 'antd';
import { admissionMethodNames } from '@/utils/utils';

interface Props {
  application: any;
  statusMap: Record<string, { color: string; text: string }>;
}

const ApplicationInfoCard: React.FC<Props> = ({ application, statusMap }) => (
  <Card className="main-card" title="Chi tiết hồ sơ xét tuyển">
    <Descriptions bordered column={2}>
      <Descriptions.Item label="Họ và tên" span={2}>
        {application.name}
      </Descriptions.Item>
      <Descriptions.Item label="Email">
        {application.email}
      </Descriptions.Item>
      <Descriptions.Item label="Số điện thoại">
        {application.phone}
      </Descriptions.Item>
      <Descriptions.Item label="Tên trường">
        {application.university}
      </Descriptions.Item>
      <Descriptions.Item label="Tên đợt tuyển sinh">
        {application.admissionPeriod}
      </Descriptions.Item>
      <Descriptions.Item label="Tên ngành học">
        {application.major}
      </Descriptions.Item>
      {application.method === 'Điểm thi THPT Quốc gia' && (
        <Descriptions.Item label="Tổ hợp xét tuyển">
          {application.combination}
        </Descriptions.Item>
      )}
      <Descriptions.Item label="Trạng thái">
        <Badge
          status={statusMap[application.status]?.color as any}
          text={statusMap[application.status]?.text}
        />
      </Descriptions.Item>
      <Descriptions.Item label="Ngày nộp">
        {application.dates.submitted}
      </Descriptions.Item>
      <Descriptions.Item label="Ngày cập nhật">
        {application.dates.updated}
      </Descriptions.Item>
      <Descriptions.Item label="Phương thức xét tuyển">
        {application.method}
      </Descriptions.Item>
    </Descriptions>
  </Card>
);

export default ApplicationInfoCard;
