import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/CreateRoleDto';

@Injectable()
export class RoleService {
    create(roleDto: CreateRoleDto): CreateRoleDto {
        roleDto.id = 123;
        return roleDto;
    }

    getAll(): CreateRoleDto[] {
        var result = [];
        var roleDto1 = new CreateRoleDto();
        roleDto1.id = 123;
        roleDto1.name = 'Name_123';
        roleDto1.description = 'Descr_123';
        result.push(roleDto1);
        var roleDto2 = new CreateRoleDto();
        roleDto2.id = 321;
        roleDto2.name = 'Name_321';
        roleDto2.description = 'Descr_321';
        result.push(roleDto2);
        return result;
    }

    getOne(id: any): CreateRoleDto {
        var roleDto = new CreateRoleDto();
        roleDto.id = 123;
        roleDto.name = 'Name_123';
        roleDto.description = 'Descr_123';
        return roleDto;
    }

    update(roleDto: CreateRoleDto): CreateRoleDto {
        roleDto.name = 'Updated ' + roleDto.name;
        return roleDto;
    }

    delete(id: any): CreateRoleDto {
        var roleDto = new CreateRoleDto();
        roleDto.id = 123;
        roleDto.name = 'Deleted name';
        roleDto.description = 'Deleted descr';
        return roleDto;
    }
}