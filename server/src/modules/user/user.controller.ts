import { Controller, Delete, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private readonly roleService: UserService) { }

    @Get()
    getAll(): string {
        return this.roleService.getAll();
    }

    @Get(':id')
    getOne(@Param('id') id): string {
        return this.roleService.getOne(id);
    }

    @Delete(':id')
    delete(@Param('id') id): string {
        return this.roleService.delete(id);
    }
}