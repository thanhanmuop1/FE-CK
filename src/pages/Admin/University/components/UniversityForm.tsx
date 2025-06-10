import React, { useEffect } from 'react';
import { Modal, Form, Input } from 'antd';
import { University } from '@/models/Admin/University';

interface UniversityFormProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (values: any) => void;
  initialValues?: University | null;
}

const UniversityForm: React.FC<UniversityFormProps> = ({ visible, onCancel, onSubmit, initialValues }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) {
      form.resetFields();
      if (initialValues) {
        form.setFieldsValue(initialValues);
      }
    }
  }, [visible, initialValues, form]);

  return (
    <Modal
      visible={visible}
      title={initialValues ? 'Cập nhật trường đại học' : 'Thêm trường đại học'}
      okText={initialValues ? 'Cập nhật' : 'Thêm mới'}
      cancelText="Hủy"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            onSubmit(values);
            form.resetFields();
          });
      }}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={initialValues || {}}
      >
        <Form.Item
          name="name"
          label="Tên trường"
          rules={[{ required: true, message: 'Vui lòng nhập tên trường' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="code"
          label="Mã trường"
          rules={[{ required: true, message: 'Vui lòng nhập mã trường' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="address"
          label="Địa chỉ"
          rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UniversityForm; 