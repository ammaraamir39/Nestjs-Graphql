/* eslint-disable prettier/prettier */
import {Module} from '@nestjs/common'
import {TypeOrmModule} from "@nestjs/typeorm";
import {EmployeeService} from "./employee.service";
import {EmployeeResolver} from "./employee.resolver";
import {Employee} from "./employee.entity";

@Module({
    exports: [EmployeeService],
    providers: [EmployeeResolver, EmployeeService],
    imports: [
        TypeOrmModule.forFeature([Employee])
    ],
})

export class EmployeeModule {
}
