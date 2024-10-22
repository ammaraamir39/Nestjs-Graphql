/* eslint-disable prettier/prettier */
import {InjectRepository} from "@nestjs/typeorm";
import {Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {Attendance} from "./attendance.entity";
import {Employee} from "../employees/employee.entity";
import {EmployeeService} from "../employees/employee.service";
import moment from 'moment'

@Injectable()
export class AttendanceService {
    constructor(
        @InjectRepository(Attendance) private attendanceRepository: Repository<Attendance>,
        @InjectRepository(Employee) private employeeRepository: Repository<Employee>,
        private readonly employeeService: EmployeeService
    ) {
    }

    async addAttendance(args) {
        try {
            const attendance = new Attendance()
            const employee = await this.employeeService.getEmployeeById(args.employeeId)
            employee.attendanceStatus = args.attendanceStatus

            attendance.employee = employee
            attendance.attendanceStatus = args.attendanceStatus
            attendance.notes = args.notes
            await this.attendanceRepository.save(attendance)

            await this.employeeRepository.save(employee)

            return true

        } catch (e) {
            return e
        }
    }

    async getAttendanceById(id) {
        return await this.attendanceRepository.findOneOrFail(id, {
            relations: ['employee']
        })
    }


    async getAllEmployeeAttendanceOfPastHalfMonth() {
        try {
            const date = moment(Date.now()).subtract(1, "days").toISOString()
            // console.log("Date = >",date.toISOString())
            return await this.attendanceRepository.createQueryBuilder('attendance')
                .leftJoinAndSelect('attendance.employee', 'employee')
                .where('attendance.createdAt > :date', {date})
                .orderBy({
                    'attendance.createdAt': 'DESC'
                })
                .getMany()

            // const date = new Date(new Date().getTime() - (15 * 24 * 60 * 60 * 1000));

            // const employeeAttendance = await this.attendanceRepository.find({
            //     where: { 
            //         createdAt : MoreThan(date.toISOString())
            //     }
            // })

            // console.log("Employeee Attendance=> ",employeeAttendance)
        } catch (error) {
            console.log("Error=> ", error)
            return error
        }
    }


    async getAllAttendance() {
        return await this.attendanceRepository.find({
            relations: ['employee'],
            order: {
                id: 'DESC'
            }
        })
    }


    async deleteAttendance(id) {
        try {
            const attendance = await this.attendanceRepository.findOneOrFail(id)
            await this.attendanceRepository.delete(attendance.id)
            return true
        } catch (error) {
            return error;
        }
    }

    // async punchOutEmployees(){

    // }

    // async updateAttendance({id, ...rest}) {
    //     try {
    //         const attendance = await this.attendanceRepository.findOneOrFail(id)
    //         if (product.grades.length > 0) {
    //             await this.gradeRepository.remove(product.grades)
    //         }

    //         for (const val of Object.keys(rest)) {
    //             product[val] = rest[val]
    //         }
    //         await this.productRepository.save(product)
    //         return true
    //     } catch (e) {
    //         return e
    //     }

    // }

}
