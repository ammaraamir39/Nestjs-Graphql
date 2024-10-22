/* eslint-disable prettier/prettier */
import {
    Query,
    Resolver,
    Mutation
} from '@nestjs/graphql'
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {ShippingService} from './shipping.service';
import {Shipping} from './shipping.entity';

@Resolver(Shipping)
export class ShippingResolver {
    constructor(
        private readonly shippingService: ShippingService,
        @InjectRepository(Shipping) private readonly shippingRepository: Repository<Shipping>
    ) {
    }

    @Query()
    async getShippingById(_, {id}) {
        return await this.shippingService.getShippingById(id)
    }

    @Query()
    async getAllShipping(_) {
        return await this.shippingService.getAllShipping()
    }

    @Mutation()
    async addShipping(_, args) {
        return this.shippingService.addShipping(args)
    }

    @Mutation()
    async updateShipping(_, args) {
        return this.shippingService.updateShipping(args)
    }

    @Mutation()
    async deleteShippingById(_, {id}) {
        return await this.shippingService.deleteShippingById(id)
    }

    // @Mutation()
    // async updateProduct(_, args) {
    //     return await this.employeeService.updateProduct(args)
    // }
}
