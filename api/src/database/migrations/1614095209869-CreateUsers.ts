import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsers1614095209869 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> { // o método up é utilizado quando você quer executar a migration, ou seja, criar uma tabela.
        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "name",
                        type: "varchar",
                        // por default os campos são nullables.
                    },
                    {
                        name: "email",
                        type: "varchar",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> { // já o down, para deleção.
        await queryRunner.dropTable("users");
    }

}
