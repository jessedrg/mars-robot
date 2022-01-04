import { CustomErrors } from './custom.errors';

export class NotFoundError extends CustomErrors {
  statusCode = 404;
  constructor() {
    super('Router not foung');
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
  serializeErrors() {
    return [{ message: 'Not Found' }];
  }
}
