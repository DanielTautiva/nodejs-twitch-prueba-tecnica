import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("id_user", ["idUser"], { unique: true })
@Index("document", ["document"], { unique: true })
@Index("fk_user_type", ["idTypeIdentification"], {})
@Entity("user_detail", { schema: "app_node" })
export class UserDetail {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "id_user",
    comment: "Id del usuario",
  })
  idUser: number;

  @Column("varchar", {
    name: "name_user_detail",
    comment: "Nombres del usuario",
    length: 80,
  })
  nameUserDetail: string;

  @Column("varchar", {
    name: "surname_user_detail",
    comment: "Apellidos del usuario",
    length: 80,
  })
  surnameUserDetail: string;

  @Column("varchar", {
    name: "business_name_tributary",
    nullable: true,
    comment: "Razón social tributario",
    length: 80,
  })
  businessNameTributary: string | null;

  @Column("int", {
    name: "id_type_identification",
    comment: "Id del tipo de documento",
  })
  idTypeIdentification: number;

  @Column("varchar", {
    name: "document",
    unique: true,
    comment: "Número de identificación o documento",
    length: 40,
  })
  document: string;

  @Column("varchar", {
    name: "phone_user_detail",
    nullable: true,
    comment: "Teléfono usuario",
    length: 30,
  })
  phoneUserDetail: string | null;

  @Column("varchar", {
    name: "address_user_detail",
    nullable: true,
    comment: "Dirección usuario",
    length: 200,
  })
  addressUserDetail: string | null;

  @Column("int", { name: "id_bank", nullable: true, comment: "Id del banco" })
  idBank: number | null;

  @Column("int", {
    name: "status_user_detail",
    comment: "Estado",
    default: () => "'10'",
  })
  statusUserDetail: number;

  @Column("datetime", {
    name: "creation_user_detail",
    comment: "Fecha creación",
    default: () => "CURRENT_TIMESTAMP",
  })
  creationUserDetail: Date;
}
