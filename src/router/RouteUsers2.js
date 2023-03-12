// const express = require('express');
// const user = require('../../models/index').User;
// const routerUser = express.Router();
// const bodyParser = require('body-parser');
// const jsonParser = bodyParser.json();

// routerUser.post('/users', jsonParser, async (req, res) => {
//     try {
//         const { username, password, email } = req.body;
//         const userItem = await user.create({ username, password, email });
//         res.json(userItem);
//     } catch (e) {
//         res.status(500).json(e);
//     }
// });

// routerUser.get('/users', (req, res) => {
//     user.findAll().then(fetchedDataItems => {
//         res.json(fetchedDataItems);
//     });
// });

// routerUser.get('/users/:id', async (req, res) => {
//     let userId = req.params.id;
//     if (!userId)
//         throw new Error('ID not specified');
//     const { count, rows } = await user.findAndCountAll({ where: { id: userId } });
//     if (count != 1)
//         res.json("Can not find User with id=" + userId);
//     else
//         res.json(rows[0]);
// });

// routerUser.put('/users', jsonParser, async (req, res) => {
//     const { id, username, password, email } = req.body;
//     if (!id)
//         throw new Error('ID not specified');
//     const { count, rows } = await user.findAndCountAll({ where: { id: id } });
//     if (count != 1)
//         res.json("Can not find User with id=" + id);
//     else {
//         rows[0].set({ username: username, password: password, email: email });
//         rows[0].save();
//         res.json(rows[0]);
//     }
// });

// routerUser.delete('/users/:id', async (req, res) => {
//     let userId = req.params.id;
//     if (!userId)
//         throw new Error('ID not specified');
//     const { count, rows } = await user.findAndCountAll({ where: { id: userId } });
//     if (count != 1)
//         res.json("Can not delete User with id=" + userId);
//     else {
//         await rows[0].destroy({ force: true });
//         res.json("User with id=" + userId + " has been deleted");
//     }
// });

// module.exports = routerUser