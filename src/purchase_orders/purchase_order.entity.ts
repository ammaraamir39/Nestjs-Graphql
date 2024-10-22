/* eslint-disable prettier/prettier */
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    ManyToOne,
    JoinColumn,
} from "typeorm";
import {PurchaseOrderProducts} from "../purchase_orders_products/purchase_orders_products.entity";
import {Vendor} from "../vendors/vendor.entity";

@Entity()
export class PurchaseOrder {

    @PrimaryGeneratedColumn('increment')
    id: number

    @CreateDateColumn({type: 'timestamp with time zone'}) createdAt: Date

    @UpdateDateColumn({type: 'timestamp with time zone'}) updatedAt: Date

    @Column({nullable: true}) contactName: string

    @OneToMany(
        () => PurchaseOrderProducts,
        (product) => product.purchaseOrder,
        {eager: true, cascade: true}
    )
    products: PurchaseOrderProducts[]

    @ManyToOne(
        () => Vendor,
        vend => vend.purchaseOrder,
        {onDelete: 'CASCADE'}
    )
    @JoinColumn()
    vendor: Vendor
}
