/* eslint-disable prettier/prettier */
import {Module} from "@nestjs/common"
import {TypeOrmModule} from "@nestjs/typeorm";
import {PurchaseOrderProducts} from "./purchase_orders_products.entity";

@Module({
    imports:[
        TypeOrmModule.forFeature([PurchaseOrderProducts])
    ]
})

export class PurchaseOrderProductsModules{}
