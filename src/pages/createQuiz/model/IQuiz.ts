export interface IQuiz {
    topicId?: number,
    topicName?: string,
    userId?: string | null,
    description?: string,
    numberOfQuestion? : number | string,
    marksPerQuestion?: number,
    maxMarks? : number,
    publish? : number,
}



export enum pageEnum {
    topic,
    question,
}