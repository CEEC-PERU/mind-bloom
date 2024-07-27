export interface Profile {
    first_name: string;
    last_name: string;
    phone: number;
    profile_picture : string;
  }
 export  interface User {
    user_id: number;
    email: string;
    Profile: Profile;
  }

export interface Campaign {
    campaign_id: number;
    name: string;
  }

  export interface Requirement {
    id_requerimiento: number;
    fecha: string;
    campaign_id: number;
    user_id: number;
    course_name: string;
    n_modulos: string;
    material: string[];
    created_at: Date;
    updated_at: string;
    Campaign: Campaign;
    User: User;
  }
  
  export interface RequirementPost {
    fecha: Date;
    campaign_id : number;
    user_id:number;
    course_name:string;
    n_modulos : string;
    material:string[];
  }