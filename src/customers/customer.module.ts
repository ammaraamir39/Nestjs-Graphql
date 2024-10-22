/* eslint-disable prettier/prettier */
import {Module} from "@nestjs/common"
import {TypeOrmModule} from "@nestjs/typeorm";
import {CustomerService} from "./customer.service";
import {CustomerResolver} from "./customer.resolver";
import {Customer} from "./customer.entity";
import {Contact} from '../contacts/contact.entity'
import {Address} from '../address/address.entity'

@Module({
    exports:[CustomerService],
    providers:[CustomerResolver,CustomerService],
    imports:[
        TypeOrmModule.forFeature([Customer]),
        TypeOrmModule.forFeature([Contact]),
        TypeOrmModule.forFeature([Address]),
    ]
})
export class CustomerModule{}
