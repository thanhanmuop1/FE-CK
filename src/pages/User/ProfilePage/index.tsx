import React, { useState, useEffect } from 'react';
import { Button, Tabs, Spin } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import { useModel } from 'umi';
import moment from 'moment';
import ProfileHeader from './components/ProfileHeader';
import PersonalInfoForm from './components/PersonalInfoForm';
import EducationInfoForm from './components/EducationInfoForm';
import styles from './index.less';
import { PersonalInfo, EducationInfo } from './type';

const { TabPane } = Tabs;

interface FormData extends PersonalInfo, EducationInfo {}

const ProfilePage: React.FC = () => {
  const { profileData, loading, saving, fetchProfile, saveProfile } = useModel('User.profile');
  
  const [formData, setFormData] = useState<FormData>({
    // Personal Info
    fullName: '',
    dob: '',
    gender: '',
    idNumber: '',
    phone: '',
    email: '',
    address: '',
    province: '',
    district: '',
    ethnic: '',
    // Education Info
    school: '',
    grade10: null,
    grade11: null,
    grade12: null,
    graduationYear: '',
    priorityArea: '',
    priorityObject: '',
  });

  const [activeTab, setActiveTab] = useState('personal');

  // Load profile data on component mount
  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  // Update form data when profile data changes
  useEffect(() => {
    if (profileData) {
      setFormData({
        // Map API data to form data
        fullName: profileData.name || '',
        dob: profileData.dob || '',
        gender: profileData.gender || '',
        idNumber: profileData.cccd || '',
        phone: profileData.phone || '',
        email: profileData.email || '',
        address: profileData.address || '',
        province: profileData.province || '',
        district: profileData.district || '',
        ethnic: profileData.ethnic || '',
        school: profileData.highSchoolName || '',
        grade10: profileData.gpaGrade10 || null,
        grade11: profileData.gpaGrade11 || null,
        grade12: profileData.gpaGrade12 || null,
        graduationYear: profileData.graduationYear?.toString() || '',
        priorityArea: profileData.priorityArea || '',
        priorityObject: profileData.priorityGroup || '',
      });
    }
  }, [profileData]);

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDateChange = (field: string, date: moment.Moment | null, dateString: string) => {
    handleChange(field, dateString);
  };

  const handleSubmit = async () => {
    // Prepare data for API calls
    const personalData = {
      name: formData.fullName,
      gender: formData.gender,
      dob: formData.dob,
      cccd: formData.idNumber,
      phone: formData.phone,
      ethnic: formData.ethnic,
      province: formData.province, // Gửi ID của province
      district: formData.district, // Gửi ID của district
      address: formData.address,
    };

    const educationData = {
      highSchoolName: formData.school,
      gpaGrade10: formData.grade10,
      gpaGrade11: formData.grade11,
      gpaGrade12: formData.grade12,
      graduationYear: formData.graduationYear ? parseInt(formData.graduationYear) : null,
      priorityArea: formData.priorityArea,
      priorityGroup: formData.priorityObject,
    };

    const success = await saveProfile(personalData, educationData);
    
    if (success) {
      console.log('Profile saved successfully');
    }
  };

  // Extract personal info from formData
  const personalInfo: PersonalInfo = {
    fullName: formData.fullName,
    dob: formData.dob,
    gender: formData.gender,
    idNumber: formData.idNumber,
    phone: formData.phone,
    email: formData.email,
    address: formData.address,
    province: formData.province,
    district: formData.district,
    ethnic: formData.ethnic,
  };

  // Extract education info from formData
  const educationInfo: EducationInfo = {
    school: formData.school,
    grade10: formData.grade10,
    grade11: formData.grade11,
    grade12: formData.grade12,
    graduationYear: formData.graduationYear,
    priorityArea: formData.priorityArea,
    priorityObject: formData.priorityObject,
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <Spin size="large" tip="Đang tải thông tin hồ sơ..." />
      </div>
    );
  }

  return (
    <div className={styles.profilePageContainer}>
      <ProfileHeader onSave={handleSubmit} loading={saving} />

      <Tabs 
        activeKey={activeTab} 
        onChange={setActiveTab} 
        className={styles.profileTabs}
      >
        <TabPane tab="Thông tin cá nhân" key="personal">
          <PersonalInfoForm
            data={personalInfo}
            onChange={handleChange}
            onDateChange={handleDateChange}
          />
        </TabPane>

        <TabPane tab="Thông tin học tập" key="education">
          <EducationInfoForm
            data={educationInfo}
            onChange={handleChange}
          />
        </TabPane>
      </Tabs>
      
      <div className={styles.saveButtonMobileContainer}>
        <Button 
          type="primary" 
          icon={<SaveOutlined />} 
          onClick={handleSubmit}
          loading={saving}
          block
        >
          Lưu thông tin
        </Button>
      </div>
    </div>
  );
};

export default ProfilePage; 