import React, { useEffect, useState } from 'react';
import { fetchDashboardData } from '@/models/User/dashboard';
import WelcomeBox from './components/WelcomeBox';
import StatsBox from './components/StatsBox';
import AdmissionList from './components/AdmissionList';
import useUniversityMajorsModel from '@/models/User/university_majors';
import useSubjectCombinationsModel from '@/models/User/subject_combinations';
import './Dashboard.less';

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<any>({});
  const [admissions, setAdmissions] = useState<any[]>([]);

  // Lấy danh sách ngành và tổ hợp môn
  const { universityMajors, fetchUniversityMajors } = useUniversityMajorsModel();
  const { subjectCombinations, fetchSubjectCombinations } = useSubjectCombinationsModel();

  useEffect(() => {
    fetchDashboardData().then(({ user, admissions }) => {
      setUser(user);
      setAdmissions(admissions);

      if (admissions.length > 0 && admissions[0].universityId) {
        fetchUniversityMajors(admissions[0].universityId);
      }
    });
    fetchSubjectCombinations();
  }, []);

  // Tính lại stats từ admissions
  const stats = {
    created: admissions.length,
    pending: admissions.filter(item => item.status === 'cho_duyet').length,
    approved: admissions.filter(item => item.status === 'da_duyet').length,
    // Nếu muốn thêm từ chối:
    // rejected: admissions.filter(item => item.status === 'tu_choi').length,
  };

  return (
    <div className="dashboard-page">
      <WelcomeBox name={user?.data?.name || ''} />
      <StatsBox stats={stats} />
      <AdmissionList
        admissions={admissions}
        universityMajors={universityMajors}
        subjectCombinations={subjectCombinations}
      />
    </div>
  );
};

export default Dashboard;