import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { RolOperation } from "./RolOperation";

@Index("fk_button_rol_operation", ["idRolOperation"], {})
@Entity("cg_buttons", { schema: "app_node" })
export class CgButtons {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "id_cg_button",
    comment: "Id configuración del botón",
  })
  idCgButton: number;

  @Column("varchar", {
    name: "icon_cg_button",
    comment: "Icono del botón",
    length: 20,
  })
  iconCgButton: string;

  @Column("varchar", {
    name: "title_cg_button",
    comment: "Título del botón",
    length: 40,
  })
  titleCgButton: string;

  @Column("varchar", {
    name: "action_cg_button",
    comment: "Acción del botón",
    length: 40,
  })
  actionCgButton: string;

  @Column("int", {
    name: "id_rol_operation",
    comment: "Id de roles operaciones",
  })
  idRolOperation: number;

  @Column("int", {
    name: "status_cg_button",
    comment: "Estado del botón",
    default: () => "'10'",
  })
  statusCgButton: number;

  @Column("datetime", {
    name: "creation_cg_button",
    comment: "Fecha creación",
    default: () => "CURRENT_TIMESTAMP",
  })
  creationCgButton: Date;

  @ManyToOne(() => RolOperation, (rolOperation) => rolOperation.cgButtons, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([
    { name: "id_rol_operation", referencedColumnName: "idRolOperation" },
  ])
  idRolOperation2: RolOperation;
}
