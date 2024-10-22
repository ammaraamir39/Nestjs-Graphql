/* eslint-disable prettier/prettier */
import {InjectRepository} from "@nestjs/typeorm";
import {Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {Grades} from "../grade/grade.entity";
import {Product} from "./product.entity";

// import {Vendor} from "../vendors/vendor.entity";

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product) private productRepository: Repository<Product>,
        @InjectRepository(Grades) private gradeRepository: Repository<Grades>,
    ) {
    }

    async addProduct(args) {
        try {

            const product = new Product()
            product.name = args.name
            if (args.unitWeight) product.unitWeight = args.unitWeight
            await this.productRepository.save(product)

            if (args.grades) {

                for (const grade of args.grades) {

                    grade['grade'] = grade.grade
                    grade['product'] = product
                    await this.gradeRepository.save(grade)
                }
            }

            return true

        } catch (e) {
            return e
        }
    }

    async getProductById(id) {
        return await this.productRepository.findOneOrFail(id)
    }

    async getProductByName(name) {
        try {
            return await this.productRepository.findOne({where: {name: name}})

        } catch (error) {
            console.log("Error => ", error)
        }
    }

    async getAllProducts() {
        return await this.productRepository.find({
            order: {
                id: 'DESC'
            }
        })
    }


    async deleteProduct(id) {
        try {
            const product = await this.productRepository.findOneOrFail(id)
            await this.productRepository.delete(product.id)
            return true
        } catch (error) {
            return error;
        }
    }

    async updateProduct({id, ...rest}) {
        try {
            const product = await this.productRepository.findOneOrFail(id)
            if (product.grades.length > 0) {
                await this.gradeRepository.remove(product.grades)
            }

            for (const val of Object.keys(rest)) {
                product[val] = rest[val]
            }
            await this.productRepository.save(product)
            return true
        } catch (e) {
            return e
        }

    }

}
