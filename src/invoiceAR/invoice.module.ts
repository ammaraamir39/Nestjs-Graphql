/* eslint-disable prettier/prettier */
import {Module} from "@nestjs/common"
import {TypeOrmModule} from "@nestjs/typeorm";
import {CustomerModule} from "../customers/customer.module";
import {OrderAdminModule} from "../orderAdmin/orderAdmin.module";
import {InvoiceAR} from "./invoice.entity";
import {InvoiceARResolver} from "./invoice.resolver";
import {InvoiceARService} from "./invoice.service";
import {OrderAdmin} from "../orderAdmin/orderAdmin.entity";


@Module({
    providers: [InvoiceARResolver, InvoiceARService],
    imports: [
        TypeOrmModule.forFeature([InvoiceAR]),
        TypeOrmModule.forFeature([OrderAdmin]),
        OrderAdminModule,
        CustomerModule
    ]
})

export class InvoiceARModule {
}
