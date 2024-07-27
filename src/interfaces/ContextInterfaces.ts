import { Profile, UserInfo } from "./UserInterfaces";


export interface AuthProps {
    userToken?: string | null;
    onLogin?: (email: string, password: string) => any;
    onLogout?: () => void;
    isLoading?: boolean;
    error?: string | null;
    userInfo?: {
        id: number,
        role: number,
        email: string,
        client_id: number,
    } | string | null;
    profileInfo?: Profile | null | UserInfo
}
