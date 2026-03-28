import { BadRequestException } from '@nestjs/common';

export class SameAccountTransferException extends BadRequestException {
  constructor() {
    super(`Cannot transfer money to same account.`);
  }
}
