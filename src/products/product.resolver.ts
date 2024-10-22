/* eslint-disable prettier/prettier */
import {
    Query,
    Resolver,
    Mutation
} from '@nestjs/graphql'
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import { Product } from './product.entity';
import {ProductService} from './product.service';



@Resolver(Product)
export class ProductResolver {
    constructor(
        private readonly productService: ProductService,
        @InjectRepository(Product) private readonly productRepository: Repository<Product>
    ) {
    }

    @Query()
    async getProduct(_, {id}) {
        return await this.productService.getProductById(id)
    }
    @Query()
    async getProductByName(_, {name}) {
        return await this.productService.getProductByName(name)
    }

    @Query()
    async getAllProducts(_) {
        return await this.productService.getAllProducts()
    }

    @Mutation()
    async addProduct(_, args) {
        return this.productService.addProduct(args)
    }

    @Mutation()
    async deleteProduct(_, {id}) {
        return await this.productService.deleteProduct(id)
    }

    @Mutation()
    async updateProduct(_, args) {
        return await this.productService.updateProduct(args)
    }
}
