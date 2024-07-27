export interface DictionaryRequest {
    word: string | null;
    correct_answer: string[];
    incorrect_answer: string[];
    module_id: number;
    quizztype_id: number;
}

export interface DictionaryResponse {
    message: string;
    error?: string;
}