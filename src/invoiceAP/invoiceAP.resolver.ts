/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
/* eslint-disable prettier/prettier */
import {
    Query,
    Resolver,
    Mutation
} from '@nestjs/graphql'

import {InvoiceAP} from './invoiceAP.entity';
import {InvoiceAPService} from './invoiceAP.service'


@Resolver(InvoiceAP)
export class InvoiceAPResolver {
    constructor(
        private readonly invoiceAPService: InvoiceAPService,
    ) {
    }

    @Query()
    async getInvoiceAPById(_, {id}) {
        return await this.invoiceAPService.getInvoiceAPById(id)
    }

    @Query()
    async getAllInvoiceAPs(_) {
        return await this.invoiceAPService.getAllInvoiceAPs()
    }

    @Mutation()
    async addInvoiceAP(_, args) {
        return this.invoiceAPService.addInvoiceAP(args)
    }

    @Mutation()
    async deleteInvoiceAPById(_, {id}) {
        return await this.invoiceAPService.deleteInvoiceAPById(id)
    }

    @Mutation()
    async updateInvoiceAP(_, args) {
        return await this.invoiceAPService.updateInvoiceAP(args)
    }
}
