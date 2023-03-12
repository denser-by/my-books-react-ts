const SvcImages = require('./SvcImages.js');
const SvcBooks = require('./SvcBooks.js');
const SvcAuthors = require('./SvcAuthors.js');
const SvcRoles = require('./SvcRoles.js');
const SvcUsers = require('./SvcUsers.js');
const SvcCities = require('./SvcCities.js');
const SvcAppointments = require('./SvcAppointments.js');

class ServiceData {

    async recreateImage(imgPath, imgType, imgSize, imagesArray) {
        var image = await SvcImages.findOneByPath(imgPath);
        if (!image) {
            image = await SvcImages.create({ path: imgPath, image_type: imgType, file_size: imgSize });
            console.log('after create ' + JSON.stringify(image));
        } else {
            image.set({ path: imgPath, image_type: imgType, file_size: imgSize });
            image.save();
            console.log('after save ' + JSON.stringify(image));
        }
        imagesArray.push(image);
    }

    async recreateRole(roleName, roleDescr) {
        var role = await SvcRoles.findOneByName(roleName);
        if (!role) {
            role = await SvcRoles.create({ name: roleName, description: roleDescr });
            console.log('after create ' + JSON.stringify(role));
        } else {
            role.set({ name: roleName, description: roleDescr });
            role.save();
            console.log('after save ' + JSON.stringify(role));
        }
    }

    async recreateUser(login, email, first_name, last_name, phone, from_city, avatar, favorite_color) {
        var user = await SvcUsers.findOneByLogin(login);
        if (!user) {
            user = await SvcUsers.create({ login: login, email: email, first_name: first_name, last_name: last_name, phone: phone, from_city: from_city, avatar: avatar, favorite_color: favorite_color });
            console.log('after create ' + JSON.stringify(user));
        } else {
            user.set({ login: login, email: email, first_name: first_name, last_name: last_name, phone: phone, from_city: from_city, avatar: avatar, favorite_color: favorite_color });
            user.save();
            console.log('after save ' + JSON.stringify(user));
        }
    }

    async recreateCity(cityName, cityDescr, citySight, cityLocation) {
        var city = await SvcCities.findOneByName(cityName);
        if (!city) {
            city = await SvcCities.create({ name: cityName, description: cityDescr, sightseen: citySight, location: cityLocation });
            console.log('after create ' + JSON.stringify(city));
        } else {
            city.set({ name: cityName, description: cityDescr, sightseen: citySight, location: cityLocation });
            city.save();
            console.log('after save ' + JSON.stringify(city));
        }
    }

    async recreateAppointment(name, description, location, address, date, city, book, map) {
        var appointment = await SvcAppointments.findOneByName(name);
        if (!appointment) {
            appointment = await SvcAppointments.create({ name: name, description: description, location: location, address: address, date: date, city: city, book: book, map: map });
            console.log('after create ' + JSON.stringify(appointment));
        } else {
            appointment.set({ name: name, description: description, location: location, address: address, date: date, city: city, book: book, map: map });
            appointment.save();
            console.log('after save ' + JSON.stringify(appointment));
        }
    }

    async recreateBook(name, info, year, cover_img, access_key) {
        var book = await SvcBooks.findOneByAccessKey(access_key);
        if (!book) {
            book = await SvcBooks.create({ name: name, info: info, year: year, cover_img: cover_img, access_key: access_key });
            console.log('after create ' + JSON.stringify(book));
        } else {
            book.set({ name: name, info: info, year: year, cover_img: cover_img, access_key: access_key });
            book.save();
            console.log('after save ' + JSON.stringify(book));
        }
    }

    async recreateAuthor(name, info, age, photo, access_key) {
        var author = await SvcAuthors.findOneByAccessKey(access_key);
        if (!author) {
            author = await SvcAuthors.create({ name: name, info: info, age: age, photo: photo, access_key: access_key });
            console.log('after create ' + JSON.stringify(author));
        } else {
            author.set({ name: name, info: info, age: age, photo: photo, access_key: access_key });
            author.save();
            console.log('after save ' + JSON.stringify(author));
        }
    }

    async lunchImages(covers20, authors3) {
        console.log('...service check images...');
        await this.recreateImage('C:/Users/dzianis/ReactNative/my-books-react-ts/src/images/1.jpg', 1, 60693, covers20);
        await this.recreateImage('C:/Users/dzianis/ReactNative/my-books-react-ts/src/images/2.jpg', 1, 48418, covers20);
        await this.recreateImage('C:/Users/dzianis/ReactNative/my-books-react-ts/src/images/3.jpg', 1, 47367, covers20);
        await this.recreateImage('C:/Users/dzianis/ReactNative/my-books-react-ts/src/images/4.jpg', 1, 38048, covers20);
        await this.recreateImage('C:/Users/dzianis/ReactNative/my-books-react-ts/src/images/5.jpg', 1, 74898, covers20);
        await this.recreateImage('C:/Users/dzianis/ReactNative/my-books-react-ts/src/images/6.jpg', 1, 26013, covers20);
        await this.recreateImage('C:/Users/dzianis/ReactNative/my-books-react-ts/src/images/7.jpg', 1, 54684, covers20);
        await this.recreateImage('C:/Users/dzianis/ReactNative/my-books-react-ts/src/images/8.jpg', 1, 47105, covers20);
        await this.recreateImage('C:/Users/dzianis/ReactNative/my-books-react-ts/src/images/9.jpg', 1, 57769, covers20);
        await this.recreateImage('C:/Users/dzianis/ReactNative/my-books-react-ts/src/images/10.jpg', 1, 56730, covers20);
        await this.recreateImage('C:/Users/dzianis/ReactNative/my-books-react-ts/src/images/11.jpg', 1, 47855, covers20);
        await this.recreateImage('C:/Users/dzianis/ReactNative/my-books-react-ts/src/images/12.jpg', 1, 46495, covers20);
        await this.recreateImage('C:/Users/dzianis/ReactNative/my-books-react-ts/src/images/13.jpg', 1, 67578, covers20);
        await this.recreateImage('C:/Users/dzianis/ReactNative/my-books-react-ts/src/images/14.jpg', 1, 49308, covers20);
        await this.recreateImage('C:/Users/dzianis/ReactNative/my-books-react-ts/src/images/15.jpg', 1, 60969, covers20);
        await this.recreateImage('C:/Users/dzianis/ReactNative/my-books-react-ts/src/images/16.jpg', 1, 51276, covers20);
        await this.recreateImage('C:/Users/dzianis/ReactNative/my-books-react-ts/src/images/17.jpg', 1, 43301, covers20);
        await this.recreateImage('C:/Users/dzianis/ReactNative/my-books-react-ts/src/images/18.jpg', 1, 44890, covers20);
        await this.recreateImage('C:/Users/dzianis/ReactNative/my-books-react-ts/src/images/19.jpg', 1, 44418, covers20);
        await this.recreateImage('C:/Users/dzianis/ReactNative/my-books-react-ts/src/images/20.jpg', 1, 34993, covers20);
        await this.recreateImage('C:/Users/dzianis/ReactNative/my-books-react-ts/src/images/author1.gif', 2, 20891, authors3);
        await this.recreateImage('C:/Users/dzianis/ReactNative/my-books-react-ts/src/images/author2.gif', 2, 16135, authors3);
        await this.recreateImage('C:/Users/dzianis/ReactNative/my-books-react-ts/src/images/author3.gif', 2, 19966, authors3);
        console.log('...service check images complete...' + (await SvcImages.size()));
    }

    async lunchBooksAuthors(covers20, authors3) {
        console.log('...service check books and authors...');
        await this.recreateBook('Book1', 'Book Description 1', 1999, covers20[0].id, 'book_key_1');
        await this.recreateBook('Book2', 'Book Description 2', 1995, covers20[1].id, 'book_key_2');
        await this.recreateBook('Book3', 'Book Description 3', 2001, covers20[2].id, 'book_key_3');
        await this.recreateBook('Book4', 'Book Description 4', 2003, covers20[3].id, 'book_key_4');
        await this.recreateBook('Book5', 'Book Description 5', 2004, covers20[4].id, 'book_key_5');
        await this.recreateBook('Book6', 'Book Description 6', 2001, covers20[5].id, 'book_key_6');
        await this.recreateBook('Book7', 'Book Description 7', 2010, covers20[6].id, 'book_key_7');
        await this.recreateBook('Book8', 'Book Description 8', 1992, covers20[7].id, 'book_key_8');
        await this.recreateBook('Book9', 'Book Description 9', 1995, covers20[8].id, 'book_key_9');
        await this.recreateBook('Book10', 'Book Description 10', 2011, covers20[9].id, 'book_key_10');
        await this.recreateBook('Book11', 'Book Description 11', 1999, covers20[10].id, 'book_key_11');
        await this.recreateBook('Book12', 'Book Description 12', 1995, covers20[11].id, 'book_key_12');
        await this.recreateBook('Book13', 'Book Description 13', 1998, covers20[12].id, 'book_key_13');
        await this.recreateBook('Book14', 'Book Description 14', 1992, covers20[13].id, 'book_key_14');
        await this.recreateBook('Book15', 'Book Description 15', 2003, covers20[14].id, 'book_key_15');
        await this.recreateBook('Book16', 'Book Description 16', 2001, covers20[15].id, 'book_key_16');
        await this.recreateBook('Book17', 'Book Description 17', 2005, covers20[16].id, 'book_key_17');
        await this.recreateBook('Book18', 'Book Description 18', 2002, covers20[17].id, 'book_key_18');
        await this.recreateBook('Book19', 'Book Description 19', 2007, covers20[18].id, 'book_key_19');
        await this.recreateBook('Book20', 'Book Description 20', 1998, covers20[19].id, 'book_key_20');
        await this.recreateBook('Book21', 'Book Description 21', 1993, covers20[0].id, 'book_key_21');
        await this.recreateBook('Book22', 'Book Description 22', 2013, covers20[1].id, 'book_key_22');
        await this.recreateBook('Book23', 'Book Description 23', 1992, covers20[2].id, 'book_key_23');
        await this.recreateBook('Book24', 'Book Description 24', 1996, covers20[3].id, 'book_key_24');
        await this.recreateBook('Book25', 'Book Description 25', 1998, covers20[4].id, 'book_key_25');
        await this.recreateBook('Book26', 'Book Description 26', 1992, covers20[5].id, 'book_key_26');
        await this.recreateBook('Book27', 'Book Description 27', 2003, covers20[6].id, 'book_key_27');
        await this.recreateBook('Book28', 'Book Description 28', 2001, covers20[7].id, 'book_key_28');
        await this.recreateBook('Book29', 'Book Description 29', 2005, covers20[8].id, 'book_key_29');
        await this.recreateBook('Book30', 'Book Description 30', 2002, covers20[9].id, 'book_key_30');

        await this.recreateAuthor('Author1', 'Author Description 1', 1999, authors3[0].id, 'auth_key_1');
        await this.recreateAuthor('Author2', 'Author Description 2', 2000, authors3[1].id, 'auth_key_2');
        await this.recreateAuthor('Author3', 'Author Description 3', 2001, authors3[2].id, 'auth_key_3');
        await this.recreateAuthor('Author4', 'Author Description 4', 2002, authors3[0].id, 'auth_key_4');
        await this.recreateAuthor('Author5', 'Author Description 5', 2003, authors3[1].id, 'auth_key_5');
        await this.recreateAuthor('Author6', 'Author Description 6', 2004, authors3[2].id, 'auth_key_6');
        await this.recreateAuthor('Author7', 'Author Description 7', 2005, authors3[0].id, 'auth_key_7');
        await this.recreateAuthor('Author8', 'Author Description 8', 2006, authors3[1].id, 'auth_key_8');
        await this.recreateAuthor('Author9', 'Author Description 9', 2007, authors3[2].id, 'auth_key_9');
        await this.recreateAuthor('Author10', 'Author Description 10', 2005, authors3[0].id, 'auth_key_10');
        await this.recreateAuthor('Author11', 'Author Description 11', 2006, authors3[1].id, 'auth_key_11');
        await this.recreateAuthor('Author12', 'Author Description 12', 2007, authors3[2].id, 'auth_key_12');
        await this.recreateAuthor('Author13', 'Author Description 13', 2001, authors3[0].id, 'auth_key_13');
        await this.recreateAuthor('Author14', 'Author Description 14', 2002, authors3[1].id, 'auth_key_14');
        await this.recreateAuthor('Author15', 'Author Description 15', 2003, authors3[2].id, 'auth_key_15');
        await this.recreateAuthor('Author16', 'Author Description 16', 2004, authors3[0].id, 'auth_key_16');
        await this.recreateAuthor('Author17', 'Author Description 17', 2005, authors3[1].id, 'auth_key_17');
        await this.recreateAuthor('Author18', 'Author Description 18', 2006, authors3[2].id, 'auth_key_18');
        await this.recreateAuthor('Author19', 'Author Description 19', 2007, authors3[0].id, 'auth_key_19');
        await this.recreateAuthor('Author20', 'Author Description 20', 2004, authors3[1].id, 'auth_key_20');
        await this.recreateAuthor('Author21', 'Author Description 21', 1999, authors3[2].id, 'auth_key_21');
        await this.recreateAuthor('Author22', 'Author Description 22', 2000, authors3[0].id, 'auth_key_22');
        await this.recreateAuthor('Author23', 'Author Description 23', 2001, authors3[1].id, 'auth_key_23');
        await this.recreateAuthor('Author24', 'Author Description 24', 2002, authors3[2].id, 'auth_key_24');
        await this.recreateAuthor('Author25', 'Author Description 25', 2003, authors3[0].id, 'auth_key_25');
        await this.recreateAuthor('Author26', 'Author Description 26', 2004, authors3[1].id, 'auth_key_26');
        await this.recreateAuthor('Author27', 'Author Description 27', 2005, authors3[2].id, 'auth_key_27');
        await this.recreateAuthor('Author28', 'Author Description 28', 2006, authors3[0].id, 'auth_key_28');
        await this.recreateAuthor('Author29', 'Author Description 29', 2007, authors3[1].id, 'auth_key_29');
        await this.recreateAuthor('Author30', 'Author Description 30', 2003, authors3[2].id, 'auth_key_30');

        await this.recreateBook('Book31', 'Book Description 31', 2007, covers20[10].id, 'book_key_31');
        await this.recreateBook('Book32', 'Book Description 32', 1998, covers20[11].id, 'book_key_32');
        await this.recreateBook('Book33', 'Book Description 33', 1993, covers20[12].id, 'book_key_33');
        await this.recreateBook('Book34', 'Book Description 34', 2013, covers20[13].id, 'book_key_34');
        await this.recreateBook('Book35', 'Book Description 35', 1992, covers20[14].id, 'book_key_35');
        await this.recreateBook('Book36', 'Book Description 36', 1996, covers20[15].id, 'book_key_36');
        await this.recreateBook('Book37', 'Book Description 37', 1996, covers20[16].id, 'book_key_37');
        await this.recreateBook('Book38', 'Book Description 38', 1997, covers20[17].id, 'book_key_38');
        await this.recreateBook('Book39', 'Book Description 39', 2003, covers20[18].id, 'book_key_39');
        await this.recreateBook('Book40', 'Book Description 40', 2001, covers20[19].id, 'book_key_40');
        await this.recreateBook('Book41', 'Book Description 41', 2003, covers20[5].id, 'book_key_41');

        await this.recreateAuthor('Author31', 'Author Description 31', 2007, authors3[2].id, 'auth_key_31');
        console.log('...service check books and authors complete...books=' + (await SvcBooks.size()) + '-authors=' + (await SvcAuthors.size()));
    }

    async lunchRoles() {
        console.log('...service check roles...');
        await this.recreateRole('Admin', 'Admin role');
        await this.recreateRole('Internet', 'User on the internet');
        await this.recreateRole('Role_1', 'Role-Description-1');
        await this.recreateRole('Role_2', 'Role-Description-2');
        await this.recreateRole('Role_3', 'Role-Description-3');
        console.log('...service check roles complete...' + (await SvcRoles.size()));
    }

    async lunchUsers() {
        console.log('...service check users...');
        await this.recreateUser('user1', 'user1@company.com', 'Name_1', 'Surname_1', '224-5234-555', 1, 123, 'pink');
        await this.recreateUser('user2', 'user2@company.com', 'Name_2', 'Surname_2', '224-5234-666', 1, 123, 'brown');
        await this.recreateUser('user3', 'user3@company.com', 'Name_3', 'Surname_3', '224-5234-777', 1, 123, 'coldwhite');
        console.log('...service check users complete...' + (await SvcUsers.size()));
    }

    async lunchCities() {
        console.log('...service check cities...');
        await this.recreateCity('City1', 'Beautiful and located at ...', 321, '(121.21, 32.232)');
        await this.recreateCity('City2', 'Ancient districts of this ...', 322, '(11.21, 132.232)');
        await this.recreateCity('City3', 'Situated near great mountain ...', 323, '(41.21, 72.232)');
        await this.recreateCity('Town4', 'Like those lovely places ...', 324, '(141.21, 172.232)');
        console.log('...service check cities complete...' + (await SvcCities.size()));
    }

    async lunchAppointments() {
        console.log('...service check appointments...');
        await this.recreateAppointment('Appointment_1', 'info_additional_1', '(121.1121, 143.3242)', 'Address-line-1', '2002-03-02', 1, 1, 1000);
        await this.recreateAppointment('Appointment_2', 'info_additional_2', '(111.121, 113.3242)', 'Address-line-2', '2001-03-02', 2, 2, 1001);
        console.log('...service check appointments complete...' + (await SvcAppointments.size()));
    }

    async lunchStart() {
        var covers20 = [];
        var authors3 = [];
        console.log('...service check start...');
        await this.lunchImages(covers20, authors3);
        await this.lunchBooksAuthors(covers20, authors3)
        await this.lunchRoles();
        await this.lunchUsers();
        await this.lunchCities();
        await this.lunchAppointments();
        console.log('...service check finish...');
    }
}

// let sd = new ServiceData();
// sd.lunchStart();

module.exports = new ServiceData()