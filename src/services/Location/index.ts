import request from '@/utils/axios';

// Types cho Location API
export interface Province {
  id: string;
  name: string;
  type: number;
  typeText: string;
  slug: string;
}

export interface District {
  id: string;
  name: string;
  type: number;
  typeText: string;
  slug: string;
  provinceId: string;
}

export interface ProvincesResponse {
  total: number;
  data: Province[];
  code: string;
  message: string | null;
}

export interface DistrictsResponse {
  total: number;
  data: District[];
  code: string;
  message: string | null;
}

// API functions
export async function getProvinces(): Promise<ProvincesResponse> {
  const response = await request('https://open.oapi.vn/location/provinces', {
    method: 'GET',
  });
  return response.data;
}

export async function getDistricts(provinceId: string): Promise<DistrictsResponse> {
  const response = await request(`https://open.oapi.vn/location/districts/${provinceId}`, {
    method: 'GET',
  });
  return response.data;
} 