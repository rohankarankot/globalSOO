import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
} from '@nestjs/common';
import { isValidObjectId } from 'mongoose';
import { Observable } from 'rxjs';

@Injectable()
export class ObjectIdValidationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const objectId = request.headers['id'];
    console.log('objectId: ', objectId);

    if (objectId && !isValidObjectId(objectId)) {
      throw new BadRequestException('Invalid ObjectID');
    }

    return next.handle();
  }
}
