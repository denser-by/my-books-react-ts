import { Body, Controller, DefaultValuePipe, Delete, Get, HttpCode, Param, ParseIntPipe, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { CreateUserDto } from './dto/CreateUserDto';
import { DeleteUserDto } from './dto/DeleteUserDto';
import { GetManyUserDto } from './dto/GetManyUserDto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    @HttpCode(200)
    @UsePipes(ValidationPipe)
    @ApiCreatedResponse({ type: CreateUserDto })
    async create(@Body() createDto: CreateUserDto): Promise<CreateUserDto> {
        return await this.userService.create(createDto);
    }

    @Get()
    @HttpCode(200)
    @UsePipes(ValidationPipe)
    @ApiOkResponse({ type: GetManyUserDto, isArray: true })
    async getAll(
        @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number
    ): Promise<GetManyUserDto[]> {
        return await this.userService.getAll();
    }

    @Get(':id')
    @HttpCode(200)
    @UsePipes(ValidationPipe)
    @ApiOkResponse({ type: CreateUserDto })
    async getOne(@Param('id', ParseIntPipe) id: number): Promise<CreateUserDto> {
        return await this.userService.getOne(id);
    }

    @Put()
    @HttpCode(200)
    @UsePipes(ValidationPipe)
    @ApiOkResponse({ type: CreateUserDto })
    async update(@Body() createDto: CreateUserDto): Promise<CreateUserDto> {
        return await this.userService.update(createDto);
    }

    @Delete(':id')
    @HttpCode(200)
    @UsePipes(ValidationPipe)
    @ApiOkResponse({ type: DeleteUserDto })
    async delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteUserDto> {
        return await this.userService.delete(id);
    }
}