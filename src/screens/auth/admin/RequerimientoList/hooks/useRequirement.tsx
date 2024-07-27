import { useEffect, useState } from 'react';
import { useAuth } from '../../../../../context/AuthContext';
import {Requirement} from '../../../../../interfaces/RequirementInterface';
import { getRequirementAll} from '../../../../../services/requierement.service';

export const useRequirement = () => {
  const { userInfo, userToken } = useAuth();
  const [requirements, setRequirements] = useState<Requirement[]>([]);

  useEffect(() => {
    const fetchRequirementData = async () => {
      if (typeof userInfo !== 'string' && userToken) {
        try {
          const user = userInfo as { id: number; role: number; email: string };
          const data = await  getRequirementAll( userToken);
          console.log(data);
          setRequirements(data);
        } catch (error) {
          console.error('Error fetching module notas:', error);
        }
      }
    };
    fetchRequirementData();
  }, [userInfo, userToken]);

  return { requirements };
};