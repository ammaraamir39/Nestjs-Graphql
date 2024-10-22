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
import {PurchaseOrder} from '../purchase_orders/purchase_order.entity'

@Entity()
export class PurchaseOrderProducts {
    @PrimaryGeneratedColumn('increment')
    id: number

    @CreateDateColumn({type: 'timestamp with time zone'}) createdAt: Date

    @UpdateDateColumn({type: 'timestamp with time zone'}) updatedAt: Date

    @Column({type: 'decimal', precision: 12, scale: 6}) quantity: number

    @Column({type: 'decimal', precision: 12, scale: 6}) unitPrice: number

    @Column() unitOfMeasure: string

    @Column({nullable: true}) description: string

    // @Column()
    // public total: number

    @ManyToOne(
        () => PurchaseOrder,
        purchaseOrder => purchaseOrder.products,
        {onDelete: "CASCADE"}
    )
    @JoinColumn()
    purchaseOrder: PurchaseOrder;
}
