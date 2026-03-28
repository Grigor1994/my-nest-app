import { Migration, QueryRunner } from 'typeorm';

export class Migration1772950362317 extends Migration {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "post" (
        id SERIAL PRIMARY KEY,
        user_id integer NOT NULL,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT NOW(),
        FOREIGN KEY (user_id) REFERENCES "user" (id) ON DELETE CASCADE
      );
    `);

    await queryRunner.query(
      `CREATE INDEX idx_post_user_id ON "post"(user_id)`
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX EXISTS "idx_post_user_id";`);
    await queryRunner.query(`DROP TABLE IF EXISTS "post";`);
  }
}
