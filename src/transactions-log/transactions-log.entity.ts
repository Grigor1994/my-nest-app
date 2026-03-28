import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { TransactionStatusEnum } from './transactions-log.enum';
import { Account } from '../account/account.entity';

@Entity('transactions_log')
export class TransactionsLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fromAccountId: number;

  @Column()
  toAccountId: number;

  @Column({ type: 'integer' })
  amount: number;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({
    type: 'enum',
    enum: TransactionStatusEnum,
    default: TransactionStatusEnum.PENDING,
  })
  status: TransactionStatusEnum;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Account)
  @JoinColumn()
  fromAccount: Account;

  @ManyToOne(()=> Account)
  @JoinColumn()
  toAccount: Account;

  constructor(data?: Partial<TransactionsLog>) {
    Object.assign(this, data);
  }
}
