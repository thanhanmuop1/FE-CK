import React, { useEffect } from 'react';
import { Form, Input, DatePicker, Select, Row, Col, Card, Radio, Button, message, Spin } from 'antd';
import { useModel, history } from 'umi';
import moment from 'moment';
import { graduationYears, priorityAreas, priorityGroups } from '@/utils/utils';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { ArrowRightOutlined } from '@ant-design/icons';
import NewApplicationLayout from '../NewApplicationLayout';
import './step3.less';

const { Option } = Select;

const Step3: React.FC = () => {
  const { profileData, fetchProfile } = useModel('User.profile');
  const { formData, updateFormData } = useModel('User.applications');
  const { 
    provinces, 
    loading: loadingProvinces, 
    fetchProvinces, 
    fetchDistricts, 
    getDistrictsByProvince,
    isLoadingDistricts 
  } = useModel('Location.index');
  const [form] = Form.useForm();

  // Set initial values from profile data
  React.useEffect(() => {
    if (profileData) {
      form.setFieldsValue({
        name: profileData.name,
        email: profileData.email,
        gender: profileData.gender,
        dob: profileData.dob ? moment(profileData.dob) : null,
        cccd: profileData.cccd,
        phone: profileData.phone,
        ethnic: profileData.ethnic,
        province: profileData.province,
        district: profileData.district,
        address: profileData.address,
        school: profileData.highSchoolName,
        graduationYear: profileData.graduationYear,
        priorityArea: profileData.priorityArea,
        priorityGroup: profileData.priorityGroup,
      });
    }
  }, [profileData, form]);

  useEffect(() => {
    fetchProfile();
  }, []);

  // Load provinces on component mount
  useEffect(() => {
    fetchProvinces();
  }, [fetchProvinces]);

  // Load districts when province changes
  useEffect(() => {
    const provinceId = form.getFieldValue('province');
    if (provinceId) {
      fetchDistricts(provinceId);
    }
  }, [form.getFieldValue('province')]);

  const handleProvinceChange = (value: string) => {
    form.setFieldsValue({ district: undefined }); // Reset district when province changes
    if (value) {
      fetchDistricts(value);
    }
  };

  const handleBack = () => {
    history.goBack();
  };

  const handleNext = async () => {
    const values = await form.validateFields();
    updateFormData({
      profileData: {
        name: values.name,
        email: values.email,
        gender: values.gender,
        dob: values.dob,
        cccd: values.cccd,
        phone: values.phone,
        ethnic: values.ethnic,
        province: values.province,
        district: values.district,
        address: values.address,
        priorityArea: values.priorityArea,
        priorityGroup: values.priorityGroup,
        graduationYear: values.graduationYear,
        school: values.school,
      }
    });

    history.push('/user/applications/new/step4');
  };

  return (
    <div className="step3-page">
      <NewApplicationLayout currentStep={2}>
        <Card className="main-card">
          <div className="card-header">
            <h2>Bước 3:Thông tin cá nhân</h2>
            <p>Vui lòng điền đầy đủ thông tin cá nhân của bạn</p>
          </div>
          <Form
            form={form}
            layout="vertical"
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="name"
                  label="Họ và tên"
                  rules={[{ required: true, message: 'Vui lòng nhập họ và tên' }]}
                >
                  <Input placeholder="Nhập họ và tên" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    { required: true, message: 'Vui lòng nhập email' },
                    { type: 'email', message: 'Email không hợp lệ' }
                  ]}
                >
                  <Input placeholder="Nhập email" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="gender"
                  label="Giới tính"
                  rules={[{ required: true, message: 'Vui lòng chọn giới tính' }]}
                >
                  <Select placeholder="Chọn giới tính">
                    <Option value="male">Nam</Option>
                    <Option value="female">Nữ</Option>
                    <Option value="other">Khác</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="dob"
                  label="Ngày sinh"
                  rules={[{ required: true, message: 'Vui lòng chọn ngày sinh' }]}
                >
                  <DatePicker 
                    style={{ width: '100%' }}
                    placeholder="Chọn ngày sinh"
                    format="DD/MM/YYYY"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="cccd"
                  label="Số CCCD"
                  rules={[{ required: true, message: 'Vui lòng nhập số CCCD' }]}
                >
                  <Input placeholder="Nhập số CCCD" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="phone"
                  label="Số điện thoại"
                  rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
                >
                  <Input placeholder="Nhập số điện thoại" />
                </Form.Item>
              </Col>
            </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="ethnic"
              label="Dân tộc"
              rules={[{ required: true, message: 'Vui lòng nhập dân tộc' }]}
            >
              <Input placeholder="Nhập dân tộc" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="province"
              label="Tỉnh/Thành phố"
              rules={[{ required: true, message: 'Vui lòng chọn tỉnh/thành phố' }]}
            >
              <Select 
                placeholder="Chọn tỉnh/thành phố"
                onChange={handleProvinceChange}
                loading={loadingProvinces}
                showSearch
                filterOption={(input, option) =>
                  (option?.children as unknown as string)?.toLowerCase().includes(input.toLowerCase())
                }
              >
                {provinces.map(province => (
                  <Option key={province.id} value={province.id}>
                    {province.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="district"
              label="Quận/Huyện"
              rules={[{ required: true, message: 'Vui lòng chọn quận/huyện' }]}
            >
              <Select 
                placeholder="Chọn quận/huyện"
                disabled={!form.getFieldValue('province')}
                loading={isLoadingDistricts(form.getFieldValue('province'))}
                showSearch
                filterOption={(input, option) =>
                  (option?.children as unknown as string)?.toLowerCase().includes(input.toLowerCase())
                }
                notFoundContent={
                  !form.getFieldValue('province') ? (
                    'Vui lòng chọn tỉnh/thành phố trước'
                  ) : isLoadingDistricts(form.getFieldValue('province')) ? (
                    <Spin size="small" />
                  ) : (
                    'Không tìm thấy dữ liệu'
                  )
                }
              >
                {getDistrictsByProvince(form.getFieldValue('province')).map(district => (
                  <Option key={district.id} value={district.id}>
                    {district.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="address"
              label="Địa chỉ"
              rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}
            >
              <Input placeholder="Nhập địa chỉ" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="school"
              label="Trường THPT"
              rules={[{ required: true, message: 'Vui lòng chọn trường THPT' }]}
            >
              <Input placeholder="Nhập trường THPT" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="graduationYear"
              label="Năm tốt nghiệp"
              rules={[{ required: true, message: 'Vui lòng chọn năm tốt nghiệp' }]}
            >
              <Select placeholder="Chọn năm tốt nghiệp">
                {graduationYears.map((year) => (
                  <Option key={year} value={year}>{year}</Option>
                ))}
              </Select>
            </Form.Item></Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="priorityArea"
              label="Khu vực ưu tiên"
              rules={[{ required: true, message: 'Vui lòng chọn khu vực ưu tiên' }]}
            >
              <Radio.Group>
                {priorityAreas.map((area) => (
                  <Radio key={area.value} value={area.value}>{area.label}</Radio>
                ))}
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="priorityGroup"
              label="Đối tượng ưu tiên"
              rules={[{ required: true, message: 'Vui lòng chọn đối tượng ưu tiên' }]}
            >
              <Radio.Group>
                {priorityGroups.map((object) => (
                  <Radio key={object.value} value={object.value}>{object.label}</Radio>
                ))}
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <div className="card-footer">
            <Button onClick={handleBack}>
              <ArrowLeftOutlined />
              Quay lại
            </Button>
            <Button 
              type="primary" 
              icon={<ArrowRightOutlined />}
              onClick={handleNext}
            >
              Tiếp tục
            </Button>
          </div>
        </Card>
      </NewApplicationLayout>
    </div>
  );
};

export default Step3; 