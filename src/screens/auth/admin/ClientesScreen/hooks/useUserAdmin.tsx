import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../../../../../context/AuthContext';
import { GetUserAdmin } from '../../../../../services/clients.service';
import { UserAdmin } from '../../../../../interfaces/ClientsInterface';

export const useUserAdmin = () => {
  const [useradmin, setUserAdmin] = useState<UserAdmin[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { userToken } = useAuth();

  const fetchUserAdminData = useCallback(async () => {
    if (userToken) {
      try {
        const data = await GetUserAdmin(userToken);
        if (data === null) {
          setUserAdmin([]); // establece el estado a un array vacío
        } else if (Array.isArray(data)) {
          setUserAdmin(data); // establece el estado a ese array
        } else {
          setUserAdmin([data]); // data es un solo objeto UserAdmin, conviértelo en un array
        }
      } catch (error) {
        console.error('Error fetching user admin data:', error);
      } finally {
        setLoading(false);
      }
    }
  }, [userToken]);

  useEffect(() => {
    fetchUserAdminData();
  }, [fetchUserAdminData]);

  return { useradmin, loading, refetch: fetchUserAdminData };
};