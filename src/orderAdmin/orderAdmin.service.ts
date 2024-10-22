/* eslint-disable prettier/prettier */
import {InjectRepository} from "@nestjs/typeorm";
import {Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {CustomerService} from "../customers/customer.service";
import {OrderAdmin} from "./orderAdmin.entity";
import {OrderAdminChs} from "../orderAdminChs/orderAdminChs.entity";
import {EmployeeService} from "../employees/employee.service";
import {Inventory} from "../inventory/inventory.entity";
import {TimeCheck} from "../timeCheck/timeCheck.entity";


@Injectable()
export class OrderAdminService {
    constructor(
        @InjectRepository(OrderAdmin) private orderAdminRepository: Repository<OrderAdmin>,
        @InjectRepository(OrderAdminChs) private orderAdminChsRepository: Repository<OrderAdminChs>,
        @InjectRepository(TimeCheck) private timeCheckRepository: Repository<TimeCheck>,
        @InjectRepository(Inventory) private inventoryRepository: Repository<Inventory>,
        private readonly customerService: CustomerService,
        private readonly employeeService: EmployeeService,
    ) {
    }

    async addOrderAdmin(args) {
        try {

            const orderAdmin = new OrderAdmin()
            orderAdmin.customer = await this.customerService.getCustomerById(args.customerId)
            orderAdmin.pONumber = args.pONumber
            orderAdmin.buyerName = args.buyerName
            orderAdmin.invoiceNo = args.invoiceNo
            orderAdmin.shipDate = args.shipDate
            orderAdmin.shipToCustomerAddress = args.shipToCustomerAddress
            orderAdmin.shipToCustomerName = args.shipToCustomerName
            orderAdmin.grandTotal = args.grandTotal
            orderAdmin.notes = args.notes
            orderAdmin.status = 'OPEN'

            await this.orderAdminRepository.save(orderAdmin)

            for (const orderAdCh of args.orderAdminChs) {
                orderAdCh['order'] = orderAdmin
                orderAdCh['total'] = orderAdCh['quantity'] * orderAdCh['unitPrice']

                await this.orderAdminChsRepository.save(orderAdCh)
            }

            return true

        } catch (e) {
            return e
        }
    }

    async updateEmployeeRecord(args) {
        try {
            const order = await this.getOrderAdminById(args.orderAdminId)

            const empTable = []
            for (const emp of args.employeeId) {

                const employee = await this.employeeService.getEmployeeById(emp.id)
                empTable.push(employee)
            }
            order.employee = empTable
            await this.orderAdminRepository.save(order)
            return true
        } catch (error) {
            return error
        }
    }

    async addTime(args) {
        try {
            const order = await this.getOrderAdminById(args.orderAdminId)
            const timeCheck = new TimeCheck()
            timeCheck.status = args.status
            timeCheck.order = order
            await this.timeCheckRepository.save(timeCheck)
            order.status = args.status
            await this.orderAdminRepository.save(order)
            return true

        } catch (error) {
            return error
        }
    }

    async getOrderAdminById(id) {
        return await this.orderAdminRepository.findOneOrFail(id, {
            relations: ['customer', 'imageUrl']
        })
    }

    async getAllorderAdmins() {

        return await this.orderAdminRepository
            .createQueryBuilder('orders')
            .leftJoinAndSelect('orders.customer', 'customer')
            .leftJoinAndSelect('orders.employee', 'employee')
            .leftJoinAndSelect('orders.orderAdminChs', 'orderAdminChs')
            .leftJoinAndSelect('orderAdminChs.inventory', 'inventory')
            .leftJoinAndSelect('inventory.vendor', 'vendor')
            .leftJoinAndSelect('inventory.product', 'product')
            .leftJoinAndSelect('orders.imageUrl', 'imageUrl')
            .orderBy({
                'orders': 'DESC',
                'orderAdminChs.id': 'ASC'
            })
            .getMany()
    }

    async getAllOrdersShop() {

        return await this.orderAdminRepository
            .createQueryBuilder('orders')
            .leftJoinAndSelect('orders.customer', 'customer')
            .leftJoinAndSelect('orders.employee', 'employee')
            .leftJoinAndSelect('orders.orderAdminChs', 'orderAdminChs')
            .leftJoinAndSelect('orderAdminChs.inventory', 'inventory')
            .leftJoinAndSelect('inventory.vendor', 'vendor')
            .leftJoinAndSelect('inventory.product', 'product')
            .where('orders.status = \'OPEN\' OR orders.status = \'IN PROGRESS\' OR orders.status = \'PAUSED\'')
            .orderBy({
                'orders': 'DESC',
                'orderAdminChs.id': 'ASC'
            })
            .getMany()
    }


    async deleteOrderAdmin(id) {
        try {
            const quot = await this.orderAdminRepository.findOneOrFail(id)
            await this.orderAdminRepository.delete(quot.id)
            return true
        } catch (error) {
            return error;
        }
    }


    async updateOrderAdmin({id, customerId, ...rest}) {
        try {
            const orderAdmin = await this.orderAdminRepository.findOneOrFail(id)
            orderAdmin.customer = await this.customerService.getCustomerById(customerId);
            if (orderAdmin.orderAdminChs.length > 0) {
                await this.orderAdminChsRepository.remove(orderAdmin.orderAdminChs)
            }
            for (const val of Object.keys(rest)) {
                orderAdmin[val] = rest[val]
            }
            return await this.orderAdminRepository.save(orderAdmin)
        } catch (e) {
            return e
        }

    }

    async getFiveOrders() {
        return await this.orderAdminRepository.createQueryBuilder('orders')
            .leftJoinAndSelect('orders.customer', 'customer')
            .orderBy({
                'orders': 'DESC',
            })
            .limit(5)
            .getMany()
    }

}
