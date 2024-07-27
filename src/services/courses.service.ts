import axios, { AxiosError } from 'axios';
import {   CampaignCoursesData , Course, GetCourse,CourseRequest, CourseResponse, CourseWithModules, CourseCampaign } from "../interfaces/CourseInterfaces";
import {  CampaignCourseRequest , CampaignUserRequest} from "../interfaces/CoursesInterfaces";
import {
  API_CAMPAIGNS_COURSES_URL,
  API_COURSES_URL,
  API_COURSES_ID_URL,
  API_POST_COURSE,
  API_COURSES_WITH_USERS,
  API_GET_COURSES_WITH_MODULES,
  API_GET_STUDENTS_INFO,
  API_GET_COURSES_BY_ID,
  API_GET_COURSES,
  API_CAMAPAIGNCOURSE_URL,
  API_CAMPAIGNUSER_URL
} from "../utils/Endpoints";
import {  CampaignCourse,CoursesWithUser } from "../interfaces/CoursesInterfaces";

import { StudentInfo } from "../interfaces/UserInterfaces";
export const getCourseByIdUser = async (userId: number, userToken: string): Promise<CampaignCoursesData> => {
  try {
    const response = await axios.get(`${API_COURSES_URL}/${userId}`, {
      headers: {
        Authorization: userToken,
      },
    });
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.status === 403) {
      console.error('Permission Denied: You do not have access to this resource.');
    } else {
      console.error('Error while fetching course data:', error);
    }
    throw error;
  }
};

//solo devuelve informacion del curso, mas no devuelve detalles
export const getCourseInfoById = async (courseId: number, userToken: string): Promise<Course | null> => {
  try {
    const response = await axios.get(`${API_COURSES_ID_URL}/${courseId}`, {
      headers: {
        Authorization: userToken,
      },
    });
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.status === 403) {
      console.error('Permission Denied: You do not have access to this resource.');
    } else {
      console.error('Error while fetching course data:', error);
    }
    throw error;
  }
};

export const getCourseCampaigns = async (client_id: number,user_id: number, userToken: string): Promise<CourseCampaign | null> => {
  try {
    const response = await axios.get(`${API_CAMPAIGNS_COURSES_URL}/${client_id}/${user_id}`, {
      headers: {
        Authorization: userToken,
      },
    });
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.status === 403) {
      console.error('Permission Denied: You do not have access to this resource.');
    } else {
      console.error('Error while fetching course data:', error);
    }
    throw error;
  }
};



export const getCourses = async ( userToken: string): Promise<GetCourse[]> => {
  try {
    const response = await axios.get(`${API_GET_COURSES}`, {
      headers: {
        Authorization: userToken,
      },
    });
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.status === 403) {
      console.error('Permission Denied: You do not have access to this resource.');
    } else {
      console.error('Error while fetching course data:', error);
    }
    throw error;
  }
};

//todos los cursos con los estudiantes inscritos en el ;D
export const GetCoursesWithUsers = async (): Promise<CoursesWithUser[]> => {
  try {
    const configObject = {
      method: 'GET',
      url: API_COURSES_WITH_USERS
    }
    const coursesWithUsers = await axios<CoursesWithUser[]>(configObject);
    return coursesWithUsers.data;
  } catch (error) {
    console.error(error, 'customer service');
    throw error
  }
}


//obtener todos los cursos con los usuario informacion agregada si esta desaprobado, etc
export const GetAllStudentInfo = async (): Promise<StudentInfo[]> => {
  try {
    const configObject = {
      method: 'GET',
      url: API_GET_STUDENTS_INFO
    }
    const users = await axios<StudentInfo[]>(configObject);
    return users.data;
  } catch (error) {
    console.error(error, 'customer service');
    throw error
  }
}

export const GetCoursesWithModules = async (campaign_id :number, userToken: string): Promise<CampaignCourse[]> => {
  try {
    const response = await axios.get(`${API_GET_COURSES_WITH_MODULES}/${campaign_id}`, {
      headers: {
        Authorization: userToken,
      },
    });
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.status === 403) {
      console.error('Permission Denied: You do not have access to this resource.');
    } else {
      console.error('Error while fetching course data:', error);
    }
    throw error;
  }
}






//
export const GetCourseWithModules = async (id: number): Promise<CourseWithModules | null> => {
  try {
    const configObject = {
      method: 'GET',
      url: `${API_GET_COURSES_BY_ID}/${id}`
    };
    const response = await axios<CourseWithModules[]>(configObject);
    if (response.data.length > 0) {
      return response.data[0];
    } else {
      return null;
    }
  } catch (error) {
    console.error(error, 'customer service');
    throw error;
  }
};


export const PostNewCourse = async (newCourse: CourseRequest): Promise<CourseResponse | null> => {
  try {
    const configObject = {
      method: 'POST',
      url: `${API_POST_COURSE}`,
      data: newCourse,
      headers: {
        "Content-Type": "application/json",
      }
    }
    const response = await axios<CourseResponse>(configObject);
    if (response.data)
      return response.data;
    else
      return null;
  } catch (error) {
    console.error(error, 'customer service');
    throw error;
  }
}

export const PostNewCamapignCourse = async (newUser: CampaignCourseRequest) => {
    try {
        const configObject = {
            method: 'POST',
            url: API_CAMAPAIGNCOURSE_URL,
            data: newUser
        }
        const response = await axios<CampaignCourseRequest>(configObject);
        if (response.data)
            return response.data;
        else
            return null;
    } catch (error) {
        console.error(error);
        throw error
    }
}



export const sendCampaignUser = async (CampaignUser: CampaignUserRequest, userToken: string): Promise<void> => {
  try {
    const response = await axios.post(API_CAMPAIGNUSER_URL , CampaignUser, {
      headers: {
        Authorization: userToken,
        'Content-Type': 'application/json',
      },
    }); 
    // Log or handle the response if needed
    console.log('CampaignUser sent successfully:', response.data);
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.status === 403) {
      console.error('Permission Denied: You do not have access to this resource.');
    } else {
      console.error('Error while sending quiz result:', error);
    }
    throw error;
  }
};

