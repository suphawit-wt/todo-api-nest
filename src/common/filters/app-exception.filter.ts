import { Catch } from '@nestjs/common/decorators';
import { ExceptionFilter, ArgumentsHost } from '@nestjs/common/interfaces';
import { Response } from 'express';
import { AppException, BadRequestError } from '@app/common/exceptions';
import { ApiRes, ApiResWithError } from '@app/common/dto/response';

@Catch(AppException)
export class AppExceptionFilter implements ExceptionFilter {

    catch(ex: AppException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const res = ctx.getResponse<Response>();

        let response = new ApiRes(ex.message);
        response.code = ex.code;

        if (ex instanceof BadRequestError) {
            response = new ApiResWithError(ex.message, ex.code, ex.errors);
        }

        res.status(ex.statusCode).json(response);
    }

}