import { Injectable } from '@nestjs/common';

@Injectable()
export class BookService {
    getAll(): string {
        return `This action returns all Books`;
    }

    getOne(id: any): string {
        return `This action returns a #${id} Book`;
    }

    delete(id: any): string {
        return `This action deletes a #${id} Book`;
    }
}