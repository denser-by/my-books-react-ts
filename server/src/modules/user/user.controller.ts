import { Body, Controller, DefaultValuePipe, Delete, Get, HttpCode, Param, ParseIntPipe, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { CreateUserDto } from './dto/CreateUserDto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    @HttpCode(200)
    @UsePipes(ValidationPipe)
    @ApiCreatedResponse({ type: CreateUserDto })
    async create(@Body() createDto: CreateUserDto): Promise<CreateUserDto> {
        return this.userService.create(createDto);
    }

    @Get()
    @ApiOkResponse({ type: CreateUserDto, isArray: true })
    async getAll(
        @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number
    ): Promise<CreateUserDto[]> {
        return this.userService.getAll();
    }

    @Get(':id')
    @ApiOkResponse({ type: CreateUserDto })
    async getOne(@Param('id', ParseIntPipe) id: number): Promise<CreateUserDto> {
        return this.userService.getOne(id);
    }

    @Put()
    @ApiOkResponse({ type: CreateUserDto })
    async update(@Body() createDto: CreateUserDto): Promise<CreateUserDto> {
        return this.userService.update(createDto);
    }

    @Delete(':id')
    @ApiOkResponse({ type: CreateUserDto })
    async delete(@Param('id', ParseIntPipe) id: number): Promise<CreateUserDto> {
        return this.userService.delete(id);
    }
}