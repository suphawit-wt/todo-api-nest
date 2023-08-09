import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialUsersAndTodos1719740471997 implements MigrationInterface {
    name = 'InitialUsersAndTodos1719740471997'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`todos\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(100) NOT NULL, \`completed\` tinyint NOT NULL DEFAULT 0, \`user_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(50) NOT NULL, \`password\` varchar(60) NOT NULL, \`email\` varchar(254) NOT NULL, \`first_name\` varchar(80) NOT NULL, \`last_name\` varchar(80) NOT NULL, \`role\` enum ('User', 'Admin') NOT NULL DEFAULT 'User', UNIQUE INDEX \`idx_users_username\` (\`username\`), UNIQUE INDEX \`idx_users_email\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`todos\` ADD CONSTRAINT \`FK_53511787e1f412d746c4bf223ff\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`todos\` DROP FOREIGN KEY \`FK_53511787e1f412d746c4bf223ff\``);
        await queryRunner.query(`DROP INDEX \`idx_users_email\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`idx_users_username\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`todos\``);
    }

}
