import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  Check,
} from 'typeorm';
import { User } from '../user/user.entity';
import { CurrencyEnum } from './account.enum';

@Entity('account')
@Check(`"balance" >= 0`)
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column({ type: 'integer', default: 0 })
  balance: number;

  @Column({
    type: 'enum',
    enum: CurrencyEnum,
  })
  currency: CurrencyEnum;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User)
  @JoinColumn()
  user: User;

  constructor(data?: Partial<Account>) {
    Object.assign(this, data);
  }
}
