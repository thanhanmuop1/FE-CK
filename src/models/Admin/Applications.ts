import { useState, useCallback } from 'react';
import { message } from 'antd';
import {
  getAllApplications,
  getApplicationsByUniversity,
  updateApplicationStatus,
  Application,
  ApplicationsResponse,
  UpdateStatusRequest,
  getApplicationsGroupedByMajorOfUniversity,
  GroupedApplication,
} from '@/services/Admin/Applications';

export default () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(false);
  const [groupedApplications, setGroupedApplications] = useState<GroupedApplication[]>([]);

  // Fetch all applications
  const fetchApplications = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getAllApplications();
      if (res.success) {
        setApplications(res.data);
      } else {
        message.error('Không thể tải danh sách đơn xét tuyển');
      }
    } catch (error) {
      message.error('Lỗi kết nối API');
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch applications by university
  const fetchApplicationsByUniversity = useCallback(async (universityId: string) => {
    setLoading(true);
    try {
      const res = await getApplicationsByUniversity(universityId);
      if (res.success) {
        setApplications(res.data);
      } else {
        message.error('Không thể tải danh sách đơn xét tuyển');
      }
    } catch (error) {
      message.error('Lỗi kết nối API');
      console.error('Error fetching applications by university:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Update application status
  const updateStatus = useCallback(async (applicationId: string, data: UpdateStatusRequest) => {
    setLoading(true);
    try {
      const res = await updateApplicationStatus(applicationId, data);
      if (res.success) {
        message.success('Cập nhật trạng thái đơn xét tuyển thành công');
        fetchApplications();
      } else {
        message.error('Không thể cập nhật trạng thái đơn xét tuyển');
      }
    } catch (error) {
      message.error('Lỗi kết nối API');
      console.error('Error updating application status:', error);
    } finally {
      setLoading(false);
    }
  }, [fetchApplications]);

  // Fetch applications grouped by major
  const fetchApplicationsGroupedByMajor = useCallback(async (universityId: string) => {
    setLoading(true);
    try {
      const res = await getApplicationsGroupedByMajorOfUniversity(universityId);
      if (res.success) {
        setGroupedApplications(res.data);
      } else {
        message.error('Không thể tải danh sách đơn xét tuyển');
      }
    } catch (error) {
      message.error('Lỗi kết nối API');
      console.error('Error fetching grouped applications:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    applications,
    loading,
    fetchApplications,
    fetchApplicationsByUniversity,
    updateStatus,
    groupedApplications,
    fetchApplicationsGroupedByMajor,
  };
}; 