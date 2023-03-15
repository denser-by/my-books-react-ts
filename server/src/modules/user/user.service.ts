import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/CreateUserDto';

@Injectable()
export class UserService {
    create(userDto: CreateUserDto): CreateUserDto {
        userDto.id = 123;
        return userDto;
    }

    getAll(): CreateUserDto[] {
        var result = [];
        var userDto1 = new CreateUserDto();
        userDto1.id = 123;
        userDto1.login = 'Login_123';
        userDto1.email = 'Descr_123@server.com';
        result.push(userDto1);
        var userDto2 = new CreateUserDto();
        userDto2.id = 321;
        userDto2.login = 'Login_321';
        userDto2.email = 'Descr_321@server.com';
        result.push(userDto2);
        return result;
    }

    getOne(id: any): CreateUserDto {
        var userDto = new CreateUserDto();
        userDto.id = 123;
        userDto.login = 'Login_123';
        userDto.email = 'Descr_123@server.com';
        return userDto;
    }

    update(userDto: CreateUserDto): CreateUserDto {
        userDto.login = 'Updated ' + userDto.login;
        return userDto;
    }

    delete(id: any): CreateUserDto {
        var userDto = new CreateUserDto();
        userDto.id = 123;
        userDto.login = 'Deleted name';
        userDto.email = 'Descr_123@server.com';
        return userDto;
    }
}