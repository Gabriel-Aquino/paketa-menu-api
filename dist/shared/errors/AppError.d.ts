export default class AppError {
    readonly message: string;
    readonly statusCode: number;
    readonly error?: any;
    constructor(message: string, statusCode: number, error: any);
    throwError(): {
        error: any;
        message: string;
    };
}
//# sourceMappingURL=AppError.d.ts.map