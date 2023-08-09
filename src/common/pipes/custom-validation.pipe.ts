import { Injectable } from '@nestjs/common/decorators';
import { ValidationPipe } from '@nestjs/common/pipes';
import { ValidationError } from 'class-validator';
import { BadRequestError } from '@app/common/exceptions';

@Injectable()
export class CustomValidationPipe extends ValidationPipe {
    protected flattenValidationErrors(validationErrors: ValidationError[]): string[] {
        const errors: string[] = [];

        validationErrors.forEach((error) => {
            Object.values(error.constraints).forEach((message) => {
                errors.push(message);
            });
        });

        return errors;
    }

    createExceptionFactory() {
        return (validationErrors: ValidationError[] = []) => {
            const errors = this.flattenValidationErrors(validationErrors);
            throw new BadRequestError("Invalid nput", errors);
        };
    }

}