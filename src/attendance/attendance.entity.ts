/* eslint-disable prettier/prettier */
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne
} from "typeorm";
import {Employee} from "../employees/employee.entity";

@Entity()
export class Attendance {

    @PrimaryGeneratedColumn('increment')
    id: number

    @CreateDateColumn({type: 'timestamp with time zone'}) createdAt?: Date

    @UpdateDateColumn({type: 'timestamp with time zone'}) updatedAt?: Date

    @Column({
        type: 'enum',
        enum: ['CHECK_IN', 'CHECK_OUT']
    })
    attendanceStatus: string;


    @Column({nullable: true})
    notes: string;

    @ManyToOne(
        () => Employee,
        (emp) => emp.attendance,
        {onDelete: "CASCADE"}
    )
    employee: Employee
}
