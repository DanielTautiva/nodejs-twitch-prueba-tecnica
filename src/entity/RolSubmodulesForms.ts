import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Submodules } from "./Submodules";
import { Rol } from "./Rol";

@Index("fk_rol_submodule", ["idRol"], {})
@Index("fk_forms_submodule", ["idSubmodule"], {})
@Entity("rol_submodules_forms", { schema: "app_node" })
export class RolSubmodulesForms {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "id_rol_submodules_form",
    comment: "Id rol, módulo y formulario",
  })
  idRolSubmodulesForm: number;

  @Column("int", {
    name: "id_submodule",
    comment: "Relación con la tabla de módulos",
  })
  idSubmodule: number;

  @Column("int", { name: "id_rol", comment: "Relación con la tabla roles" })
  idRol: number;

  @Column("varchar", {
    name: "formgroup_rol_submodules_form",
    comment: "Id formGroup del formulario",
    length: 40,
  })
  formgroupRolSubmodulesForm: string;

  @Column("varchar", {
    name: "field_rol_submodules_form",
    comment: "Campo del formulario",
    length: 40,
  })
  fieldRolSubmodulesForm: string;

  @Column("int", {
    name: "status_rol_submodules_form",
    comment: "Estado",
    default: () => "'10'",
  })
  statusRolSubmodulesForm: number;

  @Column("datetime", {
    name: "creation_rol_submodules_form",
    comment: "Fecha creación",
    default: () => "CURRENT_TIMESTAMP",
  })
  creationRolSubmodulesForm: Date;

  @ManyToOne(() => Submodules, (submodules) => submodules.rolSubmodulesForms, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "id_submodule", referencedColumnName: "idSubmodule" }])
  idSubmodule2: Submodules;

  @ManyToOne(() => Rol, (rol) => rol.rolSubmodulesForms, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "id_rol", referencedColumnName: "idRol" }])
  idRol2: Rol;
}
