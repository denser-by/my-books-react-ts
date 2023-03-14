import { Injectable } from '@nestjs/common';

@Injectable()
export class RoleService {
    getAll(): string {
        return `This action returns all roles`;
    }

    getOne(id: any): string {
        return `This action returns a #${id} role`;
    }

    delete(id: any): string {
        return `This action deletes a #${id} role`;
    }
}