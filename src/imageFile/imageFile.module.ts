/* eslint-disable prettier/prettier */
import {Module} from "@nestjs/common"
import {TypeOrmModule} from "@nestjs/typeorm";
import {ImageFile} from "./imageFile.entity";
import {ImageFileService} from "./imageFile.service";
import {ImageFileResolver} from "./imageFile.resolver";
import {Quotation} from "../quotations/quotations.entity";
import {OrderAdmin} from "../orderAdmin/orderAdmin.entity";

@Module({
    providers: [ImageFileService, ImageFileResolver],
    imports: [
        TypeOrmModule.forFeature([ImageFile]),
        TypeOrmModule.forFeature([Quotation]),
        TypeOrmModule.forFeature([OrderAdmin])
    ],
})

export class ImageFileModules {
}
