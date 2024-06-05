import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
// import { User } from "./User";
@Entity('course')
export class Course{

  @PrimaryGeneratedColumn()
  id?: number

  @Column()
  name: string

  @Column()
  description: string

  @Column()
  price: number

  @Column()
  duration: number

  @CreateDateColumn()
  create_time?: Date

  @UpdateDateColumn()
  update_time?: Date

  // @OneToMany(() => User, (user) => user.course)
}
