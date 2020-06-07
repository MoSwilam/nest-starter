// import { Injectable, NestInterceptor, ExecutionContext, Logger } from '@nestjs/common';
// import { Observable } from 'rxjs';
// import { tap } from 'rxjs/operators';

// @Injectable()
// export class LogginInterceptor implements NestInterceptor {
//     intercept(
//         ctx: ExecutionContext,
//         next: Observable<any>
//     ): Observable<any> {
//         const req = ctx.switchToHttp().getRequest();
//         const method = ctx.switchToHttp().getRequest();
//         const res = ctx.switchToHttp().getRequest();
//         const url = req.url;
//         const now = Date.now();
// 
// 
//         return next.pipe(
//             tap(() => Logger.log(`${method} ${url} ${Date.now() - now}ms`, ctx.getClass().name))
//         );
//     }
// }