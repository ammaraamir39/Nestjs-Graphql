/* eslint-disable prettier/prettier */
import {Module} from "@nestjs/common"
import {TypeOrmModule} from "@nestjs/typeorm";
import {Grades} from "./grade.entity";

@Module({
    imports:[
        TypeOrmModule.forFeature([Grades])
    ]
})

export class GradesModules{}
