export interface University {
  _id: string;
  name: string;
  code: string;
  address: string;
  created_at: string;
  updated_at: string;
}

export interface UniversityListResponse {
  success: boolean;
  data: University[];
  message?: string;
}

export interface UniversityDetailResponse {
  success: boolean;
  data: University;
  message?: string;
}
