import axios from '@/utils/axios';
import type { AdmissionPeriodListResponse, AdmissionPeriodDetailResponse } from '@/models/User/AdmissionPeriods';
import { BASE_URL } from '@/utils/utils';

export async function getAdmissionPeriodsByUniversityId(universityId: string): Promise<AdmissionPeriodListResponse> {
  const response = await axios.get(`${BASE_URL}/users/admission-periods/university/${universityId}`);
  return response.data;
} 

export async function getAdmissionPeriodById(periodId: string): Promise<AdmissionPeriodDetailResponse> {
  const response = await axios.get(`${BASE_URL}/users/admission-periods/${periodId}`);
  return response.data;
}
