/* eslint-disable prettier/prettier */

import {OrderAdmin} from "../orderAdmin/orderAdmin.entity";
import {Inventory} from "../inventory/inventory.entity";
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn
} from "typeorm";


@Entity()
export class OrderAdminChs {
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

    @Column({nullable: true}) heatNo: string

    @Column({nullable: true}) dueDate: string

    @Column({type: 'decimal', precision: 12, scale: 6}) startSize: number

    @Column({type: 'decimal', precision: 12, scale: 6}) finishSizeHigh: number

    @Column({type: 'decimal', precision: 12, scale: 6}) finishSizeLow: number

    @Column({type: 'decimal', precision: 12, scale: 6, nullable: true}) rms: number

    @Column({type: 'decimal', precision: 12, scale: 6, nullable: true}) feet: number

    @Column({type: 'decimal', precision: 12, scale: 6, nullable: true}) inches: number

    @Column({nullable: true}) um: string

    @Column({type: 'decimal', precision: 12, scale: 6}) unitPrice: number

    @Column({nullable: true}) partNumber: string

    @Column({type: 'decimal', precision: 12, scale: 6}) total: number

    @Column({nullable: true}) inventoryNo: string

    @Column({nullable: true}) packaging: string

    @Column({nullable: true}) notes: string

    @ManyToOne(
        () => OrderAdmin,
        ord => ord.orderAdminChs,
        {onDelete: "CASCADE"}
    )
    @JoinColumn()
    order: OrderAdmin;

    @ManyToOne(
        () => Inventory,
        inv => inv.orderItem,
        {nullable: true, onDelete: 'SET NULL'}
    )
    @JoinColumn()
    inventory: Inventory
}
