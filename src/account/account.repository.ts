import { QueryRunner, Repository } from 'typeorm';
import { Account } from './account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AccountRepository extends Repository<Account> {
  constructor(
    @InjectRepository(Account) private readonly repository: Repository<Account>,
  ) {
    super(repository.target, repository.manager);
  }

  async getById(
    id: number,
    queryRunner?: QueryRunner,
  ): Promise<Account | null> {
    return (queryRunner?.manager ?? this.manager).findOne(Account, {
      where: { id },
    });
  }
}
