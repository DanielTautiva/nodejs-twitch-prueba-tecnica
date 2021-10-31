import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("name_type_identification", ["nameTypeIdentification"], { unique: true })
@Entity("types_identification", { schema: "app_node" })
export class TypesIdentification {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "id_type_identification",
    comment: "Id tipo identificación",
  })
  idTypeIdentification: number;

  @Column("varchar", {
    name: "name_type_identification",
    unique: true,
    comment: "Nombre del documento",
    length: 50,
  })
  nameTypeIdentification: string;

  @Column("int", {
    name: "status_type_identification",
    comment: "Estado",
    default: () => "'10'",
  })
  statusTypeIdentification: number;

  @Column("datetime", {
    name: "creation_type_identification",
    comment: "Fecha creación",
    default: () => "CURRENT_TIMESTAMP",
  })
  creationTypeIdentification: Date;
}
