/* eslint-disable prettier/prettier */
import {Customer} from "../customers/customer.entity";
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from "typeorm";
import {Vendor} from "../vendors/vendor.entity";

@Entity()
export class InvoiceAP {

    @PrimaryGeneratedColumn('increment')
    id: number

    @CreateDateColumn({type: 'timestamp with time zone'}) createdAt?: Date

    @UpdateDateColumn({type: 'timestamp with time zone'}) updatedAt?: Date

    @Column({nullable: true, type: 'decimal', precision: 12, scale: 6}) shippingCharges: number

    @Column({nullable: true, type: 'decimal', precision: 12, scale: 6}) invoiceTotal: number

    @Column({nullable: true}) status: string

    @ManyToOne(() => Vendor, {onDelete: 'CASCADE'})
    @JoinColumn()
    vendor: Vendor

}
