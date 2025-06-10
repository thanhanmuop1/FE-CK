import { useState, useCallback } from 'react';
import { message } from 'antd';
import { getUniversityMajors } from '@/services/User/university_majors';

export interface UniversityMajor {
    _id: string;
    name: string;
    code: string;
    admission_methods: string[];
    subject_combination_ids: string[];
}

export default function useUniversityMajorsModel() {
    const [universityMajors, setUniversityMajors] = useState<UniversityMajor[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchUniversityMajors = useCallback(async (universityId: string) => {
        console.log('universityId', universityId);
        try {
            setLoading(true);
            const response = await getUniversityMajors(universityId);
            if (response.success) {
                setUniversityMajors(response.data);
            } else {
                message.error('Lấy danh sách ngành thất bại');
            }
        } catch (error) {
            message.error('Lấy danh sách ngành thất bại');
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        universityMajors,
        loading,
        fetchUniversityMajors,
    };
}




