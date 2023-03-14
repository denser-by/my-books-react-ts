import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    getAll(): string {
        return `This action returns all Users`;
    }

    getOne(id: any): string {
        return `This action returns a #${id} User`;
    }

    delete(id: any): string {
        return `This action deletes a #${id} User`;
    }
}
