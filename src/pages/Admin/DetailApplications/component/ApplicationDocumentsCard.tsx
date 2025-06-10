import React, { useState } from 'react';
import { Card, Button, Modal, Image, Typography, Space, Empty, Tooltip } from 'antd';
import {
  DownloadOutlined,
  EyeOutlined,
  FileImageOutlined, // Generic image
  FilePdfOutlined,   // PDF
  FileWordOutlined,  // Word
  FileExcelOutlined, // Excel
  FileZipOutlined,   // Zip/Archive
  FileTextOutlined,  // Default text/unknown
  PaperClipOutlined, // Title icon
} from '@ant-design/icons';
import './ApplicationDocumentsCard.less';


const { Text, Link: AntLink } = Typography; // AntLink for semantic links if needed

interface Document {
  name: string;
  type: string; // MIME type e.g., 'image/jpeg', 'application/pdf'
  url: string;
}

interface Props {
  documents: Array<Document>;
  title?: string; // Make title customizable
}

const ApplicationDocumentsCard: React.FC<Props> = ({
  documents,
  title = "Giấy tờ minh chứng",
}) => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');

  const handlePreview = (doc: Document) => {
    setPreviewUrl(doc.url);
    setPreviewTitle(doc.name); // Use document name for modal title
    setPreviewVisible(true);
  };

  const handleDownload = (url: string, fileName: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const isImageFile = (type: string): boolean => {
    return type.startsWith('image/');
  };

  const getFileIcon = (doc: Document, size: string = '48px') => {
    const iconStyle = { fontSize: size, marginRight: 8 };

    if (isImageFile(doc.type)) {
      return (
        <Image
          src={doc.url}
          alt={doc.name}
          width={parseInt(size)}
          height={parseInt(size)}
          style={{ objectFit: 'cover', borderRadius: '4px', cursor: 'pointer' }}
          preview={false} // Disable default antd preview on small image, we use our modal
          onClick={() => handlePreview(doc)}
        />
      );
    }
    if (doc.type.includes('pdf')) {
      return <FilePdfOutlined style={{ ...iconStyle, color: '#FF5733' }} />;
    }
    if (doc.type.includes('word')) {
      return <FileWordOutlined style={{ ...iconStyle, color: '#2B579A' }} />;
    }
    if (doc.type.includes('excel') || doc.type.includes('spreadsheet')) {
      return <FileExcelOutlined style={{ ...iconStyle, color: '#1D6F42' }} />;
    }
    if (doc.type.includes('zip') || doc.type.includes('archive') || doc.type.includes('rar')) {
      return <FileZipOutlined style={{ ...iconStyle, color: '#FFC300' }} />;
    }
    return <FileTextOutlined style={{ ...iconStyle, color: '#595959' }} />;
  };

  return (
    <Card title={<Space><PaperClipOutlined /> {title}</Space>} className="info-card application-documents-card">
      {documents && documents.length > 0 ? (
        <div className="documents-list">
          {documents.map((doc, idx) => (
            <div className="document-item" key={idx}>
              <div className="document-thumbnail">
                {getFileIcon(doc)}
              </div>
              <div className="document-info">
                <Tooltip title={doc.name}>
                  <Text strong className="doc-name" ellipsis>
                    {doc.name}
                  </Text>
                </Tooltip>
              </div>
              <Space className="document-actions" size="small">
                {isImageFile(doc.type) && (
                  <Tooltip title="Xem trước">
                    <Button
                      icon={<EyeOutlined />}
                      type="text" // Use text for less emphasis, more icon-like
                      shape="circle"
                      onClick={() => handlePreview(doc)}
                    />
                  </Tooltip>
                )}
                <Tooltip title="Tải xuống">
                  <Button
                    icon={<DownloadOutlined />}
                    type="text"
                    shape="circle"
                    onClick={() => handleDownload(doc.url, doc.name)}
                  />
                </Tooltip>
              </Space>
            </div>
          ))}
        </div>
      ) : (
        <Empty description="Không có tài liệu nào" />
      )}

      <Modal
        visible={previewVisible} // 'visible' is deprecated, use 'open'
        title={previewTitle}
        footer={null}
        onCancel={() => setPreviewVisible(false)}
        width="80%"
        centered
        destroyOnClose // Good for performance if many images
      >
        <Image
          alt={previewTitle}
          style={{ width: '100%', maxHeight: '80vh', objectFit: 'contain' }}
          src={previewUrl}
          // Enable default Ant Design Image preview features within the modal
          preview={{
            visible: false, // This refers to the small preview icon on the <Image> itself, not the modal
            src: previewUrl, // Ensure the modal preview group uses the correct src
          }}
        />
      </Modal>
    </Card>
  );
};

export default ApplicationDocumentsCard;