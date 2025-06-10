import request from '@/utils/axios';
import { BASE_URL } from '@/utils/utils';

// Types cho API responses
export interface UserProfileResponse {
  status: number;
  success: boolean;
  message: string;
  data: {
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
    created_at: string;
    updated_at: string;
  };
}

export interface HighSchoolProfileResponse {
  success: boolean;
  data: {
    _id: string;
    userId: string;
    created_at: string;
    gpaGrade10: number | null;
    gpaGrade11: number | null;
    gpaGrade12: number | null;
    graduationYear: number | null;
    highSchoolName: string;
    priorityArea: string;
    priorityGroup: string;
    updated_at: string;
  };
}

// Request types
export interface UpdateUserProfileRequest {
  name?: string;
  email: string;
  gender?: string;
  dob?: string;
  cccd?: string;
  phone?: string;
  ethnic?: string;
  province?: string;
  district?: string;
  address?: string;
}

export interface UpdateHighSchoolProfileRequest {
  gpaGrade10?: number | null;
  gpaGrade11?: number | null;
  gpaGrade12?: number | null;
  graduationYear?: number | null;
  highSchoolName?: string;
  priorityArea?: string;
  priorityGroup?: string;
}

// API functions

export async function getUserProfile(): Promise<UserProfileResponse> {
  const response = await request(`${BASE_URL}/users/profile`, {
    method: 'GET',
  });
  return response.data;
}

export async function updateUserProfile(data: UpdateUserProfileRequest): Promise<UserProfileResponse> {
  const response = await request(`${BASE_URL}/users/profile`, {
    method: 'PUT',
    data,
  });
  return response.data;
}

export async function getHighSchoolProfile(): Promise<HighSchoolProfileResponse> {
  const response = await request(`${BASE_URL}/users/high-school-profile`, {
    method: 'GET',
  });
  return response.data;
}

export async function updateHighSchoolProfile(data: UpdateHighSchoolProfileRequest): Promise<HighSchoolProfileResponse> {
  const response = await request(`${BASE_URL}/users/high-school-profile`, {
    method: 'PUT',
    data,
  });
  return response.data;
} 