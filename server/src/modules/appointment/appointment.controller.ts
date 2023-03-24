import { Body, Controller, DefaultValuePipe, Delete, Get, HttpCode, Param, ParseIntPipe, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { CreateAppointmentDto } from './dto/CreateAppointmentDto';
import { AppointmentService } from './appointment.service';

@Controller('appointments')
export class AppointmentController {
    constructor(private readonly appointmentService: AppointmentService) { }

    @Post()
    @HttpCode(200)
    @UsePipes(ValidationPipe)
    @ApiCreatedResponse({ type: CreateAppointmentDto })
    async create(@Body() createDto: CreateAppointmentDto): Promise<CreateAppointmentDto> {
        return await this.appointmentService.create(createDto);
    }

    @Get()
    @HttpCode(200)
    @UsePipes(ValidationPipe)
    @ApiOkResponse({ type: CreateAppointmentDto, isArray: true })
    async getAll(
        @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number
    ): Promise<CreateAppointmentDto[]> {
        return await this.appointmentService.getAll();
    }

    @Get(':id')
    @HttpCode(200)
    @UsePipes(ValidationPipe)
    @ApiOkResponse({ type: CreateAppointmentDto })
    async getOne(@Param('id', ParseIntPipe) id: number): Promise<CreateAppointmentDto> {
        return await this.appointmentService.getOne(id);
    }

    @Put()
    @HttpCode(200)
    @UsePipes(ValidationPipe)
    @ApiOkResponse({ type: CreateAppointmentDto })
    async update(@Body() createDto: CreateAppointmentDto): Promise<CreateAppointmentDto> {
        return await this.appointmentService.update(createDto);
    }

    @Delete(':id')
    @HttpCode(200)
    @UsePipes(ValidationPipe)
    @ApiOkResponse({ type: CreateAppointmentDto })
    async delete(@Param('id', ParseIntPipe) id: number): Promise<CreateAppointmentDto> {
        return await this.appointmentService.delete(id);
    }
}