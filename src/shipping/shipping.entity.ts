/* eslint-disable prettier/prettier */
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    OneToOne
} from "typeorm";
import {Contact} from "../contacts/contact.entity";
import {Address} from '../address/address.entity';
import {OrderAdmin} from "../orderAdmin/orderAdmin.entity";

@Entity()
export class Shipping {

    @PrimaryGeneratedColumn('increment')
    id: number

    @CreateDateColumn({type: 'timestamp with time zone'}) createdAt?: Date

    @UpdateDateColumn({type: 'timestamp with time zone'}) updatedAt?: Date

    @Column({type: 'decimal', precision: 12, scale: 6}) shippingCharges: number

    @Column({nullable: true}) shipVia: string

    @Column({nullable: true, type: 'decimal', precision: 12, scale: 6}) quantity: number

    @Column({nullable: true}) containerOptions: string

    @Column({default: false}) hasCustomerBilled: boolean

    @Column({nullable: true}) notes: string

    @ManyToOne(() => OrderAdmin, {onDelete: "CASCADE"})
    @JoinColumn()
    orderAdmin: OrderAdmin
}
