// import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
//
// @Injectable()
// export class ValidationPipe implements PipeTransform<any> {
//   async transform(value: any, { metatype }: ArgumentMetadata) {
//     if (value instanceof Object && this.isEmpty(value)) {
//       throw new HttpException('Validation failed: No Body SUbmitted!', HttpStatus.BAD_REQUEST)
//     }
//
//     if (!metatype || !this.toValidate(metatype)) {
//       return value;
//     }
//     const object = plainToClass(metatype, value);
//     const errors = await validate(object);
//     if (errors.length > 0) {
//       throw new HttpException(`Validation failed: ${this.formatErrors(errors)}`, HttpStatus.BAD_REQUEST);
//     }
//     return value;
//   }
//
//   private toValidate(metatype: Function): boolean {
//     const types: Function[] = [String, Boolean, Number, Array, Object];
//     return !types.includes(metatype);
//   }
//
//   private formateError(errors: any[]){
//     return errors.map(err => {
//       for (let property in err.constraints){
//         return err.const[property]
//       }
//     }).join(', ')
//   }
//
//   private formatErrors(errors: ValidationError[]) {
//     const formatted = errors.map(err => {
//       for (const property in err.constraints) {
//         if (err.constraints.hasOwnProperty(property)) {
//           return {
//             path: err.property,
//             message: err.constraints[property],
//           };
//         }
//         return err.constraints[property]
//       }
//     });
//     console.log(formatted)
//     return formatted;
//   }
//
//   private isEmpty(value: any) {
//     if (Object.keys(value).length) {
//       return false;
//     }
//     return true
//   }
// }