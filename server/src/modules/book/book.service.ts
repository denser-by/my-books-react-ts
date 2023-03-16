import { Injectable } from '@nestjs/common';
import { ImageService } from '../image/image.service';
import { CreateBookDto } from './dto/CreateBookDto';
const book = require('../../../models/index.js').Book;

@Injectable()
export class BookService {

    constructor(private readonly imageService: ImageService) { }

    async create(bookCreate: CreateBookDto): Promise<CreateBookDto> {
        try {
            return await book.create({
                name: bookCreate.name,
                info: bookCreate.info,
                year: bookCreate.year,
                cover_img: bookCreate.cover_img,
                access_key: bookCreate.access_key
            });
        } catch (e) {
            throw new Error('Can not create Book, ' + e);
        }
    }

    async getAll(): Promise<CreateBookDto[]> {
        var { count, rows } = await book.findAndCountAll({});
        if (count >= 1)
            return rows;
        return [];
    }

    async size() {
        return await book.count();
    }

    async hasOne(id: number) {
        if (id == null || id == undefined || id < 0)
            throw new Error('Не указан ID');
        var { count, rows } = await book.findAndCountAll({ where: { id: id } });
        if (count == 1 && rows[0].id == id)
            return true;
        return false;
    }

    async findOneByAccessKey(access_key: string) {
        if (access_key != null && access_key != undefined && access_key.length > 0) {
            var { count, rows } = await book.findAndCountAll({ where: { access_key: access_key } });
            if (count > 0)
                return rows[0];
        }
        return null;
    }

    async getOne(id: number) {
        if (id == null || id == undefined || id < 0)
            throw new Error('Не указан ID');
        var { count, rows } = await book.findAndCountAll({ where: { id: id } });
        if (count != 1)
            throw new Error('Object not found, ID=' + id);
        var bookRef = rows[0];
        var result = {
            id: bookRef.id,
            name: bookRef.name,
            info: bookRef.info,
            year: bookRef.year,
            authors: [],
            cover_img: bookRef.cover_img,
            access_key: bookRef.access_key,
            cover_img_path: ''
        };
        if(bookRef.cover_img != null && bookRef.cover_img > 0) {
            var imageRef = this.imageService.getOne(bookRef.cover_img);
            result.cover_img_path = (await imageRef).path;
        }
        return result;
    }

    async update(bookUpdate: CreateBookDto): Promise<CreateBookDto> {
        var id = bookUpdate.id;
        if (id == null || id == undefined || id < 0)
            throw new Error('Не указан ID');
        var { count, rows } = await book.findAndCountAll({ where: { id: id } });
        if (count != 1)
            throw new Error('Object not found, ID=' + id);
        rows[0].set({
            id: bookUpdate.id,
            name: bookUpdate.name,
            info: bookUpdate.info,
            year: bookUpdate.year,
            cover_img: bookUpdate.cover_img,
            access_key: bookUpdate.access_key
        });
        rows[0].save();
        return rows[0];
    }

    async delete(id: number): Promise<CreateBookDto> {
        if (id == null || id == undefined || id < 0)
            throw new Error('Не указан ID');
        var { count, rows } = await book.findAndCountAll({ where: { id: id } });
        if (count != 1)
            throw new Error('Object not found, ID=' + id);
        await rows[0].destroy({ force: true, truncate: true });
        return rows[0];
    }

    async deleteAll() {
        var { count, rows } = await book.findAndCountAll({});
        if (count < 1)
            throw new Error('Objects not found, items ' + count);
        rows.map(img => async function () {
            await img.destroy({ force: true, truncate: true });
        });
        return count;
    }
}