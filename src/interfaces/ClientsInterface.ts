export interface Client {
  client_id: number;
  name: string;
}
export interface ClientPost {
  name: string;
}

export interface Profile {
  first_name: string;
  last_name: string;
  phone: number;
  profile_picture: string;
}
export interface UserAdmin {
  user_id: number;
  email: string;
  client_id: number;
  role_id: number;
  client: Client;
  Profile: Profile;
}