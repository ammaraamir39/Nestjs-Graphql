/* eslint-disable prettier/prettier */
import {Module} from "@nestjs/common"
import {TypeOrmModule} from "@nestjs/typeorm";
import { VendorModule } from "../vendors/vendor.modules";

import { InvoiceAP } from "./invoiceAP.entity";
import { InvoiceAPResolver } from "./invoiceAP.resolver";
import { InvoiceAPService } from "./invoiceAP.service";


@Module({
    providers:[InvoiceAPResolver, InvoiceAPService],
    imports:[
        TypeOrmModule.forFeature([InvoiceAP]),
        VendorModule
    ]
})

export class InvoiceAPModule{}
