
interface userDetails {
    userFirstName?: string,
    userMiddleName?: string,
    userLastName?: string,


}


export interface ITopic {
    topicId?: number,
    topicName?: string,
    userId?: string | null,
    description?: string,
    numberOfQuestion? : number,
    marksPerQuestion?: number,
    maxMarks? : number,
    publish? : number,
    publishedOn : Date,
    createdBy? : userDetails
}



export enum pageEnum {
    topic,
    question,
}