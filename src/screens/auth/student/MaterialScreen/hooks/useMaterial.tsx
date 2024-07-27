// useMaterial.tsx
import { useEffect, useState } from 'react';
import { getModuleInfoById } from '../../../../../services/module.service';
import { Material } from '../../../../../interfaces/ContentModuleInterface';
import { useAuth } from '../../../../../context/AuthContext';

export const useMaterial = (moduleId: number) => {
  const { userInfo, userToken } = useAuth();
  const [material, setMaterial] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMaterialData = async () => {
      if (moduleId && typeof userInfo !== 'string' && userToken) {
        try {
          const materialData = await getModuleInfoById(moduleId, userToken);
          console.log('Material Data:', materialData);
    
          setMaterial(Array.isArray(materialData) ? materialData : [materialData].filter(Boolean));
        } catch (error) {
          console.error('Error fetching module data:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchMaterialData();
  }, [moduleId, userToken]);

  return { material, loading };
};
