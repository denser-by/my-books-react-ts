const image = require('../../models/index.js').Image;

class SvcImages {
    async create(imageCreate) {
        try {
            const imageItem = await image.create({ 
                path: imageCreate.path,
                mini_copy: imageCreate.mini_copy,
                image_type: imageCreate.image_type,
                file_size: imageCreate.file_size
            });
            return imageItem;
        } catch (e) {
            throw new Error('Can not create Image, ' + e);
        }
    }

    async getAll() {
        const { count, rows } = await image.findAndCountAll({});
        console.log("Found Image " + count + " records");
        if (count >= 1)
            return rows;
        return [];
    }

    async getOne(id) {
        if (!id)
            throw new Error('Не указан ID');
        const { count, rows } = await image.findAndCountAll({ where: { id: id } });
        if (count != 1) {
            console.log("Can not find Image with id=" + id);
            return null;
        }
        return rows[0];
    }

    async update(imageUpdate) {
        const id = imageUpdate.id;
        if (!id)
            throw new Error('Не указан ID');
        const { count, rows } = await image.findAndCountAll({ where: { id: id } });
        if (count != 1) {
            console.log("Can not find Image with id=" + id);
            return null;
        }
        else {
            rows[0].set({ 
                path: imageUpdate.path,
                mini_copy: imageUpdate.mini_copy,
                image_type: imageUpdate.image_type,
                file_size: imageUpdate.file_size
            });
            rows[0].save();
            return rows[0];
        }
    }

    async delete(id) {
        if (!id)
            throw new Error('Не указан ID');
        const { count, rows } = await image.findAndCountAll({ where: { id: id } });
        if (count != 1) {
            console.log("Can not delete Image with id=" + id);
            return null;
        }
        await rows[0].destroy({ force: true });
        console.log("Image with id=" + id + " has been deleted");
        return rows[0];
    }
}

module.exports = new SvcImages()