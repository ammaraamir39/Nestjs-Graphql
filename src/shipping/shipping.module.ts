/* eslint-disable prettier/prettier */
import {Module} from "@nestjs/common"
import {TypeOrmModule} from "@nestjs/typeorm";
import {OrderAdminModule} from "../orderAdmin/orderAdmin.module";
import {Shipping} from "./shipping.entity";
import {ShippingResolver} from "./shipping.resolver";
import {ShippingService} from "./shipping.service";
import {OrderAdmin} from "../orderAdmin/orderAdmin.entity";

@Module({
    providers: [ShippingResolver, ShippingService],
    imports: [
        TypeOrmModule.forFeature([Shipping]),
        TypeOrmModule.forFeature([OrderAdmin]),
        OrderAdminModule
    ]
})

export class ShippingModule {
}
