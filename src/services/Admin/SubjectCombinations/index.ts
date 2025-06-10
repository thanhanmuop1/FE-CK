import axios from '@/utils/axios';
import type { SubjectCombination, SubjectCombinationListResponse, SubjectCombinationDetailResponse } from '@/models/Admin/SubjectCombinations';
import { BASE_URL } from '@/utils/utils';

export async function getAllSubjectCombinations(): Promise<SubjectCombinationListResponse> {
  const response = await axios.get(`${BASE_URL}/admin/subject-combinations`);
  return response.data;
}

export async function getSubjectCombinationById(combinationId: string): Promise<SubjectCombinationDetailResponse> {
  const response = await axios.get(`${BASE_URL}/admin/subject-combinations/${combinationId}`);
  return response.data;
}

export async function createSubjectCombination(data: Omit<SubjectCombination, '_id'>): Promise<SubjectCombinationDetailResponse> {
  const response = await axios.post(`${BASE_URL}/admin/subject-combinations`, data);
  return response.data;
}

export async function updateSubjectCombination(combinationId: string, data: Partial<Omit<SubjectCombination, '_id'>>): Promise<SubjectCombinationDetailResponse> {
  const response = await axios.put(`${BASE_URL}/admin/subject-combinations/${combinationId}`, data);
  return response.data;
}

export async function deleteSubjectCombination(combinationId: string): Promise<SubjectCombinationDetailResponse> {
  const response = await axios.delete(`${BASE_URL}/admin/subject-combinations/${combinationId}`);
  return response.data;
} 