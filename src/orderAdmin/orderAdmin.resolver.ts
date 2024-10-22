/* eslint-disable prettier/prettier */
import {
    Query,
    Resolver,
    Mutation
} from '@nestjs/graphql'
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {OrderAdmin} from './orderAdmin.entity';
import {OrderAdminService} from './orderAdmin.service';

@Resolver(OrderAdmin)
export class OrderAdminResolver {
    constructor(
        private readonly orderAdminService: OrderAdminService,
        @InjectRepository(OrderAdmin) private readonly orderAdminRepository: Repository<OrderAdmin>
    ) {
    }

    @Query()
    async getOrderAdminById(_, {id}) {
        return await this.orderAdminService.getOrderAdminById(id)
    }

    @Query()
    async getAllOrderAdmins(_) {
        return await this.orderAdminService.getAllorderAdmins()
    }

    @Query()
    async getAllOrdersShop(_) {
        return await this.orderAdminService.getAllOrdersShop()
    }

    @Query()
    async getFiveOrders() {
        return await this.orderAdminService.getFiveOrders()
    }

    @Mutation()
    async addOrderAdmin(_, args) {
        return this.orderAdminService.addOrderAdmin(args)
    }

    @Mutation()
    async addTime(_, args) {
        return this.orderAdminService.addTime(args)
    }

    @Mutation()
    async updateEmployeeRecord(_, args) {
        return this.orderAdminService.updateEmployeeRecord(args)
    }

    @Mutation()
    async deleteOrderAdmin(_, {id}) {
        return await this.orderAdminService.deleteOrderAdmin(id)
    }

    @Mutation()
    async updateOrderAdmin(_, args) {
        return await this.orderAdminService.updateOrderAdmin(args)
    }
}
