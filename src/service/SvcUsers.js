const user = require('../../models/index.js').User;

class SvcUsers {
    async create(userCreate) {
        try {
            const userItem = await user.create({ 
                first_name: userCreate.first_name,
                last_name: userCreate.last_name,
                email: userCreate.email,
                phone: userCreate.phone, 
                login: userCreate.login,
                hash_password: userCreate.hash_password,
                favorite_color: userCreate.favorite_color, 
                avatar: userCreate.avatar,
                from_city: userCreate.from_city
            });
            return userItem;
        } catch (e) {
            throw new Error('Can not create User, ' + e);
        }
    }

    async getAll() {
        const { count, rows } = await user.findAndCountAll({});
        console.log("Found User " + count + " records");
        if (count >= 1)
            return rows;
        return [];
    }

    async getOne(id) {
        if (!id)
            throw new Error('Не указан ID');
        const { count, rows } = await user.findAndCountAll({ where: { id: id } });
        if (count != 1) {
            console.log("Can not find User with id=" + id);
            return null;
        }
        return rows[0];
    }

    async update(userUpdate) {
        const id = userUpdate.id;
        if (!id)
            throw new Error('Не указан ID');
        const { count, rows } = await user.findAndCountAll({ where: { id: id } });
        if (count != 1) {
            console.log("Can not find User with id=" + id);
            return null;
        }
        else {
            rows[0].set({ 
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
    }

    async delete(id) {
        if (!id)
            throw new Error('Не указан ID');
        const { count, rows } = await user.findAndCountAll({ where: { id: id } });
        if (count != 1) {
            console.log("Can not delete User with id=" + id);
            return null;
        }
        await rows[0].destroy({ force: true });
        console.log("User with id=" + id + " has been deleted");
        return rows[0];
    }
}

module.exports = new SvcUsers()