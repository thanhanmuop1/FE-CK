import { useState, useCallback } from 'react';
import { message } from 'antd';
import { getSubjectCombinations } from '@/services/User/subject_combinations';

export interface SubjectCombination {
    _id: string;
    code: string;
    subjects: string[];
}

export default function useSubjectCombinationsModel() {
    const [subjectCombinations, setSubjectCombinations] = useState<SubjectCombination[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchSubjectCombinations = useCallback(async () => {
        try {
            setLoading(true);
            const response = await getSubjectCombinations();
            if (response.success) {
                setSubjectCombinations(response.data);
            } else {
                message.error('Lấy danh sách tổ hợp môn thi thất bại');
            }
        } catch (error) {
            message.error('Lấy danh sách tổ hợp môn thi thất bại');
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        subjectCombinations,
        loading,
        fetchSubjectCombinations,
    };
}

