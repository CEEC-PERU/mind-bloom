import axios from "axios";
import { API_GET_ALL_DATA_STUDENT_PER_COURSE, API_GET_STUDENTS_FOR_COURSE, API_POST_STUDENTS_TO_COURSES } from "../utils/Endpoints";
import { CourseStudentRequest, Student, StudentDataPerCourse } from "../interfaces/StudentInterfaces";

export const GetAllStudentDataPerCourse = async (course_id: number) => {
  try {
    const configObject = {
      method: 'GET',
      url: `${API_GET_ALL_DATA_STUDENT_PER_COURSE}/${course_id}`
    };
    const response = await axios<StudentDataPerCourse[]>(configObject);
    if (response.data.length > 0) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error at get all student data per course', error);
    throw error;
  }
}

export const GetStudentsForCourse = async (course_id: number) => {
  try {
    const configObject = {
      method: 'GET',
      url: `${API_GET_STUDENTS_FOR_COURSE}/${course_id}`
    };
    const response = await axios<Student[]>(configObject);
    if (response.data.length > 0) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error at get all student data per course', error);
    throw error;
  }
}

export const PostStudentsToCourses = async (coursesStudent: CourseStudentRequest[]) => {
  try {
    const configObject = {
      method: 'POST',
      url: `${API_POST_STUDENTS_TO_COURSES}`,
      data: { course_student_list: coursesStudent },
      headers: {
        "Content-Type": "application/json",
      }
    }
    const response = await axios<{ message: string }>(configObject);
    if (response.data)
      return response.data;
    else
      return null;
  } catch (error) {
    console.error('Error at post students and courses', error);
    throw error;
  }
} 