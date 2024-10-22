/* eslint-disable prettier/prettier */
import {Query, Resolver, Mutation} from '@nestjs/graphql'
import {ImageFile} from "./imageFile.entity";
import {ImageFileService} from './imageFile.service'

@Resolver(ImageFile)
export class ImageFileResolver {
    constructor(
        private readonly imageFileService: ImageFileService
    ) {
    }

    @Mutation()
    async addImageFile(_, args) {
        return await this.imageFileService.addImageFile(args)
    }

    @Query()
    async downloadFile(_, args) {
        return await this.imageFileService.downloadFile(args)
    }
}