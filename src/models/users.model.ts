import { Entity, ObjectID, ObjectIdColumn, Column } from "typeorm";

@Entity()
export class Users {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  nickname: string;

  @Column()
  team: "blue" | "red" | "yellow";

  @Column()
  lastConnection: Date;
}
