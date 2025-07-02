import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({length: 150})
    name: string

    @Column({length: 200})
    email: string
}