import { NotFoundException } from '@nestjs/common';

export class AccountNotFoundException extends NotFoundException {
  constructor(accountId:number) {
    super(`Account with id ${accountId} not found`);
  }
}
