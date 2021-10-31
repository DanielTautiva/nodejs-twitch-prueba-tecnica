import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RolOperation } from "./RolOperation";
import { RolSubmodulesForms } from "./RolSubmodulesForms";

@Entity("submodules", { schema: "app_node" })
export class Submodules {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "id_submodule",
    comment: "Id submódulo",
  })
  idSubmodule: number;

  @Column("varchar", {
    name: "name_submodule",
    comment: "Nombre del submódulo",
    length: 80,
  })
  nameSubmodule: string;

  @Column("varchar", {
    name: "schema_forms_submodule",
    comment: "Esquema de formularios",
    length: 40,
  })
  schemaFormsSubmodule: string;

  @Column("int", {
    name: "status_submodule",
    comment: "Estado",
    default: () => "'10'",
  })
  statusSubmodule: number;

  @Column("datetime", {
    name: "creation_submodule",
    comment: "Fecha creación",
    default: () => "CURRENT_TIMESTAMP",
  })
  creationSubmodule: Date;

  @OneToMany(() => RolOperation, (rolOperation) => rolOperation.idSubmodule2)
  rolOperations: RolOperation[];

  @OneToMany(
    () => RolSubmodulesForms,
    (rolSubmodulesForms) => rolSubmodulesForms.idSubmodule2
  )
  rolSubmodulesForms: RolSubmodulesForms[];
}
