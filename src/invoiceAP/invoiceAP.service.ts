/* eslint-disable prettier/prettier */
import {InjectRepository} from "@nestjs/typeorm";
import {Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {InvoiceAP} from "./invoiceAP.entity";

import {VendorService} from "../vendors/vendor.service";



@Injectable()
export class InvoiceAPService {
    constructor(
        @InjectRepository(InvoiceAP) private invoiceAPRepository: Repository<InvoiceAP>,
        private readonly VendorService: VendorService
    ) {
    }

    async addInvoiceAP(args) {
        try {
            const invoiceAP = new InvoiceAP()
            invoiceAP.vendor = await this.VendorService.getVendorById(args.vendorId)
            invoiceAP.shippingCharges = args.shippingCharges
            invoiceAP.status = args.status
            invoiceAP.invoiceTotal = args.invoiceTotal
            await this.invoiceAPRepository.save(invoiceAP)

            return true

        } catch (e) {
            return e
        }
    }


    async updateInvoiceAP({id, ...rest}) {
        try {
            const invoiceAP = await this.invoiceAPRepository.findOneOrFail(id)
            if (rest.vendorId) invoiceAP.vendor = await this.VendorService.getVendorById(rest.vendorId)
            Object.keys(rest).forEach(val => {
                invoiceAP[val] = rest[val]
            })
            return await this.invoiceAPRepository.save(invoiceAP)
        } catch (e) {
            return e
        }
    }

    async getInvoiceAPById(id) {
        return await this.invoiceAPRepository.findOneOrFail(id, {
            relations: ['vendor']
        })
    }

    async getAllInvoiceAPs() {
        return await this.invoiceAPRepository.find({
            relations: ['vendor'],
            order: {
                id: 'DESC'
            }
        })
    }


    async deleteInvoiceAPById(id) {
        try {
            const invoiceAP = await this.invoiceAPRepository.findOneOrFail(id)
            await this.invoiceAPRepository.delete(invoiceAP.id)
            return true
        } catch (error) {
            return error;
        }
    }


}
