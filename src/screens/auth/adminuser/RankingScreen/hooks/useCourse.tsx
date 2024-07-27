// useModuleScreen.tsx
import { useEffect, useState } from 'react';
import { useAuth } from '../../../../../context/AuthContext';
import { GetCourse} from '../../../../../interfaces/CourseInterfaces';
import {getCourses} from '../../../../../services/courses.service';


export const useCourse = () => {
  const { userInfo, userToken } = useAuth();
  const [courses, setCourses] = useState<GetCourse[]>([]);
 

  useEffect(() => {
    const fetchModuleData = async () => {
      if ( userInfo !== 'string' && userToken) {
        try {
         const user = userInfo as { id: number; role: number; email: string };
          
          const data = await getCourses(userToken);
          console.log(data)
          setCourses(data);
        } catch (error) {
          console.error('Error fetching module notas:', error);
          // Manejo de errores
        }
      }
    };
    fetchModuleData();
  }, [ userToken]);

  return { courses };
};