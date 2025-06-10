import request from '@/utils/axios';

interface University {
    success: boolean;
    message: string;
    data: {
        _id: string;
        name: string;
        code: string;
        address: string;
        majors: Array<{
            _id: string;
            name: string;
            code: string;
            admission_methods: string[];
        }>;
    }[];
}

export const getUniversities = async (): Promise<University> => {
    const response = await request.get('http://localhost:3456/users/universities');
    return response.data;
};

export const getUniversitiesByAdmissionMethod = async (admissionMethod: string): Promise<University> => {
    const response = await request.get(`http://localhost:3456/users/universities/university/admission-method?admissionMethod=${admissionMethod}`);
    return response.data;
};

