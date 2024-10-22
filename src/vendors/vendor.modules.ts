/* eslint-disable prettier/prettier */
import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {VendorService} from "./vendor.service";
import {VendorResolver} from "./vendor.resolver";
import {Vendor} from "./vendor.entity";
import {Contact} from "../contacts/contact.entity"
import {Address} from "../address/address.entity"

@Module({
    providers:[VendorResolver, VendorService],
    exports:[VendorService],
    imports:[
        TypeOrmModule.forFeature([Vendor]),
        TypeOrmModule.forFeature([Contact]),
        TypeOrmModule.forFeature([Address])
    ]
})
export class VendorModule{}
