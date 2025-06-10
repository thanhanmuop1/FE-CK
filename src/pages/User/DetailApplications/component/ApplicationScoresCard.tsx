import React from 'react';
import { Card, Descriptions, Tag } from 'antd';
import { areaMap, groupMap } from '@/utils/utils';
import './ApplicationScoresCard.less';

interface ApplicationScoresCardProps {
  scores: Record<string, number>;
  subjectScores: Record<string, number>;
  totalScore: number;
  method: string;
  priority: {
    area: string;
    group: string;
    score: number;
  };
}

const ApplicationScoresCard: React.FC<ApplicationScoresCardProps> = ({
  scores,
  subjectScores,
  totalScore,
  method,
  priority,
}) => {
  // Hiển thị điểm theo phương thức
  let resultFields = null;
  if (method === 'Xét tuyển học bạ') {
    resultFields = (
      <>
        <Descriptions.Item label="Điểm trung bình lớp 10">{scores['GPA 10']?.toFixed(2)}</Descriptions.Item>
        <Descriptions.Item label="Điểm trung bình lớp 11">{scores['GPA 11']?.toFixed(2)}</Descriptions.Item>
        <Descriptions.Item label="Điểm trung bình lớp 12">{scores['GPA 12']?.toFixed(2)}</Descriptions.Item>
      </>
    );
  } else if (method === 'Điểm thi THPT Quốc gia') {
    resultFields = (
      <>
        {Object.entries(subjectScores).map(([subject, score]) => (
          <Descriptions.Item label={`Điểm ${subject}`} key={subject}>
            {score?.toFixed(2)}
          </Descriptions.Item>
        ))}
      </>
    );
  } else if (method === 'Đánh giá năng lực') {
    resultFields = (
      <>
        <Descriptions.Item label="Điểm đánh giá năng lực">{totalScore?.toFixed(2)}</Descriptions.Item>
      </>
    );
  } else if (method === 'Đánh giá tư duy') {
    resultFields = (
      <>
        <Descriptions.Item label="Điểm tư duy">{totalScore?.toFixed(2)}</Descriptions.Item>
      </>
    );
  }

  return (
    <Card title="Thông tin điểm và phương thức xét tuyển" className="application-scores-card">
      <Descriptions column={1}>
        <Descriptions.Item label="Phương thức xét tuyển">
          <Tag color="blue">{method}</Tag>
        </Descriptions.Item>
        {resultFields}
        <Descriptions.Item label="Tổng điểm">
          <strong>{totalScore?.toFixed(2)}</strong>
        </Descriptions.Item>
        <Descriptions.Item label="Khu vực ưu tiên">
          <Tag color="green">{areaMap[priority.area] || 'Không có'}</Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Đối tượng ưu tiên">
          <Tag color="purple">{groupMap[priority.group] || 'Không có'}</Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Tổng điểm ưu tiên">
          <Tag color="orange">{priority.score?.toFixed(2)} điểm</Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Tổng điểm sau cộng ưu tiên">
          <strong className="final-score">{(totalScore + priority.score)?.toFixed(2)}</strong>
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default ApplicationScoresCard;
