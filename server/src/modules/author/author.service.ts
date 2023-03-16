import { Injectable } from '@nestjs/common';
import { CreateImageDto } from '../image/dto/CreateImageDto';
import { ImageService } from '../image/image.service';
import { CreateAuthorDto } from './dto/CreateAuthorDto';
const author = require('../../../models/index.js').Author;

@Injectable()
export class AuthorService {

    constructor(private readonly imageService: ImageService) { }

    async create(authorCreate: CreateAuthorDto): Promise<CreateAuthorDto> {
        try {
            var photo_id = -1;
            if (authorCreate.photo_data != null && authorCreate.photo_data.length > 0) {
                var imageDto1 = await this.imageService.findOneByData(authorCreate.photo_data);
                if (imageDto1 != null)
                    photo_id = imageDto1.id;
            } else if (authorCreate.photo_path != null && authorCreate.photo_path.length > 0) {
                var imageDto2 = await this.imageService.findOneByPath(authorCreate.photo_path);
                if (imageDto2 != null)
                    photo_id = imageDto2.id;
            }
            if (photo_id < 0)
                if (authorCreate.photo_data != null && authorCreate.photo_data.length > 0 || authorCreate.photo_path != null && authorCreate.photo_path.length > 0) {
                    var imageDto3 = new CreateImageDto();
                    imageDto3.image_type = 1;
                    if (authorCreate.photo_data != null && authorCreate.photo_data.length > 0)
                        imageDto3.mini_copy = authorCreate.photo_data;
                    else if (authorCreate.photo_path != null && authorCreate.photo_path.length > 0)
                        imageDto3.path = authorCreate.photo_path;
                    let imageResult = await this.imageService.create(imageDto3);
                    photo_id = imageResult.id;
                }
            let value = await author.create({
                name: authorCreate.name,
                info: authorCreate.info,
                age: authorCreate.age,
                photo: photo_id,
                access_key: authorCreate.access_key
            });
            return value;
        } catch (e) {
            throw new Error('Can not create Author, ' + e);
        }
    }

    async getAll(): Promise<CreateAuthorDto[]> {
        var { count, rows } = await author.findAndCountAll({});
        if (count >= 1)
            return rows;
        return [];
    }

    async size() {
        return await author.count();
    }

    async hasOne(id: number) {
        if (id == null || id == undefined || id < 0)
            throw new Error('Не указан ID');
        var { count, rows } = await author.findAndCountAll({ where: { id: id } });
        if (count == 1 && rows[0].id == id)
            return true;
        return false;
    }

    async findOneByAccessKey(access_key: string) {
        if (access_key != null && access_key != undefined && access_key.length > 0) {
            var { count, rows } = await author.findAndCountAll({ where: { access_key: access_key } });
            if (count > 0)
                return rows[0];
        }
        return null;
    }

    async getOne(id: number) {
        if (id == null || id == undefined || id < 0)
            throw new Error('Не указан ID');
        var { count, rows } = await author.findAndCountAll({ where: { id: id } });
        if (count != 1)
            throw new Error('Object not found, ID=' + id);
        var authorRef = rows[0];
        var result = {
            id: authorRef.id,
            name: authorRef.name,
            info: authorRef.info,
            age: authorRef.age,
            books: [],
            photo_path: '',
            access_key: authorRef.access_key,
            photo_data: ''
        };
        if (authorRef.photo != null && authorRef.photo > 0) {
            var imageRef = this.imageService.getOne(authorRef.photo);
            result.photo_data = (await imageRef).mini_copy;
            result.photo_path = (await imageRef).path;
        }
        return result;
    }

    async update(authorUpdate: CreateAuthorDto): Promise<CreateAuthorDto> {
        var id = authorUpdate.id;
        if (id == null || id == undefined || id < 0)
            throw new Error('Не указан ID');
        var { count, rows } = await author.findAndCountAll({ where: { id: id } });
        if (count != 1)
            throw new Error('Object not found, ID=' + id);
        var photo_id = -1;
        if (authorUpdate.photo_data != null && authorUpdate.photo_data.length > 0) {
            var imageDto1 = await this.imageService.findOneByData(authorUpdate.photo_data);
            if (imageDto1 != null)
                photo_id = imageDto1.id;
        } else if (authorUpdate.photo_path != null && authorUpdate.photo_path.length > 0) {
            var imageDto2 = await this.imageService.findOneByPath(authorUpdate.photo_path);
            if (imageDto2 != null)
                photo_id = imageDto2.id;
        }
        if (photo_id < 0)
            if (authorUpdate.photo_data != null && authorUpdate.photo_data.length > 0 || authorUpdate.photo_path != null && authorUpdate.photo_path.length > 0) {
                var imageDto3 = new CreateImageDto();
                imageDto3.image_type = 1;
                if (authorUpdate.photo_data != null && authorUpdate.photo_data.length > 0)
                    imageDto3.mini_copy = authorUpdate.photo_data;
                else if (authorUpdate.photo_path != null && authorUpdate.photo_path.length > 0)
                    imageDto3.path = authorUpdate.photo_path;
                let imageResult = await this.imageService.create(imageDto3);
                photo_id = imageResult.id;
            }
        rows[0].set({
            id: authorUpdate.id,
            name: authorUpdate.name,
            info: authorUpdate.info,
            age: authorUpdate.age,
            photo: photo_id,
            access_key: authorUpdate.access_key
        });
        rows[0].save();
        return rows[0];
    }

    async delete(id: number): Promise<CreateAuthorDto> {
        if (id == null || id == undefined || id < 0)
            throw new Error('Не указан ID');
        var { count, rows } = await author.findAndCountAll({ where: { id: id } });
        if (count != 1)
            throw new Error('Object not found, ID=' + id);
        await rows[0].destroy({ force: true, truncate: true });
        return rows[0];
    }

    async deleteAll() {
        var { count, rows } = await author.findAndCountAll({});
        if (count < 1)
            throw new Error('Objects not found, items ' + count);
        rows.map(img => async function () {
            await img.destroy({ force: true, truncate: true });
        });
        return count;
    }
}