import { useEffect, useState } from 'react';
import { getCourseCampaigns } from '../../../../../services/courses.service';
import { CourseCampaign} from '../../../../../interfaces/CoursesInterfaces';
import { useAuth } from '../../../../../context/AuthContext';
export const useCourses = () => {
  const [courses, setCoursesWithModules] = useState<CourseCampaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { userInfo, userToken } = useAuth();

useEffect(() => {
  const fetchData = async () => {
    if (userToken) {
      try {
        const user = userInfo as { id: number; role: number; client_id: number};
        setLoading(true);
        const data = await getCourseCampaigns( user.client_id, user.id ,userToken);
      
        if (data === null) {
            setCoursesWithModules([]); //establece el estado a un array vacío
          } else if (Array.isArray(data)) {
            setCoursesWithModules(data); //establece el estado a ese array
          } else {
            setCoursesWithModules([data]); //campaigndata es un solo objeto Campaign, conviértelo en un array
          }
        console.log(data)
      } catch (error) {
        console.error('Error fetching ranking data:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  fetchData();
}, [  userToken]);

return { courses, loading, error };
};

