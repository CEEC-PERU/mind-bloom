export interface Campaign {
    campaign_id: number;
    name: string;
    description: string;
    is_finish: boolean;
    limit_date: Date;
    image: string;
  }
  
export interface CampaignPost {
    name: string;
    description: string;
    limit_date: Date;
}

export interface CampaignClient {
  name: string;
}

export interface User {
  client_id: number;
}

export interface CampaignUser {
  user_id: number;
  campaign_id: number;
  User: User;
  Campaign: CampaignClient;
}

export interface UserTotal {
  role_id: number;
  email: string;
}
export interface CampaignTotal {
  name: string;
  email: string;
}

  export interface TotalUser{
  user_id: number;
  campaign_id : number;
  User: UserTotal;
  Campaign : CampaignTotal;
  totalUsers: number;
}

export interface Profile{
  first_name?: string;
  last_name? : string;
  profile_picture: null | string;
  phone? : number;
}


export interface UserNoAsignado{
  user_id: number;
  email: string;
  Profile?: Profile | null;
}


export interface CampaignDato {
  name: string;
  limit_date: Date; 
}



export interface CampaignByUser {
  id_campaign_user: number;
  campaign_id: number;
  user_id: number;
  created_at: string; 
  updated_at: string; 
  id_state: number | null;
  Campaign: CampaignDato; 
}
