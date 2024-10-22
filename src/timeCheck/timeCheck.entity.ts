/* eslint-disable prettier/prettier */
import {OrderAdmin} from "../orderAdmin/orderAdmin.entity";
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn
} from "typeorm";


@Entity()
export class TimeCheck {
    @PrimaryGeneratedColumn('increment')
    id: number

    @CreateDateColumn({type: 'timestamp with time zone'}) createdAt: Date

    @UpdateDateColumn({type: 'timestamp with time zone'}) updatedAt: Date

    @Column()
    status: string

    @ManyToOne(
        () => OrderAdmin,
        {onDelete: "CASCADE"}
    )
    @JoinColumn()
    order: OrderAdmin;

}
