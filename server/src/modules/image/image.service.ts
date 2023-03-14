import { Injectable } from '@nestjs/common';

@Injectable()
export class ImageService {
    getAll(): string {
        return `This action returns all Images`;
    }

    getOne(id: any): string {
        return `This action returns a #${id} Image`;
    }

    delete(id: any): string {
        return `This action deletes a #${id} Image`;
    }
}
