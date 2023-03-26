import { Injectable } from '@nestjs/common';
import { CreateAuthorBookDto } from './dto/CreateAuthorBookDto';
import { DeleteAuthorBookDto } from './dto/DeleteAuthorBookDto';
const authorbook = require('../../../models/index.js').AuthorBook;

@Injectable()
export class AuthorbookService {
    async create(authorBookCreate: CreateAuthorBookDto): Promise<CreateAuthorBookDto> {
        try {
            return await authorbook.create({
                author: authorBookCreate.author,
                book: authorBookCreate.book
            });
        } catch (e) {
            throw new Error('Can not create Authorbook, ' + e);
        }
    }

    async getAll(): Promise<CreateAuthorBookDto[]> {
        var { count, rows } = await authorbook.findAndCountAll({});
        if (count >= 1)
            return rows;
        return [];
    }

    async getAllByAuthor(author: number): Promise<CreateAuthorBookDto[]> {
        var { count, rows } = await authorbook.findAndCountAll({ where: { author: author } });
        if (count >= 1)
            return rows;
        return [];
    }

    async getAllByBook(book: number): Promise<CreateAuthorBookDto[]> {
        var { count, rows } = await authorbook.findAndCountAll({ where: { book: book } });
        if (count >= 1)
            return rows;
        return [];
    }

    async getAllByBookArrayId(book: number): Promise<string[]> {
        var { count, rows } = await authorbook.findAndCountAll({ where: { book: book } });
        if (count >= 1) {
            let result = [];
            rows.map(item => { result.push("" + item.author); });
            return result;
        }
        return [];
    }

    async getAllByAuthorArrayId(author: number): Promise<string[]> {
        var { count, rows } = await authorbook.findAndCountAll({ where: { author: author } });
        if (count >= 1) {
            let result = [];
            rows.map(item => { result.push("" + item.book); });
            return result;
        }
        return [];
    }

    async size(): Promise<number> {
        return await authorbook.count();
    }

    async sizeByAuthor(author: number): Promise<number> {
        var { count, rows } = await authorbook.findAndCountAll({ where: { author: author } });
        return count >= 1 ? count : 0;
    }

    async sizeByBook(book: number): Promise<number> {
        var { count, rows } = await authorbook.findAndCountAll({ where: { book: book } });
        return count >= 1 ? count : 0;
    }

    async hasOne(author: number, book: number): Promise<boolean> {
        if (author == null || author == undefined || author < 0 || book == null || book == undefined || book < 0)
            throw new Error('Не указан ID');
        var { count, rows } = await authorbook.findAndCountAll({ where: { author: author, book: book } });
        if (count == 1 && rows[0].author == author && rows[0].book == book)
            return true;
        return false;
    }

    async getOne(author: number, book: number): Promise<CreateAuthorBookDto> {
        if (author == null || author == undefined || author < 0 || book == null || book == undefined || book < 0)
            throw new Error('Не указан ID');
        var { count, rows } = await authorbook.findAndCountAll({ where: { author: author, book: book } });
        if (count == 1 && rows[0].author == author && rows[0].book == book)
            return rows[0];
        throw new Error('Object not found, author=' + author + ' book=' + book);
    }

    async update(authorbookUpdate: CreateAuthorBookDto): Promise<CreateAuthorBookDto> {
        var id = authorbookUpdate.id;
        if (id == null || id == undefined || id < 0)
            throw new Error('Не указан ID');
        var { count, rows } = await authorbook.findAndCountAll({ where: { id: id } });
        if (count != 1)
            throw new Error('Object not found, ID=' + id);
        rows[0].set({
            id: authorbookUpdate.id,
            author: authorbookUpdate.author,
            book: authorbookUpdate.book
        });
        rows[0].save();
        return rows[0];
    }

    private async prepareDtoDelete(ref: any): Promise<DeleteAuthorBookDto> {
        let result = new DeleteAuthorBookDto();
        result.id = ref.id;
        result.author = ref.author;
        result.book = ref.book;
        return result;
    }

    async delete(id: number): Promise<DeleteAuthorBookDto> {
        if (id == null || id == undefined || id < 0)
            throw new Error('Не указан ID');
        var { count, rows } = await authorbook.findAndCountAll({ where: { id: id } });
        if (count != 1)
            throw new Error('Object not found, ID=' + id);
        await rows[0].destroy({ force: true, truncate: true });
        let result = await this.prepareDtoDelete(rows[0]);
        return result;
    }

    async deleteByAuthorBook(author: number, book: number): Promise<DeleteAuthorBookDto> {
        if (author == null || author == undefined || author < 0 || book == null || book == undefined || book < 0)
            throw new Error('Не указан ID');
        var { count, rows } = await authorbook.findAndCountAll({ where: { author: author, book: book } });
        if (count != 1)
            throw new Error('Object not found, author=' + author + ' book=' + book);
        await rows[0].destroy({ force: true, truncate: true });
        let result = await this.prepareDtoDelete(rows[0]);
        return result;
    }

    async deleteAll(): Promise<DeleteAuthorBookDto[]> {
        var { count, rows } = await authorbook.findAndCountAll({});
        if (count < 1)
            throw new Error('Objects not found, items ' + count);
        let result = [];
        for (let i = 0; i < rows.length; i++) {
            result.push(await this.prepareDtoDelete(rows[i]));
            await rows[i].destroy({ force: true, truncate: true });
        }
        return result;
    }

    async deleteAllByAuthor(author: number): Promise<DeleteAuthorBookDto[]> {
        var { count, rows } = await authorbook.findAndCountAll({ where: { author: author } });
        let result = [];
        if (count > 0) {
            for (let i = 0; i < rows.length; i++) {
                result.push(await this.prepareDtoDelete(rows[i]));
                await rows[i].destroy({ force: true, truncate: true });
            }
        }
        return result;
    }

    async deleteAllByBook(book: number): Promise<DeleteAuthorBookDto[]> {
        var { count, rows } = await authorbook.findAndCountAll({ where: { book: book } });
        let result = [];
        if (count > 0) {
            for (let i = 0; i < rows.length; i++) {
                result.push(await this.prepareDtoDelete(rows[i]));
                await rows[i].destroy({ force: true, truncate: true });
            }
        }
        return result;
    }
}