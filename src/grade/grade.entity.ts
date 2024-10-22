/* eslint-disable prettier/prettier */
import {Product} from "../products/product.entity";
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn
} from "typeorm";

// import {PurchaseOrder} from '../purchase_orders/purchase_order.entity'

@Entity()
export class Grades {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({unique: true})
    name: string

    @CreateDateColumn({type: 'timestamp with time zone'}) createdAt: Date

    @UpdateDateColumn({type: 'timestamp with time zone'}) updatedAt: Date

    @ManyToOne(
        () => Product,
        product => product.grades,
        {onDelete: "CASCADE"}
    )
    @JoinColumn()
    product: Product;
}
