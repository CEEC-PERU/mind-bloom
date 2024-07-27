import { DailySession } from "./UserInterfaces";

export interface BasicStatistics {
    totalStudents: number;
     approvedPercentage: number;
    inProgressPercentage: number;
    disapprovedPercentage: number;
}

export interface WeeklySessionInfo {
    sessionsWithDay: DailySession[];
    startOfWeek: string;
    endOfWeek: string;
}

export interface UserSessionStatistics {
    email: string;
    client_id: number;
    fullname: string;
    picture: string;
    user_id: string;
    sessionsWithMonths: SessionWithMonth[];
    startOfMonth: string;
    endOfMonth: string;
  }
  
 export  interface SessionWithMonth {
    monthYear: string;
    sessions: number;
    total_duration_minutes: string;
  }
  
