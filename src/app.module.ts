/* eslint-disable prettier/prettier */
import {Module} from '@nestjs/common';
import {GraphQLModule} from '@nestjs/graphql';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ConfigModule, ConfigService} from 'nestjs-config';
import {DatabaseFactory} from './common/database.factory'
import * as path from 'path';
import {UserModule} from './users/user.module'
import {EmployeeModule} from "./employees/employee.module";
import {CustomerModule} from './customers/customer.module'
import {VendorModule} from "./vendors/vendor.modules";
import {PurchaseOrderModule} from "./purchase_orders/purhcase_order.modules";
import {PurchaseOrderProductsModules} from "./purchase_orders_products/purhcase_orders_products.modules";
import {ContactModule} from './contacts/contact.modules';
import {AddressModule} from './address/address.modules'
import {ProductModule} from "./products/product.module"
import {Grades} from './grade/grade.entity'
import {InventoryModule} from './inventory/inventory.module';
import {Quantity} from './quantity/quantity.entity';
import {QuotationModule} from './quotations/quotations.module';
import {QuotationStockModule} from './quotationStock/quotationStock.module';
import {ImageFileModules} from './imageFile/imageFile.module';
import {OrderAdminModule} from './orderAdmin/orderAdmin.module';
import {OrderAdminChsModule} from './orderAdminChs/orderAdminChs.module';
import {TimeCheckModule} from './timeCheck/timeCheck.module';
import {ShippingModule} from './shipping/shipping.module';
import {InvoiceARModule} from './invoiceAR/invoice.module';
import {InvoiceAPModule} from './invoiceAP/invoiceAP.module';
import {NonCoformanceModule} from './non-confirmance/nonConformance.module';
import {AnalyticsModule} from './analytics/analytics.module'
import {AttendanceModule} from './attendance/attendance.module';

@Module({
    imports: [
        ConfigModule.load(path.resolve(__dirname, 'config', '**/!(*.d).{ts,js}')),
        UserModule,
        EmployeeModule,
        CustomerModule,
        VendorModule,
        PurchaseOrderModule,
        PurchaseOrderProductsModules,
        InventoryModule,
        Quantity,
        ProductModule,
        QuotationModule,
        QuotationStockModule,
        OrderAdminModule,
        TimeCheckModule,
        OrderAdminChsModule,
        ImageFileModules,
        Grades,
        ContactModule,
        InvoiceARModule,
        InvoiceAPModule,
        ShippingModule,
        AddressModule,
        NonCoformanceModule,
        AttendanceModule,
        AnalyticsModule,
        AttendanceModule,
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            imports: [ConfigModule],
            useFactory: DatabaseFactory,
        }),
        GraphQLModule.forRoot({
            introspection: true,
            playground: true,
            installSubscriptionHandlers: true,
            debug: false,
            cors: {origin: process.env.HOST_URL, credentials: true},
            typePaths: [`${process.cwd()}/src/**/*.gql`],
            fieldResolverEnhancers: ['interceptors'],
            onHealthCheck: async () => true,
        })
    ],
})
export class AppModule {
}
