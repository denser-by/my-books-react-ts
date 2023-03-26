import { Injectable } from '@nestjs/common';
import { AuthorService } from '../author/author.service';
import { AuthorbookService } from '../authorbook/authorbook.service';
import { CreateImageDto } from '../image/dto/CreateImageDto';
import { ImageService } from '../image/image.service';
import { CreateBookDto } from './dto/CreateBookDto';
import { GetManyBookDto } from './dto/GetManyBookDto';
import { GetOneBookDto } from './dto/GetOneBookDto';
const book = require('../../../models/index.js').Book;
const authorbook = require('../../../models/index.js').AuthorBook;
const author = require('../../../models/index.js').Author;

@Injectable()
export class BookService {

    constructor(
        private readonly imageService: ImageService,
        private readonly authorbookService: AuthorbookService,
        private readonly authorService: AuthorService
    ) { }

    async create(bookCreate: CreateBookDto): Promise<CreateBookDto> {
        try {
            var cover_img_id = -1;
            if (bookCreate.cover_img_data != null && bookCreate.cover_img_data.length > 0) {
                var imageDto1 = await this.imageService.findOneByData(bookCreate.cover_img_data);
                if (imageDto1 != null)
                    cover_img_id = imageDto1.id;
            } else if (bookCreate.cover_img_path != null && bookCreate.cover_img_path.length > 0) {
                var imageDto2 = await this.imageService.findOneByPath(bookCreate.cover_img_path);
                if (imageDto2 != null)
                    cover_img_id = imageDto2.id;
            }
            if (cover_img_id < 0)
                if (bookCreate.cover_img_data != null && bookCreate.cover_img_data.length > 0 || bookCreate.cover_img_path != null && bookCreate.cover_img_path.length > 0) {
                    var imageDto3 = new CreateImageDto();
                    imageDto3.image_type = 1;
                    if (bookCreate.cover_img_data != null && bookCreate.cover_img_data.length > 0)
                        imageDto3.mini_copy = bookCreate.cover_img_data;
                    else if (bookCreate.cover_img_path != null && bookCreate.cover_img_path.length > 0)
                        imageDto3.path = bookCreate.cover_img_path;
                    let imageResult = await this.imageService.create(imageDto3);
                    cover_img_id = imageResult.id;
                }
            let createdBook = await book.create({
                name: bookCreate.name,
                info: bookCreate.info,
                year: bookCreate.year,
                cover_img: cover_img_id,
                access_key: bookCreate.access_key
            });
            if (bookCreate.authors != null && bookCreate.authors.length > 0) {
                for (let i = 0; i < bookCreate.authors.length; i++) {
                    let rId = Number(bookCreate.authors[i]);
                    const authorbookRel = await authorbook.create({
                        book: createdBook.id,
                        author: rId
                    });
                }
                createdBook.authorsNum = await this.authorbookService.sizeByBook(createdBook.id);
                await createdBook.save();
            }
            return createdBook;
        } catch (e) {
            throw new Error('Can not create Book, ' + e);
        }
    }

    async getAll(): Promise<GetManyBookDto[]> {
        var { count, rows } = await book.findAndCountAll({});
        if (count >= 1) {
            let result = [];
            for (let i = 0; i < rows.length; i++)
                result.push(await this.prepareDtoManyFromEntity(rows[i], false));
            return result;
        }
        return [];
    }

    async size(): Promise<number> {
        return await book.count();
    }

    async hasOne(id: number): Promise<boolean> {
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

    async getOneByName(name: string): Promise<GetOneBookDto> {
        if (name != null && name != undefined && name.length > 0) {
            var { count, rows } = await book.findAndCountAll({ where: { name: name } });
            if (count > 0)
                return await this.prepareDtoFromEntity(rows[0], true);
        }
        return null;
    }

    async getOne(id: number): Promise<GetOneBookDto> {
        if (id == null || id == undefined || id < 0)
            throw new Error('Не указан ID');
        var { count, rows } = await book.findAndCountAll({ where: { id: id } });
        if (count != 1)
            throw new Error('Object not found, ID=' + id);
        return await this.prepareDtoFromEntity(rows[0], true);
    }

    private async prepareDtoManyFromEntity(bookRef: any, withImages: boolean): Promise<GetManyBookDto> {
        let result = new GetManyBookDto();
        result.id = bookRef.id;
        result.name = bookRef.name;
        result.info = bookRef.info;
        result.year = bookRef.year;
        result.authors = await this.authorbookService.getAllByBookArrayId(bookRef.id);
        result.cover_img_path = '';
        result.cover_img_data = '';
        result.updatedAt = bookRef.updatedAt;
        if (withImages && bookRef.cover_img != null && bookRef.cover_img > 0) {
            var imageRef = this.imageService.getOne(bookRef.cover_img);
            result.cover_img_data = (await imageRef).mini_copy;
            result.cover_img_path = (await imageRef).path;
        }
        return result;
    }

    private async prepareDtoFromEntity(bookRef: any, withImages: boolean): Promise<GetOneBookDto> {
        let result = new GetOneBookDto();
        result.id = bookRef.id;
        result.name = bookRef.name;
        result.info = bookRef.info;
        result.year = bookRef.year;
        result.authors = await this.authorbookService.getAllByBookArrayId(bookRef.id);
        result.authorNames = [];
        for (let i = 0; i < result.authors.length; i++) {
            let authorId = Number(result.authors[i]);
            var { count, rows } = await author.findAndCountAll({ where: { id: authorId } });
            if (count != 1)
                throw new Error('Object not found, ID=' + authorId);
            result.authorNames.push(rows[0].name);
        }
        result.cover_img_path = '';
        result.cover_img_data = '';
        if (withImages && bookRef.cover_img != null && bookRef.cover_img > 0) {
            var imageRef = this.imageService.getOne(bookRef.cover_img);
            result.cover_img_data = (await imageRef).mini_copy;
            result.cover_img_path = (await imageRef).path;
        }
        return result;
    }

    async update(bookUpdate: CreateBookDto): Promise<CreateBookDto> {
        const id = bookUpdate.id;
        if (id == null || id == undefined || id < 0)
            throw new Error('Не указан ID');
        var { count, rows } = await book.findAndCountAll({ where: { id: id } });
        if (count != 1)
            throw new Error('Object not found, ID=' + id);
        var cover_img_id = -1;
        if (bookUpdate.cover_img_data != null && bookUpdate.cover_img_data.length > 0) {
            var imageDto1 = await this.imageService.findOneByData(bookUpdate.cover_img_data);
            if (imageDto1 != null)
                cover_img_id = imageDto1.id;
        } else if (bookUpdate.cover_img_path != null && bookUpdate.cover_img_path.length > 0) {
            var imageDto2 = await this.imageService.findOneByPath(bookUpdate.cover_img_path);
            if (imageDto2 != null)
                cover_img_id = imageDto2.id;
        }
        if (cover_img_id < 0)
            if (bookUpdate.cover_img_data != null && bookUpdate.cover_img_data.length > 0 || bookUpdate.cover_img_path != null && bookUpdate.cover_img_path.length > 0) {
                var imageDto3 = new CreateImageDto();
                imageDto3.image_type = 1;
                if (bookUpdate.cover_img_data != null && bookUpdate.cover_img_data.length > 0)
                    imageDto3.mini_copy = bookUpdate.cover_img_data;
                else if (bookUpdate.cover_img_path != null && bookUpdate.cover_img_path.length > 0)
                    imageDto3.path = bookUpdate.cover_img_path;
                let imageResult = await this.imageService.create(imageDto3);
                cover_img_id = imageResult.id;
            }
        rows[0].set({
            id: bookUpdate.id,
            name: bookUpdate.name,
            info: bookUpdate.info,
            year: bookUpdate.year,
            cover_img: cover_img_id,
            access_key: bookUpdate.access_key
        });
        await rows[0].save();
        if (bookUpdate.authors != null && bookUpdate.authors.length >= 0) {
            const ready: string[] = await this.authorbookService.getAllByBookArrayId(id);
            for (let i = 0; i < ready.length; i++) {
                if (bookUpdate.authors.indexOf(ready[i]) < 0 || bookUpdate.authors.length < 1) {
                    const authorbookRelDeleted = await this.authorbookService.deleteByAuthorBook(Number(ready[i]), id);
                }
            }
            for (let i = 0; i < bookUpdate.authors.length; i++) {
                let rId = Number(bookUpdate.authors[i]);
                if (await this.authorbookService.hasOne(rId, id) == false) {
                    const authorbookRel = await authorbook.create({
                        book: id,
                        author: rId
                    });
                }
            }
            rows[0].authorsNum = await this.authorbookService.sizeByBook(id);
            await rows[0].save();
        }
        return rows[0];
    }

    async delete(id: number): Promise<GetOneBookDto> {
        if (id == null || id == undefined || id < 0)
            throw new Error('Не указан ID');
        var { count, rows } = await book.findAndCountAll({ where: { id: id } });
        if (count != 1)
            throw new Error('Object not found, ID=' + id);
        await this.authorbookService.deleteAllByBook(rows[0].id);
        await rows[0].destroy({ force: true, truncate: true });
        return rows[0];
    }

    async deleteAll(): Promise<GetManyBookDto[]> {
        var { count, rows } = await book.findAndCountAll({});
        if (count < 1)
            throw new Error('Objects not found, items ' + count);
        let result = [];
        for (let i = 0; i < rows.length; i++) {
            result.push(await this.prepareDtoManyFromEntity(rows[i], false));
            await this.authorbookService.deleteAllByBook(rows[i].id);
            await rows[i].destroy({ force: true, truncate: true });
        }
        return result;
    }
}