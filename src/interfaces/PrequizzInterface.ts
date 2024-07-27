export interface PrequizzRequest {
    image_url: string;
    question: null | string;
    correct_answer: string;
    incorrect_answer: string[];
    course_id: number;
}

export interface PrequizzResponse extends PrequizzRequest {
    prequizz_id: number;
}