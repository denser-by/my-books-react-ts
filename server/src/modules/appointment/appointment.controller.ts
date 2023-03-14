import { Controller, Delete, Get, Param } from '@nestjs/common';
import { AppointmentService } from './appointment.service';

@Controller('appointments')
export class AppointmentController {
    constructor(private readonly appointmentService: AppointmentService) { }

    @Get()
    getAll(): string {
        return this.appointmentService.getAll();
    }

    @Get(':id')
    getOne(@Param('id') id): string {
        return this.appointmentService.getOne(id);
    }

    @Delete(':id')
    delete(@Param('id') id): string {
        return this.appointmentService.delete(id);
    }
}