import React from 'react';
import { Form, Input, Button, Space, Card } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { useModel } from 'umi';
import type { SubjectCombination } from '@/models/Admin/SubjectCombinations';

const SubjectCombinationForm: React.FC = () => {
  const [form] = Form.useForm();
  const { createSubjectCombinationItem } = useModel('Admin.SubjectCombinations');

  const handleSubmit = async (values: any) => {
    try {
      await createSubjectCombinationItem({
        code: values.code,
        subjects: values.subjects,
      });
      form.resetFields();
    } catch (error) {
      console.error('Error creating subject combination:', error);
    }
  };

  return (
    <Form
      form={form}
      onFinish={handleSubmit}
      layout="vertical"
      style={{ maxWidth: '800px', margin: '0 auto' }}
    >
      <Form.Item
        name="code"
        label="Mã tổ hợp"
        rules={[
          { required: true, message: 'Vui lòng nhập mã tổ hợp' },
          { pattern: /^[A-Z]\d{2}$/, message: 'Mã tổ hợp phải có dạng A00' }
        ]}
      >
        <Input placeholder="Ví dụ: A00" style={{ width: '200px' }} />
      </Form.Item>

      <Form.List
        name="subjects"
        rules={[
          {
            validator: async (_, subjects) => {
              if (!subjects || subjects.length < 2) {
                return Promise.reject(new Error('Cần ít nhất 2 môn học'));
              }
            },
          },
        ]}
      >
        {(fields, { add, remove }, { errors }) => (
          <Card size="small" style={{ marginBottom: 16 }}>
            <div style={{ marginBottom: 16 }}>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Thêm môn học
              </Button>
            </div>

            {fields.map((field, index) => (
              <Space key={field.key} align="baseline" style={{ display: 'flex', marginBottom: 8 }}>
                <Form.Item
                  {...field}
                  label={index === 0 ? 'Các môn học' : ' '}
                  rules={[{ required: true, message: 'Vui lòng nhập tên môn học' }]}
                  style={{ flex: 1, marginBottom: 0 }}
                >
                  <Input placeholder="Tên môn học" />
                </Form.Item>
                {fields.length > 2 && (
                  <MinusCircleOutlined 
                    onClick={() => remove(field.name)}
                    style={{ color: '#ff4d4f', fontSize: '16px' }}
                  />
                )}
              </Space>
            ))}
            <Form.ErrorList errors={errors} />
          </Card>
        )}
      </Form.List>

      <Form.Item>
        <Button type="primary" htmlType="submit" size="large" block>
          Thêm tổ hợp môn
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SubjectCombinationForm; 