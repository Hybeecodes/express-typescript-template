import {MigrationInterface, QueryRunner} from "typeorm";

export class updateTodosTable1649886822304 implements MigrationInterface {
    name = 'updateTodosTable1649886822304'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `todos` DROP COLUMN `status`");
        await queryRunner.query("ALTER TABLE `todos` ADD `status` enum ('TODO', 'IN_PROGRESS', 'DONE') NOT NULL DEFAULT 'TODO'");
        await queryRunner.query("ALTER TABLE `todos` CHANGE `createdAt` `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `todos` CHANGE `updatedAt` `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `todos` CHANGE `updatedAt` `updatedAt` datetime(0) NOT NULL");
        await queryRunner.query("ALTER TABLE `todos` CHANGE `createdAt` `createdAt` datetime(0) NOT NULL");
        await queryRunner.query("ALTER TABLE `todos` DROP COLUMN `status`");
        await queryRunner.query("ALTER TABLE `todos` ADD `status` varchar(255) NOT NULL");
    }

}
