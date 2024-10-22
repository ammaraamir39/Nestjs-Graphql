/* eslint-disable prettier/prettier */
import {Product} from "../products/product.entity";
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    OneToMany
} from "typeorm";
import {Customer} from "../customers/customer.entity";
import {QuotationStock} from "../quotationStock/quotationStock.entity";
import {ImageFile} from "../imageFile/imageFile.entity";
import {User} from '../users/user.entity'

@Entity()
export class Quotation {

    @PrimaryGeneratedColumn('increment')
    id: number

    @CreateDateColumn({type: 'timestamp without time zone'}) createdAt?: Date

    @UpdateDateColumn({type: 'timestamp without time zone'}) updatedAt?: Date


    @ManyToOne(() => Customer, {onDelete: 'CASCADE'})
    @JoinColumn()
    customer: Customer


    @Column({nullable: true}) req: string

    @Column({nullable: true}) contactName: string

    @Column({nullable: true}) contactNumber: string

    @Column({nullable: true}) leadTime: string

    @Column({nullable: true}) faxNumber: string

    @ManyToOne(
        () => User,
        user => user.quotation,
        {onDelete: "CASCADE"}
    )
    @JoinColumn()
    quotedBy: User;

    @Column({nullable: true}) shipVia: string


    @OneToMany(
        () => QuotationStock,
        (qs) => qs.quote,
        {cascade: true, eager: true}
    )
    quotationStock: QuotationStock[]

    @OneToMany(
        () => ImageFile,
        (image) => image.quote,
        {nullable: true}
    )
    imageUrl: ImageFile[]

    @Column({type: "decimal", precision: 12, scale: 6}) grandTotal: number
}
