import {object, number, string, ObjectSchema } from '@hapi/joi';
// import { id } from './../common/validationSchemas/common.validation.schemas';

export const UserSchema: ObjectSchema = object({
    firstName: string().min(3).max(100),
    lastName: string().min(3).max(100),
    email: string().min(3).max(100).required(),
    password: string().min(3).max(100).required(),
})

