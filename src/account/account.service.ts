import { Injectable } from '@nestjs/common';
import { AccountRepository } from './account.repository';
import { QueryRunner } from 'typeorm';
import { Account } from './account.entity';
import { AccountNotFoundException } from 'src/common/exceptions/account-not-found.exception';

@Injectable()
export class AccountService {
  constructor(private readonly repository: AccountRepository) {}

  async getById(id: number, queryRunner?: QueryRunner): Promise<Account> {
    const account = await this.repository.getById(id, queryRunner);

    if (!account) {
      throw new AccountNotFoundException(id);
    }

    return account;
  }
}
