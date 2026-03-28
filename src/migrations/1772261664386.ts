import { Migration, QueryRunner } from 'typeorm';

export class Migration1772261664386 extends Migration {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
     CREATE TABLE "user" (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    surname TEXT NOT NULL,
    patronymic TEXT,
    "is_student" BOOLEAN NOT NULL DEFAULT FALSE,
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);
    `);
  }
}
