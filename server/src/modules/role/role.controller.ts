import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { RoleService } from './role.service';

@Controller('roles')
export class RoleController {
    constructor(private readonly roleService: RoleService) { }

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