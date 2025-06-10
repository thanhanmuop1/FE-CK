import request from '@/utils/axios';

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
    const response = await request.get('http://localhost:3456/users/subject-combinations');
    return response.data;
};