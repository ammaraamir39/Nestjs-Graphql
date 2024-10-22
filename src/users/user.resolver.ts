/* eslint-disable prettier/prettier */
import {
    Query,
    Resolver,
    Mutation
} from '@nestjs/graphql';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {User} from './user.entity';
import {UserService} from './user.service';

@Resolver(User)
export class UserResolver {
    constructor(
        private readonly userService: UserService,
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ) {
    }

    //this is graphql query, the variable of this query is id
    @Query()
    async getUser(_, {id}) {
        return await this.userService.find(id)
    }

    @Query()
    async getUserByEmail(_, {email}) {
        return await this.userService.getUserByEmail(email)
    }

    @Query()
    async getAllUsers(_) {
        return this.userService.getAllUsers()
    }

    @Mutation()
    async addUser(_, {name, email, role, firebaseUid}) {
        return await this.userService.addUser(name, email, role, firebaseUid)
    }

    @Mutation()
    async updateUser(_, args) {
        return this.userService.updateUser(args)
    }

    @Mutation()
    async deleteUser(_, {id}) {
        return await this.userService.deleteUser(id)
    }
}


