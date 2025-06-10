import React, { useState } from 'react';
import { Card, Button, Radio } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { useModel, history } from 'umi';
import NewApplicationLayout from '../NewApplicationLayout';
import './NewApplication.less';
import { admissionMethods} from '@/utils/utils'

const { Group: RadioGroup } = Radio;

const Step1Page: React.FC = () => {
  const { updateFormData } = useModel('User.applications');
  const [selectedAdmissionMethod, setSelectedAdmissionMethod] = useState<string>('');

  const handleMethodChange = (e: any) => {
    setSelectedAdmissionMethod(e.target.value);
  };

  const handleNext = () => {
    if (selectedAdmissionMethod) {
      updateFormData({ admissionMethod: selectedAdmissionMethod });
      history.push(`/user/applications/new/step2?method=${selectedAdmissionMethod}`);
    }
  };

  return (
    <div className="new-application-page">
      <NewApplicationLayout currentStep={0}>
        <div className="step1-header">
          <h2>Bước 1: Chọn phương thức xét tuyển</h2>
          <p>Chọn phương thức xét tuyển phù hợp với bạn</p>
        </div>
        <Card className="main-card">
          <div className="admission-methods">
            {admissionMethods.map((method) => (
              <div
                key={method.id}
                className={`method-card ${selectedAdmissionMethod === method.id ? 'selected' : ''}`}
                onClick={() => setSelectedAdmissionMethod(method.id)}
              >
                <input
                  type="radio"
                  checked={selectedAdmissionMethod === method.id}
                  onChange={() => setSelectedAdmissionMethod(method.id)}
                  style={{ display: 'none' }}
                />
                <div className="method-icon">{method.icon}</div>
                <div className="method-info">
                  <div className="method-name">{method.name}</div>
                  <div className="method-description">{method.description}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="card-footer">
            <Button
              type="primary"
              icon={<ArrowRightOutlined />}
              onClick={handleNext}
              disabled={!selectedAdmissionMethod}
            >
              Tiếp tục
            </Button>
          </div>
        </Card>
      </NewApplicationLayout>
    </div>
  );
};

export default Step1Page;