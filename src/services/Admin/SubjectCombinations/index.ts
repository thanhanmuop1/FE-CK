import axios from '@/utils/axios';
import type { SubjectCombination, SubjectCombinationListResponse, SubjectCombinationDetailResponse } from '@/models/Admin/SubjectCombinations';

const BASE_URL = 'http://localhost:3456/admin/subject-combinations';

export async function getAllSubjectCombinations(): Promise<SubjectCombinationListResponse> {
  const response = await axios.get(BASE_URL);
  return response.data;
}

export async function getSubjectCombinationById(combinationId: string): Promise<SubjectCombinationDetailResponse> {
  const response = await axios.get(`${BASE_URL}/${combinationId}`);
  return response.data;
}

export async function createSubjectCombination(data: Omit<SubjectCombination, '_id'>): Promise<SubjectCombinationDetailResponse> {
  const response = await axios.post(BASE_URL, data);
  return response.data;
}

export async function updateSubjectCombination(combinationId: string, data: Partial<Omit<SubjectCombination, '_id'>>): Promise<SubjectCombinationDetailResponse> {
  const response = await axios.put(`${BASE_URL}/${combinationId}`, data);
  return response.data;
}

export async function deleteSubjectCombination(combinationId: string): Promise<SubjectCombinationDetailResponse> {
  const response = await axios.delete(`${BASE_URL}/${combinationId}`);
  return response.data;
} 