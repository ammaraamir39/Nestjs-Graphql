/* eslint-disable prettier/prettier */
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";


@Entity()
export class NonConformance {

    @PrimaryGeneratedColumn('increment')
    id: number

    @CreateDateColumn({type: 'timestamp with time zone'}) createdAt?: Date

    @UpdateDateColumn({type: 'timestamp with time zone'}) updatedAt?: Date

    @Column({nullable: true}) nonConformanceType: string

    @Column({nullable: true}) nonConformanceCode: string

    @Column({type: 'decimal', precision: 12, scale: 6}) invoiceTotal: number
    @Column({type: 'decimal', precision: 12, scale: 6}) quantity: number

    @Column({nullable: true}) customerCode: string

}
