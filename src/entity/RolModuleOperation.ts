import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RolOperation } from "./RolOperation";

@Entity("rol_module_operation", { schema: "app_node" })
export class RolModuleOperation {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "id_rol_module_operation",
    comment: "Id de relación",
  })
  idRolModuleOperation: number;

  @Column("varchar", {
    name: "name_rol_module_operation",
    comment: "Nombre del módulo",
    length: 45,
  })
  nameRolModuleOperation: string;

  @Column("varchar", {
    name: "class_rol_module_operation",
    comment: "Ícono del módulo",
    length: 40,
  })
  classRolModuleOperation: string;

  @Column("varchar", {
    name: "route_rol_module_operation",
    comment: "Ruta del módulo",
    length: 40,
  })
  routeRolModuleOperation: string;

  @Column("int", {
    name: "order_rol_module_operation",
    nullable: true,
    comment: "Orden del módulo",
    default: () => "'999'",
  })
  orderRolModuleOperation: number | null;

  @Column("int", {
    name: "status_rol_module_operation",
    comment: "Estado",
    default: () => "'10'",
  })
  statusRolModuleOperation: number;

  @Column("datetime", {
    name: "creation_rol_module_operation",
    comment: "Fecha creación",
    default: () => "CURRENT_TIMESTAMP",
  })
  creationRolModuleOperation: Date;

  @OneToMany(
    () => RolOperation,
    (rolOperation) => rolOperation.idRolModuleOperation2
  )
  rolOperations: RolOperation[];
}
