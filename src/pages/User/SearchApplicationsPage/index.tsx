import React, { useState } from 'react';
import { Card, Form, Input, Select, DatePicker, Button, Row, Col, Spin, Empty } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useModel } from 'umi';
import ApplicationCard from '@/components/ApplicationCard';
import styles from './index.less';

const { Option } = Select;
const { RangePicker } = DatePicker;

const SearchApplicationsPage: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<Application[]>([]);
  const { handleSearchApplications } = useModel('User.applications');

  const handleSearch = async (values: any) => {
    try {
      setLoading(true);
      const [startDate, endDate] = values.dateRange || [];
      
      const filters = {
        universityName: values.universityName,
        applicationCode: values.applicationCode,
        status: values.status,
        admissionMethod: values.admissionMethod,
        startDate: startDate?.format('YYYY-MM-DD'),
        endDate: endDate?.format('YYYY-MM-DD'),
      };
      console.log(filters)
      const response = await handleSearchApplications(filters);
      if (response.success) {
        setSearchResults(response.data);
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.searchPage}>
      <Card className={styles.searchForm}>
        <Form
          form={form}
          onFinish={handleSearch}
          layout="vertical"
        >
          <Row gutter={16}>
            <Col xs={24} md={8}>
              <Form.Item name="universityName" label="Trường đại học">
                <Input placeholder="Nhập tên trường" />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item name="applicationCode" label="Mã đơn">
                <Input placeholder="Nhập mã đơn" />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item name="status" label="Trạng thái">
                <Select placeholder="Chọn trạng thái">
                  <Option value="cho_duyet">Chờ duyệt</Option>
                  <Option value="da_duyet">Đã duyệt</Option>
                  <Option value="tu_choi">Từ chối</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} md={8}>
              <Form.Item name="admissionMethod" label="Phương thức xét tuyển">
                <Select placeholder="Chọn phương thức">
                  <Option value="hoc_ba">Xét học bạ</Option>
                  <Option value="tot_nghiep">Thi THPT Quốc gia</Option>
                  <Option value="dgnl">Đánh giá năng lực</Option>
                  <Option value="tu_duy">Đánh giá tư duy</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={16}>
              <Form.Item name="dateRange" label="Thời gian">
                <RangePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
              Tìm kiếm
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <div className={styles.searchResults}>
        {loading ? (
          <div className={styles.loadingContainer}>
            <Spin size="large" />
          </div>
        ) : searchResults.length > 0 ? (
          <div className={styles.resultsGrid}>
            {searchResults.map(application => (
              <ApplicationCard key={application._id} application={application} />
            ))}
          </div>
        ) : (
          <Empty description="Không tìm thấy kết quả" />
        )}
      </div>
    </div>
  );
};

export default SearchApplicationsPage; 