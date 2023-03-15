import { Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/CreateAppointmentDto';

@Injectable()
export class AppointmentService {
    create(appointmentDto: CreateAppointmentDto): CreateAppointmentDto {
        appointmentDto.id = 123;
        return appointmentDto;
    }

    getAll(): CreateAppointmentDto[] {
        var result = [];
        var appointmentDto1 = new CreateAppointmentDto();
        appointmentDto1.id = 123;
        appointmentDto1.name = 'Name_123';
        appointmentDto1.description = 'Descr_123';
        result.push(appointmentDto1);
        var appointmentDto2 = new CreateAppointmentDto();
        appointmentDto2.id = 321;
        appointmentDto2.name = 'Name_321';
        appointmentDto2.description = 'Descr_321';
        result.push(appointmentDto2);
        return result;
    }

    getOne(id: any): CreateAppointmentDto {
        var appointmentDto = new CreateAppointmentDto();
        appointmentDto.id = 123;
        appointmentDto.name = 'Name_123';
        appointmentDto.description = 'Descr_123';
        return appointmentDto;
    }

    update(appointmentDto: CreateAppointmentDto): CreateAppointmentDto {
        appointmentDto.name = 'Updated ' + appointmentDto.name;
        return appointmentDto;
    }

    delete(id: any): CreateAppointmentDto {
        var appointmentDto = new CreateAppointmentDto();
        appointmentDto.id = 123;
        appointmentDto.name = 'Deleted name';
        appointmentDto.description = 'Deleted descr';
        return appointmentDto;
    }
}