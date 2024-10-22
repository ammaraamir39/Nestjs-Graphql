/* eslint-disable prettier/prettier */
import {OrderAdmin} from "../orderAdmin/orderAdmin.entity";
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn
} from "typeorm";
import {Quotation} from "../quotations/quotations.entity";

@Entity()
export class ImageFile {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({nullable: true})
    fileName: string

    @Column({nullable: true})
    description: string

    @Column({nullable: true})
    url: string

    @Column({nullable: true})
    bucketFileName: string

    @CreateDateColumn({type: 'timestamp with time zone'}) createdAt: Date

    @UpdateDateColumn({type: 'timestamp with time zone'}) updatedAt: Date

    @ManyToOne(
        () => Quotation,
        quote => quote.imageUrl,
        {onDelete: "CASCADE", nullable: true}
    )
    @JoinColumn()
    quote: Quotation;

    @ManyToOne(
        () => OrderAdmin,
        order => order.imageUrl,
        {onDelete: "CASCADE", nullable: true},
    )
    @JoinColumn()
    orderAdmin: OrderAdmin;
}
