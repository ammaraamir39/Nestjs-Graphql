/* eslint-disable prettier/prettier */
import {
    Query,
    Resolver,
    Mutation
} from '@nestjs/graphql'
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Quotation} from './quotations.entity';
import {QuotationService} from './quotations.service';


@Resolver(Quotation)
export class QuotationResolver {
    constructor(
        private readonly quotationsService: QuotationService,
        @InjectRepository(Quotation) private readonly quotationRepository: Repository<Quotation>
    ) {
    }

    @Query()
    async getQuotationById(_, {id}) {
        return await this.quotationsService.getQuotationById(id)
    }

    @Query()
    async getAllQuotations(_) {
        return await this.quotationsService.getAllQuotations()
    }

    @Mutation()
    async sendQuotationEmail(_, args) {
        return await this.quotationsService.sendQuotationEmail(args)
    }

    @Mutation()
    async addQuotation(_, args) {
        return this.quotationsService.addQuotation(args)
    }

    @Mutation()
    async deleteQuotation(_, {id}) {
        return await this.quotationsService.deleteQuotation(id)
    }

    @Mutation()
    async updateQuotation(_, args) {
        return await this.quotationsService.updateQuotation(args)
    }
}
