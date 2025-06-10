import React, { useEffect, useState } from 'react';
import { useModel } from 'umi';
import OverviewCards from './components/OverviewCards';
import TopUniversities from './components/TopUniversities';
import HotMajors from './components/HotMajors';


const Dashboard: React.FC = () => {
  const { universities, fetchUniversities } = useModel('Admin.University');
  const { fetchMajors } = useModel('Admin.UniversityMajors');
  const { subjectCombinations, fetchSubjectCombinations } = useModel('Admin.SubjectCombinations');
  const { applications, fetchApplications } = useModel('Admin.Applications');
  const [allMajors, setAllMajors] = useState<any[]>([]);

  useEffect(() => {
    fetchUniversities();
    fetchSubjectCombinations();
    fetchApplications();
  }, []);

  useEffect(() => {
    const fetchAllMajors = async () => {
      const majorsArr = await Promise.all(
        universities.map(uni => fetchMajors(uni._id))
      );
      setAllMajors(majorsArr.flat().filter(Boolean));
    };
    if (universities.length) fetchAllMajors();
  }, [universities, fetchMajors]);

  const uniqueMajors = Array.from(new Set(allMajors.map(m => m.code))).length;  

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ margin: 0, fontSize: 30, fontWeight: 700 }}>Tổng quan hệ thống</h1>
        <div style={{ color: '#888', fontSize: 16 }}>
          Quản lý tuyển sinh đại học - {new Date().toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>
      <OverviewCards
        universityCount={universities.length}
        majorCount={uniqueMajors}
        subjectCombinationCount={subjectCombinations.length}
      />
      <div style={{ display: 'flex', gap: 24, marginBottom: 24 }}>
        <TopUniversities universities={universities} universityMajors={allMajors} applications={applications} />
        <HotMajors majors={allMajors} universities={universities} applications={applications} />
      </div>
    </div>
  );
};

export default Dashboard;
