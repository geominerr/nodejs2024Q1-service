import { HttpException, HttpStatus } from '@nestjs/common';

export class UserAlreadyExistsException extends HttpException {
  constructor() {
    super('User already exist', HttpStatus.CONFLICT);
  }
}

export class UserNotFoundException extends HttpException {
  constructor() {
    super('User not found', HttpStatus.NOT_FOUND);
  }
}

export class IncorrectOldPasswordException extends HttpException {
  constructor() {
    super('Incorrect old password', HttpStatus.FORBIDDEN);
  }
}
