import MyImage1 from './../components/main/MainPage';

const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

class Book extends Model { }
Book.init({
    id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    info: DataTypes.STRING,
    year: DataTypes.INTEGER,
    cover_img: DataTypes.STRING,
    creator_id: DataTypes.INTEGER,
    modified: DataTypes.DATE
}, { sequelize, modelName: 'book' });

(async () => {
    await sequelize.sync();
    const book1 = await Book.create({
        id: 1,
        name: "Book_1",
        info: "Description_1",
        year: 2002,
        cover_img: MyImage1,
        creator_id: 1,
        modified: new Date(2002, 3, 2)
    });
    console.log(book1.toJSON());
})();