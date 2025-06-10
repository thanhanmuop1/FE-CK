import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, Button, Space } from 'antd';
import { UniversityMajors } from '@/models/Admin/UniversityMajors';
import { SubjectCombination } from '@/models/Admin/SubjectCombinations';
import { useModel } from 'umi';
import { admissionMethodNames } from '@/utils/utils';

interface MajorFormProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (values: any) => void;
  initialValues: UniversityMajors | null;
}

const MajorForm: React.FC<MajorFormProps> = ({
  visible,
  onCancel,
  onSubmit,
  initialValues,
}) => {
  const [form] = Form.useForm();
  const { subjectCombinations, fetchSubjectCombinations } = useModel('Admin.SubjectCombinations');
  const [selectedMethods, setSelectedMethods] = React.useState<string[]>([]);

  useEffect(() => {
    if (visible) {
      fetchSubjectCombinations();
    }
  }, [visible, fetchSubjectCombinations]);

  useEffect(() => {
    if (visible && initialValues) {
      // Chuyển đổi subject_combination_ids thành mảng ID
      const formValues = {
        ...initialValues,
        subject_combination_ids: initialValues.subject_combination_ids?.map(combo => combo._id) || []
      };
      form.setFieldsValue(formValues);
      setSelectedMethods(initialValues.admission_methods || []);
    } else {
      form.resetFields();
      setSelectedMethods([]);
    }
  }, [visible, initialValues, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      onSubmit(values);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handleMethodChange = (values: string[]) => {
    setSelectedMethods(values);
    // Nếu không chọn thi THPTQG nữa thì xóa tổ hợp môn
    if (!values.includes('tot_nghiep')) {
      form.setFieldsValue({ subject_combination_ids: undefined });
    }
  };

  // Chuyển đổi admissionMethodNames thành options cho Select
  const admissionMethodOptions = Object.entries(admissionMethodNames).map(([key, value]) => ({
    label: value,
    value: key,
  }));

  return (
    <Modal
      title={initialValues ? 'Sửa ngành học' : 'Thêm ngành học mới'}
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Hủy
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          {initialValues ? 'Cập nhật' : 'Thêm mới'}
        </Button>,
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={initialValues || {}}
      >
        <Form.Item
          name="code"
          label="Mã ngành"
          rules={[
            { required: true, message: 'Vui lòng nhập mã ngành' },
            { max: 10, message: 'Mã ngành không được vượt quá 10 ký tự' }
          ]}
        >
          <Input placeholder="Nhập mã ngành" />
        </Form.Item>

        <Form.Item
          name="name"
          label="Tên ngành"
          rules={[
            { required: true, message: 'Vui lòng nhập tên ngành' },
            { max: 100, message: 'Tên ngành không được vượt quá 100 ký tự' }
          ]}
        >
          <Input placeholder="Nhập tên ngành" />
        </Form.Item>

        <Form.Item
          name="admission_methods"
          label="Phương thức xét tuyển"
          rules={[{ required: true, message: 'Vui lòng chọn phương thức xét tuyển' }]}
        >
          <Select
            mode="multiple"
            placeholder="Chọn phương thức xét tuyển"
            options={admissionMethodOptions}
            onChange={handleMethodChange}
          />
        </Form.Item>

        {selectedMethods.includes('tot_nghiep') && (
          <Form.Item
            name="subject_combination_ids"
            label="Tổ hợp môn"
            rules={[{ required: true, message: 'Vui lòng chọn tổ hợp môn' }]}
          >
            <Select
              mode="multiple"
              placeholder="Chọn tổ hợp môn"
              options={subjectCombinations.map(combo => ({
                label: combo.code + ' (' + combo.subjects.join(', ') + ')',
                value: combo._id
              }))}
            />
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
};

export default MajorForm; 