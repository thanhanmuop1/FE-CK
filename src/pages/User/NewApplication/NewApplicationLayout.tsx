import React from 'react';
import { Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useHistory, useLocation } from 'umi';
import './NewApplicationLayout.less';

const steps = [
  { title: 'Chọn phương thức' },
  { title: 'Trường & ngành' },
  { title: 'Thông tin cá nhân' },
  { title: 'Điểm thi' },
  { title: 'Ảnh minh chứng' },
  { title: 'Hoàn thành' },
];

const stepIcons = [
  <span role="img" aria-label="method" style={{ fontSize: 24 }}>🎓</span>,
  <span role="img" aria-label="school" style={{ fontSize: 24 }}>🏫</span>,
  <span role="img" aria-label="user" style={{ fontSize: 24 }}>👤</span>,
  <span role="img" aria-label="score" style={{ fontSize: 24 }}>📄</span>,
  <span role="img" aria-label="upload" style={{ fontSize: 24 }}>⏫</span>,
  <span role="img" aria-label="done" style={{ fontSize: 24 }}>✔️</span>,
];

interface Props {
  currentStep: number; // 0-based
  children: React.ReactNode;
  onBack?: () => void;
}

const NewApplicationLayout: React.FC<Props> = ({ currentStep, children, onBack }) => {
  const history = useHistory();

  return (
    <div className="new-application-layout">
      <div className="page-header">
        <Button
          type="text"
          icon={<ArrowLeftOutlined />}
          onClick={onBack || history.goBack}
          className="back-button"
        >
          Quay lại
        </Button>
      </div>
      <div className="step-indicator">
        <div className="step-progress">
          {steps.map((step, idx) => (
            <React.Fragment key={step.title}>
              <div className={`step ${idx === currentStep ? 'active' : ''}`}>
                <div className="step-icon">{stepIcons[idx]}</div>
                <div className="step-title">{step.title}</div>
              </div>
              {idx < steps.length - 1 && <div className="step-line"></div>}
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className="page-content">
        {children}
      </div>
    </div>
  );
};

export default NewApplicationLayout;
