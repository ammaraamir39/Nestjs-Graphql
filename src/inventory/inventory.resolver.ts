/* eslint-disable prettier/prettier */
import {
    Query,
    Resolver,
    Mutation
} from '@nestjs/graphql'
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Inventory} from './inventory.entity';
import {InventoryService} from './inventory.service';


@Resolver(Inventory)
export class InventoryResolver {
    constructor(
        private readonly inventoryService: InventoryService,
        @InjectRepository(Inventory) private readonly inventoryRepository: Repository<Inventory>
    ) {
    }

    @Query()
    async getInventoryById(_, {id}) {
        return await this.inventoryService.getInventoryById(id)
    }

    @Query()
    async getAllInventory(_) {
        return await this.inventoryService.getAllInventory()
    }

    @Mutation()
    async addInventory(_, args) {
        return this.inventoryService.addInventory(args)
    }

    @Mutation()
    async updateInventory(_, args) {
        return this.inventoryService.updateInventory(args)
    }

    @Mutation()
    async deleteInventory(_, {id}) {
        return await this.inventoryService.deleteInventory(id)
    }

    @Query()
    async getInventoryByGrade(_, args) {
        return await this.inventoryService.getInventoryByGrade(args)
    }
}
