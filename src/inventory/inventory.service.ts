/* eslint-disable prettier/prettier */
import {InjectRepository} from "@nestjs/typeorm";
import {Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {Inventory} from "./inventory.entity";
import {VendorService} from "../vendors/vendor.service";
import {ProductService} from "../products/product.service";
import {Quantity} from "../quantity/quantity.entity";

// import {Vendor} from "../vendors/vendor.entity";

@Injectable()
export class InventoryService {
    constructor(
        @InjectRepository(Inventory) private inventoryRepository: Repository<Inventory>,
        @InjectRepository(Quantity) private quantityRepository: Repository<Quantity>,
        private readonly vendorService: VendorService,
        private readonly productService: ProductService
    ) {
    }

    async addInventory(args) {
        try {


            const inventory = new Inventory()
            inventory.purchaseOrderNo = args.purchaseOrderNo
            inventory.vendor = await this.vendorService.getVendorById(args.vendorId)
            inventory.product = await this.productService.getProductByName(args.productName)
            inventory.grade = args.grade
            inventory.size = args.size
            inventory.feet = args.feet
            inventory.inches = args.inches
            inventory.heatNo = args.heatNo
            inventory.weight = args.weight
            inventory.totalBars = args.totalBars
            inventory.country = args.country

            if (args.notes) inventory.notes = args.notes

            await this.inventoryRepository.save(inventory)

            for (const quan of args.quantity) {
                quan['quantity'] = quan.quantity
                quan['inventory'] = inventory
                await this.quantityRepository.save(quan)
            }
            return true

        } catch (e) {
            return e
        }
    }

    async updateInventory({id, ...rest}) {
        try {
            const inventory = await this.inventoryRepository.findOneOrFail(id)
            if (inventory.quantity.length > 0) {
                await this.quantityRepository.remove(inventory.quantity)
            }
            for (const val of Object.keys(rest)) {
                inventory[val] = rest[val]
            }
            return await this.inventoryRepository.save(inventory)
        } catch (e) {
            return e
        }
    }

    async getInventoryById(id) {
        return await this.inventoryRepository.findOneOrFail(id, {
            relations: ['vendor']
        })
    }

    async getAllInventory() {
        return await this.inventoryRepository.find({
            relations: ['vendor', 'product'],
            order: {
                id: 'DESC'
            }
        })
    }


    async deleteInventory(id) {
        try {
            const inventory = await this.inventoryRepository.findOneOrFail(id)
            await this.inventoryRepository.delete(inventory.id)
            return true
        } catch (error) {
            return error;
        }
    }

    async getInventoryByGrade({grade, size, heatNo}: any) {
        let query = await this.inventoryRepository.createQueryBuilder('inventory')
            .leftJoinAndSelect('inventory.vendor', 'vendor')
            .leftJoinAndSelect('inventory.product', 'product')
            .where(`"grade" = '${grade}' `)

        if (size) {
            query = query
                .andWhere(`"size" = ${size}`)
        }
        if (heatNo) {
            query = query
                .andWhere(`"heatNo"= '${heatNo}'`)
        }
        return await query
            .orderBy('inventory.grade', 'ASC')
            .getMany()
    }


}
