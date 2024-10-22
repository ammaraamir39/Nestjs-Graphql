/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
/* eslint-disable prettier/prettier */
import {
    Query,
    Resolver,
    Mutation
} from '@nestjs/graphql'

import {InvoiceAR} from './invoice.entity';
import {InvoiceARService} from './invoice.service'


@Resolver(InvoiceAR)
export class InvoiceARResolver {
    constructor(
        private readonly invoiceARService: InvoiceARService,
    ) {
    }

    @Query()
    async getInvoiceARById(_, {id}) {
        return await this.invoiceARService.getInvoiceARById(id)
    }

    @Query()
    async getAllInvoiceARs(_) {
        return await this.invoiceARService.getAllInvoiceARs()
    }

    @Query()
    async getFiveInvoicesAR() {
        return await this.invoiceARService.getFiveInvoicesAR()
    }

    @Mutation()
    async addInvoiceAR(_, args) {
        return this.invoiceARService.addInvoiceAR(args)
    }

    @Mutation()
    async deleteInvoiceARById(_, {id}) {
        return await this.invoiceARService.deleteInvoiceARById(id)
    }

    @Mutation()
    async updateInvoiceAR(_, args) {
        return await this.invoiceARService.updateInvoiceAR(args)
    }
}
