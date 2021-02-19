/**
 * @summary Base Http Exception Class
 */
class HttpException extends Error {
    status: number;
    message: string;
    constructor(message: string, status: number) {
        super(message);
        this.status = status;
        this.message = message;
    }
}

export default HttpException;
