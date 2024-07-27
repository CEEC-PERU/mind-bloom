import { useEffect, useState } from "react"
import { StudentDataPerCourse } from "../../../../../interfaces/StudentInterfaces"
import { GetAllStudentDataPerCourse } from "../../../../../services/course-student.service";

export const useStudentDataPerCourse = (course_id: number) => {
    const [studentDataPerCourse, setStudentDataPerCourse] = useState<StudentDataPerCourse[] | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const fetchData = async () => {
        try {
            setIsLoading(true);
            const data = await GetAllStudentDataPerCourse(course_id);
            data ? setStudentDataPerCourse(data) : setStudentDataPerCourse([]);
        } catch (error) {
            console.error('Error fetching all student data:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    }
    useEffect(() => {
        fetchData();
    }, []);
    return { studentDataPerCourse, isLoading, fetchData };
}