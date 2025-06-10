import React, { useState, useEffect } from 'react';
import { Card, Button, Select, Form, Alert } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { history, useLocation, useModel } from 'umi';
import useUniversityModel from '@/models/User/university';
import useUniversityMajorsModel from '@/models/User/university_majors';
import './Step2.less';
import { University } from '@/models/User/university';
import { admissionMethodNames } from '@/utils/utils';
import NewApplicationLayout from '../NewApplicationLayout';

const { Option } = Select;

const Step2Page: React.FC = () => {
  const location = useLocation();
  const [form] = Form.useForm();
  
  const admissionMethod = location.query.method || '';
  const [selectedUniversity, setSelectedUniversity] = useState<string>('');
  const [selectedMajor, setSelectedMajor] = useState<string>('');
  const [selectedCombination, setSelectedCombination] = useState<string>('');
  const [selectedAdmissionPeriod, setSelectedAdmissionPeriod] = useState<string>('');

  // Models
  const { universities, loading: universitiesLoading, fetchUniversities } = useUniversityModel();
  const { universityMajors, loading: majorsLoading, fetchUniversityMajors } = useUniversityMajorsModel();
  const { admissionPeriods, loading: periodsLoading, fetchAdmissionPeriodsByUniversity } = useModel('User.AdmissionPeriods');
  const { formData, updateFormData } = useModel('User.applications');

  // Check if current method needs subject combination
  const needsSubjectCombination = ['tot_nghiep'].includes(admissionMethod);

  useEffect(() => {
    // Fetch universities based on admission method
    if (admissionMethod) {
      fetchUniversities(admissionMethod);
    } else {
      fetchUniversities();
    }
  }, [admissionMethod]);

  useEffect(() => {
    // Fetch majors and admission periods when university is selected
    if (selectedUniversity) {
      fetchAdmissionPeriodsByUniversity(selectedUniversity);
      fetchUniversityMajors(selectedUniversity);
      setSelectedMajor('');
      setSelectedCombination('');
      setSelectedAdmissionPeriod('');
    }
  }, [selectedUniversity]);

  useEffect(() => {
    // Clear combination when major changes
    if (selectedMajor) {
      setSelectedCombination('');
    }
  }, [selectedMajor]);

  const handleUniversityChange = (value: string) => {
    setSelectedUniversity(value);
    form.setFieldsValue({ 
      major: undefined, 
      combination: undefined,
      admissionPeriod: undefined 
    });
  };

  const handleMajorChange = (value: string) => {
    setSelectedMajor(value);
    form.setFieldsValue({ combination: undefined });
  };

  const handleCombinationChange = (value: string) => {
    setSelectedCombination(value);
  };

  const handleAdmissionPeriodChange = (value: string) => {
    setSelectedAdmissionPeriod(value);
  };

  const handleBack = () => {
    history.goBack();
  };

  const handleNext = () => {
    updateFormData({
      universityMajorId: selectedMajor,
      subjectCombinationId: selectedCombination,
      admissionMethod: admissionMethod,
      university: selectedUniversity,
      admissionPeriodId: selectedAdmissionPeriod,
    });
    history.push(`/user/applications/new/step3`);
  };

  const isFormValid = () => {
    if (!selectedUniversity || !selectedMajor || !selectedAdmissionPeriod) return false;
    if (needsSubjectCombination && !selectedCombination) return false;
    return true;
  };

  // Filter subject combinations based on selected major
  const getAvailableCombinations = () => {
    if (!selectedMajor) return [];
    const selectedMajorData = universityMajors.find(major => major._id === selectedMajor);
    if (!selectedMajorData) return [];
    const availableCombinations = selectedMajorData.subject_combination_ids
    return availableCombinations
  };

  // Filter active admission periods
  const getActiveAdmissionPeriods = () => {
    console.log(admissionPeriods)
    return admissionPeriods.filter(period => period.isActive && period.status === 'open');
  };

  return (
    <div className="step2-page">
      <NewApplicationLayout currentStep={1}>
        <Card className="main-card">
          <div className="card-header">
            <h2>Bước 2: Chọn trường và ngành</h2>
            <p>Chọn trường đại học, ngành học và tổ hợp xét tuyển</p>
          </div>
          <div className="card-content">
            <Alert
              message={<b>Phương thức xét tuyển đã chọn:</b>}
              description={admissionMethodNames[admissionMethod as keyof typeof admissionMethodNames]}
              type="error"
              showIcon
              className="method-alert"
            />

            <Form
              form={form}
              layout="vertical"
              className="selection-form"
            >
              <Form.Item
                label="Trường đại học"
                name="university"
                rules={[{ required: true, message: 'Vui lòng chọn trường đại học' }]}
              >
                <Select
                  placeholder="Chọn trường đại học"
                  loading={universitiesLoading}
                  onChange={handleUniversityChange}
                  size="large"
                  showSearch
                  value={formData.university || selectedUniversity}
                  filterOption={(input, option) =>
                    (option?.children as unknown as string)?.toLowerCase().includes(input.toLowerCase())
                  }
                >
                  {universities.map((university: University) => (
                    <Option key={university._id} value={university._id}>
                      {university.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="Đợt tuyển sinh"
                name="admissionPeriod"
                rules={[{ required: true, message: 'Vui lòng chọn đợt tuyển sinh' }]}
              >
                <Select
                  placeholder={selectedUniversity ? "Chọn đợt tuyển sinh" : "Vui lòng chọn trường đại học trước"}
                  loading={periodsLoading}
                  onChange={handleAdmissionPeriodChange}
                  disabled={!selectedUniversity}
                  size="large"
                  value={formData.admissionPeriodId || selectedAdmissionPeriod}
                >
                  {getActiveAdmissionPeriods().map(period => (
                    <Option key={period._id} value={period._id}>
                      {period.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="Ngành học"
                name="major"
                rules={[{ required: true, message: 'Vui lòng chọn ngành học' }]}
              >
                <Select
                  placeholder={selectedUniversity ? "Chọn ngành học" : "Vui lòng chọn trường đại học trước"}
                  loading={majorsLoading}
                  onChange={handleMajorChange}
                  disabled={!selectedUniversity}
                  size="large"
                  showSearch
                  value={formData.universityMajorId || selectedMajor}
                  filterOption={(input, option) =>
                    (option?.children as unknown as string)?.toLowerCase().includes(input.toLowerCase())
                  }
                >
                  {universityMajors
                    .filter(major => major.admission_methods.includes(admissionMethod))
                    .map(major => (
                      <Option key={major._id} value={major._id}>
                        {major.name}
                      </Option>
                    ))}
                </Select>
              </Form.Item>

              {selectedMajor && needsSubjectCombination && (
                <Form.Item
                  label="Tổ hợp xét tuyển"
                  name="combination"
                  rules={[{ required: true, message: 'Vui lòng chọn tổ hợp xét tuyển' }]}
                >
                  <Select
                    placeholder={selectedMajor ? "Chọn tổ hợp xét tuyển" : "Vui lòng chọn ngành học trước"}
                    onChange={handleCombinationChange}
                    disabled={!selectedMajor}
                    size="large"
                    showSearch
                    value={formData.subjectCombinationId || selectedCombination}
                  >
                    {getAvailableCombinations().map(combination => (
                      <Option key={combination._id} value={combination._id}>
                        {combination.code} ({combination.subjects.join(', ')})
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              )}
            </Form>

            { selectedMajor && needsSubjectCombination && (
              <Alert
                message="Lưu ý về tổ hợp xét tuyển"
                description="Tổ hợp xét tuyển sẽ được sử dụng để tính điểm xét tuyển. Vui lòng chọn tổ hợp phù hợp với điểm số của bạn."
                type="warning"
                showIcon
                className="combination-note"
              />
            )}
          </div>
          <div className="card-footer">
            <Button onClick={handleBack} icon={<ArrowLeftOutlined />}>
              Quay lại
            </Button>
            <Button
              type="primary"
              icon={<ArrowRightOutlined />}
              onClick={handleNext}
              disabled={!isFormValid()}
            >
              Tiếp tục
            </Button>
          </div>
        </Card>
      </NewApplicationLayout>
    </div>
  );
};

export default Step2Page;