/* eslint-disable prettier/prettier */
import {Module} from "@nestjs/common"
import {TypeOrmModule} from "@nestjs/typeorm";
import {Quantity} from "./quantity.entity";

@Module({
    imports:[
        TypeOrmModule.forFeature([Quantity])
    ]
})

export class QuantityModule{}
