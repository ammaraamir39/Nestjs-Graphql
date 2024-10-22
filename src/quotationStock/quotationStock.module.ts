/* eslint-disable prettier/prettier */
import {Module} from "@nestjs/common"
import {TypeOrmModule} from "@nestjs/typeorm";
import { QuotationStock } from "./quotationStock.entity";

@Module({
    imports:[
        TypeOrmModule.forFeature([QuotationStock])
    ]
})

export class QuotationStockModule{}
