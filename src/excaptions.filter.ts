import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { MongoError } from 'mongodb';

@Catch(MongoError)
export class ExceptionHandler implements ExceptionFilter {
  catch(exception: MongoError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    if (exception.code === 11000) {
      const status = HttpStatus.BAD_REQUEST;
      response.status(status).json({
        message: 'Duplicated key',
        detailedMessage: exception.errmsg,
      });
    }
  }
}
