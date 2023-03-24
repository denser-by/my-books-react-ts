import { Body, Controller, DefaultValuePipe, Delete, Get, HttpCode, Param, ParseIntPipe, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { CreateRoleDto } from './dto/CreateRoleDto';
import { GetManyRoleDto } from './dto/GetManyRoleDto';
import { RoleService } from './role.service';

@Controller('roles')
export class RoleController {
    constructor(private readonly roleService: RoleService) { }

    @Post()
    @HttpCode(200)
    @UsePipes(ValidationPipe)
    @ApiCreatedResponse({ type: CreateRoleDto })
    async create(@Body() createDto: CreateRoleDto): Promise<CreateRoleDto> {
        return await this.roleService.create(createDto);
    }

    @Get()
    @HttpCode(200)
    @UsePipes(ValidationPipe)
    @ApiOkResponse({ type: GetManyRoleDto, isArray: true })
    async getAll(
        @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number
    ): Promise<GetManyRoleDto[]> {
        return await this.roleService.getAll();
    }

    @Get(':id')
    @HttpCode(200)
    @UsePipes(ValidationPipe)
    @ApiOkResponse({ type: CreateRoleDto })
    async getOne(@Param('id', ParseIntPipe) id: number): Promise<CreateRoleDto> {
        return await this.roleService.getOne(id);
    }

    @Put()
    @HttpCode(200)
    @UsePipes(ValidationPipe)
    @ApiOkResponse({ type: CreateRoleDto })
    async update(@Body() createDto: CreateRoleDto): Promise<CreateRoleDto> {
        return await this.roleService.update(createDto);
    }

    @Delete(':id')
    @HttpCode(200)
    @UsePipes(ValidationPipe)
    @ApiOkResponse({ type: CreateRoleDto })
    async delete(@Param('id', ParseIntPipe) id: number): Promise<CreateRoleDto> {
        return await this.roleService.delete(id);
    }
}