const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

class User extends Model { }
User.init({
    id: DataTypes.INTEGER,
    username: DataTypes.STRING,
    birthday: DataTypes.DATE
}, { sequelize, modelName: 'user' });

(async () => {
    await sequelize.sync();
    const user1 = await User.create({
        id: 1,
        username: 'denser',
        birthday: new Date(1982, 4, 11)
    });
    console.log(user1.toJSON());
})();