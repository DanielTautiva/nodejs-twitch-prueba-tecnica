import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Index("fk_notification_userc", ["idUserCreator"], {})
@Index("fk_notification_usern", ["idUserNotifying"], {})
@Entity("notification", { schema: "app_node" })
export class Notification {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "id_notification",
    comment: "Id de notificación",
  })
  idNotification: number;

  @Column("int", { name: "id_user_creator", comment: "Id del usuario creador" })
  idUserCreator: number;

  @Column("int", {
    name: "id_user_notifying",
    comment: "Id del usuario notificado",
  })
  idUserNotifying: number;

  @Column("varchar", {
    name: "name_notification",
    comment: "Texto de la notificación",
    length: 80,
  })
  nameNotification: string;

  @Column("varchar", {
    name: "url_notification",
    comment: "Url de redirección",
    length: 80,
  })
  urlNotification: string;

  @Column("int", {
    name: "status_notification",
    comment: "Estado",
    default: () => "'10'",
  })
  statusNotification: number;

  @Column("datetime", {
    name: "creation_notification",
    comment: "Fecha creación",
    default: () => "CURRENT_TIMESTAMP",
  })
  creationNotification: Date;

  @ManyToOne(() => User, (user) => user.notifications, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "id_user_creator", referencedColumnName: "id" }])
  idUserCreator2: User;

  @ManyToOne(() => User, (user) => user.notifications2, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "id_user_notifying", referencedColumnName: "id" }])
  idUserNotifying2: User;
}
