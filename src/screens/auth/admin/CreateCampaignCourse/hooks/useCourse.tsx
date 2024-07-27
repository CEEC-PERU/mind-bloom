import { useState, useEffect } from 'react';
import { getCourses } from '../../../../../services/courses.service';
import { GetCourse } from '../../../../../interfaces/CourseInterfaces';
import { useAuth } from '../../../../../context/AuthContext';

const useCourse = () => {
    const { userInfo, userToken } = useAuth();
    const [course, setCourse] = useState<GetCourse[] | null>(null); // Cambiado el tipo de estado a GetCourse[] | null
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (userToken) { // Verifica si userToken no es null o undefined
                try {
                    const response = await getCourses(userToken);
                    setCourse(response); // Asigna response directamente a course
                    console.log(response)
                } catch (error) {
                    console.error('Error fetching courses with modules:', error);
                    setError('Error fetching courses with modules. Check the console for details.');
                } finally {
                    setLoading(false);
                }
            }
        }
        fetchData();
    }, [userToken]); // Cambiado id a userToken en la dependencia del efecto
    return { course, loading, error };
}

export default useCourse;
