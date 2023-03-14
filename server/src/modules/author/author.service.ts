import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthorService {
    getAll(): string {
        return `This action returns all Authors`;
    }

    getOne(id: any): string {
        return `This action returns a #${id} Author`;
    }

    delete(id: any): string {
        return `This action deletes a #${id} Author`;
    }
}