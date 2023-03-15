import { Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/CreateAppointmentDto';

@Injectable()
export class AppointmentService {
    delete(id: number): CreateAppointmentDto | PromiseLike<CreateAppointmentDto> {
        throw new Error('Method not implemented.');
    }
    update(createDto: CreateAppointmentDto): CreateAppointmentDto | PromiseLike<CreateAppointmentDto> {
        throw new Error('Method not implemented.');
    }
    getOne(id: number): CreateAppointmentDto | PromiseLike<CreateAppointmentDto> {
        throw new Error('Method not implemented.');
    }
    getAll(): CreateAppointmentDto[] | PromiseLike<CreateAppointmentDto[]> {
        throw new Error('Method not implemented.');
    }
    create(createDto: CreateAppointmentDto): import("./dto/CreateAppointmentDto").CreateAppointmentDto | PromiseLike<import("./dto/CreateAppointmentDto").CreateAppointmentDto> {
        throw new Error('Method not implemented.');
    }

}
