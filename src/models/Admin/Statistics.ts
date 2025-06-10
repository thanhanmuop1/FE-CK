import { useState, useCallback } from 'react';
import { message } from 'antd';
import {
  getStatisticsByUniversity,
  getStatisticsByMajor,
  getStatisticsByStatus,
  getStatisticsByDate,
  getStatisticsByMonth,
  getStatisticsByYear,
  getStatisticsBetweenUniversities,
} from '@/services/Admin/Statistics';

export interface UniversityStatistics {
  universityName: string;
  universityCode: string;
  count: number;
  statusBreakdown: {
    pending: number;
    approved: number;
    rejected: number;
  };
}

export interface MajorStatistics {
  majorName: string;
  majorCode: string;
  universityName: string;
  count: number;
}

export interface StatusStatistics {
  _id: string;
  count: number;
}

export interface DateStatistics {
  date: string;
  count: number;
}

export interface YearStatistics {
  year: number;
  count: number;
}

export default () => {
  // States
  const [universityStats, setUniversityStats] = useState<UniversityStatistics[]>([]);
  const [majorStats, setMajorStats] = useState<MajorStatistics[]>([]);
  const [statusStats, setStatusStats] = useState<StatusStatistics[]>([]);
  const [dateStats, setDateStats] = useState<DateStatistics[]>([]);
  const [monthStats, setMonthStats] = useState<DateStatistics[]>([]);
  const [yearStats, setYearStats] = useState<YearStatistics[]>([]);
  const [betweenUniversitiesStats, setBetweenUniversitiesStats] = useState<UniversityStatistics[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch university statistics
  const fetchUniversityStats = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getStatisticsByUniversity();
      if (response.success) {
        setUniversityStats(response.data);
      } else {
        message.error('Không thể tải thống kê theo trường');
      }
    } catch (error) {
      message.error('Lỗi kết nối API');
      console.error('Error fetching university stats:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch major statistics
  const fetchMajorStats = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getStatisticsByMajor();
      if (response.success) {
        setMajorStats(response.data);
      } else {
        message.error('Không thể tải thống kê theo ngành');
      }
    } catch (error) {
      message.error('Lỗi kết nối API');
      console.error('Error fetching major stats:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch status statistics
  const fetchStatusStats = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getStatisticsByStatus();
      if (response.success) {
        setStatusStats(response.data);
      } else {
        message.error('Không thể tải thống kê theo trạng thái');
      }
    } catch (error) {
      message.error('Lỗi kết nối API');
      console.error('Error fetching status stats:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch date statistics
  const fetchDateStats = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getStatisticsByDate();
      if (response.success) {
        // Sort by date
        const sortedData = response.data.sort((a, b) => 
          new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        setDateStats(sortedData);
      } else {
        message.error('Không thể tải thống kê theo ngày');
      }
    } catch (error) {
      message.error('Lỗi kết nối API');
      console.error('Error fetching date stats:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch month statistics
  const fetchMonthStats = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getStatisticsByMonth();
      if (response.success) {
        // Sort by date
        const sortedData = response.data.sort((a, b) => 
          new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        setMonthStats(sortedData);
      } else {
        message.error('Không thể tải thống kê theo tháng');
      }
    } catch (error) {
      message.error('Lỗi kết nối API');
      console.error('Error fetching month stats:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch year statistics
  const fetchYearStats = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getStatisticsByYear();
      if (response.success) {
        // Sort by year
        const sortedData = response.data.sort((a, b) => a.year - b.year);
        setYearStats(sortedData);
      } else {
        message.error('Không thể tải thống kê theo năm');
      }
    } catch (error) {
      message.error('Lỗi kết nối API');
      console.error('Error fetching year stats:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch between universities statistics
  const fetchBetweenUniversitiesStats = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getStatisticsBetweenUniversities();
      if (response.success) {
        setBetweenUniversitiesStats(response.data);
      } else {
        message.error('Không thể tải thống kê giữa các trường');
      }
    } catch (error) {
      message.error('Lỗi kết nối API');
      console.error('Error fetching between universities stats:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    // States
    universityStats,
    majorStats,
    statusStats,
    dateStats,
    monthStats,
    yearStats,
    betweenUniversitiesStats,
    loading,

    // Actions
    fetchUniversityStats,
    fetchMajorStats,
    fetchStatusStats,
    fetchDateStats,
    fetchMonthStats,
    fetchYearStats,
    fetchBetweenUniversitiesStats,

    // Helper functions
    getTotalApplications: useCallback(() => {
      return universityStats.reduce((total, stat) => total + stat.count, 0);
    }, [universityStats]),

    getTopUniversities: useCallback((limit: number = 5) => {
      return [...universityStats]
        .sort((a, b) => b.count - a.count)
        .slice(0, limit);
    }, [universityStats]),

    getTopMajors: useCallback((limit: number = 5) => {
      return [...majorStats]
        .sort((a, b) => b.count - a.count)
        .slice(0, limit);
    }, [majorStats]),
  };
}; 