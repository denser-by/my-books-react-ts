import { Injectable } from '@nestjs/common';

@Injectable()
export class AppointmentService {
    getAll(): string {
        return `This action returns all Appointments`;
    }

    getOne(id: any): string {
        return `This action returns a #${id} Appointment`;
    }

    delete(id: any): string {
        return `This action deletes a #${id} Appointment`;
    }
}
