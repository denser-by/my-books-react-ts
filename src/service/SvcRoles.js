const role = require('../../models/index.js').Role;

class SvcRoles {
    async create(roleCreate) {
        try {
            const roleItem = await role.create({ name: roleCreate.name, description: roleCreate.description });
            return roleItem;
        } catch (e) {
            throw new Error('Can not create Role, ' + e);
        }
    }

    async getAll() {
        const { count, rows } = await role.findAndCountAll({});
        console.log("Found Role " + count + " records");
        if (count >= 1)
            return rows;
        return [];
    }

    async getOne(id) {
        if (!id)
            throw new Error('Не указан ID');
        const { count, rows } = await role.findAndCountAll({ where: { id: id } });
        if (count != 1) {
            console.log("Can not find Role with id=" + id);
            return null;
        }
        return rows[0];
    }

    async update(roleUpdate) {
        const id = roleUpdate.id;
        if (!id)
            throw new Error('Не указан ID');
        const { count, rows } = await role.findAndCountAll({ where: { id: id } });
        if (count != 1) {
            console.log("Can not find Role with id=" + id);
            return null;
        }
        else {
            rows[0].set({ name: roleUpdate.name, description: roleUpdate.description });
            rows[0].save();
            return rows[0];
        }
    }

    async delete(id) {
        if (!id)
            throw new Error('Не указан ID');
        const { count, rows } = await role.findAndCountAll({ where: { id: id } });
        if (count != 1) {
            console.log("Can not delete Role with id=" + id);
            return null;
        }
        await rows[0].destroy({ force: true });
        console.log("Role with id=" + id + " has been deleted");
        return rows[0];
    }
}

module.exports = new SvcRoles()