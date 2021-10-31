import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("user_history_password", { schema: "app_node" })
export class UserHistoryPassword {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "id_user_history_password",
    comment: "Id de la contraseña",
  })
  idUserHistoryPassword: number;

  @Column("varchar", {
    name: "hash_user_history_password",
    nullable: true,
    comment: "Contraseña definida por el usuario",
    length: 255,
  })
  hashUserHistoryPassword: string | null;

  @Column("int", { name: "id_user", nullable: true, comment: "ID del usuario" })
  idUser: number | null;

  @Column("datetime", {
    name: "creation_user_history_password",
    nullable: true,
    comment: "Fecha de creación",
  })
  creationUserHistoryPassword: Date | null;
}
