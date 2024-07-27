export interface LoginResponse {
    code?: number;
    msg?: string;
    token?: string;
    possibleAttemps?: number
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface User {
    user_id: number;
    email: string;
    role_id: number;
    client_id: number;
    expired_at?: null;
    created_at?: Date;
    updated_at?: Date;
}

export interface UserInfo {
    id?: number;
    email: string;
    role_id: number;
    client_id: number;
    Profile?: Profile
}

export interface Profile {
    first_name: string;
    last_name: string;
    document_number?: number;
    phone?: number;
    DocumentType?: DocumentType;
    profile_picture?: string
}

export interface DailySession {
    session_day: Date;
    sessions: string;
    average_duration_seconds: string;
    day: string;
}

export interface StudentInfo {
    progress: string;
    is_approved: boolean | null;
    User: UserInfo;
    Course: Course;
}

export interface Course {
    name: string;
    modules: Module[];
}

export interface Module {
    name: string;
}

export interface DocumentType {
    document_id: number;
    name: string;
}


export interface ProfileRequest {
    first_name: string;
    last_name: string;
    document_id: number;
    document_number: number;
    phone: number;
    profile_picture?: string
}

export interface ProfileResponse {
    document_id: number;
    document_number: number;
    first_name: string;
    last_name: string;
    phone: number;
    profile_id: number;
    profile_picture: string;
    user_id: number;
}


export interface UserRequest {
    email: string;
    password: string;
    role_id: number;
    client_id : number;
}

export interface CampaignCourseRequest {
    course_id: number;
    campaign_id : number;
}


export interface Campaign {
    name: string;
    description: string;
    limit_date: Date;
}