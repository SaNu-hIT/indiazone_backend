import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  statusCode: number;
  message: string;
  data: T;
  timestamp: string;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    const httpContext = context.switchToHttp();
    const response = httpContext.getResponse();
    
    return next.handle().pipe(
      map(data => ({
        statusCode: response.statusCode,
        message: this.getSuccessMessage(context),
        data,
        timestamp: new Date().toISOString(),
      })),
    );
  }

  private getSuccessMessage(context: ExecutionContext): string {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();
    const method = request.method;
    
    switch (method) {
      case 'POST':
        return 'Resource created successfully';
      case 'PUT':
      case 'PATCH':
        return 'Resource updated successfully';
      case 'DELETE':
        return 'Resource deleted successfully';
      default:
        return 'Request processed successfully';
    }
  }
}