import { Injectable } from "@nestjs/common";
import { AppointmentService } from "../appointment/appointment.service";
import { CreateAppointmentDto } from "../appointment/dto/CreateAppointmentDto";
import { AuthorService } from "../author/author.service";
import { CreateAuthorDto } from "../author/dto/CreateAuthorDto";
import { AuthorbookService } from "../authorbook/authorbook.service";
import { CreateAuthorBookDto } from "../authorbook/dto/CreateAuthorBookDto";
import { BookService } from "../book/book.service";
import { CreateBookDto } from "../book/dto/CreateBookDto";
import { CityService } from "../city/city.service";
import { CreateCityDto } from "../city/dto/CreateCityDto";
import { CreateImageDto } from "../image/dto/CreateImageDto";
import { ImageService } from "../image/image.service";
import { CreateRoleDto } from "../role/dto/CreateRoleDto";
import { RoleService } from "../role/role.service";
import { CreateUserDto } from "../user/dto/CreateUserDto";
import { UserService } from "../user/user.service";

@Injectable()
export class ServiceData {

    constructor(
        private readonly svcAuthor: AuthorService,
        private readonly svcBook: BookService,
        private readonly svcAuthorBook: AuthorbookService,
        private readonly svcImage: ImageService,
        private readonly svcAppointment: AppointmentService,
        private readonly svcCity: CityService,
        private readonly svcRole: RoleService,
        private readonly svcUser: UserService
    ) { }

    async recreateImage(path, image_type, file_size, imagesArray) {
        var image = await this.svcImage.findOneByPath(path);
        if (!image) {
            let dto = new CreateImageDto();
            dto.path = path;
            dto.image_type = image_type;
            dto.file_size = file_size;
            image = await this.svcImage.create(dto);
            console.log('after create ' + JSON.stringify(image));
        } else {
            image.set({ path: path, image_type: image_type, file_size: file_size });
            image.save();
            console.log('after save ' + JSON.stringify(image));
        }
        imagesArray.push(image);
    }

    async recreateRole(name, description) {
        var role = await this.svcRole.findOneByName(name);
        if (!role) {
            let dto = new CreateRoleDto();
            dto.name = name;
            dto.description = description;
            role = await this.svcRole.create(dto);
            console.log('after create ' + JSON.stringify(role));
        } else {
            role.set({ name: name, description: description });
            role.save();
            console.log('after save ' + JSON.stringify(role));
        }
    }

    async recreateUser(login, email, first_name, last_name, phone, from_city, avatar, favorite_color) {
        return await this.recreateUser2(login, email, first_name, last_name, phone, from_city, avatar, favorite_color, false);
    }

    async recreateUser2(login, email, first_name, last_name, phone, from_city, avatar, favorite_color, deleted) {
        var user = await this.svcUser.findOneByLogin(login);
        if (!user) {
            let dto = new CreateUserDto();
            dto.first_name = first_name;
            dto.last_name = last_name;
            dto.email = email;
            dto.phone = phone;
            dto.login = login;
            dto.hash_password = 'hash_password';
            dto.favorite_color = favorite_color;
            dto.avatar = avatar;
            dto.deleted = deleted;
            dto.from_city = from_city;
            user = await this.svcUser.create(dto);
            console.log('after create ' + JSON.stringify(user));
        } else {
            user.set({ login: login, email: email, first_name: first_name, last_name: last_name, phone: phone, from_city: from_city, avatar: avatar, favorite_color: favorite_color, deleted: deleted });
            user.save();
            console.log('after save ' + JSON.stringify(user));
        }
    }

    async recreateCity(name, description, sightseen, location) {
        var city = await this.svcCity.findOneByName(name);
        if (!city) {
            let dto = new CreateCityDto();
            dto.name = name;
            dto.description = description;
            dto.sightseen = sightseen;
            dto.location = location;
            city = await this.svcCity.create(dto);
            console.log('after create ' + JSON.stringify(city));
        } else {
            city.set({ name: name, description: description, sightseen: sightseen, location: location });
            city.save();
            console.log('after save ' + JSON.stringify(city));
        }
    }

    async recreateAppointment(name, description, location, address, date, city, book, map) {
        var appointment = await this.svcAppointment.findOneByName(name);
        if (!appointment) {
            let dto = new CreateAppointmentDto();
            dto.name = name;
            dto.description = description;
            dto.location = location;
            dto.address = address;
            dto.date = date;
            dto.city = city;
            dto.book = book;
            dto.map = map;
            appointment = await this.svcAppointment.create(dto);
            console.log('after create ' + JSON.stringify(appointment));
        } else {
            appointment.set({ name: name, description: description, location: location, address: address, date: date, city: city, book: book, map: map });
            appointment.save();
            console.log('after save ' + JSON.stringify(appointment));
        }
    }

    async recreateBook(name, info, year, cover_img_path, access_key) {
        var book = await this.svcBook.findOneByAccessKey(access_key);
        if (!book) {
            let dto = new CreateBookDto();
            dto.name = name;
            dto.info = info;
            dto.year = year;
            dto.cover_img_path = cover_img_path;
            dto.access_key = access_key;
            book = await this.svcBook.create(dto);
            console.log('after create ' + JSON.stringify(book));
        } else {
            book.set({ name: name, info: info, year: year, cover_img_path: cover_img_path, access_key: access_key });
            book.save();
            console.log('after save ' + JSON.stringify(book));
        }
    }

    async recreateAuthor(name, info, age, photo_path, access_key) {
        var author = await this.svcAuthor.findOneByAccessKey(access_key);
        if (!author) {
            let dto = new CreateAuthorDto();
            dto.name = name;
            dto.info = info;
            if (age != null) {
                dto.age = new Date('' + age + '-01-01');
                dto.age.setFullYear(age);
            } else
                dto.age = null;
            dto.photo_path = photo_path;
            dto.access_key = access_key;
            author = await this.svcAuthor.create(dto);
            console.log('after create ' + JSON.stringify(author));
        } else {
            author.set({ name: name, info: info, age: age, photo_path: photo_path, access_key: access_key });
            author.save();
            console.log('after save ' + JSON.stringify(author));
        }
    }

    async recreateBookAuthor(book_access_key, author_access_key) {
        console.log(' book=' + book_access_key + ' author=' + author_access_key);
        var book = await this.svcBook.findOneByAccessKey(book_access_key);
        console.log(' book=' + JSON.stringify(book));
        var author = await this.svcAuthor.findOneByAccessKey(author_access_key);
        console.log(' author=' + JSON.stringify(author));
        if (book != null && author != null) {
            let has = await this.svcAuthorBook.hasOne(author.id, book.id);
            console.log(' HAS=' + has);
            if (!has) {
                let dto = new CreateAuthorBookDto();
                dto.book = book.id;
                dto.author = author.id;
                let bookauthor = await this.svcAuthorBook.create(dto);
                console.log('after create ' + JSON.stringify(bookauthor));
            } else {
                let bookauthor = await this.svcAuthorBook.getOne(author.id, book.id);
                console.log('after load ' + JSON.stringify(bookauthor));
            }
        }
        else
            console.log(' WRONG book' + JSON.stringify(book) + ' or author' + JSON.stringify(author));
    }

    async lunchImages(covers20, authors3) {
        console.log('...service check images...');
        await this.recreateImage('../../images/1.jpg', 1, 60693, covers20);
        await this.recreateImage('../../images/2.jpg', 1, 48418, covers20);
        await this.recreateImage('../../images/3.jpg', 1, 47367, covers20);
        await this.recreateImage('../../images/4.jpg', 1, 38048, covers20);
        await this.recreateImage('../../images/5.jpg', 1, 74898, covers20);
        await this.recreateImage('../../images/6.jpg', 1, 26013, covers20);
        await this.recreateImage('../../images/7.jpg', 1, 54684, covers20);
        await this.recreateImage('../../images/8.jpg', 1, 47105, covers20);
        await this.recreateImage('../../images/9.jpg', 1, 57769, covers20);
        await this.recreateImage('../../images/10.jpg', 1, 56730, covers20);
        await this.recreateImage('../../images/11.jpg', 1, 47855, covers20);
        await this.recreateImage('../../images/12.jpg', 1, 46495, covers20);
        await this.recreateImage('../../images/13.jpg', 1, 67578, covers20);
        await this.recreateImage('../../images/14.jpg', 1, 49308, covers20);
        await this.recreateImage('../../images/15.jpg', 1, 60969, covers20);
        await this.recreateImage('../../images/16.jpg', 1, 51276, covers20);
        await this.recreateImage('../../images/17.jpg', 1, 43301, covers20);
        await this.recreateImage('../../images/18.jpg', 1, 44890, covers20);
        await this.recreateImage('../../images/19.jpg', 1, 44418, covers20);
        await this.recreateImage('../../images/20.jpg', 1, 34993, covers20);
        await this.recreateImage('../../images/author1.gif', 2, 20891, authors3);
        await this.recreateImage('../../images/author2.gif', 2, 16135, authors3);
        await this.recreateImage('../../images/author3.gif', 2, 19966, authors3);
        console.log('...service check images complete...' + (await this.svcImage.size()));
    }

    async lunchBookAuthorRelations() {
        console.log('...service check relations of books and authors...');
        const BOOK_NUM = 41;
        const AUTHOR_NUM = 31;
        let bookAccessKeys = [];
        for (let i = 1; i <= BOOK_NUM; i++)
            bookAccessKeys.push('book_key_' + i);
        let authorAccessKeys = [];
        for (let j = 1; j <= AUTHOR_NUM; j++)
            authorAccessKeys.push('auth_key_' + j);
        let authIdx = 0 - 1;
        for (let k = 0; k < bookAccessKeys.length; k++) {
            let curBookKey = bookAccessKeys[k];
            let authNum1234 = ((k + authorAccessKeys.length) % 4) + 1;
            for (let m = 0; m < authNum1234; m++) {
                authIdx += 1;
                if (authIdx >= authorAccessKeys.length)
                    authIdx = 0;
                let curAuthorKey = authorAccessKeys[authIdx];
                if ('auth_key_15' == curAuthorKey && curBookKey !== 'book_key_6')
                    continue;
                if (('auth_key_16' == curAuthorKey || 'auth_key_17' == curAuthorKey) && curBookKey !== 'book_key_7')
                    continue;
                await this.recreateBookAuthor(curBookKey, curAuthorKey);
            }
        }
        console.log('...service check relations of books and authors complete...authorbookRelations=' + (await this.svcAuthorBook.size()));
    }

    async lunchBooksAuthors(covers20, authors3) {
        console.log('...service check books and authors...');
        await this.recreateBook('Book1', 'Book Description 1', 1999, covers20[0].path, 'book_key_1');
        await this.recreateBook('Book2', 'Book Description 2', 1995, covers20[1].path, 'book_key_2');
        await this.recreateBook('Book3', 'Book Description 3', 2001, covers20[2].path, 'book_key_3');
        await this.recreateBook('Book4', 'Book Description 4', 2003, covers20[3].path, 'book_key_4');
        await this.recreateBook('Book5', 'Book Description 5', 2004, covers20[4].path, 'book_key_5');
        await this.recreateBook('Современная радиоэлектроника: научные исследования, подготовка кадров', 'Международная научно-практическая конференция\n\nВ сборнике представлены научные статьи по докладам Международной научно-практической конференции \"Современная радиоэлектроника: научные исследования и подготовка кадров\", в которых рассмотрены следующие вопросы...', 2006, covers20[5].path, 'book_key_6');
        await this.recreateBook('Visual C++ и MFC', '2 издание\r\nМАСТЕР\r\n\r\nКнига посвящена объектно-ориентированному программированию для...', 2000, covers20[6].path, 'book_key_7');
        await this.recreateBook('Book8', 'Book Description 8', 1992, covers20[7].path, 'book_key_8');
        await this.recreateBook('Book9', 'Book Description 9', 1995, covers20[8].path, 'book_key_9');
        await this.recreateBook('Book10', 'Book Description 10', 2011, covers20[9].path, 'book_key_10');
        await this.recreateBook('Book11', 'Book Description 11', 1999, covers20[10].path, 'book_key_11');
        await this.recreateBook('Book12', 'Book Description 12', 1995, covers20[11].path, 'book_key_12');
        await this.recreateBook('Book13', 'Book Description 13', 1998, covers20[12].path, 'book_key_13');
        await this.recreateBook('Book14', 'Book Description 14', 1992, covers20[13].path, 'book_key_14');
        await this.recreateBook('Book15', 'Book Description 15', 2003, covers20[14].path, 'book_key_15');
        await this.recreateBook('Book16', 'Book Description 16', 2001, covers20[15].path, 'book_key_16');
        await this.recreateBook('Book17', 'Book Description 17', 2005, covers20[16].path, 'book_key_17');
        await this.recreateBook('Book18', 'Book Description 18', 2002, covers20[17].path, 'book_key_18');
        await this.recreateBook('Book19', 'Book Description 19', 2007, covers20[18].path, 'book_key_19');
        await this.recreateBook('Book20', 'Book Description 20', 1998, covers20[19].path, 'book_key_20');
        await this.recreateBook('Book21', 'Book Description 21', 1993, covers20[0].path, 'book_key_21');
        await this.recreateBook('Book22', 'Book Description 22', 2013, covers20[1].path, 'book_key_22');
        await this.recreateBook('Book23', 'Book Description 23', 1992, covers20[2].path, 'book_key_23');
        await this.recreateBook('Book24', 'Book Description 24', 1996, covers20[3].path, 'book_key_24');
        await this.recreateBook('Book25', 'Book Description 25', 1998, covers20[4].path, 'book_key_25');
        await this.recreateBook('Book26', 'Book Description 26', 1992, covers20[5].path, 'book_key_26');
        await this.recreateBook('Book27', 'Book Description 27', 2003, covers20[6].path, 'book_key_27');
        await this.recreateBook('Book28', 'Book Description 28', 2001, covers20[7].path, 'book_key_28');
        await this.recreateBook('Book29', 'Book Description 29', 2005, covers20[8].path, 'book_key_29');
        await this.recreateBook('Book30', 'Book Description 30', 2002, covers20[9].path, 'book_key_30');

        await this.recreateAuthor('Author1', 'Author Description 1', 1999, authors3[0].path, 'auth_key_1');
        await this.recreateAuthor('Author2', 'Author Description 2', 2000, authors3[1].path, 'auth_key_2');
        await this.recreateAuthor('Author3', 'Author Description 3', 2001, authors3[2].path, 'auth_key_3');
        await this.recreateAuthor('Author4', 'Author Description 4', 2002, authors3[0].path, 'auth_key_4');
        await this.recreateAuthor('Author5', 'Author Description 5', 2003, authors3[1].path, 'auth_key_5');
        await this.recreateAuthor('Author6', 'Author Description 6', 2004, authors3[2].path, 'auth_key_6');
        await this.recreateAuthor('Author7', 'Author Description 7', 2005, authors3[0].path, 'auth_key_7');
        await this.recreateAuthor('Author8', 'Author Description 8', 2006, authors3[1].path, 'auth_key_8');
        await this.recreateAuthor('Author9', 'Author Description 9', 2007, authors3[2].path, 'auth_key_9');
        await this.recreateAuthor('Author10', 'Author Description 10', 2005, authors3[0].path, 'auth_key_10');
        await this.recreateAuthor('Author11', 'Author Description 11', 2006, authors3[1].path, 'auth_key_11');
        await this.recreateAuthor('Author12', 'Author Description 12', 2007, authors3[2].path, 'auth_key_12');
        await this.recreateAuthor('Author13', 'Author Description 13', 2001, authors3[0].path, 'auth_key_13');
        await this.recreateAuthor('Author14', 'Author Description 14', 2002, authors3[1].path, 'auth_key_14');
        await this.recreateAuthor('Н. А. Цырельчук', 'Кандидат технических наук, профессор', null, null, 'auth_key_15');
        await this.recreateAuthor('А. Мешков', '', null, null, 'auth_key_16');
        await this.recreateAuthor('Ю. Тихомиров', '', null, null, 'auth_key_17');
        await this.recreateAuthor('Author18', 'Author Description 18', 2006, authors3[2].path, 'auth_key_18');
        await this.recreateAuthor('Author19', 'Author Description 19', 2007, authors3[0].path, 'auth_key_19');
        await this.recreateAuthor('Author20', 'Author Description 20', 2004, authors3[1].path, 'auth_key_20');
        await this.recreateAuthor('Author21', 'Author Description 21', 1999, authors3[2].path, 'auth_key_21');
        await this.recreateAuthor('Author22', 'Author Description 22', 2000, authors3[0].path, 'auth_key_22');
        await this.recreateAuthor('Author23', 'Author Description 23', 2001, authors3[1].path, 'auth_key_23');
        await this.recreateAuthor('Author24', 'Author Description 24', 2002, authors3[2].path, 'auth_key_24');
        await this.recreateAuthor('Author25', 'Author Description 25', 2003, authors3[0].path, 'auth_key_25');
        await this.recreateAuthor('Author26', 'Author Description 26', 2004, authors3[1].path, 'auth_key_26');
        await this.recreateAuthor('Author27', 'Author Description 27', 2005, authors3[2].path, 'auth_key_27');
        await this.recreateAuthor('Author28', 'Author Description 28', 2006, authors3[0].path, 'auth_key_28');
        await this.recreateAuthor('Author29', 'Author Description 29', 2007, authors3[1].path, 'auth_key_29');
        await this.recreateAuthor('Author30', 'Author Description 30', 2003, authors3[2].path, 'auth_key_30');

        await this.recreateBook('Book31', 'Book Description 31', 2007, covers20[10].path, 'book_key_31');
        await this.recreateBook('Book32', 'Book Description 32', 1998, covers20[11].path, 'book_key_32');
        await this.recreateBook('Book33', 'Book Description 33', 1993, covers20[12].path, 'book_key_33');
        await this.recreateBook('Book34', 'Book Description 34', 2013, covers20[13].path, 'book_key_34');
        await this.recreateBook('Book35', 'Book Description 35', 1992, covers20[14].path, 'book_key_35');
        await this.recreateBook('Book36', 'Book Description 36', 1996, covers20[15].path, 'book_key_36');
        await this.recreateBook('Book37', 'Book Description 37', 1996, covers20[16].path, 'book_key_37');
        await this.recreateBook('Book38', 'Book Description 38', 1997, covers20[17].path, 'book_key_38');
        await this.recreateBook('Book39', 'Book Description 39', 2003, covers20[18].path, 'book_key_39');
        await this.recreateBook('Book40', 'Book Description 40', 2001, covers20[19].path, 'book_key_40');
        await this.recreateBook('Book41', 'Book Description 41', 2003, covers20[5].path, 'book_key_41');

        await this.recreateAuthor('Author31', 'Author Description 31', 2007, authors3[2].path, 'auth_key_31');
        console.log('...service check books and authors complete...books=' + (await this.svcBook.size()) + '-authors=' + (await this.svcAuthor.size()));
    }

    async lunchRoles() {
        console.log('...service check roles...');
        await this.recreateRole('Admin', 'Admin role');
        await this.recreateRole('Internet', 'User on the internet');
        await this.recreateRole('Role_1', 'Role-Description-1');
        await this.recreateRole('Role_2', 'Role-Description-2');
        await this.recreateRole('Role_3', 'Role-Description-3');
        console.log('...service check roles complete...' + (await this.svcRole.size()));
    }

    async lunchUsers() {
        console.log('...service check users...');
        await this.recreateUser('user1', 'user1@company.com', 'Name_1', 'Surname_1', '224-5234-555', 1, 123, 'pink');
        await this.recreateUser('user2', 'user2@company.com', 'Name_2', 'Surname_2', '224-5234-666', 1, 123, 'brown');
        await this.recreateUser('user3', 'user3@company.com', 'Name_3', 'Surname_3', '224-5234-777', 1, 123, 'coldwhite');
        await this.recreateUser2('user4', 'user4@company4.com', 'Name_4', 'Surname_4', '224-5343-777', 1, 123, 'orange', true);
        console.log('...service check users complete...' + (await this.svcUser.size()));
    }

    async lunchCities() {
        console.log('...service check cities...');
        await this.recreateCity('City1', 'Beautiful and located at ...', 321, '(121.21, 32.232)');
        await this.recreateCity('City2', 'Ancient districts of this ...', 322, '(11.21, 132.232)');
        await this.recreateCity('City3', 'Situated near great mountain ...', 323, '(41.21, 72.232)');
        await this.recreateCity('Town4', 'Like those lovely places ...', 324, '(141.21, 172.232)');
        console.log('...service check cities complete...' + (await this.svcCity.size()));
    }

    async lunchAppointments() {
        console.log('...service check appointments...');
        await this.recreateAppointment('Appointment_1', 'info_additional_1', '(121.1121, 143.3242)', 'Address-line-1', '2002-03-02', 1, 1, 1000);
        await this.recreateAppointment('Appointment_2', 'info_additional_2', '(111.121, 113.3242)', 'Address-line-2', '2001-03-02', 2, 2, 1001);
        console.log('...service check appointments complete...' + (await this.svcAppointment.size()));
    }

    async lunchStart() {
        var covers20 = [];
        var authors3 = [];
        console.log('...service check start...');
        await this.lunchImages(covers20, authors3);
        await this.lunchBooksAuthors(covers20, authors3)
        await this.lunchBookAuthorRelations();
        await this.lunchRoles();
        await this.lunchUsers();
        await this.lunchCities();
        await this.lunchAppointments();
        console.log('...service check finish...');
    }
}

function basePoint() {
    let ims = new ImageService();
    let auboos = new AuthorbookService();
    let aus = new AuthorService(ims, auboos);
    let sd = new ServiceData(
        aus,
        new BookService(ims, auboos, aus),
        auboos,
        ims,
        new AppointmentService(ims),
        new CityService(ims),
        new RoleService(),
        new UserService(ims)
    );
    sd.lunchStart();
}

// basePoint();