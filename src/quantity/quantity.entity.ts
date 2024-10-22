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
import {Inventory} from "../inventory/inventory.entity";

@Entity()
export class Quantity {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({type: 'decimal', precision: 12, scale: 6})
    quantity: number

    @CreateDateColumn({type: 'timestamp with time zone'}) createdAt: Date

    @UpdateDateColumn({type: 'timestamp with time zone'}) updatedAt: Date

    @ManyToOne(
        () => Inventory,
        inventory => inventory.quantity,
        {onDelete: "CASCADE"}
    )
    @JoinColumn()
    inventory: Inventory;
}
