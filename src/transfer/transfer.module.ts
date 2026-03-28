import { Module } from '@nestjs/common';
import { TransferService } from './transfer.service';
import { TransferController } from './transfer.controller';
import { AccountModule } from '../account/account.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionsLog } from '../transactions-log/transactions-log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionsLog]),AccountModule],
  providers: [TransferService],
  controllers: [TransferController],
})
export class TransferModule {}
