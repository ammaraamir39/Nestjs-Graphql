/* eslint-disable prettier/prettier */
import { Grades } from "../grade/grade.entity";
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany
} from "typeorm";

@Entity()
export class Product {

    @PrimaryGeneratedColumn('increment')
    id: number

    @CreateDateColumn({type: 'timestamp without time zone'}) createdAt?: Date

    @UpdateDateColumn({type: 'timestamp with time zone'}) updatedAt?: Date

    @Column({unique:true})
    name: string;

    @Column({ type: 'decimal', precision: 12, scale: 6, default: 0})
    unitWeight : number

    @OneToMany(
        () => Grades,
        (grades) => grades.product,
        {eager: true,nullable: true,cascade:true}
    )
    grades: Grades[]
}
