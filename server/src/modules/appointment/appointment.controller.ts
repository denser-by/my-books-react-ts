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
        return this.appointmentService.create(createDto);
    }

    @Get()
    @ApiOkResponse({ type: CreateAppointmentDto, isArray: true })
    async getAll(
        @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number
    ): Promise<CreateAppointmentDto[]> {
        return this.appointmentService.getAll();
    }

    @Get(':id')
    @ApiOkResponse({ type: CreateAppointmentDto })
    async getOne(@Param('id', ParseIntPipe) id: number): Promise<CreateAppointmentDto> {
        return this.appointmentService.getOne(id);
    }

    @Put()
    @ApiOkResponse({ type: CreateAppointmentDto })
    async update(@Body() createDto: CreateAppointmentDto): Promise<CreateAppointmentDto> {
        return this.appointmentService.update(createDto);
    }

    @Delete(':id')
    @ApiOkResponse({ type: CreateAppointmentDto })
    async delete(@Param('id', ParseIntPipe) id: number): Promise<CreateAppointmentDto> {
        return this.appointmentService.delete(id);
    }
}