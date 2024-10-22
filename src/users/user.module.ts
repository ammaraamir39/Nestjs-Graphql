/* eslint-disable prettier/prettier */
import {Module} from '@nestjs/common'
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserService} from "./user.service";
import {UserResolver} from './user.resolver'
import {User} from './user.entity'


@Module({
    exports:[UserService], //if we want to use userService in other dir then we need to export from here
    providers:[UserService, UserResolver], //all providers must be here
    imports : [ //all the entities that is using in service or resolver must be import here
        TypeOrmModule.forFeature([User])
    ],
})

export class UserModule{}
