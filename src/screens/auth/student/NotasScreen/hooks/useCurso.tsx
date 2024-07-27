import { useEffect, useState } from 'react';
import { useAuth } from '../../../../../context/AuthContext';
import { Result } from '../../../../../interfaces/CourseNotaInterface';
import { getNotasCurso } from '../../../../../services/notas.service';
import { Profile } from '../../../../../interfaces/UserInterfaces';

export const useNotasCurso = (courseId: number) => {
  const { userInfo, userToken, profileInfo } = useAuth();
  const [notascurso, setNotas] = useState<Result[]>([]);
  let fullname = 'Actualiza tu perfil ';
  let uri_picture = ''
  const user = userInfo as { id: number };
  if (profileInfo) {
    const profile = profileInfo as Profile
    fullname = `${profile.first_name} ${profile.last_name}`
    uri_picture = profile.profile_picture!
  }
//cuando coloque par
  useEffect(() => {
    const fetchModuleData = async () => {
      if (courseId && typeof userInfo !== 'string' && userToken) {
        try {
          const user = userInfo as { id: number; role: number; email: string };
          const notas_curso = await getNotasCurso(courseId, user.id, userToken);
          console.log("NotaCurso", notas_curso);
          setNotas(notas_curso);
        } catch (error) {
          console.error('Error fetching module notas:', error);
          // Manejo de errores
        }
      }
    };
    fetchModuleData();
  }, [courseId, userToken]);

  return { notascurso };
};
