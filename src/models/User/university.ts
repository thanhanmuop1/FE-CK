import { useState, useCallback, useEffect } from 'react';
import { message } from 'antd';
import { getUniversities, getUniversitiesByAdmissionMethod } from '@/services/User/university';

export interface University {
    _id: string;
    name: string;
    code: string;
    address: string;
    majors?: Array<{
        _id: string;
        name: string;
        code: string;
        admission_methods: string[];
    }>;
}

export default function useUniversityModel() {
    const [universities, setUniversities] = useState<University[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchUniversities = useCallback(async (admissionMethod?: string) => {
        try {
            setLoading(true);
            const response = admissionMethod 
                ? await getUniversitiesByAdmissionMethod(admissionMethod)
                : await getUniversities();

            if (response.success) {
                setUniversities(response.data);
            } else {
                message.error(response.message);
            }
        } catch (error) {
            message.error('Lấy danh sách trường đại học thất bại');
        } finally {
            setLoading(false);
        }
    }, []);

    return { universities, loading, fetchUniversities };
}
