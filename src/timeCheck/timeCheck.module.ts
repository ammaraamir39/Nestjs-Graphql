/* eslint-disable prettier/prettier */
import {Module} from "@nestjs/common"
import {TypeOrmModule} from "@nestjs/typeorm";
import {TimeCheck} from "./timeCheck.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([TimeCheck])
    ],

})

export class TimeCheckModule {
}
