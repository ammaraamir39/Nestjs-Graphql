/* eslint-disable prettier/prettier */
import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {OrderAdminChs} from "../orderAdminChs/orderAdminChs.entity";
import {CustomerModule} from "../customers/customer.module";
import {OrderAdmin} from "./orderAdmin.entity";
import {OrderAdminService} from "./orderAdmin.service";
import {OrderAdminResolver} from "./orderAdmin.resolver";
import {Employee} from "../employees/employee.entity";
import {EmployeeModule} from "../employees/employee.module";
import {TimeCheck} from "../timeCheck/timeCheck.entity";
import {Shipping} from "../shipping/shipping.entity";
import {Inventory} from "../inventory/inventory.entity";

@Module({
    providers: [OrderAdminService, OrderAdminResolver],
    exports: [OrderAdminService],
    imports: [
        TypeOrmModule.forFeature([OrderAdmin]),
        TypeOrmModule.forFeature([OrderAdminChs]),
        TypeOrmModule.forFeature([Employee]),
        TypeOrmModule.forFeature([TimeCheck]),
        TypeOrmModule.forFeature([Shipping]),
        TypeOrmModule.forFeature([Inventory]),
        CustomerModule,
        EmployeeModule
    ]
})

export class OrderAdminModule {
}
