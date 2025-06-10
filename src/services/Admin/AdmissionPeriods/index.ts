import axios from '@/utils/axios';
import type { AdmissionPeriod, AdmissionPeriodListResponse, AdmissionPeriodDetailResponse } from '@/models/Admin/AdmissionPeriods';

const BASE_URL = 'http://localhost:3456/admin/admission-periods';

export async function getAllAdmissionPeriods(): Promise<AdmissionPeriodListResponse> {
  const response = await axios.get(BASE_URL);
  return response.data;
}

export async function getAdmissionPeriodById(periodId: string): Promise<AdmissionPeriodDetailResponse> {
  const response = await axios.get(`${BASE_URL}/${periodId}`);
  return response.data;
}

export async function createAdmissionPeriod(data: Omit<AdmissionPeriod, '_id' | 'created_at' | 'updated_at'>): Promise<AdmissionPeriodDetailResponse> {
  const response = await axios.post(BASE_URL, data);
  return response.data;
}

export async function updateAdmissionPeriod(periodId: string, data: Partial<Omit<AdmissionPeriod, '_id' | 'created_at' | 'updated_at'>>): Promise<AdmissionPeriodDetailResponse> {
  const response = await axios.put(`${BASE_URL}/${periodId}`, data);
  return response.data;
}

export async function deleteAdmissionPeriod(periodId: string): Promise<AdmissionPeriodDetailResponse> {
  const response = await axios.delete(`${BASE_URL}/${periodId}`);
  return response.data;
}

export async function getAdmissionPeriodsByUniversityId(universityId: string): Promise<AdmissionPeriodListResponse> {
  const response = await axios.get(`${BASE_URL}/university/${universityId}`);
  return response.data;
} 