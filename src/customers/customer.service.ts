/* eslint-disable prettier/prettier */
import {Injectable} from "@nestjs/common";
import {Repository} from 'typeorm'
import {Customer} from "./customer.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Contact} from '../contacts/contact.entity'
import {Address} from '../address/address.entity'

@Injectable()
export class CustomerService {
    constructor(
        @InjectRepository(Customer) private readonly customerRepository: Repository<Customer>,
        @InjectRepository(Contact) private readonly contactRepository: Repository<Contact>,
        @InjectRepository(Address) private readonly addressRepository: Repository<Address>,
    ) {
    }

    async addCustomer({companyName, primaryAddress, fax, primaryContact, notes, ...rest}) {

        try {
            const customer = new Customer()
            customer.companyName = companyName
            customer.primaryAddress = primaryAddress
            customer.fax = fax
            customer.primaryContact = primaryContact
            customer.termsOfPayment = rest.termsOfPayment
            customer.shipVia = rest.shipVia
            customer.notes = notes
            customer.city = rest.city
            customer.state = rest.state
            customer.postalCode = rest.postalCode
            await this.customerRepository.save(customer)

            //if adding multiple contacts for customer
            if (rest.secondaryContacts) {
                for (const contact of rest.secondaryContacts) {
                    contact['customer'] = customer
                    await this.contactRepository.save(contact)
                }
            }
            //if adding multiple address for customer
            if (rest.secondaryAddresses) {
                for (const address of rest.secondaryAddresses) {
                    address['customer'] = customer
                    await this.addressRepository.save(address)
                }
            }

            return true
        } catch (e) {
            return e
        }
    }

    async getCustomerById(id) {
        return await this.customerRepository.findOneOrFail(id)
    }

    async getAllCustomers() {
        return await this.customerRepository.find({
            order: {
                id: "DESC"
            }
        })
    }

    async updateCustomer({id, ...rest}) {
        try {
            const customer = await this.customerRepository.findOneOrFail(id)

            if (customer.secondaryContacts.length > 0) {
                await this.contactRepository.remove(customer.secondaryContacts)
            }

            if (customer.secondaryAddresses.length > 0) {
                await this.addressRepository.remove(customer.secondaryAddresses)
            }

            for (const val of Object.keys(rest)) {
                customer[val] = rest[val]
            }
            return await this.customerRepository.save(customer)
        } catch (e) {
            return e
        }

    }

    async deleteCustomer(id) {
        try {
            const getCustomer = await this.customerRepository.findOneOrFail(id)
            await this.customerRepository.remove(getCustomer)
            return true
        } catch (e) {
            return e
        }

    }

}
