/* eslint-disable prettier/prettier */
import {Injectable} from "@nestjs/common";
import {Repository, getConnection} from "typeorm";
import {Customer} from "../customers/customer.entity";
import {Quotation} from "../quotations/quotations.entity";
import {OrderAdmin} from "../orderAdmin/orderAdmin.entity";
import {Employee} from '../employees/employee.entity'
import {Vendor} from "../vendors/vendor.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class AnalyticsService {
    constructor(
        @InjectRepository(Customer) private readonly customerRepository: Repository<Customer>,
        @InjectRepository(Quotation) private readonly quotationRepository: Repository<Quotation>,
        @InjectRepository(OrderAdmin) private readonly orderRepository: Repository<OrderAdmin>,
        @InjectRepository(Employee) private readonly employeeRepository: Repository<Employee>,
        @InjectRepository(Vendor) private readonly vendorRepository: Repository<Vendor>,
    ) {
    }

    async getCount() {
        try {
            return {
                customerCount: await this.customerRepository.createQueryBuilder().getCount(),
                quotationCount: await this.quotationRepository.createQueryBuilder().getCount(),
                employeeCount: await this.employeeRepository.createQueryBuilder().getCount(),
                orderCount: await this.orderRepository.createQueryBuilder().getCount(),
                vendorCount: await this.vendorRepository.createQueryBuilder().getCount()
            }
        } catch (error) {
            return error
        }

    }

    async getLastMonthQuotationAndOrderRevenue() {
        return {
            orderRevenue: await this.getLastMonthOrdersRevenue(),
            quotationRevenue: await this.getLastMonthQuotations()
        }
    }

    async getLastMonthOrdersRevenue() {
        const queryRunner = await getConnection().createQueryRunner();
        try {
            await queryRunner.connect();
            const result = await (async () => {
                    const queryString = `SELECT date_trunc('day', "createdAt") as date,ROUND(sum("grandTotal") ,0)as amount
                                         FROM order_Admin
                                         WHERE "createdAt"
                                             > CURRENT_DATE - INTERVAL '1 months'
                                         group by 1
                                         order by 1;`;

                    return await queryRunner.manager.query(queryString)
                }
            )()
            return result
        } catch (e) {
            return e
        }
    }

    async getLastMonthQuotations() {
        const queryRunner = await getConnection().createQueryRunner();
        try {
            await queryRunner.connect();
            const result = await (async () => {
                    const queryString = `SELECT date_trunc('day', "createdAt") as date,ROUND(sum("grandTotal") ,0)as amount
                                         FROM quotation
                                         WHERE "createdAt"
                                             > CURRENT_DATE - INTERVAL '1 months'
                                         group by 1
                                         order by 1;`;

                    return await queryRunner.manager.query(queryString)
                }
            )()
            return result
        } catch (e) {
            return e
        }
    }

}