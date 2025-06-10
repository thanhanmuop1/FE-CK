import axios from '@/utils/axios';

export interface StatisticsResponse {
  success: boolean;
  data: any[];
  message?: string;
}

export interface UniversityStatistics {
  universityName: string;
  universityCode: string;
  totalApplications: number;
  statusBreakdown: {
    pending: number;
    approved: number;
    rejected: number;
  };
}

export interface DateStatistics {
  date: string;
  count: number;
}

export interface YearStatistics {
  year: number;
  count: number;
}

export interface StatusStatistics {
  _id: string;
  count: number;
}

const BASE_URL = 'http://localhost:3456/admin/statistics';

export async function getStatisticsByUniversity() {
  const response = await axios.get(`${BASE_URL}/by-university`);
  return response.data;
}

export async function getStatisticsByMajor() {
  const response = await axios.get(`${BASE_URL}/by-major`);
  return response.data;
}

export async function getStatisticsByStatus() {
  const response = await axios.get(`${BASE_URL}/by-status`);
  return response.data;
}

export async function getStatisticsByDate() {
  const response = await axios.get(`${BASE_URL}/by-date`);
  return response.data;
}

export async function getStatisticsByMonth() {
  const response = await axios.get(`${BASE_URL}/by-month`);
  return response.data;
}

export async function getStatisticsByYear() {
  const response = await axios.get(`${BASE_URL}/by-year`);
  return response.data;
}

export async function getStatisticsBetweenUniversities() {
  const response = await axios.get(`${BASE_URL}/between-universities`);
  return response.data;
}
