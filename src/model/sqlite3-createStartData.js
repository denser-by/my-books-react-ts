const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db.sqlite3');

db.serialize(() => {

    let createTableImages = !true;
    let createTableBooks = !true;
    let createTableAuthors = !true;
    let createTableAuthorBook = !true;

    let fillAllTablesIn = true==false;
    let fillTableImages = !true;
    let fillTableBooks = !true;
    let fillTableAuthors = !true;
    let fillTableAuthorBook = !true;

    let selectTableImages = true;
    let selectTableBooks = true;
    let selectTableAuthors = true;
    let selectTableAuthorBook = true;

    let deleteAllTableEntries = false;

    if(createTableImages)
        db.run(
            `CREATE TABLE images (
            id integer PRIMARY KEY,
            path VARCHAR(512) NOT NULL,
            image_type integer NOT NULL,
            file_size integer
            )`
        );

    if(createTableBooks)
        db.run(
            `CREATE TABLE books (
            id integer PRIMARY KEY,
            name VARCHAR(120) UNIQUE NOT NULL,
            info text,
            year integer CONSTRAINT positive_year CHECK (year > 0),
            cover_img integer REFERENCES images (id)
            )`
        );
          

    if(createTableAuthors)
        db.run(
            `CREATE TABLE authors (
            id integer PRIMARY KEY,
            name VARCHAR(60) NOT NULL,
            info text,
            age integer,
            photo integer REFERENCES images (id)
            )`
        );
                  

    if(createTableAuthorBook)
        db.run(
            `CREATE TABLE author_book (
            id integer PRIMARY KEY,
            book integer REFERENCES books (id) NOT NULL,
            author integer REFERENCES authors (id) NOT NULL
            )`
        );
          

    if(fillTableImages || fillAllTablesIn) {
        const stmt = db.prepare("INSERT INTO images (id, path, image_type) VALUES (?, ?, ?)");
        stmt.run(1001, 'C:/Users/dzianis/ReactNative/my-books-react-ts/src/images/1.jpg', 1);
        stmt.run(1002, 'C:/Users/dzianis/ReactNative/my-books-react-ts/src/images/2.jpg', 1);
        stmt.run(1003, 'C:/Users/dzianis/ReactNative/my-books-react-ts/src/images/3.jpg', 1);
        stmt.run(1004, 'C:/Users/dzianis/ReactNative/my-books-react-ts/src/images/4.jpg', 1);
        stmt.run(1005, 'C:/Users/dzianis/ReactNative/my-books-react-ts/src/images/5.jpg', 1);
        stmt.run(1006, 'C:/Users/dzianis/ReactNative/my-books-react-ts/src/images/6.jpg', 1);
        stmt.run(1007, 'C:/Users/dzianis/ReactNative/my-books-react-ts/src/images/7.jpg', 1);
        stmt.run(1008, 'C:/Users/dzianis/ReactNative/my-books-react-ts/src/images/8.jpg', 1);
        stmt.run(1009, 'C:/Users/dzianis/ReactNative/my-books-react-ts/src/images/9.jpg', 1);
        stmt.run(1010, 'C:/Users/dzianis/ReactNative/my-books-react-ts/src/images/10.jpg', 1);
        stmt.run(1011, 'C:/Users/dzianis/ReactNative/my-books-react-ts/src/images/11.jpg', 1);
        stmt.run(1012, 'C:/Users/dzianis/ReactNative/my-books-react-ts/src/images/12.jpg', 1);
        stmt.run(1013, 'C:/Users/dzianis/ReactNative/my-books-react-ts/src/images/author1.gif', 2);
        stmt.run(1014, 'C:/Users/dzianis/ReactNative/my-books-react-ts/src/images/author2.gif', 2);
        stmt.run(1015, 'C:/Users/dzianis/ReactNative/my-books-react-ts/src/images/author3.gif', 2);
        stmt.run(1016, 'C:/Users/dzianis/ReactNative/my-books-react-ts/src/images/13.jpg', 1);
        stmt.run(1017, 'C:/Users/dzianis/ReactNative/my-books-react-ts/src/images/14.jpg', 1);
        stmt.run(1018, 'C:/Users/dzianis/ReactNative/my-books-react-ts/src/images/15.jpg', 1);
        stmt.run(1019, 'C:/Users/dzianis/ReactNative/my-books-react-ts/src/images/16.jpg', 1);
        stmt.run(1020, 'C:/Users/dzianis/ReactNative/my-books-react-ts/src/images/17.jpg', 1);
        stmt.run(1021, 'C:/Users/dzianis/ReactNative/my-books-react-ts/src/images/18.jpg', 1);
        stmt.run(1022, 'C:/Users/dzianis/ReactNative/my-books-react-ts/src/images/19.jpg', 1);
        stmt.run(1023, 'C:/Users/dzianis/ReactNative/my-books-react-ts/src/images/20.jpg', 1);
        stmt.finalize();
    }


    if(fillTableBooks || fillAllTablesIn) {
        const stmt = db.prepare("INSERT INTO books (id, name, info, year, cover_img) VALUES (?, ?, ?, ?, ?)");
        stmt.run (1, 'Book1', 'Book Description 1', 1999, 1001);
        stmt.run (2, 'Book2', 'Book Description 2', 1995, 1002);
        stmt.run (3, 'Book3', 'Book Description 3', 2001, 1003);
        stmt.run (4, 'Book4', 'Book Description 4', 2003, 1004);
        stmt.run (5, 'Book5', 'Book Description 5', 2004, 1005);
        stmt.run (6, 'Book6', 'Book Description 6', 2001, 1006);
        stmt.run (7, 'Book7', 'Book Description 7', 2010, 1007);
        stmt.run (8, 'Book8', 'Book Description 8', 1992, 1008);
        stmt.run (9, 'Book9', 'Book Description 9', 1995, 1009);
        stmt.run (10, 'Book10', 'Book Description 10', 2011, 1010);
        stmt.run (11, 'Book11', 'Book Description 11', 1999, 1011);
        stmt.run (12, 'Book12', 'Book Description 12', 1995, 1012);
        stmt.run (13, 'Book13', 'Book Description 13', 1998, 1016);
        stmt.run (14, 'Book14', 'Book Description 14', 1992, 1017);
        stmt.run (15, 'Book15', 'Book Description 15', 2003, 1018);
        stmt.run (16, 'Book16', 'Book Description 16', 2001, 1019);
        stmt.run (17, 'Book17', 'Book Description 17', 2005, 1020);
        stmt.run (18, 'Book18', 'Book Description 18', 2002, 1021);
        stmt.run (19, 'Book19', 'Book Description 19', 2007, 1022);
        stmt.run (20, 'Book20', 'Book Description 20', 1998, 1023);
        stmt.run (21, 'Book21', 'Book Description 21', 1993, 1001);
        stmt.run (22, 'Book22', 'Book Description 22', 2013, 1002);
        stmt.run (23, 'Book23', 'Book Description 23', 1992, 1003);
        stmt.run (24, 'Book24', 'Book Description 24', 1996, 1004);
        stmt.run (25, 'Book25', 'Book Description 25', 1998, 1005);
        stmt.run (26, 'Book26', 'Book Description 26', 1992, 1006);
        stmt.run (27, 'Book27', 'Book Description 27', 2003, 1007);
        stmt.run (28, 'Book28', 'Book Description 28', 2001, 1008);
        stmt.run (29, 'Book29', 'Book Description 29', 2005, 1009);
        stmt.run (30, 'Book30', 'Book Description 30', 2002, 1010);
        stmt.run (31, 'Book31', 'Book Description 31', 2007, 1011);
        stmt.run (32, 'Book32', 'Book Description 32', 1998, 1012);
        stmt.run (33, 'Book33', 'Book Description 33', 1993, 1016);
        stmt.run (34, 'Book34', 'Book Description 34', 2013, 1017);
        stmt.run (35, 'Book35', 'Book Description 35', 1992, 1018);
        stmt.run (36, 'Book36', 'Book Description 36', 1996, 1019);
        stmt.run (37, 'Book37', 'Book Description 37', 1996, 1020);
        stmt.run (38, 'Book38', 'Book Description 38', 1997, 1021);
        stmt.run (39, 'Book39', 'Book Description 39', 2003, 1022);
        stmt.run (40, 'Book40', 'Book Description 40', 2001, 1023);
        stmt.finalize();
    }


    if(fillTableAuthors || fillAllTablesIn) {
        const stmt = db.prepare("INSERT INTO authors (id, name, info, age, photo) VALUES (?, ?, ?, ?, ?)");
        stmt.run (1, 'Author1', 'Author Description 1', 1999, 1013);
        stmt.run (2, 'Author2', 'Author Description 2', 2000, 1014);
        stmt.run (3, 'Author3', 'Author Description 3', 2001, 1015);
        stmt.run (4, 'Author4', 'Author Description 4', 2002, 1013);
        stmt.run (5, 'Author5', 'Author Description 5', 2003, 1014);
        stmt.run (6, 'Author6', 'Author Description 6', 2004, 1015);
        stmt.run (7, 'Author7', 'Author Description 7', 2005, 1013);
        stmt.run (8, 'Author8', 'Author Description 8', 2006, 1014);
        stmt.run (9, 'Author9', 'Author Description 9', 2007, 1015);
        stmt.run (10, 'Author10', 'Author Description 10', 2005, 1014);
        stmt.run (11, 'Author11', 'Author Description 11', 2006, 1013);
        stmt.run (12, 'Author12', 'Author Description 12', 2007, 1014);
        stmt.run (13, 'Author13', 'Author Description 13', 2001, 1015);
        stmt.run (14, 'Author14', 'Author Description 14', 2002, 1013);
        stmt.run (15, 'Author15', 'Author Description 15', 2003, 1014);
        stmt.run (16, 'Author16', 'Author Description 16', 2004, 1015);
        stmt.run (17, 'Author17', 'Author Description 17', 2005, 1013);
        stmt.run (18, 'Author18', 'Author Description 18', 2006, 1014);
        stmt.run (19, 'Author19', 'Author Description 19', 2007, 1015);
        stmt.run (20, 'Author20', 'Author Description 20', 2004, 1014);
        stmt.run (21, 'Author21', 'Author Description 21', 1999, 1013);
        stmt.run (22, 'Author22', 'Author Description 22', 2000, 1014);
        stmt.run (23, 'Author23', 'Author Description 23', 2001, 1015);
        stmt.run (24, 'Author24', 'Author Description 24', 2002, 1013);
        stmt.run (25, 'Author25', 'Author Description 25', 2003, 1014);
        stmt.run (26, 'Author26', 'Author Description 26', 2004, 1015);
        stmt.run (27, 'Author27', 'Author Description 27', 2005, 1013);
        stmt.run (28, 'Author28', 'Author Description 28', 2006, 1014);
        stmt.run (29, 'Author29', 'Author Description 29', 2007, 1015);
        stmt.run (30, 'Author30', 'Author Description 30', 2003, 1013);
        stmt.finalize();
    }


    if(fillTableAuthorBook || fillAllTablesIn) {
        const stmt = db.prepare("INSERT INTO author_book (id, book, author) VALUES (?, ?, ?)");
        stmt.run (1, 1, 1);
        stmt.run (2, 1, 11);
        stmt.run (3, 1, 23);
        stmt.run (4, 2, 2);
        stmt.run (5, 2, 3);
        stmt.run (6, 3, 4);
        stmt.run (7, 3, 5);
        stmt.run (8, 3, 6);
        stmt.run (9, 4, 7);
        stmt.run (10, 4, 9);
        stmt.run (11, 5, 10);
        stmt.run (12, 5, 15);
        stmt.run (13, 5, 19);
        stmt.run (14, 6, 13);
        stmt.run (15, 6, 20);
        stmt.run (16, 7, 23);
        stmt.run (17, 7, 15);
        stmt.run (18, 7, 19);
        stmt.run (19, 8, 1);
        stmt.run (20, 8, 2);
        stmt.run (21, 9, 3);
        stmt.run (22, 9, 4);
        stmt.run (23, 9, 5);
        stmt.run (24, 10, 6);
        stmt.run (25, 10, 7);
        stmt.run (26, 11, 8);
        stmt.run (27, 11, 9);
        stmt.run (28, 11, 10);
        stmt.run (29, 12, 11);
        stmt.run (30, 12, 12);
        stmt.run (31, 13, 13);
        stmt.run (32, 13, 14);
        stmt.run (33, 13, 15);
        stmt.run (34, 14, 16);
        stmt.run (35, 14, 17);
        stmt.run (36, 15, 18);
        stmt.run (37, 15, 19);
        stmt.run (38, 15, 20);
        stmt.run (39, 16, 21);
        stmt.run (40, 16, 22);
        stmt.run (41, 17, 23);
        stmt.run (42, 17, 24);
        stmt.run (43, 17, 25);
        stmt.run (44, 18, 26);
        stmt.run (45, 18, 27);
        stmt.run (46, 19, 28);
        stmt.run (47, 19, 29);
        stmt.run (48, 19, 30);
        stmt.run (49, 20, 15);
        stmt.run (50, 20, 16);
        stmt.run (51, 21, 17);
        stmt.run (52, 21, 18);
        stmt.run (53, 21, 19);
        stmt.run (54, 22, 20);
        stmt.run (55, 22, 21);
        stmt.run (56, 23, 22);
        stmt.run (57, 23, 23);
        stmt.run (58, 23, 24);
        stmt.run (59, 24, 25);
        stmt.run (60, 24, 26);
        stmt.run (61, 25, 27);
        stmt.run (62, 25, 28);
        stmt.run (63, 25, 29);
        stmt.run (64, 26, 30);
        stmt.run (65, 26, 11);
        stmt.run (66, 27, 12);
        stmt.run (67, 27, 13);
        stmt.run (68, 27, 14);
        stmt.run (69, 28, 15);
        stmt.run (70, 28, 16);
        stmt.run (71, 29, 17);
        stmt.run (72, 29, 18);
        stmt.run (73, 29, 19);
        stmt.run (74, 30, 20);
        stmt.run (75, 30, 21);
        stmt.run (76, 31, 22);
        stmt.run (77, 31, 23);
        stmt.run (78, 31, 1);
        stmt.run (79, 32, 2);
        stmt.run (80, 32, 3);
        stmt.run (81, 33, 4);
        stmt.run (82, 33, 5);
        stmt.run (83, 33, 6);
        stmt.run (84, 34, 7);
        stmt.run (85, 34, 8);
        stmt.run (86, 35, 9);
        stmt.run (87, 35, 10);
        stmt.run (88, 35, 11);
        stmt.run (89, 36, 12);
        stmt.run (90, 36, 13);
        stmt.run (91, 37, 14);
        stmt.run (92, 37, 15);
        stmt.run (93, 37, 16);
        stmt.run (94, 38, 29);
        stmt.run (95, 38, 27);
        stmt.run (96, 38, 26);
        stmt.run (97, 39, 25);
        stmt.run (98, 39, 23);
        stmt.run (99, 40, 24);
        stmt.run (100, 40, 30);
        stmt.run (101, 40, 29);
        stmt.finalize();
    }


    if(selectTableImages) {
        console.log('-----------------------------images--------------------------------');
        db.each("SELECT id, path, image_type FROM images", (err, row) => {
            console.log(row.id + ": " + row.path+ ": " + row.image_type);
        });
        console.log('-------------------------------------------------------------------');
    }


    if(selectTableBooks) {
        console.log('-----------------------------books--------------------------------');
        db.each("SELECT id, name, info, year, cover_img FROM books", (err, row) => {
            console.log(row.id + ": " + row.name+ ": " + row.info+ ": " + row.year+ ": " + row.cover_img);
        });
        console.log('-------------------------------------------------------------------');
    }


    if(selectTableAuthors) {
        console.log('-----------------------------authors--------------------------------');
        db.each("SELECT id, name, info, age, photo FROM authors", (err, row) => {
            console.log(row.id + ": " + row.name+ ": " + row.info+ ": " + row.age+ ": " + row.photo);
        });
        console.log('-------------------------------------------------------------------');
    }


    if(selectTableAuthorBook) {
        console.log('-----------------------------author_book--------------------------------');
        db.each("SELECT id, book, author FROM author_book", (err, row) => {
            console.log(row.id + ": " + row.book+ ": " + row.author);
        });
        console.log('-------------------------------------------------------------------');
    }


    const selectTableAuthorBookJoin = true;
    if(selectTableAuthorBookJoin) {
        console.log('-----------------------------author_book_join--------------------------------');
        db.each("SELECT * FROM authors a, books b, author_book ab, images ii WHERE ab.book = a.id AND ab.author = b.id AND b.cover_img = ii.id", (err, row) => {
            console.log(""+JSON.stringify(row));
        });
        console.log('-------------------------------------------------------------------');
    }


    if(deleteAllTableEntries) {
        db.run("DELETE FROM author_book");
        db.run("DELETE FROM authors");
        db.run("DELETE FROM books");
        db.run("DELETE FROM images");
    }
    db.run("DROP TABLE lorem");
});

db.close();