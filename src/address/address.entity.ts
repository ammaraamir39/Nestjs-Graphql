/* eslint-disable prettier/prettier */
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn
} from "typeorm";
import {Customer} from "../customers/customer.entity";
import {Vendor} from '../vendors/vendor.entity'

@Entity()
export class Address {

    @PrimaryGeneratedColumn('increment')
    id: number

    @CreateDateColumn({type: 'timestamp with time zone'}) createdAt: Date

    @UpdateDateColumn({type: 'timestamp with time zone'}) updatedAt: Date

    @Column() name: string

    @Column() address: string

    @ManyToOne(
        () => Customer,
        customer => customer.secondaryAddresses,
        {nullable: true, onDelete: "CASCADE"})
    @JoinColumn()
    customer: Customer;

    @ManyToOne(
        () => Vendor,
        vendor => vendor.secondaryAddresses,
        {nullable: true, onDelete: "CASCADE"})
    @JoinColumn()
    vendor: Vendor;
}
