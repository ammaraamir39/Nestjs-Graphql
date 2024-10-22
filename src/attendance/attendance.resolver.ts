/* eslint-disable prettier/prettier */
import {
    Query,
    Resolver,
    Mutation
} from '@nestjs/graphql'
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Attendance} from "./attendance.entity";
import {AttendanceService} from "./attendance.service";

@Resolver(Attendance)
export class AttendanceResolver {
    constructor(
        private readonly attendanceService: AttendanceService,
        @InjectRepository(Attendance) private readonly attendanceRepository: Repository<Attendance>
    ) {
    }

    @Query()
    async getAttendanceById(_, {id}) {
        return await this.attendanceService.getAttendanceById(id)
    }

    @Query()
    async getAllAttendance(_) {
        return await this.attendanceService.getAllAttendance()
    }

    @Query()
    async getAllEmployeeAttendanceOfPastHalfMonth(_) {
        return await this.attendanceService.getAllEmployeeAttendanceOfPastHalfMonth()
    }

    @Mutation()
    async addAttendance(_, args) {
        return this.attendanceService.addAttendance(args)
    }

    @Mutation()
    async deleteAttendance(_, {id}) {
        return await this.attendanceService.deleteAttendance(id)
    }


    // @Mutation()
    // async updateEmployee(_, args) {
    //     return await this.employeeService.updateEmployee(args)
    // }
}
