/* eslint-disable prettier/prettier */
import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {PurchaseOrderService} from "./purchase_order.service";
import {PurchaseOrderResolver} from "./purchase_order.resolver";
import {PurchaseOrder} from "./purchase_order.entity";
import {Vendor} from "../vendors/vendor.entity";
import {PurchaseOrderProducts} from "../purchase_orders_products/purchase_orders_products.entity";

@Module({
    providers: [PurchaseOrderService, PurchaseOrderResolver],
    imports: [
        TypeOrmModule.forFeature([PurchaseOrder]),
        TypeOrmModule.forFeature([Vendor]),
        TypeOrmModule.forFeature([PurchaseOrderProducts]),
    ]
})

export class PurchaseOrderModule {}
