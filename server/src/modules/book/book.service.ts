import { Injectable } from '@nestjs/common';
import { CreateImageDto } from '../image/dto/CreateImageDto';
import { ImageService } from '../image/image.service';
import { CreateBookDto } from './dto/CreateBookDto';
const book = require('../../../models/index.js').Book;

@Injectable()
export class BookService {

    constructor(private readonly imageService: ImageService) { }

    async create(bookCreate: CreateBookDto): Promise<CreateBookDto> {
        try {
            var cover_img_id;
            if (bookCreate.cover_img_data != null && bookCreate.cover_img_data.length > 0 || bookCreate.cover_img_path != null && bookCreate.cover_img_path.length > 0) {
                var imageDto = new CreateImageDto();
                imageDto.image_type = 1;
                if (bookCreate.cover_img_data != null && bookCreate.cover_img_data.length > 0)
                    imageDto.mini_copy = bookCreate.cover_img_data;
                else if (bookCreate.cover_img_path != null && bookCreate.cover_img_path.length > 0)
                    imageDto.path = bookCreate.cover_img_path;
                imageDto = await this.imageService.create(imageDto);
                cover_img_id = imageDto.id;
            }
            let value = await book.create({
                name: bookCreate.name,
                info: bookCreate.info,
                year: bookCreate.year,
                cover_img: cover_img_id,
                access_key: bookCreate.access_key
            });
            return value;
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
            cover_img_path: '',
            access_key: bookRef.access_key,
            cover_img_data: ''
        };
        console.log('__PREP__=' + JSON.stringify(bookRef));
        if (bookRef.cover_img != null && bookRef.cover_img > 0) {
            var imageRef = this.imageService.getOne(bookRef.cover_img);
            console.log('__REF=' + JSON.stringify(imageRef));
            result.cover_img_data = (await imageRef).mini_copy;
            result.cover_img_path = (await imageRef).path;
        }
        console.log('RESULT=' + JSON.stringify(result));
        return result;
    }

    async update(bookUpdate: CreateBookDto): Promise<CreateBookDto> {
        var id = bookUpdate.id;
        if (id == null || id == undefined || id < 0)
            throw new Error('Не указан ID');
        var { count, rows } = await book.findAndCountAll({ where: { id: id } });
        if (count != 1)
            throw new Error('Object not found, ID=' + id);
        var cover_img_id;
        if (bookUpdate.cover_img_data != null && bookUpdate.cover_img_data.length > 0 || bookUpdate.cover_img_path != null && bookUpdate.cover_img_path.length > 0) {
            var imageDto = new CreateImageDto();
            imageDto.image_type = 1;
            if (bookUpdate.cover_img_data != null && bookUpdate.cover_img_data.length > 0)
                imageDto.mini_copy = bookUpdate.cover_img_data;
            else if (bookUpdate.cover_img_path != null && bookUpdate.cover_img_path.length > 0)
                imageDto.path = bookUpdate.cover_img_path;
            imageDto = await this.imageService.create(imageDto);
            cover_img_id = imageDto.id;
        }
        rows[0].set({
            id: bookUpdate.id,
            name: bookUpdate.name,
            info: bookUpdate.info,
            year: bookUpdate.year,
            cover_img: cover_img_id,
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