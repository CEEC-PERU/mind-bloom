export interface User {
    email: string;
    role_id: number;
    Profile: {
      first_name: string;
      last_name: string;
      profile_picture: string;
    };
  }
  
  export interface Module {
    module_id: number;
    name: string;
  }
  
  export interface EvaluationResult {
    user_id: number;
    evaluation_id: number;
    total_score: string;
    Evaluation: {
      evaluation_id: number;
      name: string;
      Module: Module;
    };
    realize_exam: boolean;
  }
  
  export interface UserEvaluation {
    User: User;
    evaluations: EvaluationResult[];
    total_score_sum: number;
    average_score: number;
    is_finished: boolean;
    status: string;
  }
  
  //////////////////////////////////////////////
/*
  export interface Module {
    module_id: number;
    name: string;
    course_id: number;
    course?: Course;
  }
  
  export interface Course {
    course_id: number;
    name: string;
  }
  
  export interface Evaluation {
    evaluation_id: number;
    name: string;
    Module: Module;
  }
  
  export interface EvaluationResult {
    evaluation_id: number;
    total_score: string;
    Evaluation: Evaluation;
    realize_exam: boolean;
  }
  
  export interface UserCourses {
    evaluations: EvaluationResult[];
    total_score_sum: number;
    average_score: number;
    is_finished: boolean;
    status: string;
    name?: string;
  }
  
  export interface Profile {
    first_name: string;
    last_name: string;
    profile_picture: string;
  }
  
  export interface User {
    email: string;
    role_id: number;
    Profile: Profile;
  }
  
  export interface UserEvaluation {
    User: User;
    Courses: { [key: string]: UserCourses };
    campaign_name: string;
    average_courses: number;
  }
  */
  ////////////////////////////////////////////

  export interface Evaluations {
    evaluation_id: number;
    total_score: string;
    Evaluation: {
      evaluation_id: number;
      name: string;
      Module: {
        module_id: number;
        name: string;
        course_id: number;
        course: {
          course_id: number;
          name: string;
        };
      };
    };
    realize_exam: boolean;
  }
  
  export interface Course {
    name : string;
    evaluations: Evaluations[];
    total_score_sum: number;
    average_score: number;
    is_finished: boolean;
    status: string;
    prequizz?: {
      puntaje: string;
      efectividad: string;
      status: string;
    };
  }
  
  export interface User {
    email: string;
    role_id: number;
    Profile: {
      first_name: string;
      last_name: string;
      profile_picture: string;
    };
  }
  
  export interface ApiCampaign{
    User: User;
    Courses: {
      [courseId: string]: Course;
    };
    campaign_name: string;
    average_courses: number;
  }
  /*
  export type ApiCampaign = UserEvaluation[];
*/
//ApiCampaign 
  