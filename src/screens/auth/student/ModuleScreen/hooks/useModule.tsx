// useModuleScreen.tsx
import { useEffect, useState } from 'react';
import { useAuth } from '../../../../../context/AuthContext';
import { ModuleService } from '../../../../../interfaces/CourseInterfaces';
import { getModulesByIdCourse } from '../../../../../services/module.service';
import { getCourseInfoById } from '../../../../../services/courses.service';
import { Course } from '../../../../../interfaces/CourseInterfaces';

export const useModuleScreen = (courseId: number) => {
  const { userInfo, userToken } = useAuth();
  const [modules, setModules] = useState<ModuleService[]>([]);
  const [courseData, setCourseData] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchedText, setSearchedText] = useState('');

  useEffect(() => {
    const fetchModuleData = async () => {
      if (courseId && typeof userInfo !== 'string' && userToken) {
        try {
          setIsLoading(true);
          // Obtener información del curso
          const course = await getCourseInfoById(courseId, userToken);
          setCourseData(course);

          // Obtener información de los módulos
          const modulesData = await getModulesByIdCourse(courseId, userToken);
          setModules(modulesData);
        } catch (error) {
          console.error('Error fetching module data:', error);
          // Manejo de errores
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchModuleData();
  }, [courseId, userToken]);

 const filteredModules = modules.filter(module => {
  const lowerCaseQuery = searchedText.toLowerCase();
  return module.name.toLowerCase().includes(lowerCaseQuery);
});

return { courseData, modules: filteredModules, isLoading, searchedText, setSearchedText };
};