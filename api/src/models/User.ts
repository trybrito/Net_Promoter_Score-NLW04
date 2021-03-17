import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("users")
class User {
    @PrimaryColumn()
    readonly id: string;

    @Column()
    name: string; // podemos mudar, por questões de legibilidade de código, o nome das colunas no model, contudo, quando o fazemos, é necessário informar o nome da coluna na anotation.

    @Column()
    email: string;

    @CreateDateColumn()
    created_at: Date

    constructor() {
        if (!this.id) {
            this.id = uuid(); // definimos, na própria aplicação, o valor de id do usuário, pois queremos o valor no formato de uuid. 
        }
    }
}

export { User };
