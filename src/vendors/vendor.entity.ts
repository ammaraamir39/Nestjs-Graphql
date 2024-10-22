/* eslint-disable prettier/prettier */
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany
} from "typeorm";

import {PurchaseOrder} from "../purchase_orders/purchase_order.entity";
import {Contact} from "../contacts/contact.entity"
import {Address} from '../address/address.entity'


@Entity()
export class Vendor {

    @PrimaryGeneratedColumn('increment')
    id: number

    @CreateDateColumn({type: 'timestamp with time zone'}) createdAt: Date

    @UpdateDateColumn({type: 'timestamp with time zone'}) updatedAt: Date

    @Column() companyName: string

    @Column({unique: true}) primaryAddress: string

    @Column({nullable: true}) fax: string

    @Column({nullable: true}) primaryContact: string

    @Column({nullable: true}) termsOfPayment: string

    @Column({nullable: true}) notes: string

    @Column({nullable: true}) state: string

    @Column({nullable: true}) zipCode: string

    @Column({nullable: true}) city: string

    @OneToMany(
        () => PurchaseOrder,
        purchaseOrder => purchaseOrder.vendor,
        {onDelete: "CASCADE"}
    )
    purchaseOrder: PurchaseOrder[]

    @OneToMany(
        () => Contact,
        contact => contact.vendor,
        {eager: true, onDelete: "CASCADE", cascade: true}
    )
    secondaryContacts: Contact[]

    @OneToMany(
        () => Address,
        address => address.vendor,
        {eager: true, onDelete: "CASCADE", cascade: true}
    )
    secondaryAddresses: Address[]
}
