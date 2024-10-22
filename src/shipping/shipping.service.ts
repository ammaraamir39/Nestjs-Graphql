/* eslint-disable prettier/prettier */
import {InjectRepository} from "@nestjs/typeorm";
import {Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {Shipping} from "./shipping.entity";
import {OrderAdminService} from "../orderAdmin/orderAdmin.service";
import {OrderAdmin} from "../orderAdmin/orderAdmin.entity";

// import {Vendor} from "../vendors/vendor.entity";

@Injectable()
export class ShippingService {
    constructor(
        @InjectRepository(Shipping) private shippingRepository: Repository<Shipping>,
        @InjectRepository(OrderAdmin) private orderAdminRepository: Repository<OrderAdmin>,
        private readonly orderAdminService: OrderAdminService,
    ) {
    }

    async addShipping(args) {
        try {

            const shipping = new Shipping()
            const order = await this.orderAdminService.getOrderAdminById(args.orderId)
            order.status = 'IN SHIPPING'
            shipping.orderAdmin = order
            shipping.shipVia = args.shipVia
            shipping.containerOptions = args.containerOptions
            shipping.quantity = args.quantity
            shipping.shippingCharges = args.shippingCharges
            shipping.hasCustomerBilled = args.hasCustomerBilled
            if (args.notes) shipping.notes = args.notes
            await this.shippingRepository.save(shipping)
            await this.orderAdminRepository.save(order)
            return true

        } catch (e) {
            return e
        }
    }


    async updateShipping({id, ...rest}) {
        try {
            const shipping = await this.shippingRepository.findOneOrFail(id)
            if (rest.orderId) shipping.orderAdmin = await this.orderAdminService.getOrderAdminById(rest.orderId)
            Object.keys(rest).forEach(val => {
                shipping[val] = rest[val]
            })
            return await this.shippingRepository.save(shipping)
        } catch (e) {
            return e
        }
    }

    async getShippingById(id) {
        return await this.shippingRepository.findOneOrFail(id, {
            relations: ['orderAdmin']
        })
    }

    async getAllShipping() {
        return await this.shippingRepository.find({
            relations: ['orderAdmin'],
            order: {
                id: 'DESC'
            }
        })
    }


    async deleteShippingById(id) {
        try {
            const shipping = await this.shippingRepository.findOneOrFail(id)
            await this.shippingRepository.delete(shipping.id)
            return true
        } catch (error) {
            return error;
        }
    }


}
