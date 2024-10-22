/* eslint-disable prettier/prettier */
import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {VendorModule} from "../vendors/vendor.modules";
import {Inventory} from "./inventory.entity";
import {InventoryService} from "./inventory.service";
import {ProductModule} from "../products/product.module";
import {InventoryResolver} from "./inventory.resolver";
import {Quantity} from "../quantity/quantity.entity";
import {OrderAdminChs} from "../orderAdminChs/orderAdminChs.entity";

@Module({
    providers: [InventoryService, InventoryResolver],
    exports: [InventoryService],
    imports: [
        TypeOrmModule.forFeature([Inventory]),
        TypeOrmModule.forFeature([Quantity]),
        TypeOrmModule.forFeature([OrderAdminChs]),
        ProductModule,
        VendorModule
    ],
})

export class InventoryModule {
}
