/* eslint-disable prettier/prettier */
import {Module} from "@nestjs/common"
import {TypeOrmModule} from "@nestjs/typeorm";
import { NonConformance } from "./nonConfirmance.entity";
import { NonConformanceResolver } from "./nonConformance.resolver";
import { NonConformanceService } from "./nonConformance.service";


@Module({
    providers:[NonConformanceResolver, NonConformanceService],
    imports:[
        TypeOrmModule.forFeature([NonConformance]),
        
    ]
})

export class NonCoformanceModule{}
