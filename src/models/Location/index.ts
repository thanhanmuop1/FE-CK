import { useState, useCallback } from 'react';
import { message } from 'antd';
import { getProvinces, getDistricts, Province, District } from '@/services/Location';

export default function useLocationModel() {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<{ [provinceId: string]: District[] }>({});
  const [loading, setLoading] = useState(false);
  const [loadingDistricts, setLoadingDistricts] = useState<{ [provinceId: string]: boolean }>({});

  // Fetch all provinces
  const fetchProvinces = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getProvinces();
      
      if (response.code === 'success') {
        setProvinces(response.data);
      } else {
        message.error('Không thể tải danh sách tỉnh/thành phố');
      }
    } catch (error) {
      console.error('Error fetching provinces:', error);
      message.error('Lỗi khi tải danh sách tỉnh/thành phố');
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch districts by province ID
  const fetchDistricts = useCallback(async (provinceId: string) => {
    // Nếu đã có data cho province này thì không fetch lại
    if (districts[provinceId]) {
      return districts[provinceId];
    }

    try {
      setLoadingDistricts(prev => ({ ...prev, [provinceId]: true }));
      const response = await getDistricts(provinceId);
      
      if (response.code === 'success') {
        setDistricts(prev => ({
          ...prev,
          [provinceId]: response.data,
        }));
        return response.data;
      } else {
        message.error('Không thể tải danh sách quận/huyện');
        return [];
      }
    } catch (error) {
      console.error('Error fetching districts:', error);
      message.error('Lỗi khi tải danh sách quận/huyện');
      return [];
    } finally {
      setLoadingDistricts(prev => ({ ...prev, [provinceId]: false }));
    }
  }, [districts]);

  // Get districts for a specific province
  const getDistrictsByProvince = useCallback((provinceId: string) => {
    return districts[provinceId] || [];
  }, [districts]);

  // Check if districts are loading for a specific province
  const isLoadingDistricts = useCallback((provinceId: string) => {
    return loadingDistricts[provinceId] || false;
  }, [loadingDistricts]);

  return {
    provinces,
    districts,
    loading,
    fetchProvinces,
    fetchDistricts,
    getDistrictsByProvince,
    isLoadingDistricts,
  };
} 