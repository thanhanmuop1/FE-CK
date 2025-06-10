export interface User {
  _id: string;
  name: string;
  email: string;
}

export interface UniversityMajor {
  _id: string;
  university_id: string;
  name: string;
  code: string;
  admission_methods: string[];
  subject_combination_ids: string[] | SubjectCombination[];
  created_at: string;
  updated_at: string;
}

export interface SubjectCombination {
  _id: string;
  code: string;
  subjects: string[];
}

export interface Application {
  _id: string;
  userId: User;
  universityMajorId: UniversityMajor;
  admissionMethod: string;
  subjectCombinationId: SubjectCombination;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface ApplicationResult {
  _id: string;
  applicationId: string;
  method: string;
  gpaGrade10?: number;
  gpaGrade11?: number;
  gpaGrade12?: number;
  totalScore?: number;
  created_at: string;
  updated_at: string;
}

export interface ApplicationDocument {
  _id: string;
  applicationId: string;
  type: string;
  fileUrl: string;
  fileType: string;
  created_at: string;
  updated_at: string;
}

export interface ApplicationDetailResponse {
  application: {
    id: string;
    status: string;
    universityMajorId: {
      university: string;
      name: string;
    };
    admissionPeriodId: {
      name: string;
    };
    subjectCombinationId: {
      code: string;
    };
    admissionMethod: string;
    created_at: string;
    updated_at: string;
  };
  applicationResult: {
    method: string;
    totalScore: number;
    gpaGrade10?: number;
    gpaGrade11?: number;
    gpaGrade12?: number;
    subjectScores: Record<string, number>;
  };
  documents: Array<{
    type: string;
    fileUrl: string;
    fileType: string;
  }>;
  profile: {
    name: string;
    email: string;
    phone: string;
    priorityArea?: string;
    priorityGroup?: string;
  };
}

export interface NormalizedApplication {
  name: string;
  email: string;
  phone: string;
  university: string;
  admissionPeriod: string;
  major: string;
  combination?: string;
  status: string;
  dates: {
    submitted: string;
    updated: string;
  };
  scores: Record<string, number>;
  subjectScores: Record<string, number>;
  totalScore: number;
  method: string;
  priority: {
    area: string;
    group: string;
    score: number;
  };
  documents: {
    name: string;
    type: string;
    url: string;
  }[];
} 