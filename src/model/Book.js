import MyImage1 from './../components/main/MainPage';
import MyImage2 from './../components/main/MainPage';

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
        cover_img: BookImage1,
        creator_id: 1,
        modified: new Date(2002, 3, 2)
    });
    console.log(book1.toJSON());
    const book2 = await Book.create({
        id: 2,
        name: "Book_2",
        info: "Description_2",
        year: 2003,
        cover_img: BookImage2,
        creator_id: 2,
        modified: new Date(2003, 3, 2)
    });
    console.log(book2.toJSON());
})();

export default Book;