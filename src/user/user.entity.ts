import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Account } from '../account/account.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: false })
  name: string;

  @Column({ type: 'text', nullable: false })
  surname: string;

  @Column({ type: 'text', nullable: true })
  patronymic?: string;

  @Column({ type: 'boolean', default: false })
  isStudent: boolean;

  @Column({ type: 'text', nullable: false, select: false })
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Account, (account) => account.user)
  accounts: Account[];

  constructor(data: Partial<User>) {
    Object.assign(this, data);
  }
}
