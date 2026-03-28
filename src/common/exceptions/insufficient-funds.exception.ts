import { BadRequestException } from '@nestjs/common';

export class InsufficientFundsException extends BadRequestException {
  constructor(available: number, required: number) {
    super(`Insufficient funds. Available: ${available}, Required ${required}`);
  }
}
