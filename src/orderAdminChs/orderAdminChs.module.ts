/* eslint-disable prettier/prettier */
import {Module} from "@nestjs/common"
import {TypeOrmModule} from "@nestjs/typeorm";
import { OrderAdminChs } from "./orderAdminChs.entity";

@Module({
    imports:[
        TypeOrmModule.forFeature([OrderAdminChs])
    ]
})

export class OrderAdminChsModule{}
