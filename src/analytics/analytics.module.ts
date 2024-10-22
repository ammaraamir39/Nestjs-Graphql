/* eslint-disable prettier/prettier */
import {Module} from "@nestjs/common";
import {AnalyticsService} from "./analytics.service";
import {Customer} from "../customers/customer.entity";
import {Quotation} from "../quotations/quotations.entity";
import {OrderAdmin} from "../orderAdmin/orderAdmin.entity";
import {Employee} from "../employees/employee.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {AnalyticsResolver} from "./analytics.resolver";
import {Vendor} from "../vendors/vendor.entity";

@Module({
    exports: [AnalyticsService],
    providers: [AnalyticsService, AnalyticsResolver],
    imports: [
        TypeOrmModule.forFeature([Customer]),
        TypeOrmModule.forFeature([Quotation]),
        TypeOrmModule.forFeature([OrderAdmin]),
        TypeOrmModule.forFeature([Employee]),
        TypeOrmModule.forFeature([Vendor]),
    ]
})
export class AnalyticsModule {
}
