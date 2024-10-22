/* eslint-disable prettier/prettier */
import {Injectable} from "@nestjs/common";
import { Repository} from "typeorm";
import {Vendor} from "./vendor.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Contact} from '../contacts/contact.entity'
import {Address} from '../address/address.entity'

@Injectable()
export class VendorService {
    constructor(
        @InjectRepository(Vendor) private vendorRepository: Repository<Vendor>,
        @InjectRepository(Contact) private contactRepository: Repository<Contact>,
        @InjectRepository(Address) private addressRepository: Repository<Address>,
    ) {
    }

    async addVendor({companyName, primaryAddress, fax, primaryContact, termsOfPayment, notes, ...rest}) {
        try {
            const vendor = new Vendor()
            vendor.companyName = companyName
            vendor.primaryAddress = primaryAddress
            vendor.fax = fax
            vendor.primaryContact = primaryContact
            vendor.termsOfPayment = termsOfPayment
            vendor.notes = notes
            vendor.state = rest.state
            vendor.city = rest.city
            vendor.zipCode = rest.zipCode
            await this.vendorRepository.save(vendor)
            //if contacts are there for vendors
            if (rest.secondaryContacts) {
                for (const contact of rest.secondaryContacts) {
                    contact['vendor'] = vendor
                    await this.contactRepository.save(contact)
                }
            }

            //if address are there for vendors
            if (rest.secondaryAddresses) {
                for (const address of rest.secondaryAddresses) {
                    address['vendor'] = vendor
                    await this.addressRepository.save(address)
                }
            }
            return true
        } catch (e) {
            console.log("Error -> ", e)
            return e
        }
    }

    async getVendorById(id) {
        return await this.vendorRepository.findOneOrFail(id)
    }

    async getAllVendors() {
        return await this.vendorRepository.find({
            order: {
                id: 'DESC'
            }
        })
    }

    async updateVendor({id, ...rest}) {

        try {
            const vendor = await this.vendorRepository.findOneOrFail(id)

            if (vendor.secondaryContacts.length > 0) {
                await this.contactRepository.remove(vendor.secondaryContacts)
            }

            if (vendor.secondaryAddresses.length > 0) {
                await this.addressRepository.remove(vendor.secondaryAddresses)
            }

            for (const val of Object.keys(rest)) {
                vendor[val] = rest[val]
            }

            return await this.vendorRepository.save(vendor)
        } catch (e) {
            return e
        }

    }

    async deleteVendor(id) {
        try {
            const getVendor = await this.vendorRepository.findOneOrFail(id)
            await this.vendorRepository.remove(getVendor)
            return true
        } catch (e) {
            return e
        }

    }

}
