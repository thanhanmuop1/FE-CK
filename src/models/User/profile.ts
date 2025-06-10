import { useState, useCallback } from 'react';
import { message } from 'antd';
import {
  getUserProfile,
  updateUserProfile,
  getHighSchoolProfile,
  updateHighSchoolProfile,
  UpdateUserProfileRequest,
  UpdateHighSchoolProfileRequest,
} from '@/services/User/Profile';

// Combined profile state
export interface ProfileState {
  // Personal info
  _id: string;
  name: string;
  email: string;
  gender: string;
  dob: string | null;
  avatar: string;
  cccd: string;
  phone: string;
  ethnic: string;
  province: string;
  district: string;
  address: string;
  status: string;
  
  // High school info
  highSchoolId: string;
  gpaGrade10: number | null;
  gpaGrade11: number | null;
  gpaGrade12: number | null;
  graduationYear: number | null;
  highSchoolName: string;
  priorityArea: string;
  priorityGroup: string;
}

export default function useProfileModel() {
  const [profileData, setProfileData] = useState<ProfileState | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Fetch both profiles
  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      
      const [userProfileRes, highSchoolProfileRes] = await Promise.all([
        getUserProfile(),
        getHighSchoolProfile(),
      ]);

      if (userProfileRes.success && highSchoolProfileRes.success) {
        const combinedData: ProfileState = {
          // Personal info from user profile
          _id: userProfileRes.data._id,
          name: userProfileRes.data.name,
          email: userProfileRes.data.email,
          gender: userProfileRes.data.gender,
          dob: userProfileRes.data.dob,
          avatar: userProfileRes.data.avatar,
          cccd: userProfileRes.data.cccd,
          phone: userProfileRes.data.phone,
          ethnic: userProfileRes.data.ethnic,
          province: userProfileRes.data.province,
          district: userProfileRes.data.district,
          address: userProfileRes.data.address,
          status: userProfileRes.data.status,
          
          // High school info
          highSchoolId: highSchoolProfileRes.data?._id,
          gpaGrade10: highSchoolProfileRes.data?.gpaGrade10 || null,
          gpaGrade11: highSchoolProfileRes.data?.gpaGrade11 || null,
          gpaGrade12: highSchoolProfileRes.data?.gpaGrade12 || null,
          graduationYear: highSchoolProfileRes?.data.graduationYear || null,
          highSchoolName: highSchoolProfileRes?.data.highSchoolName || '',
          priorityArea: highSchoolProfileRes?.data.priorityArea || '',
          priorityGroup: highSchoolProfileRes?.data.priorityGroup || '',
        };

        setProfileData(combinedData);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      message.error('Không thể tải thông tin hồ sơ');
    } finally {
      setLoading(false);
    }
  }, []);

  // Update personal info
  const updatePersonalInfo = useCallback(async (data: UpdateUserProfileRequest) => {
    try {
      setSaving(true);
      const response = await updateUserProfile(data);
      console.log(response)
      if (response.success) {
        // Update local state
        setProfileData(prev => prev ? {
          ...prev,
          ...response.data,
        } : null);
        
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error updating personal info:', error);
      message.error('Không thể cập nhật thông tin cá nhân');
      return false;
    } finally {
      setSaving(false);
    }
  }, []);

  // Update high school info
  const updateEducationInfo = useCallback(async (data: UpdateHighSchoolProfileRequest) => {
    try {
      setSaving(true);
      const response = await updateHighSchoolProfile(data);
      
      if (response.success) {
        // Update local state
        setProfileData(prev => prev ? {
          ...prev,
          gpaGrade10: response.data.gpaGrade10,
          gpaGrade11: response.data.gpaGrade11,
          gpaGrade12: response.data.gpaGrade12,
          graduationYear: response.data.graduationYear,
          highSchoolName: response.data.highSchoolName,
          priorityArea: response.data.priorityArea,
          priorityGroup: response.data.priorityGroup,
        } : null);
        
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error updating education info:', error);
      message.error('Không thể cập nhật thông tin học tập');
      return false;
    } finally {
      setSaving(false);
    }
  }, []);

  // Save all profile data
  const saveProfile = useCallback(async (personalData: Omit<UpdateUserProfileRequest, 'email'>, educationData: UpdateHighSchoolProfileRequest) => {
    try {
      setSaving(true);
      
      // Đảm bảo email được bao gồm trong request
      const personalDataWithEmail: UpdateUserProfileRequest = {
        ...personalData,
        email: profileData?.email || '', // Sử dụng email hiện tại
      };
      
      const [personalResult, educationResult] = await Promise.all([
        updatePersonalInfo(personalDataWithEmail),
        updateEducationInfo(educationData),
      ]);

      if (personalResult && educationResult) {
        message.success('Lưu thông tin hồ sơ thành công');
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error saving profile:', error);
      message.error('Không thể lưu thông tin hồ sơ');
      return false;
    } finally {
      setSaving(false);
    }
  }, [profileData?.email, updatePersonalInfo, updateEducationInfo]);

  return {
    profileData,
    loading,
    saving,
    fetchProfile,
    updatePersonalInfo,
    updateEducationInfo,
    saveProfile,
  };
} 