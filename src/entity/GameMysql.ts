import { Entity, PrimaryGeneratedColumn, Column, Unique, PrimaryColumn } from "typeorm";
import { IsNotEmpty } from "class-validator";

@Entity()
@Unique(['name'])

export class GameMysql {

    @PrimaryColumn()
    id: string;

    @Column()
    @IsNotEmpty()
    name: string;

    @Column()
    @IsNotEmpty()
    url: string;

}