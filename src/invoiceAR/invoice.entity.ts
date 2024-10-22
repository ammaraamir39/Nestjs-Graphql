/* eslint-disable prettier/prettier */
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from "typeorm";
import {OrderAdmin} from "../orderAdmin/orderAdmin.entity";

@Entity()
export class InvoiceAR {

    @PrimaryGeneratedColumn('increment')
    id: number

    @CreateDateColumn({type: 'timestamp with time zone'}) createdAt?: Date

    @UpdateDateColumn({type: 'timestamp with time zone'}) updatedAt?: Date

    @Column({nullable: true}) periodNo: string

    @Column({nullable: true, type: 'decimal', precision: 12, scale: 6}) shippingCharges: number

    @Column({nullable: true, type: 'decimal', precision: 12, scale: 6}) salesTaxAmount: number

    @Column({nullable: true, type: 'decimal', precision: 12, scale: 6}) invoiceTotal: number

    @Column({nullable: true}) status: string

    @Column({default: true}) ignoreMinimumChanges: boolean

    @ManyToOne(() => OrderAdmin, {onDelete: "CASCADE"})
    @JoinColumn()
    orderAdmin: OrderAdmin

}
