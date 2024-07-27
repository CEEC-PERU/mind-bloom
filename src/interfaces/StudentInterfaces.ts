export interface StudentDataPerCourse {
    progress?: number;
    is_approved?: boolean | null;
    User: Student;
    Course?: Course;
}

export interface Course {
    name: string;
    modules: Module[];
}

export interface Module {
    name: string;
    is_active: boolean;
}

export interface Student {
    email: string;
    role_id: number;
    user_id: number;
    Profile?: ProfileStudent | null;
}

export interface UserWithRole {
    email: string;
    client_id : number,
    role_id: number;
    user_id: number;
    Profile?: ProfileStudent | null;
    Role: { description: string }
}

export interface ProfileStudent {
    first_name?: string;
    last_name?: string;
    phone?: number;
    profile_picture: null | string;
}

export interface CourseStudentRequest {
    campaign_id: number;
    user_id: number;
}