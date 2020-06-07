import {object, string, ObjectSchema, number} from '@hapi/joi';

export const id = number().integer().min(1);
export const username =  string().min(3).max(100);
export const email = string().min(5).max(100).email();
export const password = string().min(6).max(100);

export const idSchema: ObjectSchema = object({
    id: id.required(),
});