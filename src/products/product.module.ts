/* eslint-disable prettier/prettier */
import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import { Grades } from "../grade/grade.entity";
import { Product } from "./product.entity";
import { ProductService } from "./product.service";
import {ProductResolver} from "./product.resolver"

@Module({
    providers: [ProductService, ProductResolver],
    exports:[ProductService],
    imports: [
        TypeOrmModule.forFeature([Product]),
        
        TypeOrmModule.forFeature([Grades]),
    ]
})

export class ProductModule {}
