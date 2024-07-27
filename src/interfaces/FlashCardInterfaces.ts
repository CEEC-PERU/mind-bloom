export interface FlashCardRequest {
    indication: string
    correct_answer: string[]
    incorrect_answer: string[]
    module_id: number
    quizztype_id: number,    
}