/* eslint-disable prettier/prettier */
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn, OneToMany
} from 'typeorm';
import {Quotation} from "../quotations/quotations.entity";

@Entity()
export class User {

    @PrimaryGeneratedColumn('increment')
    id: number

    @CreateDateColumn({type: 'timestamp with time zone'}) createdAt?: Date;

    @UpdateDateColumn({type: 'timestamp with time zone'}) updatedAt?: Date;

    @Column() name: string;

    @Column({unique: true}) email: string;

    @Column() firebaseUid: string;

    @Column({default: true})
    isActive: boolean;

    @Column({
        type: 'enum',
        enum: ['ADMIN', 'SHOP'],
        default: 'ADMIN',
    })
    role: string;

    @OneToMany(
        () => Quotation,
        (quot) => quot.quotedBy
    )
    quotation: Quotation[]

}
