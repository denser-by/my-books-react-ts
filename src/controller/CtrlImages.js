const SvcImages = require('../service/SvcImages.js');

class CtrlImages {
    async create(req, res) {
        try {
            const createdImage = await SvcImages.create(req.body);
            res.json(createdImage);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async getAll(req, res) {
        try {
            const images = await SvcImages.getAll();
            return res.json(images);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async getOne(req, res) {
        try {
            const image = await SvcImages.getOne(req.params.id);
            return res.json(image);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async update(req, res) {
        try {
            const updatedImage = await SvcImages.update(req.body);
            return res.json(updatedImage);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async delete(req, res) {
        try {
            const deletedImage = await SvcImages.delete(req.params.id);
            return res.json(deletedImage);
        } catch (e) {
            res.status(500).json(e);
        }
    }
}

module.exports = new CtrlImages()