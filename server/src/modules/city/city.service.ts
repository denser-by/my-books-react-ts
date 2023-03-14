import { Injectable } from '@nestjs/common';

@Injectable()
export class CityService {
    getAll(): string {
        return `This action returns all Cities`;
    }

    getOne(id: any): string {
        return `This action returns a #${id} City`;
    }

    delete(id: any): string {
        return `This action deletes a #${id} City`;
    }
}
