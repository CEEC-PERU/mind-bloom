export interface Evaluation {
  evaluation_id: number;
  quizz_type: number;
  name: string;
  module_id: number;
  is_complete: boolean;
  Evaluation?: {
    evaluation_id: number;
    is_complete: boolean;

    Evaluation?: {
      evaluation_id: number;
      is_complete: boolean;
      module_id: number;
      name: string;
      quizz_type: number | null;
    };
  }
}
 export interface Question {
    type: string;
    image_url:string,
    difficulty: string;
    category: string;
    question: string;
    points: number;
    correct_answer: string;
    incorrect_answer: string[];
  }
  
export interface Result {
    evaluation_id: number,
    user_id: number,
    total_score: number;
  }

  export interface GetResult {
    result_id : number,
    evaluation_id: number,
    user_id: number,
    total_score: number;
  }

export interface Nota {
  result_id: number;
  evaluation_id: number;
  user_id: number;
  total_score: string;
  Evaluation: {
    name: string;
    Module: {
      name: string;
      course_id: number;
    };
  };
}


export interface RankingEva {
  result_id: number;
  evaluation_id: number;
  user_id: number;
  total_score: string;
  User: {
    user_id: number;
    email: string;
    role_id: number;
    created_at: string;
    updated_at: string;
    Profile: {
      first_name: string;
      last_name: string;
      profile_picture: string;
    };
  };
}
  
export interface Question {
  question: string
  image_url: string
  points: number
  correctAnswers: string[]
  incorrectAnswers: string[]
}

export interface EvaluationRequest {
  name: string
  module_id: number
}

export interface EvaluationWithQuestions {
  evaluation: EvaluationRequest,
  questions: QuizzRequest[]
}

export interface EvaluationResponse extends EvaluationRequest {
  evaluation_id: number
}

export interface QuizzRequest {
  evaluation_id: number;
  image_url: string;
  question: string;
  correct_answer: string;
  incorrect_answer?: string[];
  quizz_type?: number;
  order?: number;
}

export interface QuizzEvaluationRequest extends QuizzRequest {
  points: number;
}





export interface Result {
  evaluation_id: number,
  user_id: number,
  total_score: number;
}

