import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate( context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (!request.headers.authorization) {
        return false;
    }

    request.user = await this.validateToken(request.headers.authorization);

    return true;
  }

  async validateToken(auth: string) {
    // 1- check the token format
    const [Bearer, token] = auth.split(' ');
    if(Bearer !== 'Bearer') {
        throw new HttpException('Invalid token', HttpStatus.FORBIDDEN);
    }

    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (error) {
        throw new HttpException(error.message, HttpStatus.FORBIDDEN);
    }
  }
}