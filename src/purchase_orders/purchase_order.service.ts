/* eslint-disable prettier/prettier */
import {InjectRepository} from "@nestjs/typeorm";
import {Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {PurchaseOrderProducts} from "../purchase_orders_products/purchase_orders_products.entity";
import {PurchaseOrder} from "./purchase_order.entity";
import {Vendor} from "../vendors/vendor.entity";

@Injectable()
export class PurchaseOrderService {
    constructor(
        @InjectRepository(PurchaseOrder) private purchaseOrderRepository: Repository<PurchaseOrder>,
        @InjectRepository(PurchaseOrderProducts) private purchaseOrderProductsRepository: Repository<PurchaseOrderProducts>,
        @InjectRepository(Vendor) private vendorRepository: Repository<Vendor>
    ) {
    }

    async addPurchaseOrder(args) {
        try {
            //getting vendor
            const vendor = await this.vendorRepository.findOneOrFail(args.vendor)
            //creating new purchase order and save it in a database
            const purchaseOrder = new PurchaseOrder()
            purchaseOrder.contactName = args.contactName
            purchaseOrder.vendor = vendor
            await this.purchaseOrderRepository.save(purchaseOrder)

            //saving all the products for purchase orders
            for (const product of args.products) {
                product["purchaseOrder"] = purchaseOrder
                // product["total"] = product.unitPrice * product.quantity
                await this.purchaseOrderProductsRepository.save(product)
            }

            return true
        } catch (e) {
            return e
        }
    }

    async getPurchaseOrderById(id) {
        return await this.purchaseOrderRepository.findOneOrFail(id, {
            relations: ['vendor']
        })
    }

    async getAllPurchaseOrders() {
        return await this.purchaseOrderRepository.find({
            relations: ['vendor'],
            order: {
                id: 'DESC'
            }
        })
    }

    async getPurchaseOrdersByVendor(id) {
        try {
            const vendor = await this.vendorRepository.findOneOrFail(id)
            return await this.purchaseOrderRepository.find({
                where: {vendor: vendor},
                relations: ['vendor'],
                order: {
                    id: 'DESC'
                }
            })
        } catch (e) {
            return e
        }
    }

    async updatePurchaseOrder({id, vendorId, ...rest}) {
        try {
            const purchaseOrder = await this.purchaseOrderRepository.findOneOrFail(id)
            const vendor = await this.vendorRepository.findOneOrFail(vendorId)

            purchaseOrder['vendor'] = vendor

            if (purchaseOrder.products.length > 0) {
                await this.purchaseOrderProductsRepository.remove(purchaseOrder.products)
            }


            for (const val of Object.keys(rest)) {
                purchaseOrder[val] = rest[val]
            }
            await this.purchaseOrderRepository.save(purchaseOrder)
            return true
        } catch (e) {
            return e
        }

    }

    async deletePurchaseOrder(id) {
        try {
            const getPurchaseOrder = await this.purchaseOrderRepository.findOneOrFail(id)
            await this.purchaseOrderRepository.remove(getPurchaseOrder)
            return true
        } catch (e) {
            return e
        }

    }

}
