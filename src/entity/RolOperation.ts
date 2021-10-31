import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CgButtons } from "./CgButtons";
import { RolModuleOperation } from "./RolModuleOperation";
import { Submodules } from "./Submodules";
import { RolTypeOperation } from "./RolTypeOperation";

@Index("name_rol_operation", ["nameRolOperation"], { unique: true })
@Index("fk_operation_submodule", ["idSubmodule"], {})
@Index("fk_operation_module", ["idRolModuleOperation"], {})
@Entity("rol_operation", { schema: "app_node" })
export class RolOperation {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "id_rol_operation",
    comment: "Id del rol operación",
  })
  idRolOperation: number;

  @Column("varchar", {
    name: "name_rol_operation",
    unique: true,
    comment: "Ruta del servicio",
    length: 80,
  })
  nameRolOperation: string;

  @Column("varchar", {
    name: "alias_rol_operation",
    comment: "Nombre de la operación",
    length: 80,
  })
  aliasRolOperation: string;

  @Column("int", { name: "id_submodule", comment: "Id del submódulo" })
  idSubmodule: number;

  @Column("int", { name: "id_rol_module_operation", comment: "Id del módulo" })
  idRolModuleOperation: number;

  @Column("int", {
    name: "status_rol_operation",
    comment: "Estado",
    default: () => "'10'",
  })
  statusRolOperation: number;

  @Column("datetime", {
    name: "creation_rol_operation",
    comment: "Fecha creación",
    default: () => "CURRENT_TIMESTAMP",
  })
  creationRolOperation: Date;

  @OneToMany(() => CgButtons, (cgButtons) => cgButtons.idRolOperation2)
  cgButtons: CgButtons[];

  @ManyToOne(
    () => RolModuleOperation,
    (rolModuleOperation) => rolModuleOperation.rolOperations,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([
    {
      name: "id_rol_module_operation",
      referencedColumnName: "idRolModuleOperation",
    },
  ])
  idRolModuleOperation2: RolModuleOperation;

  @ManyToOne(() => Submodules, (submodules) => submodules.rolOperations, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "id_submodule", referencedColumnName: "idSubmodule" }])
  idSubmodule2: Submodules;

  @OneToMany(
    () => RolTypeOperation,
    (rolTypeOperation) => rolTypeOperation.idRolOperation2
  )
  rolTypeOperations: RolTypeOperation[];
}
