/* eslint-disable prettier/prettier */
import {InjectRepository} from "@nestjs/typeorm";
import {Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {Quotation} from "../quotations/quotations.entity";
import {OrderAdmin} from "../orderAdmin/orderAdmin.entity";
import {Storage} from '@google-cloud/storage'
import {ImageFile} from './imageFile.entity'

@Injectable()
export class ImageFileService {
    constructor(
        @InjectRepository(Quotation) private quotationRepository: Repository<Quotation>,
        @InjectRepository(OrderAdmin) private orderAdminRepository: Repository<OrderAdmin>,
        @InjectRepository(ImageFile) private imageFileRepository: Repository<ImageFile>,
    ) {
    }


    async addImageFile(args) {
        let bucketFile = args.bucketFileName.replace(/ /g, '-')
        const imageFile = new ImageFile()
        imageFile.fileName = args.fileName
        imageFile.description = args.description
        if (args.quotation) {
            imageFile.quote = await this.quotationRepository.findOneOrFail(args.quotation)
            bucketFile = 'quotations-' + bucketFile
        }
        if (args.order) {
            imageFile.orderAdmin = await this.orderAdminRepository.findOneOrFail(args.order)
            bucketFile = 'orders-' + bucketFile
        }
        await this.imageFileRepository.save(imageFile)
        bucketFile = imageFile.id + '-' + bucketFile

        imageFile.bucketFileName = bucketFile

        try {

            const base64Text = args.file.split(';base64,').pop();
            const imageBuffer = Buffer.from(base64Text, 'base64');

            const storage = new Storage({
                keyFilename: './src/imageFile/ace-grinding.json',
                projectId: process.env.GCP_PROJECT_ID,
            })
            const bucket = storage.bucket(process.env.GCP_BUCKET_NAME)
            // bucket.makePublic(function (err) {
            //     console.log("error while making public ==>", err)
            // });
            const file = bucket.file(bucketFile);
            await file.save(imageBuffer, {
                // public: true,
                metadata: {
                    cacheControl: 'max-age=604800'
                }
            }).then(err => {
                return err
            }).finally(() => {
                file.get().then(async (data) => {

                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    //@ts-ignore
                    const mediaLink = await data[1]?.mediaLink;
                    imageFile.url = mediaLink
                    await this.imageFileRepository.save(imageFile)
                    console.log("File uploaded .. ")
                });
            })

            return true
        } catch (e) {
            return e
        }
    }

    async downloadFile(args) {
        const {bucketFileName} = args
        console.log("bucketFileName ==> ", bucketFileName)
        const storage = new Storage({
            keyFilename: './src/imageFile/ace-grinding.json',
            projectId: process.env.GCP_PROJECT_ID,
        })
        const bucket = storage.bucket(process.env.GCP_BUCKET_NAME)

        const options = {
            version: 'v2', // defaults to 'v2' if missing.
            action: 'read',
            expires: Date.now() + 1000 * 60 * 60, // one hour
        };

        const [url] = await storage
            .bucket(process.env.GCP_BUCKET_NAME)
            .file(bucketFileName)
            .getSignedUrl({
                version: 'v2', // defaults to 'v2' if missing.
                action: 'read',
                expires: Date.now() + 1000 * 60 * 60, // one hour
            });

        return url;
    }
}
