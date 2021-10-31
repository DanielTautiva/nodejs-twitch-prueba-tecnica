import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Rol } from "./Rol";
import { RolOperation } from "./RolOperation";

@Index("fk_operation_rol", ["idRol"], {})
@Index("fk_operation_type", ["idRolOperation"], {})
@Entity("rol_type_operation", { schema: "app_node" })
export class RolTypeOperation {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "id_rol_type_operation",
    comment: "Id tipo operación",
  })
  idRolTypeOperation: number;

  @Column("int", { name: "id_rol", comment: "Id rol" })
  idRol: number;

  @Column("int", { name: "id_rol_operation", comment: "Id operación" })
  idRolOperation: number;

  @ManyToOne(() => Rol, (rol) => rol.rolTypeOperations, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "id_rol", referencedColumnName: "idRol" }])
  idRol2: Rol;

  @ManyToOne(
    () => RolOperation,
    (rolOperation) => rolOperation.rolTypeOperations,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([
    { name: "id_rol_operation", referencedColumnName: "idRolOperation" },
  ])
  idRolOperation2: RolOperation;
}
