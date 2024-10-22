/* eslint-disable prettier/prettier */
import {
    Query,
    Mutation,
    Resolver
} from '@nestjs/graphql'
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Vendor} from "./vendor.entity";
import {VendorService} from "./vendor.service";

@Resolver(Vendor)
export class VendorResolver {
    constructor(
        private readonly vendorService: VendorService,
        @InjectRepository(Vendor) private readonly vendorRepository: Repository<Vendor>
    ) {
    }

    @Query()
    async getVendor(_, {id}) {
        return await this.vendorService.getVendorById(id)
    }

    @Query()
    async getAllVendors(_) {
        return await this.vendorService.getAllVendors()
    }

    @Mutation()
    async addVendor(_, args) {
        return await this.vendorService.addVendor(args)
    }

    @Mutation()
    async updateVendor(_, args) {
        return await this.vendorService.updateVendor(args)
    }

    @Mutation()
    async deleteVendor(_, {id}) {
        return await this.vendorService.deleteVendor(id)
    }
}
