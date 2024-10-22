/* eslint-disable prettier/prettier */

import {Quotation} from "../quotations/quotations.entity";
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
export class QuotationStock {
    @PrimaryGeneratedColumn('increment')
    id: number

    @CreateDateColumn({type: 'timestamp with time zone'}) createdAt: Date

    @UpdateDateColumn({type: 'timestamp with time zone'}) updatedAt: Date

    @Column({
        type: 'enum',
        enum: ['A', 'C'],
        nullable: true
    })
    typeAorC: string

    @Column({
        type: 'enum',
        enum: ['L', 'B'],
        nullable: true
    })
    typeLorB: string

    @Column({type: 'decimal', precision: 12, scale: 6}) quantity: number

    @Column({nullable: true}) grade: string

    @Column({type: 'decimal', precision: 12, scale: 6, nullable: true}) startSize: number

    @Column({type: 'decimal', precision: 12, scale: 6}) finishSizeHigh: number

    @Column({type: 'decimal', precision: 12, scale: 6}) finishSizeLow: number

    @Column({type: 'decimal', precision: 12, scale: 6}) rms: number

    @Column({type: 'decimal', precision: 12, scale: 6}) feet: number

    @Column({type: 'decimal', precision: 12, scale: 6}) inches: number

    @Column({type: 'decimal', precision: 12, scale: 6, nullable: true}) tolerance: number

    @Column({type: 'decimal', precision: 12, scale: 6}) grossLB: number

    @Column({type: 'decimal', precision: 12, scale: 6}) netLB: number

    @Column({type: 'decimal', precision: 12, scale: 6, nullable: true}) stockRemoval: number

    @Column({type: 'decimal', precision: 12, scale: 6}) bars: number
    //new addition
    @Column({type: "decimal", precision: 12, scale: 6}) unitPrice: number

    @Column({
        type: "enum",
        enum: ['G', 'N', 'B', 'F', 'I']
    }) priceType: string

    @Column({type: "decimal", precision: 12, scale: 6, nullable: true}) boxingPrice: number

    @Column({type: "decimal", precision: 12, scale: 6, nullable: true}) total: number

    @Column({nullable: true}) notes: string

    @ManyToOne(
        () => Quotation,
        quote => quote.quotationStock,
        {onDelete: "CASCADE", nullable: true}
    )
    @JoinColumn()
    quote: Quotation;

}
