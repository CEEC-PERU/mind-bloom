
import { useEffect, useState } from 'react';
import { getFlashCardInfoById } from '../../../../../services/flashcard.service';
import { FlashCard } from '../../../../../interfaces/ContentModuleInterface';
import { useAuth } from '../../../../../context/AuthContext';

export const useFlashCard = (moduleId: number) => {
  const { userToken } = useAuth();
  const [flashcardData, setFlashCardData] = useState<FlashCard | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFlashCardData = async () => {
      if (moduleId && userToken) {
        try {
          const flashCardDataArray = await getFlashCardInfoById(moduleId, userToken);
          console.log('FlashCard Data:', flashCardDataArray);
    
          if (flashCardDataArray.length > 0) {
            setFlashCardData(flashCardDataArray[0]); // Tomar el primer elemento del array
          } else {
            setFlashCardData(null);
          }
        } catch (error) {
          console.error('Error fetching flashcard data:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchFlashCardData();
  }, [moduleId, userToken]);

  return { flashcardData, loading };
};
