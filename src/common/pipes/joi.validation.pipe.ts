import * as Joi from '@hapi/joi';
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException, HttpStatus, HttpException } from '@nestjs/common';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private readonly schema) {}

  transform(rawData: any, metadata: ArgumentMetadata) {
    const options = {
      abortEarly: true,
      convert: true,
      allowUnknown: false,
      stripUnknown: false,
    };
    if (rawData instanceof Object && this.isEmpty(rawData)) {
      throw new HttpException('Validation failed: No Body Submitted!', HttpStatus.BAD_REQUEST)
    }

    const { error, value } = this.schema.validate(rawData, options);
    if (error) {
      const errorMessage = `Validation failed! Error: ${error.details[0].message}`;
      throw new BadRequestException(errorMessage);
    }
    return value;
  }

  private isEmpty(value: any) {
    if (Object.keys(value).length) {
      return false;
    }
    return true
  }
}
