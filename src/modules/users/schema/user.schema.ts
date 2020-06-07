import {object, number, string, ObjectSchema } from '@hapi/joi';
import { id } from '../../../common/validationSchemas/common.validation.schemas';

export const postUser: ObjectSchema = object({
    username: string().min(3).max(100).required(),
    password: string().min(3).max(100).required(),
})

