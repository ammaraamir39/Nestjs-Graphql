/* eslint-disable prettier/prettier */
import {Product} from "../products/product.entity";
import {Vendor} from "../vendors/vendor.entity";
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
import {Quantity} from "../quantity/quantity.entity";
import {OrderAdminChs} from "../orderAdminChs/orderAdminChs.entity";

@Entity()
export class Inventory {

    @PrimaryGeneratedColumn('increment')
    id: number

    @CreateDateColumn({type: 'timestamp without time zone'}) createdAt?: Date

    @UpdateDateColumn({type: 'timestamp without time zone'}) updatedAt?: Date

    @Column({nullable: true}) purchaseOrderNo: string

    @ManyToOne(() => Vendor, {onDelete: 'CASCADE'})
    @JoinColumn()
    vendor: Vendor

    @ManyToOne(() => Product, {onDelete: 'CASCADE'})
    @JoinColumn()
    product: Product

    @Column({nullable: true}) grade: string

    @Column({type: 'decimal', precision: 12, scale: 6}) size: number

    @Column({type: 'decimal', precision: 12, scale: 6}) feet: number

    @Column({type: 'decimal', precision: 12, scale: 6}) inches: number

    @Column({nullable: true}) heatNo: string

    @Column({nullable: true}) notes: string


    @OneToMany(
        () => Quantity,
        (quantity) => quantity.inventory,
        {eager: true, nullable: true, cascade: true}
    )
    quantity: Quantity[]

    @Column({nullable: true, type: 'decimal', precision: 12, scale: 6}) weight: number

    @Column({nullable: true, type: 'decimal', precision: 12, scale: 6}) totalBars: number

    @Column({nullable: true}) country: string


    @OneToMany(
        () => OrderAdminChs,
        (orderItem) => orderItem.inventory,
        {nullable: true}
    )
    orderItem: OrderAdminChs[]
}
