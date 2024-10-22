/* eslint-disable prettier/prettier */
import {Injectable} from "@nestjs/common";
import {Repository} from 'typeorm'
import {Employee} from "./employee.entity";
import {InjectRepository} from "@nestjs/typeorm";
import moment, { Moment } from 'moment'


@Injectable()
export class EmployeeService {
    constructor(
        @InjectRepository(Employee) private readonly employeeRepository: Repository<Employee>
    ) {
    }

    async addEmployee({name, email, address, contact, socialSecurity, notes, isActive}) {
        const newEmployee = new Employee()
        newEmployee.name = name
        newEmployee.email = email
        newEmployee.address = address
        newEmployee.contact = contact
        newEmployee.socialSecurity = socialSecurity
        newEmployee.notes = notes
        newEmployee.isActive = isActive

        try {
            await this.employeeRepository.save(newEmployee)
            return true
        } catch (e) {
            return e
        }
    }

    async getEmployeeById(id: string) {
        return await this.employeeRepository.findOneOrFail(id)
    }


    async getAllEmployee() {
        return await this.employeeRepository.find({
            order: {
                id: "DESC"
            }
        })
    }

    async deleteEmployeeById(id) {
        try {
            const employee = await this.employeeRepository.findOneOrFail(id)
            await this.employeeRepository.remove(employee)
            return true
        } catch (e) {
            return e
        }
    }

    async updateEmployee({id, ...rest}) {
        try {
            const employee = await this.employeeRepository.findOneOrFail(id)
            Object.keys(rest).forEach(val => {
                employee[val] = rest[val]
            })
            return await this.employeeRepository.save(employee)
        } catch (e) {
            return e
        }
    }

    async getCurrentDayAttendance(days? : string) {
        let startOf;
        if(days !== 'Last Month'){
            if(days === 'Current Day') startOf = 'day'
            if(days === 'Week') startOf = 'week'
            if(days === 'Month') startOf = 'month'
            const date = moment().startOf(startOf).toISOString()
            console.log("Date =>",date)
            return await this.employeeRepository.createQueryBuilder('employee')
                .leftJoinAndSelect('employee.attendance', 'attendance', 'attendance.createdAt > :date', {date})
                .orderBy({
                    'employee.id': 'DESC',
                    'attendance.createdAt':'ASC'
                })
                .getMany()
        }else{
            const startOfMonth = moment().subtract(1,"month").startOf('month').toISOString()
            const endOfMonth = moment().subtract(1,"month").endOf('month').toISOString()
            return await this.employeeRepository.createQueryBuilder('employee')
            .leftJoinAndSelect('employee.attendance', 'attendance', 'attendance.createdAt > :startOfMonth and attendance.createdAt < :endOfMonth', {startOfMonth,endOfMonth})
            .orderBy({
                'employee.id': 'DESC',
                'attendance.createdAt':"ASC"
            })
            .getMany()    
        }
 
    }


}
