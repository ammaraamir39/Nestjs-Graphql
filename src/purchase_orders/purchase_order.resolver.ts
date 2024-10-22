/* eslint-disable prettier/prettier */
import {
    Query,
    Mutation,
    Resolver
} from "@nestjs/graphql";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {PurchaseOrderService} from "./purchase_order.service";
import {PurchaseOrder} from "./purchase_order.entity";

@Resolver(PurchaseOrder)
export class PurchaseOrderResolver {
    constructor(
        private readonly purchaseOrderService: PurchaseOrderService,
        @InjectRepository(PurchaseOrder) private readonly purchaseOrderRepository: Repository<PurchaseOrder>
    ) {
    }

    @Query()
    async getPurchaseOrderById(_, {id}) {
        return await this.purchaseOrderService.getPurchaseOrderById(id)
    }

    @Query()
    async getAllPurchaseOrders(_) {
        return await this.purchaseOrderService.getAllPurchaseOrders()
    }

    @Query()
    async getPurchaseOrderByVendor(_, {id}) {
        return await this.purchaseOrderService.getPurchaseOrdersByVendor(id)
    }

    @Mutation()
    async addPurchaseOrder(_, args) {
        return await this.purchaseOrderService.addPurchaseOrder(args)
    }

    @Mutation()
    async deletePurchaseOrder(_, id) {
        return await this.purchaseOrderService.deletePurchaseOrder(id)
    }

    @Mutation()
    async updatePurchaseOrder(_,args){
        return await this.purchaseOrderService.updatePurchaseOrder(args)
    }

}
