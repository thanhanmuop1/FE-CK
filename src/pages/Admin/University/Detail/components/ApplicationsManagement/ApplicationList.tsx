import React from 'react';
import { Table, Button, Space, Tag, Modal } from 'antd';
import { CheckOutlined, CloseOutlined, EyeOutlined } from '@ant-design/icons';
import { Application } from '@/services/Admin/Applications';
import { useHistory } from 'umi';
import styles from './index.less';
import { getAdmissionMethodLabel } from '@/utils/utils';

interface ApplicationListProps {
  status: string;
  applications: Application[];
  loading: boolean;
  onApprove?: (id: string, data: any) => Promise<void>;
  onReject?: (id: string, data: any) => Promise<void>;
}

const ApplicationList: React.FC<ApplicationListProps> = ({
  status,
  applications,
  loading,
  onApprove,
  onReject,
}) => {
  const history = useHistory();

  const handleViewDetail = (application: Application) => {
    history.push(`/admin/applications/${application._id}`);
  };

  const handleApprove = (id: string) => {
    Modal.confirm({
      title: 'Xác nhận duyệt đơn',
      content: 'Bạn có chắc chắn muốn duyệt đơn xét tuyển này?',
      okText: 'Duyệt',
      okType: 'primary',
      cancelText: 'Hủy',
      onOk: async () => {
        if (onApprove) {
          await onApprove(id, { status: 'da_duyet' });
        }
      },
    });
  };

  const handleReject = (id: string) => {
    Modal.confirm({
      title: 'Xác nhận từ chối đơn',
      content: 'Bạn có chắc chắn muốn từ chối đơn xét tuyển này?',
      okText: 'Từ chối',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk: async () => {
        if (onReject) {
          await onReject(id, { status: 'tu_choi' });
        }
      },
    });
  };

  const getStatusTag = (status: string) => {
    const statusConfig = {
      cho_duyet: { color: 'warning', text: 'Chờ duyệt' },
      da_duyet: { color: 'success', text: 'Đã duyệt' },
      tu_choi: { color: 'error', text: 'Đã từ chối' },
    };
    const config = statusConfig[status as keyof typeof statusConfig];
    return <Tag color={config.color}>{config.text}</Tag>;
  };

  const columns = [
    {
      title: 'Họ và tên',
      dataIndex: ['userId', 'name'],
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: ['userId', 'email'],
      key: 'email',
    },
    {
      title: 'Ngành đăng ký',
      dataIndex: ['universityMajorId', 'name'],
      key: 'major',
    },
    {
      title: 'Mã ngành',
      dataIndex: ['universityMajorId', 'code'],
      key: 'majorCode',
    },
    {
      title: 'Phương thức xét tuyển',
      dataIndex: 'admissionMethod',
      key: 'admissionMethod',
      render: (method: string) => getAdmissionMethodLabel(method),
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
      render: (status: string) => getStatusTag(status),
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: Application) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EyeOutlined />}
            onClick={() => handleViewDetail(record)}
          >
            Chi tiết
          </Button>
          {status === 'cho_duyet' && (
            <>
              <Button
                type="primary"
                icon={<CheckOutlined />}
                onClick={() => handleApprove(record._id)}
              >
                Duyệt
              </Button>
              <Button
                danger
                icon={<CloseOutlined />}
                onClick={() => handleReject(record._id)}
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
    <div className={styles.container}>
      <Table
        columns={columns}
        dataSource={applications}
        loading={loading}
        rowKey="_id"
      />
    </div>
  );
};

export default ApplicationList; 