import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (request) {
      if (!request.headers.authorization) {
        return false;
      }
      request.user = await this.validateToken(request.headers.authorization);
      return true;
    } else {
      // GRAPHQL context
      const ctx: any = GqlExecutionContext.create(context).getContext();
      if (!ctx.headers.authorization) {
        return false;
      }

      ctx.user = await this.validateToken(ctx.headers.authorization);
      return true;
    }
  }

  async validateToken(auth: string) {
    const [Bearer, token] = auth.split(' ');
    if(Bearer !== 'Bearer') {
        throw new HttpException('Invalid token', HttpStatus.FORBIDDEN);
    }

    try {
      return await jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        throw new HttpException(error.message, HttpStatus.FORBIDDEN);
    }
  }
}