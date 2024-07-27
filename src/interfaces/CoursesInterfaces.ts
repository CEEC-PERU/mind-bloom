import { User } from "./UserInterfaces";

export interface CoursesWithUser {
    course: Course;
    users: User[];
}

export interface Course {
    course_id: number;
    name: string;
    description: string;
    is_active: boolean | null;
    created_at: Date;
    updated_at: Date;
    is_finish: boolean;
    limit_date: Date | null;
    image: null | string;
}

/*
export interface CoursesWithModules {

    background_color: string;
    course_id: number;
    name: string;
    description: string;
    is_active: boolean | null;
    created_at: Date;
    updated_at: Date;
    is_finish: boolean;
    limit_date: Date | null;
    image: null | string;
    modules: Module[];
}

export interface Module {
    is_active: boolean;
    created_at: Date;
    name: string;
}*/

export interface Module {
    is_active: boolean;
    created_at: Date;
    name: string;
}
export interface CampaignCourseRequest {
    course_id: number;
    campaign_id : number;
}

export interface CampaignUserRequest {
     campaign_id : number;
    user_id: number;
}

export interface CampaignCourse {
    campaign_course_id: number;
    campaign_id: number;
    course_id: number;
    Course: {
        course_id: number;
        name: string;
        description: string;
        is_active: boolean;
        created_at: Date;
        updated_at: string;
        is_finish: boolean;
        limit_date: string | null;
        image: string | null;
        background_color: string ;
        logo: string | null;
        modules: Module[];
    };
}


export interface CourseNew {
    name: string;
  }
  
  export interface CampaignNew {
    name: string;
  }

  export interface CourseCampaign {
    course_id: number;
    campaign_id: number;
    Course: CourseNew;
    Campaign: CampaignNew;
  }