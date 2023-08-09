import { QueryFailedError } from 'typeorm/error/QueryFailedError';
import { ConflictError, DatabaseError, UnexpectedError } from '@app/common/exceptions';

export function handleException(error: Error) {

    if (error instanceof QueryFailedError) {

        if (error.driverError.message.includes('users.idx_users_username')) {
            throw new ConflictError('This Username is already taken.');
        }
        else if (error.driverError.message.includes('users.idx_users_email')) {
            throw new ConflictError('This Email is already taken.');
        }

        throw new DatabaseError('SQL operation error.');
    }

    throw new UnexpectedError();
}