import { MigrationInterface, QueryRunner } from "typeorm";

export class fixMigrations1658234031431 implements MigrationInterface {
    name = 'fixMigrations1658234031431'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Rooms" DROP CONSTRAINT "UQ_32d4c5d25a565f95b283fe641b5"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Rooms" ADD CONSTRAINT "UQ_32d4c5d25a565f95b283fe641b5" UNIQUE ("roomNumber")`);
    }

}
