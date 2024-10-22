/* eslint-disable prettier/prettier */
import {
    Query,
    Mutation,
    Resolver
} from '@nestjs/graphql'
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Customer} from './customer.entity'
import {CustomerService} from "./customer.service";

@Resolver(Customer)
export class CustomerResolver {
    constructor(
        private readonly customerService: CustomerService,
        @InjectRepository(Customer) private readonly customerRepository: Repository<Customer>
    ) {
    }

    @Query()
    async getCustomer(_, {id}) {
        return await this.customerService.getCustomerById(id)
    }

    @Query()
    async getAllCustomers(_) {
        return await this.customerService.getAllCustomers()
    }

    @Mutation()
    async addCustomer(_, args) {
        return await this.customerService.addCustomer(args)
    }

    @Mutation()
    async updateCustomer(_, args) {
        return await this.customerService.updateCustomer(args)
    }

    @Mutation()
    async deleteCustomer(_, id) {
        return await this.customerService.deleteCustomer(id)
    }
}
