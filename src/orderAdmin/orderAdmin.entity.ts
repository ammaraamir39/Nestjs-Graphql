/* eslint-disable prettier/prettier */
import {OrderAdminChs} from "../orderAdminChs/orderAdminChs.entity";
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    ManyToMany,
    JoinTable,
    ManyToOne
} from "typeorm";
import {Customer} from "../customers/customer.entity";
import {ImageFile} from "../imageFile/imageFile.entity";
import {Employee} from "../employees/employee.entity";

@Entity()
export class OrderAdmin {

    @PrimaryGeneratedColumn('increment')
    id: number

    @CreateDateColumn({type: 'timestamp without time zone'}) createdAt?: Date

    @UpdateDateColumn({type: 'timestamp without time zone'}) updatedAt?: Date

    @ManyToOne(() => Customer,
        (cus) => cus.orderAdmin, {onDelete: 'CASCADE'}
    )
    customer: Customer

    @Column({nullable: true}) shipToCustomerName: string

    @Column({nullable: true}) shipToCustomerAddress: string

    @Column({nullable: true}) pONumber: string

    @Column({nullable: true}) buyerName: string

    @Column({nullable: true}) shipDate: string

    @Column({nullable: true}) invoiceNo: string

    @Column({nullable: true}) status: string

    @Column({nullable: true}) notes: string

    @ManyToMany(
        () => Employee,
        {nullable: true}
    )
    @JoinTable()
    employee: Employee[]

    @OneToMany(
        () => OrderAdminChs,
        (ord) => ord.order,
        {eager: true, cascade: true}
    )
    orderAdminChs: OrderAdminChs[]

    @OneToMany(
        () => ImageFile,
        (image) => image.orderAdmin,
        {eager: true, nullable: true}
    )
    imageUrl: ImageFile[]


    @Column({type: "decimal", precision: 12, scale: 6}) grandTotal: number
}
