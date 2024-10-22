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
import {Vendor} from "../vendors/vendor.entity"

@Entity()
export class Contact {

    @PrimaryGeneratedColumn('increment')
    id: number

    @CreateDateColumn({type: 'timestamp with time zone'}) createdAt: Date

    @UpdateDateColumn({type: 'timestamp with time zone'}) updatedAt: Date

    @Column() name: string

    @Column() contact: string

    @Column({nullable: true}) position: string

    @ManyToOne(() => Customer, customer => customer.secondaryContacts, {nullable: true, onDelete: "CASCADE"})
    @JoinColumn()
    customer: Customer

    @ManyToOne(() => Vendor, vendor => vendor.secondaryContacts, {nullable: true, onDelete: "CASCADE"})
    @JoinColumn()
    vendor: Vendor
}
