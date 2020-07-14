import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createUsers1594198175275 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'users',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true
                },
                {
                    name: 'email',
                    type: 'varchar'
                },
                {
                    name: 'isEmailVerified',
                    type: 'boolean',
                    default: false
                },
                {
                    name: 'isBlocked',
                    type: 'boolean',
                    default: false
                },
                {
                    name: 'firstName',
                    type: 'varchar'
                },
                {
                    name: 'lastName',
                    type: 'varchar'
                },
                {
                    name: 'password',
                    type: 'varchar'
                },
                {
                    name: 'createdAt',
                    type: 'date',
                    default: 'CURRENT_TIMESTAMP'
                },
                {
                    name: 'updatedAt',
                    type: 'date',
                    default: 'CURRENT_TIMESTAMP'
                }
            ]
        }));
    };

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users_test');
    }

}
