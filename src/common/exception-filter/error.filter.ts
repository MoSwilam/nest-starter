import { Catch, ArgumentsHost, HttpException, HttpStatus, ExceptionFilter, Logger } from '@nestjs/common';

@Catch(HttpException)
export class HttpErrorFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest();
        const response = ctx.getResponse();

        const status = exception.getStatus();

        const errorResponse = {
            code: status,
            path: request.url,
            method: request.method,
            timestamp: new Date().toLocaleString(),
            message: exception.message,
        }

        Logger.error(`${request.method} ${request.url}`, JSON.stringify(errorResponse, undefined, 4), 'ErrorFilter')

        response.status(status).json(errorResponse);
    }
}