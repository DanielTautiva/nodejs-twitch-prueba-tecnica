import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Index("fk_log_user", ["idUser"], {})
@Entity("log", { schema: "app_node" })
export class Log {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "id_log",
    comment: "Id del log",
  })
  idLog: number;

  @Column("int", { name: "id_user", comment: "Id del usuario" })
  idUser: number;

  @Column("varchar", { name: "user_name_log", comment: "Usuario", length: 80 })
  userNameLog: string;

  @Column("varchar", { name: "ip_log", comment: "Ip log", length: 40 })
  ipLog: string;

  @Column("varchar", { name: "module_log", comment: "Módulo", length: 80 })
  moduleLog: string;

  @Column("text", { name: "event_log", comment: "Evento" })
  eventLog: string;

  @Column("text", { name: "before_log", nullable: true, comment: "Antes log" })
  beforeLog: string | null;

  @Column("text", { name: "after_log", nullable: true, comment: "Después log" })
  afterLog: string | null;

  @Column("datetime", {
    name: "date_log",
    comment: "Fecha creación",
    default: () => "CURRENT_TIMESTAMP",
  })
  dateLog: Date;

  @ManyToOne(() => User, (user) => user.logs, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "id_user", referencedColumnName: "id" }])
  idUser2: User;
}
