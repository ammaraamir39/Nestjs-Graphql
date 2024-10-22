/* eslint-disable prettier/prettier */
import {
    Query,
    Resolver,
    Mutation
} from '@nestjs/graphql'
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {NonConformance} from './nonConfirmance.entity';
import {NonConformanceService} from './nonConformance.service';


@Resolver(NonConformance)
export class NonConformanceResolver {
    constructor(
        private readonly nonConformanceService: NonConformanceService,
        @InjectRepository(NonConformance) private readonly shippingRepository: Repository<NonConformance>
    ) {
    }

    @Query()
    async getNCById(_, {id}) {
        return await this.nonConformanceService.getNCById(id)
    }

    @Query()
    async getAllNCs(_) {
        return await this.nonConformanceService.getAllNCs()
    }

    @Mutation()
    async addNC(_, args) {
        return this.nonConformanceService.addNC(args)
    }

    @Mutation()
    async updateNC(_, args) {
        return this.nonConformanceService.updateNC(args)
    }

    @Mutation()
    async deleteNCById(_, {id}) {
        return await this.nonConformanceService.deleteNCById(id)
    }
}
