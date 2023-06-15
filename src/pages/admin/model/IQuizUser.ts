export interface IQuizUser {
    userId: number;
    userFirstName: string,
    userMiddleName?: string,
    userLastName : string,
    userDateOfBirth: Date,
    userAge : number,
    userEmail : string,
    userPhoneNo: string,
    userCreatedOn: string,
    isActive: number,
}