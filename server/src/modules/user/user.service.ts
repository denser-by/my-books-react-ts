import { Injectable } from '@nestjs/common';
import { ImageService } from '../image/image.service';
import { CreateUserDto } from './dto/CreateUserDto';
import { GetManyUserDto } from './dto/GetManyUserDto';
const user = require('../../../models/index.js').User;

@Injectable()
export class UserService {

    constructor(private readonly imageService: ImageService) { }

    async create(userCreate: CreateUserDto): Promise<CreateUserDto> {
        try {
            return await user.create({
                first_name: userCreate.first_name,
                last_name: userCreate.last_name,
                email: userCreate.email,
                phone: userCreate.phone,
                login: userCreate.login,
                hash_password: userCreate.hash_password,
                favorite_color: userCreate.favorite_color,
                avatar: userCreate.avatar,
                deleted: userCreate.deleted,
                from_city: userCreate.from_city
            });
        } catch (e) {
            throw new Error('Can not create User, ' + e);
        }
    }

    async getAll(): Promise<GetManyUserDto[]> {
        var { count, rows } = await user.findAndCountAll({});
        if (count >= 1) {
            let result = [];
            for (let i = 0; i < rows.length; i++)
                result.push(await this.prepareDtoManyFromEntity(rows[i]));
            return result;
        }
        return [];
    }

    async size(): Promise<number> {
        return await user.count();
    }

    async hasOne(id: number): Promise<boolean> {
        if (id == null || id == undefined || id < 0)
            throw new Error('Не указан ID');
        var { count, rows } = await user.findAndCountAll({ where: { id: id } });
        if (count == 1 && rows[0].id == id)
            return true;
        return false;
    }

    async findOneByLogin(login: string) {
        if (login != null && login != undefined && login.length > 0) {
            var { count, rows } = await user.findAndCountAll({ where: { login: login } });
            if (count > 0)
                return rows[0];
        }
        return null;
    }

    async getOne(id: number): Promise<CreateUserDto> {
        if (id == null || id == undefined || id < 0)
            throw new Error('Не указан ID');
        var { count, rows } = await user.findAndCountAll({ where: { id: id } });
        if (count != 1)
            throw new Error('Object not found, ID=' + id);
        return rows[0];
    }

    private async prepareDtoManyFromEntity(userRef: any): Promise<GetManyUserDto> {
        let result = new GetManyUserDto();
        result.id = userRef.id;
        result.login = userRef.login;
        result.email = userRef.email;
        result.phone = userRef.phone;
        result.first_name = userRef.first_name;
        result.last_name = userRef.last_name;
        result.deleted = userRef.deleted;
        result.updatedAt = userRef.updatedAt;
        return result;
    }

    async update(userUpdate: CreateUserDto): Promise<CreateUserDto> {
        var id = userUpdate.id;
        if (id == null || id == undefined || id < 0)
            throw new Error('Не указан ID');
        var { count, rows } = await user.findAndCountAll({ where: { id: id } });
        if (count != 1)
            throw new Error('Object not found, ID=' + id);
        rows[0].set({
            id: userUpdate.id,
            first_name: userUpdate.first_name,
            last_name: userUpdate.last_name,
            email: userUpdate.email,
            phone: userUpdate.phone,
            login: userUpdate.login,
            hash_password: userUpdate.hash_password,
            favorite_color: userUpdate.favorite_color,
            avatar: userUpdate.avatar,
            from_city: userUpdate.from_city
        });
        rows[0].save();
        return rows[0];
    }

    async delete(id: number): Promise<CreateUserDto> {
        if (id == null || id == undefined || id < 0)
            throw new Error('Не указан ID');
        var { count, rows } = await user.findAndCountAll({ where: { id: id } });
        if (count != 1)
            throw new Error('Object not found, ID=' + id);
        await rows[0].destroy({ force: true, truncate: true });
        return rows[0];
    }

    async deleteAll(): Promise<number> {
        var { count, rows } = await user.findAndCountAll({});
        if (count < 1)
            throw new Error('Objects not found, items ' + count);
        rows.map(img => async function () {
            await img.destroy({ force: true, truncate: true });
        });
        return count;
    }
}