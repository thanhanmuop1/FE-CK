import React from 'react';
import { Button, Badge } from 'antd';
import { DownloadOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { generateApplicationPDF } from '@/services/pdfService';

interface Props {
  status: string;
  statusMap: Record<string, { color: string; text: string }>;
  onBack: () => void;
  application: any;
}

const ApplicationHeader: React.FC<Props> = ({ status, statusMap, onBack, application }) => {
  const handleDownloadPDF = () => {
    const pdfDoc = generateApplicationPDF(application);
    pdfDoc.download(`ho-so-xet-tuyen-${application.name}.pdf`);
  };

  return (
    <div className="header">
      <Button
        type="link"
        icon={<ArrowLeftOutlined />}
        onClick={onBack}
      >
        Quay lại danh sách hồ sơ
      </Button>
      <div className="header-actions">
        <Badge
          status={statusMap[status]?.color as any}
          text={statusMap[status]?.text}
        />
        <Button icon={<DownloadOutlined />} onClick={handleDownloadPDF}>
          Tải xuống hồ sơ
        </Button>
      </div>
    </div>
  );
};

export default ApplicationHeader;
