import axios from '@/utils/axios';
import type { AdmissionPeriodListResponse, AdmissionPeriodDetailResponse } from '@/models/User/AdmissionPeriods';

const BASE_URL = 'http://localhost:3456/users/admission-periods';

export async function getAdmissionPeriodsByUniversityId(universityId: string): Promise<AdmissionPeriodListResponse> {
  const response = await axios.get(`${BASE_URL}/university/${universityId}`);
  return response.data;
} 

export async function getAdmissionPeriodById(periodId: string): Promise<AdmissionPeriodDetailResponse> {
  const response = await axios.get(`${BASE_URL}/${periodId}`);
  return response.data;
}
