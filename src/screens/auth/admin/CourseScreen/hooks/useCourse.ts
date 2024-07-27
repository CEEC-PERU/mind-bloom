import { useState, useEffect } from 'react';
import { GetCourseWithModules } from '../../../../../services/courses.service';
import { CourseWithModules } from '../../../../../interfaces/CourseInterfaces';

const useCourse = (id: number) => {
    const [course, setCourse] = useState<CourseWithModules | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await GetCourseWithModules(id);
                setCourse(response);
            } catch (error) {
                console.error('Error fetching courses with modules:', error);
                setError('Error fetching courses with modules. Check the console for details.');
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [id]);
    return { course, loading, error }
}

export default useCourse;