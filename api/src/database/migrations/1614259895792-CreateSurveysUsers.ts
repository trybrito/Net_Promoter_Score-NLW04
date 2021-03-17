import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateSurveysUsers1614259895792 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "surveys_users",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "user_id",
                        type: "uuid",

                    },
                    {
                        name: "survey_id",
                        type: "uuid",
                    },
                    {
                        name: "value",
                        type: "number",
                        isNullable: true, // devemos habilitar a anulação do valor do campo pois o objetivo é que o usuário o preencha ao responder a pesquisa, ou seja, iniciaamente este campo deverá estar vazio, para ser preenchido posteriormente.
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    },
                ],
                foreignKeys: [ // podemos criar foreign key fora do createTable também, por meio do 'await queryRunner.createForeignKey', mas penso não ser tão interessante.
                    {
                        name: "FKUser",
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        columnNames: ["user_id"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE",
                    },
                    {
                        name: "FKSurvey",
                        referencedTableName: "surveys",
                        referencedColumnNames: ["id"],
                        columnNames: ["survey_id"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE",
                    },
                ],
            })
        );
    };

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("surveys_users");
    }
}
