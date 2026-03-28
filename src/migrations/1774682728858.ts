import { Migration, QueryRunner } from 'typeorm';

export class Migration1774682728858 extends Migration {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE currency_enum AS ENUM ('RUB', 'EUR', 'AMD');`);

    await queryRunner.query(`
      CREATE TABLE "account" (
        id SERIAL PRIMARY KEY,
        user_id integer NOT NULL,
        balance INTEGER NOT NULL DEFAULT 0,
        currency currency_enum,
        "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT NOW(),
        FOREIGN KEY (user_id) REFERENCES "user" (id) ON DELETE CASCADE,
        CONSTRAINT balance_non_negative CHECK (balance >= 0)
      );
    `);

    await queryRunner.query(`CREATE TYPE transaction_status_enum AS ENUM (
    'pending',
    'processing',
    'completed',
    'failed',
    'cancelled'
);`);

    await queryRunner.query(`
      CREATE TABLE "transactions_log" (
        id SERIAL PRIMARY KEY,
        from_account_id integer NOT NULL,
        to_account_id INTEGER NOT NULL,
        amount INTEGER NOT NULL,
        description text,
        status transaction_status_enum DEFAULT 'pending',
        "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT NOW(),
        FOREIGN KEY (from_account_id) REFERENCES "account" (id),
        FOREIGN KEY (to_account_id) REFERENCES "account" (id)
      );
    `);
  }
}
