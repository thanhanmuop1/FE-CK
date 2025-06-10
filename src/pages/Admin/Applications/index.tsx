import React, { useEffect } from 'react';
import { Table, Tag, Button, Space, Modal, message } from 'antd';
import { useModel } from 'umi';
import type { ColumnsType } from 'antd/es/table';
import { Application } from '@/services/Admin/Applications';

const ApplicationsManagement: React.FC = () => {
  const { applications, loading, fetchApplications, updateStatus } = useModel('Admin.Applications');

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  const handleUpdateStatus = (applicationId: string, status: 'da_duyet' | 'tu_choi') => {
    Modal.confirm({
      title: 'Xác nhận',
      content: `Bạn có chắc chắn muốn ${status === 'da_duyet' ? 'duyệt' : 'từ chối'} đơn xét tuyển này?`,
      onOk: async () => {
        await updateStatus(applicationId, { status });
      },
    });
  };

  const columns: ColumnsType<Application> = [
    {
      title: 'Họ tên',
      dataIndex: ['userId', 'name'],
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: ['userId', 'email'],
      key: 'email',
    },
    {
      title: 'Ngành học',
      dataIndex: ['universityMajorId', 'name'],
      key: 'major',
    },
    {
      title: 'Mã ngành',
      dataIndex: ['universityMajorId', 'code'],
      key: 'code',
    },
    {
      title: 'Phương thức xét tuyển',
      dataIndex: 'admissionMethod',
      key: 'admissionMethod',
      render: (method: string) => {
        const methodMap: { [key: string]: string } = {
          tot_nghiep: 'Tốt nghiệp THPT',
          hoc_ba: 'Học bạ',
          dgnl: 'Đánh giá năng lực',
          tu_duy: 'Đánh giá tư duy',
        };
        return methodMap[method] || method;
      },
    },
    {
      title: 'Tổ hợp môn',
      dataIndex: ['subjectCombinationId', 'code'],
      key: 'subjectCombination',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const statusMap: { [key: string]: { color: string; text: string } } = {
          cho_duyet: { color: 'warning', text: 'Chờ duyệt' },
          da_duyet: { color: 'success', text: 'Đã duyệt' },
          tu_choi: { color: 'error', text: 'Từ chối' },
        };
        const { color, text } = statusMap[status] || { color: 'default', text: status };
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          {record.status === 'cho_duyet' && (
            <>
              <Button
                type="primary"
                onClick={() => handleUpdateStatus(record._id, 'da_duyet')}
              >
                Duyệt
              </Button>
              <Button
                danger
                onClick={() => handleUpdateStatus(record._id, 'tu_choi')}
              >
                Từ chối
              </Button>
            </>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h1>Quản lý đơn xét tuyển</h1>
      <Table
        columns={columns}
        dataSource={applications}
        rowKey="_id"
        loading={loading}
      />
    </div>
  );
};

export default ApplicationsManagement; 