import request from '@/utils/axios';

export interface UniversityMajor {
    status: number;
    success: boolean;
    message: string;
    data: {
        _id: string;
        name: string;
        code: string;
        admission_methods: string[];
        subject_combination_ids: string[];
    }[];
}

export const getUniversityMajors = async (universityId: string): Promise<UniversityMajor> => {
    const response = await request.get(`http://localhost:3456/users/university-majors/${universityId}/majors`);
    return response.data;
};

// export const getUniversityMajorById = async (universityId: string, majorId: string): Promise<UniversityMajor> => {
//     const response = await request.get(`http://localhost:3456/admin/university_majors/${universityId}/majors/${majorId}`);
//     return response.data;
// };



