import { IconProps } from '@rneui/themed';

export interface BaseModule {
  module_id: number;
}

export interface CourseCardProps {
  modules: Module[];
  namemodulo: string;
}
export interface GetCourse {
  course_id: number;
  name: string;
  description: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  is_finish: boolean;
  limit_date: null | string;
  image: string;
  background_color: null | string;
  logo: null | string;
}



export interface CourseWithModules {
  course_id: number;
  name: string;
  description: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
  is_finish: boolean;
  limit_date: Date;
  image: string;
  modules: Module[];
}
export interface Course {
  course_id: number;
  name: string;
  description: string;
  is_active: boolean | null;
  is_finish: boolean;
  limit_date: string;
  image: string;
  background_color: string;
  logo: string ;
  CourseStudent: {
    id: number;
    course_id: number;
    user_id: number;
    progress: number;
    is_approved: boolean;
  };
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
    created_at: string;
    updated_at: string;
    is_finish: boolean;
    limit_date: null | string;
    image: string;
    background_color: string;
    logo: null | string;
  };
}

export interface CampaignCoursesData {
  campaignCourses: CampaignCourse[];
}
export interface ModuleService extends BaseModule {
  course_id: number;
  is_finish: boolean;
  is_active: boolean;
  name: string;
  ppt_url: string;
}

export interface Module extends BaseModule {
  numbertype: number;
  contentName: string;
  icon: React.ReactElement<IconProps> | string | undefined;
}

export interface CourseCardProps {
  modules: Module[];
  namemodulo: string;
}


export interface Evaluation {
  note: number;
  name: string;
  EvaluationResults: EvaluationResult[];
}

export interface EvaluationResult {
  note: string;
}


export interface CourseRequest {
  name: string
  description: string
  image: string
  background_color: string
  limit_date?: string | null
  logo?: string | null
}

export interface CourseResponse {
  message: string,
  newCourse: {
    name: string
    description: string
    image: string
    course_id?: number
  }
}

export interface ModuleRequest {
  name: string
  ppt_url: string
  course_id: number
}

export interface ModuleResponse {
  message: string,
  newModule: {
    name: string
    ppt_url: string
    module_id?: number
  }
}


export interface Course {
  name: string;
}

export interface Campaign {
  name: string;
}

// Definir una interfaz para la estructura completa de los datos
export interface CourseCampaign {
  course_id: number;
  campaign_id: number;
  Course: Course;
  Campaign: Campaign;
}