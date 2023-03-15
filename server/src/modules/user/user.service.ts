import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/CreateUserDto';

@Injectable()
export class UserService {
    delete(id: number): CreateUserDto | PromiseLike<CreateUserDto> {
        throw new Error('Method not implemented.');
    }
    update(createDto: CreateUserDto): CreateUserDto | PromiseLike<CreateUserDto> {
        throw new Error('Method not implemented.');
    }
    getOne(id: number): CreateUserDto | PromiseLike<CreateUserDto> {
        throw new Error('Method not implemented.');
    }
    getAll(): CreateUserDto[] | PromiseLike<CreateUserDto[]> {
        throw new Error('Method not implemented.');
    }
    create(createDto: CreateUserDto): CreateUserDto | PromiseLike<CreateUserDto> {
        throw new Error('Method not implemented.');
    }

}
