import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { TransferDto } from './dto/transfer.dto';
import { SameAccountTransferException } from '../common/exceptions/same-account-transfer.exception';
import { AccountService } from '../account/account.service';
import { InsufficientFundsException } from '../common/exceptions/insufficient-funds.exception';
import { Account } from '../account/account.entity';
import { TransactionsLog } from '../transactions-log/transactions-log.entity';
import { TransactionStatusEnum } from '../transactions-log/transactions-log.enum';
import { TransferResponseDto } from './dto/transfer-response.dto';

@Injectable()
export class TransferService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly accountService: AccountService,
  ) {}

  async transferMoney(payload: TransferDto): Promise<TransferResponseDto> {
    const { amount, fromAccountId, description, toAccountId } = payload;

    if (fromAccountId === toAccountId) {
      throw new SameAccountTransferException();
    }

    const [fromAccount, toAccount] = await Promise.all([
      this.accountService.getById(fromAccountId),
      this.accountService.getById(toAccountId),
    ]);

    const currentBalance = fromAccount.balance;
    if (currentBalance < amount) {
      throw new InsufficientFundsException(currentBalance, amount);
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // update balances
      await queryRunner.manager.update(
        Account,
        {
          id: fromAccountId,
        },
        {
          balance: currentBalance - amount,
        },
      );

      await queryRunner.manager.update(
        Account,
        {
          id: toAccountId,
        },
        { balance: toAccount.balance + amount },
      );

      // creating transaction logs

      const transactionLog = await queryRunner.manager.save(
        new TransactionsLog({
          fromAccountId,
          toAccountId,
          amount,
          description: description || 'Money transfer',
          status: TransactionStatusEnum.COMPLETED,
        }),
      );

      console.log(
        `Transaction log updated successfully. transaction log id: ${transactionLog.id}`,
      );
      console.log(`Commiting transaction`);
      await queryRunner.commitTransaction();

      const updatedFrom = await this.accountService.getById(fromAccountId);
      const updatedTo = await this.accountService.getById(toAccountId);

      return new TransferResponseDto({
        success: true,
        amount,
        transactionLogId: transactionLog.id,
        fromBalance: updatedFrom.balance,
        toBalance: updatedTo.balance,
      });

    } catch (e) {
      console.error(e.message);
      await queryRunner.rollbackTransaction();
      throw e;
    } finally {
      await queryRunner.release();
    }
  }
}
