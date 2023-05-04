import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1682603068737 implements MigrationInterface {
    name = 'Default1682603068737'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "matches" ADD "idhost" integer`);
        await queryRunner.query(`ALTER TABLE "matches" ADD "idvisitor" integer`);
        await queryRunner.query(`ALTER TABLE "matches" ADD CONSTRAINT "fk_host_id" FOREIGN KEY ("idhost") REFERENCES "team"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "matches" ADD CONSTRAINT "fk_visitor_id" FOREIGN KEY ("idvisitor") REFERENCES "team"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "matches" DROP CONSTRAINT "fk_visitor_id"`);
        await queryRunner.query(`ALTER TABLE "matches" DROP CONSTRAINT "fk_host_id"`);
        await queryRunner.query(`ALTER TABLE "matches" DROP COLUMN "idvisitor"`);
        await queryRunner.query(`ALTER TABLE "matches" DROP COLUMN "idhost"`);
    }

}
