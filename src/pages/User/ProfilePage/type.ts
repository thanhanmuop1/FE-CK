export interface PersonalInfo {
    fullName: string;
    dob: string;
    gender: string;
    idNumber: string;
    phone: string;
    email: string;
    address: string;
    province: string;
    district: string;
    ethnic: string;
}

export interface EducationInfo {
    school: string;
    grade10: number | null;
    grade11: number | null;
    grade12: number | null;
    graduationYear: string;
    priorityArea: string;
    priorityObject: string;
}