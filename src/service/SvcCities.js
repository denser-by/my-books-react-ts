const city = require('../../models/index.js').City;

class SvcCities {
    async create(cityCreate) {
        try {
            const cityItem = await city.create({ 
                name: cityCreate.name,
                description: cityCreate.description,
                sightseen: cityCreate.sightseen,
                location: cityCreate.location 
            });
            return cityItem;
        } catch (e) {
            throw new Error('Can not create City, ' + e);
        }
    }

    async getAll() {
        const { count, rows } = await city.findAndCountAll({});
        console.log("Found City " + count + " records");
        if (count >= 1)
            return rows;
        return [];
    }

    async getOne(id) {
        if (!id)
            throw new Error('Не указан ID');
        const { count, rows } = await city.findAndCountAll({ where: { id: id } });
        if (count != 1) {
            console.log("Can not find City with id=" + id);
            return null;
        }
        return rows[0];
    }

    async update(cityUpdate) {
        const id = cityUpdate.id;
        if (!id)
            throw new Error('Не указан ID');
        const { count, rows } = await city.findAndCountAll({ where: { id: id } });
        if (count != 1) {
            console.log("Can not find City with id=" + id);
            return null;
        }
        else {
            rows[0].set({ 
                name: cityUpdate.name,
                description: cityUpdate.description,
                sightseen: cityUpdate.sightseen,
                location: cityUpdate.location 
            });
            rows[0].save();
            return rows[0];
        }
    }

    async delete(id) {
        if (!id)
            throw new Error('Не указан ID');
        const { count, rows } = await city.findAndCountAll({ where: { id: id } });
        if (count != 1) {
            console.log("Can not delete City with id=" + id);
            return null;
        }
        await rows[0].destroy({ force: true });
        console.log("City with id=" + id + " has been deleted");
        return rows[0];
    }
}

module.exports = new SvcCities()