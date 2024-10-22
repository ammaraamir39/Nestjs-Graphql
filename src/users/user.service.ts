/* eslint-disable prettier/prettier */
import {Injectable} from '@nestjs/common';
import {Repository} from 'typeorm';
import {User} from './user.entity'
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>
        //We can inject multiple repositories according to needs
    ) {
    }

    //we call these function for resolvers
    async find(id: string): Promise<User> {
        return await this.userRepository.findOneOrFail(id)
    }

    //add user
    async addUser(name, email, role, firebaseUid) {

        const newUser = new User()
        newUser.name = name
        newUser.email = email
        newUser.role = role
        newUser.firebaseUid = firebaseUid

        try {
            await this.userRepository.save(newUser)
            return true
        } catch (e) {
            return e
        }
    }

    async getAllUsers() {
        return await this.userRepository.find({
            order: {
                id: 'DESC'
            }
        })
    }

    async updateUser({id, ...rest}) {
        try {
            const user = await this.userRepository.findOneOrFail(id)
            Object.keys(rest).forEach(val => {
                user[val] = rest[val]
            })
            return await this.userRepository.save(user)

        } catch (e) {
            return e
        }

    }

    async deleteUser(id) {
        try {
            const user = await this.userRepository.findOneOrFail(id)
            await this.userRepository.remove(user)
            return true
        } catch (e) {
            return e
        }

    }

    async getUserByEmail(email) {
        return await this.userRepository.findOneOrFail({where: {email: email}})
    }
}
