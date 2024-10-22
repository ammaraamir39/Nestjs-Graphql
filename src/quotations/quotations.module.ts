/* eslint-disable prettier/prettier */
import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Quotation} from "./quotations.entity";
import {QuotationStock} from "../quotationStock/quotationStock.entity";
import {QuotationService} from "./quotations.service";
import {CustomerModule} from "../customers/customer.module";
import {QuotationResolver} from "./quotations.resolver";

@Module({
    providers: [QuotationService, QuotationResolver],

    imports: [
        TypeOrmModule.forFeature([Quotation]),

        TypeOrmModule.forFeature([QuotationStock]),
        CustomerModule
    ]
})

export class QuotationModule {
}
