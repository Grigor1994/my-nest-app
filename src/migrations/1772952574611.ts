import { Migration, QueryRunner } from 'typeorm';

export class Migration1772952574611 extends Migration {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    ALTER TABLE "user"
    ADD COLUMN IF NOT EXISTS password TEXT NOT NULL DEFAULT 'qwerty1234';
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN IF EXISTS password;`);
  }
}
