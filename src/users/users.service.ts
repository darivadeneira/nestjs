import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4} from 'uuid';
import { UpdateUserDTO } from './dtos/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDTO } from './dtos/create-user.dto';
import { Profile } from './entities/profile.entity';


@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,

        @InjectRepository(Profile)
        private profileRepository: Repository<Profile>
    ) {}

    findAll() {
        return this.userRepository.find({});
    }

    findOne(id: number){
        const user = this.userRepository.findOne({where: {id}, select: ['id', 'username'], relations: ['profile']});
        if(!user){
            throw new NotFoundException(`Usuario con id ${id} no encontrado`);
        }
        return user;
    }

    async create(payload: CreateUserDTO){
        const newProfile = new Profile();
        newProfile.name = payload.name;
        newProfile.lastname = payload.lastname;
        newProfile.email = payload.email;
        newProfile.age = payload.age;
        const profileCreated = await this.profileRepository.save(newProfile);

        const newUser = new User();
        newUser.username = payload.username;
        newUser.password = payload.password;
        newUser.profile = profileCreated;
        const userCreated = await this.userRepository.save(newUser);
        return userCreated;
    }

    async delete(id: number){
        const user =  await this.userRepository.findOne({where: {id}, relations: ['profile']});

        if(!user){
            throw new NotFoundException(`Usuario con id ${id} no se encontró`);
        }
        await this.userRepository.delete(id);
        await this.profileRepository.delete(user.profile.id);
        return user;
    }

    async update(id: number, payload: UpdateUserDTO): Promise<User>{
        const user = await this.userRepository.findOne({where: {id}});
        if(!user){
            throw new NotFoundException(`Usuario con id ${id} no encontrado`);
        }
        user.password = payload.password;
        await this.userRepository.save(user);
        return user;
    }
}
