/* eslint-disable prettier/prettier */
import {
    Query,
    Resolver,
    Mutation
} from '@nestjs/graphql'
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Employee} from "./employee.entity";
import {EmployeeService} from "./employee.service";

@Resolver(Employee)
export class EmployeeResolver {
    constructor(
        private readonly employeeService: EmployeeService,
        @InjectRepository(Employee) private readonly employeeRepository: Repository<Employee>
    ) {
    }

    @Query()
    async getEmployee(_, {id}) {
        return await this.employeeService.getEmployeeById(id)
    }

    @Query()
    async getAllEmployee(_) {
        return await this.employeeService.getAllEmployee()
    }

    @Query()
    async getCurrentDayAttendance(_,{days}) {
        return await this.employeeService.getCurrentDayAttendance(days)
    }

    @Mutation()
    async addEmployee(_, args) {
        return this.employeeService.addEmployee(args)
    }

    @Mutation()
    async deleteEmployeeById(_, {id}) {
        return await this.employeeService.deleteEmployeeById(id)
    }

    @Mutation()
    async updateEmployee(_, args) {
        return await this.employeeService.updateEmployee(args)
    }
}
