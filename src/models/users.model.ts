import { Transform } from "class-transformer";
import { ObjectId } from "mongodb";
import { Entity, ObjectIdColumn, Column, ObjectID } from "typeorm";

@Entity({ name: "users" })
export class Users {
  @ObjectIdColumn({ name: "_id", type: "varchar" })
  @Transform((id: any) => id.value.toHexString(), { toPlainOnly: true })
  id: ObjectId;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  nickName: string;

  @Column()
  team: "blue" | "red" | "yellow";

  @Column()
  lastConnection: Date;
}
