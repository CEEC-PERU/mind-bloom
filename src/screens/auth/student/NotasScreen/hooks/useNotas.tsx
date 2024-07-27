// useModuleScreen.tsx
import { useEffect, useState } from 'react';
import { useAuth } from '../../../../../context/AuthContext';
import { Nota} from '../../../../../interfaces/EvaluationInterface';
import {getNotas } from '../../../../../services/notas.service';
import { Profile } from '../../../../../interfaces/UserInterfaces';

export const useNotas = (courseId: number) => {
  const { userInfo, userToken , profileInfo} = useAuth();
  const [notas, setNotas] = useState<Nota[]>([]);
  let fullname = 'Actualiza tu perfil ';
  let uri_picture = ''
  const user = userInfo as { id: number };
  if (profileInfo) {
    const profile = profileInfo as Profile
    fullname = `${profile.first_name} ${profile.last_name}`
    uri_picture = profile.profile_picture!
}
  useEffect(() => {
    const fetchModuleData = async () => {
      if (courseId && typeof userInfo !== 'string' && userToken) {
        try {
         const user = userInfo as { id: number; role: number; email: string };
          // Obtener NOTAS del curso
          const notas_curso = await getNotas(courseId, user.id ,userToken);
          console.log(notas_curso)
          setNotas(notas_curso);
          
        } catch (error) {
          console.error('Error fetching module notas:', error);
          // Manejo de errores
        }
      }
    };
    fetchModuleData();
  }, [courseId, userToken]);

  return { notas , fullname , uri_picture};
};