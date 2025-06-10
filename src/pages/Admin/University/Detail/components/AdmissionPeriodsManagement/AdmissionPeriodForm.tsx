import React from 'react';
import { Modal, Form, Input, DatePicker, Switch } from 'antd';
import { AdmissionPeriod } from '@/models/Admin/AdmissionPeriods';
import moment from 'moment';

interface AdmissionPeriodFormProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (values: any) => void;
  initialValues?: AdmissionPeriod | null;
}

const AdmissionPeriodForm: React.FC<AdmissionPeriodFormProps> = ({
  visible,
  onCancel,
  onSubmit,
  initialValues,
}) => {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      onSubmit({
        ...values,
        startDate: values.startDate.format('YYYY-MM-DD'),
        endDate: values.endDate.format('YYYY-MM-DD'),
        is_active: values.is_active,
      });
      form.resetFields();
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  React.useEffect(() => {
    if (visible && initialValues) {
      form.setFieldsValue({
        ...initialValues,
        startDate: moment(initialValues.startDate),
        endDate: moment(initialValues.endDate),
        is_active: initialValues.is_active,
      });
    } else {
      form.resetFields();
    }
  }, [visible, initialValues, form]);

  return (
    <Modal
      title={initialValues ? 'Chỉnh sửa đợt tuyển sinh' : 'Thêm đợt tuyển sinh'}
      visible={visible}
      onCancel={onCancel}
      onOk={handleSubmit}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{ is_active: true }}
      >
        <Form.Item
          name="name"
          label="Tên đợt tuyển sinh"
          rules={[{ required: true, message: 'Vui lòng nhập tên đợt tuyển sinh' }]}
        >
          <Input placeholder="Nhập tên đợt tuyển sinh" />
        </Form.Item>

        <Form.Item
          name="startDate"
          label="Ngày bắt đầu"
          rules={[{ required: true, message: 'Vui lòng chọn ngày bắt đầu' }]}
        >
          <DatePicker
            style={{ width: '100%' }}
            format="DD/MM/YYYY"
            placeholder="Chọn ngày bắt đầu"
          />
        </Form.Item>

        <Form.Item
          name="endDate"
          label="Ngày kết thúc"
          rules={[{ required: true, message: 'Vui lòng chọn ngày kết thúc' }]}
        >
          <DatePicker
            style={{ width: '100%' }}
            format="DD/MM/YYYY"
            placeholder="Chọn ngày kết thúc"
          />
        </Form.Item>

        <Form.Item
          name="description"
          label="Mô tả"
        >
          <Input.TextArea placeholder="Nhập mô tả đợt tuyển sinh" />
        </Form.Item>

        <Form.Item
          name="academic_year"
          label="Năm học"
        >
          <Input placeholder="Nhập năm học" />
        </Form.Item>

        <Form.Item
          name="is_active"
          label="Trạng thái hoạt động"
          valuePropName="checked"
        >
          <Switch checkedChildren="Đang hoạt động" unCheckedChildren="Đã tắt" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AdmissionPeriodForm; 