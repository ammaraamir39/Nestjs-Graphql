/* eslint-disable prettier/prettier */
import {InjectRepository} from "@nestjs/typeorm";
import {Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {NonConformance} from "./nonConfirmance.entity";


// import {Vendor} from "../vendors/vendor.entity";

@Injectable()
export class NonConformanceService {
    constructor(
        @InjectRepository(NonConformance) private nonConformanceRepository: Repository<NonConformance>,
    ) {
    }

    async addNC(args) {
        try {

            const nc = new NonConformance()
            nc.nonConformanceCode = args.nonConformanceCode
            nc.customerCode = args.customerCode
            nc.invoiceTotal = args.invoiceTotal
            nc.quantity = args.quantity
            nc.nonConformanceType = args.nonConformanceType

            await this.nonConformanceRepository.save(nc)

            return true

        } catch (e) {
            return e
        }
    }


    async updateNC({id, ...rest}) {
        try {
            const nc = await this.nonConformanceRepository.findOneOrFail(id)
            Object.keys(rest).forEach(val => {
                nc[val] = rest[val]
            })
            return await this.nonConformanceRepository.save(nc)
        } catch (e) {
            return e
        }

    }

    async getNCById(id) {
        return await this.nonConformanceRepository.findOneOrFail(id)
    }

    async getAllNCs() {
        return await this.nonConformanceRepository.find({
            order: {
                id: 'DESC'
            }
        })
    }

    async deleteNCById(id) {
        try {
            const nc = await this.nonConformanceRepository.findOneOrFail(id)
            await this.nonConformanceRepository.delete(nc.id)
            return true
        } catch (error) {
            return error;
        }
    }


}
