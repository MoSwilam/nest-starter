import {object, number, string, ObjectSchema } from '@hapi/joi';
import { id } from '../../common/validationSchemas/common.validation.schemas';

export const addIdeaSchema: ObjectSchema = object({
    idea: string().min(3).max(100),
    description: string().min(3).max(100).required(),
})

