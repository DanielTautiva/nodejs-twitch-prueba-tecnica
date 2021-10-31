import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Log } from "./Log";
import { Notification } from "./Notification";
import { Rol } from "./Rol";

@Index("fk_user_rol", ["idRol"], {})
@Entity("user", { schema: "app_node" })
export class User {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "id",
    comment: "Id del usuario",
  })
  id: number;

  @Column("varchar", {
    name: "username",
    comment: "Número móvil o RUT",
    length: 255,
  })
  username: string;

  @Column("varchar", { name: "auth_key", comment: "Auth key", length: 32 })
  authKey: string;

  @Column("varchar", {
    name: "password_hash",
    comment: "Contraseña del usuario",
    length: 255,
  })
  passwordHash: string;

  @Column("varchar", {
    name: "password_reset_token",
    nullable: true,
    comment: "Código de restauración de contraseña",
    length: 255,
  })
  passwordResetToken: string | null;

  @Column("varchar", { name: "email", comment: "Correo", length: 255 })
  email: string;

  @Column("smallint", {
    name: "status",
    comment: "Estado",
    default: () => "'11'",
  })
  status: number;

  @Column("int", {
    name: "created_at",
    comment: "Fecha de creación convertida en número",
  })
  createdAt: number;

  @Column("int", {
    name: "updated_at",
    comment: "Fecha de modificación convertida en número",
  })
  updatedAt: number;

  @Column("datetime", {
    name: "token_expiration_date",
    comment: "Fecha en la que se vence el token para el usuario",
  })
  tokenExpirationDate: Date;

  @Column("int", { name: "id_rol", comment: "Id del rol" })
  idRol: number;

  @Column("varchar", {
    name: "access_token",
    comment: "Acceso de token",
    length: 255,
  })
  accessToken: string;

  @Column("int", {
    name: "attempts",
    comment: "Intentos",
    default: () => "'0'",
  })
  attempts: number;

  @Column("varchar", {
    name: "verification_token",
    nullable: true,
    comment: "Verificación de token",
    length: 255,
  })
  verificationToken: string | null;

  @OneToMany(() => Log, (log) => log.idUser2)
  logs: Log[];

  @OneToMany(() => Notification, (notification) => notification.idUserCreator2)
  notifications: Notification[];

  @OneToMany(
    () => Notification,
    (notification) => notification.idUserNotifying2
  )
  notifications2: Notification[];

  @ManyToOne(() => Rol, (rol) => rol.users, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "id_rol", referencedColumnName: "idRol" }])
  idRol2: Rol;
}
