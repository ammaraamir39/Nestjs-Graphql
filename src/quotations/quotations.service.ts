/* eslint-disable prettier/prettier */
import {InjectRepository} from "@nestjs/typeorm";
import {Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {Quotation} from "./quotations.entity";
import {QuotationStock} from "../quotationStock/quotationStock.entity";
import {CustomerService} from "../customers/customer.service";
import sgMail from '@sendgrid/mail';

@Injectable()
export class QuotationService {
    constructor(
        @InjectRepository(Quotation) private quotationRepository: Repository<Quotation>,
        @InjectRepository(QuotationStock) private quotationStockRepository: Repository<QuotationStock>,
        private readonly customerService: CustomerService
    ) {
        sgMail.setApiKey('SG.7L738F-3R8e8RVTqlk--cQ.N9FKhqOlBzn_kO1Vf28hVH1drU1_tdf-b6gO_lmyxR')
    }

    async addQuotation(args) {
        try {
            const quotation = new Quotation()
            quotation.customer = await this.customerService.getCustomerById(args.customerId)
            quotation.contactName = args.contactName
            quotation.contactNumber = args.contactNumber
            quotation.faxNumber = args.faxNumber
            quotation.leadTime = args.leadTime
            quotation.quotedBy = args.quotedBy
            quotation.req = args.req
            quotation.shipVia = args.shipVia
            quotation.grandTotal = args.grandTotal

            await this.quotationRepository.save(quotation)

            for (const quotStock of args.quotationStock) {
                quotStock['quote'] = quotation

                await this.quotationStockRepository.save(quotStock)
            }

            return true

        } catch (e) {
            return e
        }
    }

    async getQuotationById(id) {
        return await this.quotationRepository.findOneOrFail(id, {
            relations: ['imageUrl']
        })
    }


    async getAllQuotations() {
        return await this.quotationRepository
            .createQueryBuilder('quotations')
            .leftJoinAndSelect("quotations.customer", "customer")
            .leftJoinAndSelect("quotations.quotedBy", "quotedBy")
            .leftJoinAndSelect("quotations.quotationStock", "quotationStock")
            .leftJoinAndSelect("customer.secondaryContacts", "secondaryContacts")
            .leftJoinAndSelect("quotations.imageUrl", "imageUrl")
            .orderBy({
                'quotations': 'DESC',
                'quotationStock.id': 'ASC'
            })
            .getMany()
    }


    async deleteQuotation(id) {
        try {
            const quot = await this.quotationRepository.findOneOrFail(id)
            await this.quotationRepository.delete(quot.id)
            return true
        } catch (error) {
            return error;
        }
    }

    async updateQuotation({id, ...rest}) {
        try {
            const quotation = await this.quotationRepository.findOneOrFail(id)
            if (quotation.quotationStock.length > 0) {
                await this.quotationStockRepository.remove(quotation.quotationStock)
            }
            for (const val of Object.keys(rest)) {
                quotation[val] = rest[val]
            }

            return await this.quotationRepository.save(quotation)
        } catch (e) {
            return e
        }

    }

    async sendQuotationEmail(args) {
        const {email, contact_name, sales_rep, quotation_number, file} = args
        try {
            await sgMail.send({
                to: email,
                from: 'sales@acegrinding.com',
                templateId: 'd-ca6a583129ec4e429157b419e3ee9a7c',
                dynamicTemplateData: {
                    contact_name: contact_name,
                    sales_rep: sales_rep,
                    quotation_number: quotation_number
                },
                attachments: [
                    {
                        content: file,
                        filename: "quotation.pdf",
                        type: "application/pdf",
                        disposition: "attachment"
                    }
                ]
            });
            //'sales@acegrinding.com'
            return true
        } catch
            (e) {
            return e
        }

    }
}

//send grid api key from ben account : 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
//dynamic template : d-ca6a583129ec4e429157b419e3ee9a7c
