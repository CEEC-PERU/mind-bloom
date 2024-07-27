export interface Material {
  module_id: number;
  ppt_url: string;
  course_id: number,
  is_finish: boolean,
  is_active: boolean,
  name: string
}

export interface FlashCard {
  flashcard_id: number;
  indication: string;
  correct_answer: string[];
  incorrect_answer: string[];
 

}

export interface StudentFlashcardProps {
  onPress: () => void;
  isTurnedOver: boolean;
  children: React.ReactNode; // Specify the type of children prop
}