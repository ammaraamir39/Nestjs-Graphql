/* eslint-disable prettier/prettier */
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany
} from "typeorm";
import {Contact} from "../contacts/contact.entity";
import {Address} from '../address/address.entity';
import {OrderAdmin} from "../orderAdmin/orderAdmin.entity";

@Entity()
export class Customer {

    @PrimaryGeneratedColumn('increment')
    id: number

    @CreateDateColumn({type: 'timestamp without time zone'}) createdAt?: Date

    @UpdateDateColumn({type: 'timestamp without time zone'}) updatedAt?: Date

    @Column() companyName: string

    @Column({unique: true}) primaryAddress: string

    @Column({nullable: true}) fax: string

    @Column({nullable: true}) primaryContact: string

    @Column({nullable: true}) termsOfPayment: string

    @Column({nullable: true}) city: string

    @Column({nullable: true}) state: string

    @Column({nullable: true}) postalCode: string

    @Column({nullable: true}) shipVia: string

    @Column({nullable: true}) notes: string

    @OneToMany(() => Contact,
        contact => contact.customer,
        {nullable: true, eager: true, cascade: true})
    secondaryContacts: Contact[];

    @OneToMany(() => Address,
        address => address.customer,
        {nullable: true, eager: true, cascade: true})
    secondaryAddresses: Address[];

    @OneToMany(() => OrderAdmin,
        address => address.customer,
        {nullable: true, eager: true, cascade: true})
    orderAdmin: OrderAdmin[];
}
