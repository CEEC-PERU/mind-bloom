import { useEffect, useState } from 'react';
import { GetCoursesWithModules } from '../../../../../services/courses.service';
import { CampaignCourse } from '../../../../../interfaces/CoursesInterfaces';
import { useAuth } from '../../../../../context/AuthContext';

const useCoursesWithModules = (campaign_id: number) => {
  const [coursesWithModules, setCoursesWithModules] = useState<CampaignCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { userToken } = useAuth();

  const fetchData = async () => {
    if (userToken) {
      try {
        setLoading(true);
        const data = await GetCoursesWithModules(campaign_id, userToken);
        setCoursesWithModules(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching ranking data:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [campaign_id, userToken]);

  const refreshCourses = () => {
    fetchData();
  };

  return { coursesWithModules, loading, error, refreshCourses };
};

export default useCoursesWithModules;
