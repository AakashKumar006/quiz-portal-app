import {IQuestionCorrectOption} from "./IQuestionCorrectOption";

export interface IQuizAttempt {
    topicId?: string,
    questCorrectOpt?:IQuestionCorrectOption[]
}
