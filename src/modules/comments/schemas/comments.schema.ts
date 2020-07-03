import {object, number, string, ObjectSchema, joi } from '@hapi/joi';
import { id } from '../../../common/validationSchemas/common.validation.schemas';

export const postComment: ObjectSchema = object({
    comment: string().min(3).max(100).required()
})
