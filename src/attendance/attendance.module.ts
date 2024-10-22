/* eslint-disable prettier/prettier */
import {Module} from '@nestjs/common'
import {TypeOrmModule} from "@nestjs/typeorm";
import {AttendanceService} from "./attendance.service";
import {AttendanceResolver} from "./attendance.resolver";
import {Attendance} from "./attendance.entity";
import { Employee } from '../employees/employee.entity';
import { EmployeeModule } from '../employees/employee.module';

@Module({
    // exports: [EmployeeService],
    providers: [AttendanceResolver,AttendanceService],
    imports: [
        TypeOrmModule.forFeature([Attendance]),
        TypeOrmModule.forFeature([Employee]),
        EmployeeModule
    ],
})

export class AttendanceModule {
}
