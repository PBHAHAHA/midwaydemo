import { Column, Entity } from "typeorm";
import { BaseEntity } from "../common/base.entity";
// import { Course } from "./Course";

@Entity('user')
export class User extends BaseEntity{

  @Column({comment: "姓名"})
  name: string

  @Column({comment: "年龄"})
  age: number

  @Column({comment: "课程"})
  courses: []
}
