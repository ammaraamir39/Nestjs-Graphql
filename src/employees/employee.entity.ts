/* eslint-disable prettier/prettier */
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from "typeorm";
import {Attendance} from "../attendance/attendance.entity";

@Entity()
export class Employee {

    @PrimaryGeneratedColumn('increment')
    id: number

    @CreateDateColumn({type: 'timestamp without time zone'}) createdAt?: Date

    @UpdateDateColumn({type: 'timestamp with time zone'}) updatedAt?: Date

    @Column()
    name: string;

    @Column({unique: true, nullable: true})
    email: string;

    @Column()
    address: string

    @Column()
    contact: string

    @Column({unique: true})
    socialSecurity: string

    @Column({nullable: true})
    notes: string

    @Column({
        type: 'enum',
        enum: ['CHECK_IN', 'CHECK_OUT'],
        nullable: true
    })
    attendanceStatus: string;

    @Column({default: true})
    isActive: boolean

    @OneToMany(
        () => Attendance,
        (att) => att.employee,
        {nullable: true}
    )
    attendance: Attendance[];


}
