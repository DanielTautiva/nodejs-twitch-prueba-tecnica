import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { RolSubmodulesForms } from "./RolSubmodulesForms";
import { RolTypeOperation } from "./RolTypeOperation";
import { User } from "./User";

@Index("name_rol", ["nameRol"], { unique: true })
@Entity("rol", { schema: "app_node" })
export class Rol {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "id_rol",
    comment: "Id del rol",
  })
  idRol: number;

  @Column("varchar", {
    name: "name_rol",
    unique: true,
    comment: "Nombre del rol",
    length: 50,
  })
  nameRol: string;

  @Column("int", {
    name: "status_rol",
    comment: "Estado",
    default: () => "'10'",
  })
  statusRol: number;

  @Column("datetime", {
    name: "creation_rol",
    comment: "Fecha de creación",
    default: () => "CURRENT_TIMESTAMP",
  })
  creationRol: Date;

  @OneToMany(
    () => RolSubmodulesForms,
    (rolSubmodulesForms) => rolSubmodulesForms.idRol2
  )
  rolSubmodulesForms: RolSubmodulesForms[];

  @OneToMany(
    () => RolTypeOperation,
    (rolTypeOperation) => rolTypeOperation.idRol2
  )
  rolTypeOperations: RolTypeOperation[];

  @OneToMany(() => User, (user) => user.idRol2)
  users: User[];
}
