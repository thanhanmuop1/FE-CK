import React from 'react';
import {
  Card,
  Input,
  Radio,
  Select,
  Row,
  Col,
  Form,
  Typography,
} from 'antd';
import styles from './index.less';
import { graduationYears, priorityAreas, priorityGroups } from '@/utils/utils';

const { Option } = Select;
const { Title, Text } = Typography;

interface EducationInfo {
  school: string;
  grade10: number | null;
  grade11: number | null;
  grade12: number | null;
  graduationYear: string;
  priorityArea: string;
  priorityObject: string;
}

interface EducationInfoFormProps {
  data: EducationInfo;
  onChange: (field: string, value: any) => void;
}

const EducationInfoForm: React.FC<EducationInfoFormProps> = ({
  data,
  onChange,
}) => {
  return (
    <Card className={styles.educationInfoCard}>
      <Title level={4}>Thông tin học tập</Title>
      <Text type="secondary">Cập nhật thông tin học tập của bạn</Text>
      
      <Form layout="vertical" className={styles.educationInfoForm}>
        <Form.Item label="Trường THPT">
          <Input
            value={data.school}
            onChange={(e) => onChange('school', e.target.value)}
            placeholder="Nhập tên trường THPT"
          />
        </Form.Item>

        <Row gutter={16}>
          <Col xs={24} md={8}>
            <Form.Item label="Điểm TB lớp 10">
              <Input 
                type="number" 
                placeholder="Ví dụ: 8.5" 
                min={0}
                max={10}
                step={0.1}
                value={data.grade10 ?? ''}
                onChange={(e) => onChange('grade10', e.target.value ? parseFloat(e.target.value) : null)}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item label="Điểm TB lớp 11">
              <Input 
                type="number" 
                placeholder="Ví dụ: 8.7" 
                min={0}
                max={10}
                step={0.1}
                value={data.grade11 ?? ''}
                onChange={(e) => onChange('grade11', e.target.value ? parseFloat(e.target.value) : null)}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item label="Điểm TB lớp 12">
              <Input 
                type="number" 
                placeholder="Ví dụ: 9.0" 
                min={0}
                max={10}
                step={0.1}
                value={data.grade12 ?? ''}
                onChange={(e) => onChange('grade12', e.target.value ? parseFloat(e.target.value) : null)}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label="Năm tốt nghiệp">
          <Select
            value={data.graduationYear}
            onChange={(value) => onChange('graduationYear', value)}
            placeholder="Chọn năm tốt nghiệp"
          >
            {graduationYears.map(year => (
              <Option key={year} value={year}>{year}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Khu vực ưu tiên">
          <Radio.Group
            value={data.priorityArea}
            onChange={(e) => onChange('priorityArea', e.target.value)}
          >
            {priorityAreas.map((area: any) => (
              <Radio key={area.value} value={area.value}>{area.label}</Radio>
            ))}
          </Radio.Group>
        </Form.Item>

        <Form.Item label="Đối tượng ưu tiên">
          <Radio.Group
            value={data.priorityObject}
            onChange={(e) => onChange('priorityObject', e.target.value)}
            className={styles.priorityObjectGroup}
          >
            {priorityGroups.map((obj: any) => (
              <Radio key={obj.value} value={obj.value}>{obj.label}</Radio>
            ))}
          </Radio.Group>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default EducationInfoForm; 