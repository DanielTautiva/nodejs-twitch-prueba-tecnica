import { Column, Entity } from "typeorm";

@Entity("cg_general", { schema: "app_node" })
export class CgGeneral {
  @Column("int", {
    primary: true,
    name: "id_cg_general",
    comment: "Id configuración general",
  })
  idCgGeneral: number;

  @Column("varchar", {
    name: "file_size_cg_general",
    comment: "Tamaño del archivo",
    length: 20,
  })
  fileSizeCgGeneral: string;

  @Column("int", {
    name: "days_limit_cg_general",
    comment: "Días límite de cambio contraseña",
  })
  daysLimitCgGeneral: number;

  @Column("int", {
    name: "inactivity_time_cg_general",
    comment: "Tiempo de inactividad en minutos",
    default: () => "'10'",
  })
  inactivityTimeCgGeneral: number;

  @Column("int", {
    name: "status_cg_general",
    comment: "Estado configuración general",
    default: () => "'10'",
  })
  statusCgGeneral: number;

  @Column("datetime", {
    name: "creation_cg_general",
    comment: "Fecha creación",
    default: () => "CURRENT_TIMESTAMP",
  })
  creationCgGeneral: Date;
}
