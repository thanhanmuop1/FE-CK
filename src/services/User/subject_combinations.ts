import request from '@/utils/axios';
import { BASE_URL } from '@/utils/utils';

export interface SubjectCombination {
    status: number;
    success: boolean;
    message: string;
    data: {
        _id: string;
        code: string;
        subjects: string[];
    }[];
}

export const getSubjectCombinations = async (): Promise<SubjectCombination> => {
    const response = await request.get(`${BASE_URL}/users/subject-combinations`);
    return response.data;
};