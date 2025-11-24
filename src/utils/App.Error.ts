export class AppError {
    message: string
    statuCode: number

    constructor(message: string, statuCode: number = 400) {
        this.message = message
        this.statuCode = statuCode
    }
}