const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

class Author extends Model { }
Author.init({
    id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    info: DataTypes.STRING,
    book_id: DataTypes.INTEGER,
    age: DataTypes.INTEGER,
    photo: DataTypes.STRING,
    creator_id: DataTypes.INTEGER,
    modified: DataTypes.DATE
}, { sequelize, modelName: 'author' });

(async () => {
    await sequelize.sync();
    const author1 = await Author.create({
        id: 1,
        name: "Author_1",
        info: "Biography_1",
        book_id: 1,
        age: 2002,
        photo: MyImage1,
        creator_id: 1,
        modified: new Date(2002, 3, 2)
    });
    console.log(author1.toJSON());
})();