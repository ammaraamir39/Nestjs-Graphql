/* eslint-disable prettier/prettier */
import {InjectRepository} from "@nestjs/typeorm";
import {Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {InvoiceAR} from "./invoice.entity";

import {OrderAdminService} from "../orderAdmin/orderAdmin.service";
import {OrderAdmin} from "../orderAdmin/orderAdmin.entity";

@Injectable()
export class InvoiceARService {
    constructor(
        @InjectRepository(InvoiceAR) private invoiceARRepository: Repository<InvoiceAR>,
        @InjectRepository(OrderAdmin) private orderAdminRepository: Repository<OrderAdmin>,
        private readonly orderAdminService: OrderAdminService,
    ) {
    }

    async addInvoiceAR(args) {
        try {
            const invoiceAR = new InvoiceAR()
            const order = await this.orderAdminService.getOrderAdminById(args.orderId)
            order.status = 'COMPLETED'
            invoiceAR.orderAdmin = order
            invoiceAR.periodNo = args.periodNo
            invoiceAR.ignoreMinimumChanges = args.ignoreMinimumChanges
            invoiceAR.salesTaxAmount = args.salesTaxAmount
            invoiceAR.shippingCharges = args.shippingCharges
            invoiceAR.status = args.status
            invoiceAR.invoiceTotal = args.invoiceTotal
            await this.invoiceARRepository.save(invoiceAR)
            await this.orderAdminRepository.save(order)

            return true

        } catch (e) {
            return e
        }
    }


    async updateInvoiceAR({id, ...rest}) {
        try {
            const invoiceAR = await this.invoiceARRepository.findOneOrFail(id)
            if (rest.orderId) invoiceAR.orderAdmin = await this.orderAdminService.getOrderAdminById(rest.orderId)
            Object.keys(rest).forEach(val => {
                invoiceAR[val] = rest[val]
            })
            return await this.invoiceARRepository.save(invoiceAR)
        } catch (e) {
            return e
        }
    }

    async getInvoiceARById(id) {
        return await this.invoiceARRepository.findOneOrFail(id, {
            relations: ['orderAdmin', 'orderAdmin.customer']
        })
    }

    async getAllInvoiceARs() {
        return await this.invoiceARRepository.find({
            relations: ['orderAdmin', 'orderAdmin.customer'],
            order: {
                id: 'DESC'
            }
        })
    }


    async deleteInvoiceARById(id) {
        try {
            const invoiceAR = await this.invoiceARRepository.findOneOrFail(id)
            await this.invoiceARRepository.delete(invoiceAR.id)
            return true
        } catch (error) {
            return error;
        }
    }

    async getFiveInvoicesAR() {
        return await this.invoiceARRepository.createQueryBuilder('invoice')
            .leftJoinAndSelect('invoice.orderAdmin', 'orderAdmin')
            .leftJoinAndSelect('orderAdmin.customer', 'customer')
            .orderBy({
                'invoice': 'DESC'
            })
            .limit(5)
            .getMany()
    }


}
