export interface UserProfile {
    email: string;
    role_id: number;
    user_id: number;
    client_id: number;
    Profile: {
      first_name: string;
      last_name: string;
      profile_picture: string;
    };
  }
  
export interface Course {
    course_id: number;
    name: string;
    image: string | null;
    logo: string | null;
    background_color: string;
  }
  
 export interface Evaluation {
    user_id: number;
    evaluation_id: number;
    total_score: string;
    Evaluation: {
      evaluation_id: number;
      name: string;
      Module: {
        module_id: number;
        name: string;
      };
    };
    realize_exam: boolean;
  }

  
 export  interface Result {
    User: UserProfile;
    Course: Course;
    evaluations: Evaluation[];
    prequizzResults:  {
      course_id: number;
      puntaje: string;
      efectividad: string;
      status: string;
    };
    total_score_sum: number;
    average_score: number;
    is_finished: boolean;
    status: string;
  }
  