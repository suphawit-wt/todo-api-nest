import { HttpStatus } from '@nestjs/common/enums';

export class AppException extends Error {
    constructor(
        public readonly code: string,
        public readonly statusCode: number,
        public readonly message: string,
        public readonly errors?: string[],
    ) {
        super(message);
        this.name = 'AppException';
    }
}

export class BadRequestError extends AppException {
    constructor(message: string, errors: string[]) {
        super('BAD_REQUEST', HttpStatus.BAD_REQUEST, message, errors);
    }
}

export class UnauthorizedError extends AppException {
    constructor(message: string) {
        super('UNAUTHORIZED', HttpStatus.UNAUTHORIZED, message);
    }
}

export class ForbiddenError extends AppException {
    constructor(message: string) {
        super('FORBIDDEN', HttpStatus.FORBIDDEN, message);
    }
}

export class NotFoundError extends AppException {
    constructor(message: string) {
        super('NOT_FOUND', HttpStatus.NOT_FOUND, message);
    }
}

export class ConflictError extends AppException {
    constructor(message: string) {
        super('CONFLICT', HttpStatus.CONFLICT, message);
    }
}

export class DatabaseError extends AppException {
    constructor(message: string) {
        super('DATABASE_ERROR', HttpStatus.INTERNAL_SERVER_ERROR, message);
    }
}

export class UnexpectedError extends AppException {
    constructor() {
        super('UNEXPECTED', HttpStatus.INTERNAL_SERVER_ERROR, 'Unexpected error');
    }
}