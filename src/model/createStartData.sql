
CREATE TABLE weather (
    city            varchar(80),
    temp_lo         int,     
    temp_hi         int,         
    prcp            real,       
    date            date
);
INSERT INTO weather VALUES ('San Francisco', 46, 50, 0.25, '1994-11-27');
INSERT INTO weather (city, temp_lo, temp_hi, prcp, date)
    VALUES ('San Francisco', 43, 57, 0.0, '1994-11-29');
INSERT INTO weather (date, city, temp_hi, temp_lo)
    VALUES ('1994-11-29', 'Hayward', 54, 37);
SELECT * FROM weather;

CREATE TABLE cities (
    name            varchar(80),
    location        point
);
INSERT INTO cities VALUES ('San Francisco', '(-194.0, 53.0)');
SELECT DISTINCT city
    FROM weather;
SELECT city, temp_lo, temp_hi, prcp, date, location
    FROM weather JOIN cities ON city = name;

CREATE TABLE images (
  id integer PRIMARY KEY,
  path VARCHAR(512) NOT NULL,
  image_type integer NOT NULL,
  file_size integer
);
select * from images;

CREATE TABLE books (
  id integer PRIMARY KEY,
  name VARCHAR(120) UNIQUE NOT NULL,
  info text,
  year integer CONSTRAINT positive_year CHECK (year > 0),
  cover_img integer REFERENCES images (id)
);
select * from books;

CREATE TABLE authors (
  id integer PRIMARY KEY,
  name VARCHAR(60) NOT NULL,
  info text,
  age integer,
  photo integer REFERENCES images (id)
);
select * from authors;

CREATE TABLE author_book (
  id integer PRIMARY KEY,
  book integer REFERENCES books (id) NOT NULL,
  author integer REFERENCES authors (id) NOT NULL
);
select * from author_book;


INSERT INTO images (id, path, image_type)
    VALUES (1001, 'C:\Users\dzianis\ReactNative\my-books-react-ts\src\images\1.jpg', 1);
INSERT INTO images (id, path, image_type)
    VALUES (1002, 'C:\Users\dzianis\ReactNative\my-books-react-ts\src\images\2.jpg', 1);
INSERT INTO images (id, path, image_type)
    VALUES (1003, 'C:\Users\dzianis\ReactNative\my-books-react-ts\src\images\3.jpg', 1);
INSERT INTO images (id, path, image_type)
    VALUES (1004, 'C:\Users\dzianis\ReactNative\my-books-react-ts\src\images\4.jpg', 1);
INSERT INTO images (id, path, image_type)
    VALUES (1005, 'C:\Users\dzianis\ReactNative\my-books-react-ts\src\images\5.jpg', 1);
INSERT INTO images (id, path, image_type)
    VALUES (1006, 'C:\Users\dzianis\ReactNative\my-books-react-ts\src\images\6.jpg', 1);
INSERT INTO images (id, path, image_type)
    VALUES (1007, 'C:\Users\dzianis\ReactNative\my-books-react-ts\src\images\7.jpg', 1);
INSERT INTO images (id, path, image_type)
    VALUES (1008, 'C:\Users\dzianis\ReactNative\my-books-react-ts\src\images\8.jpg', 1);
INSERT INTO images (id, path, image_type)
    VALUES (1009, 'C:\Users\dzianis\ReactNative\my-books-react-ts\src\images\9.jpg', 1);
INSERT INTO images (id, path, image_type)
    VALUES (1010, 'C:\Users\dzianis\ReactNative\my-books-react-ts\src\images\10.jpg', 1);
INSERT INTO images (id, path, image_type)
    VALUES (1011, 'C:\Users\dzianis\ReactNative\my-books-react-ts\src\images\11.jpg', 1);
INSERT INTO images (id, path, image_type)
    VALUES (1012, 'C:\Users\dzianis\ReactNative\my-books-react-ts\src\images\12.jpg', 1);
INSERT INTO images (id, path, image_type)
    VALUES (1013, 'C:\Users\dzianis\ReactNative\my-books-react-ts\src\images\author1.gif', 2);
INSERT INTO images (id, path, image_type)
    VALUES (1014, 'C:\Users\dzianis\ReactNative\my-books-react-ts\src\images\author2.gif', 2);
INSERT INTO images (id, path, image_type)
    VALUES (1015, 'C:\Users\dzianis\ReactNative\my-books-react-ts\src\images\author3.gif', 2);
INSERT INTO images (id, path, image_type)
    VALUES (1016, 'C:\Users\dzianis\ReactNative\my-books-react-ts\src\images\13.jpg', 1);
INSERT INTO images (id, path, image_type)
    VALUES (1017, 'C:\Users\dzianis\ReactNative\my-books-react-ts\src\images\14.jpg', 1);
INSERT INTO images (id, path, image_type)
    VALUES (1018, 'C:\Users\dzianis\ReactNative\my-books-react-ts\src\images\15.jpg', 1);
INSERT INTO images (id, path, image_type)
    VALUES (1019, 'C:\Users\dzianis\ReactNative\my-books-react-ts\src\images\16.jpg', 1);
INSERT INTO images (id, path, image_type)
    VALUES (1020, 'C:\Users\dzianis\ReactNative\my-books-react-ts\src\images\17.jpg', 1);
INSERT INTO images (id, path, image_type)
    VALUES (1021, 'C:\Users\dzianis\ReactNative\my-books-react-ts\src\images\18.jpg', 1);
INSERT INTO images (id, path, image_type)
    VALUES (1022, 'C:\Users\dzianis\ReactNative\my-books-react-ts\src\images\19.jpg', 1);
INSERT INTO images (id, path, image_type)
    VALUES (1023, 'C:\Users\dzianis\ReactNative\my-books-react-ts\src\images\20.jpg', 1);
select * from images;


INSERT INTO books (id, name, info, year, cover_img)
    VALUES (1, 'Book1', 'Book Description 1', 1999, 1001);
INSERT INTO books (id, name, info, year, cover_img)
    VALUES (2, 'Book2', 'Book Description 2', 1995, 1002);
INSERT INTO books (id, name, info, year, cover_img)
    VALUES (3, 'Book3', 'Book Description 3', 2001, 1003);
INSERT INTO books (id, name, info, year, cover_img)
    VALUES (4, 'Book4', 'Book Description 4', 2003, 1004);
INSERT INTO books (id, name, info, year, cover_img)
    VALUES (5, 'Book5', 'Book Description 5', 2004, 1005);
INSERT INTO books (id, name, info, year, cover_img)
    VALUES (6, 'Book6', 'Book Description 6', 2001, 1006);
INSERT INTO books (id, name, info, year, cover_img)
    VALUES (7, 'Book7', 'Book Description 7', 2010, 1007);
INSERT INTO books (id, name, info, year, cover_img)
    VALUES (8, 'Book8', 'Book Description 8', 1992, 1008);
INSERT INTO books (id, name, info, year, cover_img)
    VALUES (9, 'Book9', 'Book Description 9', 1995, 1009);
INSERT INTO books (id, name, info, year, cover_img)
    VALUES (10, 'Book10', 'Book Description 10', 2011, 1010);
INSERT INTO books (id, name, info, year, cover_img)
    VALUES (11, 'Book11', 'Book Description 11', 1999, 1011);
INSERT INTO books (id, name, info, year, cover_img)
    VALUES (12, 'Book12', 'Book Description 12', 1995, 1012);
INSERT INTO books (id, name, info, year, cover_img)
    VALUES (13, 'Book13', 'Book Description 13', 1998, 1016);
INSERT INTO books (id, name, info, year, cover_img)
    VALUES (14, 'Book14', 'Book Description 14', 1992, 1017);
INSERT INTO books (id, name, info, year, cover_img)
    VALUES (15, 'Book15', 'Book Description 15', 2003, 1018);
INSERT INTO books (id, name, info, year, cover_img)
    VALUES (16, 'Book16', 'Book Description 16', 2001, 1019);
INSERT INTO books (id, name, info, year, cover_img)
    VALUES (17, 'Book17', 'Book Description 17', 2005, 1020);
INSERT INTO books (id, name, info, year, cover_img)
    VALUES (18, 'Book18', 'Book Description 18', 2002, 1021);
INSERT INTO books (id, name, info, year, cover_img)
    VALUES (19, 'Book19', 'Book Description 19', 2007, 1022);
INSERT INTO books (id, name, info, year, cover_img)
    VALUES (20, 'Book20', 'Book Description 20', 1998, 1023);
INSERT INTO books (id, name, info, year, cover_img)
    VALUES (21, 'Book21', 'Book Description 21', 1993, 1001);
INSERT INTO books (id, name, info, year, cover_img)
    VALUES (22, 'Book22', 'Book Description 22', 2013, 1002);
INSERT INTO books (id, name, info, year, cover_img)
    VALUES (23, 'Book23', 'Book Description 23', 1992, 1003);
INSERT INTO books (id, name, info, year, cover_img)
    VALUES (24, 'Book24', 'Book Description 24', 1996, 1004);
INSERT INTO books (id, name, info, year, cover_img)
    VALUES (25, 'Book25', 'Book Description 25', 1998, 1005);
INSERT INTO books (id, name, info, year, cover_img)
    VALUES (26, 'Book26', 'Book Description 26', 1992, 1006);
INSERT INTO books (id, name, info, year, cover_img)
    VALUES (27, 'Book27', 'Book Description 27', 2003, 1007);
INSERT INTO books (id, name, info, year, cover_img)
    VALUES (28, 'Book28', 'Book Description 28', 2001, 1008);
INSERT INTO books (id, name, info, year, cover_img)
    VALUES (29, 'Book29', 'Book Description 29', 2005, 1009);
INSERT INTO books (id, name, info, year, cover_img)
    VALUES (30, 'Book30', 'Book Description 30', 2002, 1010);
INSERT INTO books (id, name, info, year, cover_img)
    VALUES (31, 'Book31', 'Book Description 31', 2007, 1011);
INSERT INTO books (id, name, info, year, cover_img)
    VALUES (32, 'Book32', 'Book Description 32', 1998, 1012);
INSERT INTO books (id, name, info, year, cover_img)
    VALUES (33, 'Book33', 'Book Description 33', 1993, 1016);
INSERT INTO books (id, name, info, year, cover_img)
    VALUES (34, 'Book34', 'Book Description 34', 2013, 1017);
INSERT INTO books (id, name, info, year, cover_img)
    VALUES (35, 'Book35', 'Book Description 35', 1992, 1018);
INSERT INTO books (id, name, info, year, cover_img)
    VALUES (36, 'Book36', 'Book Description 36', 1996, 1019);
INSERT INTO books (id, name, info, year, cover_img)
    VALUES (37, 'Book37', 'Book Description 37', 1996, 1020);
INSERT INTO books (id, name, info, year, cover_img)
    VALUES (38, 'Book38', 'Book Description 38', 1997, 1021);
INSERT INTO books (id, name, info, year, cover_img)
    VALUES (39, 'Book39', 'Book Description 39', 2003, 1022);
INSERT INTO books (id, name, info, year, cover_img)
    VALUES (40, 'Book40', 'Book Description 40', 2001, 1023);
select * from books;


INSERT INTO authors (id, name, info, age, photo)
    VALUES (1, 'Author1', 'Author Description 1', 1999, 1013);
INSERT INTO authors (id, name, info, age, photo)
    VALUES (2, 'Author2', 'Author Description 2', 2000, 1014);
INSERT INTO authors (id, name, info, age, photo)
    VALUES (3, 'Author3', 'Author Description 3', 2001, 1015);
INSERT INTO authors (id, name, info, age, photo)
    VALUES (4, 'Author4', 'Author Description 4', 2002, 1013);
INSERT INTO authors (id, name, info, age, photo)
    VALUES (5, 'Author5', 'Author Description 5', 2003, 1014);
INSERT INTO authors (id, name, info, age, photo)
    VALUES (6, 'Author6', 'Author Description 6', 2004, 1015);
INSERT INTO authors (id, name, info, age, photo)
    VALUES (7, 'Author7', 'Author Description 7', 2005, 1013);
INSERT INTO authors (id, name, info, age, photo)
    VALUES (8, 'Author8', 'Author Description 8', 2006, 1014);
INSERT INTO authors (id, name, info, age, photo)
    VALUES (9, 'Author9', 'Author Description 9', 2007, 1015);
INSERT INTO authors (id, name, info, age, photo)
    VALUES (10, 'Author10', 'Author Description 10', 2005, 1014);
INSERT INTO authors (id, name, info, age, photo)
    VALUES (11, 'Author11', 'Author Description 11', 2006, 1013);
INSERT INTO authors (id, name, info, age, photo)
    VALUES (12, 'Author12', 'Author Description 12', 2007, 1014);
INSERT INTO authors (id, name, info, age, photo)
    VALUES (13, 'Author13', 'Author Description 13', 2001, 1015);
INSERT INTO authors (id, name, info, age, photo)
    VALUES (14, 'Author14', 'Author Description 14', 2002, 1013);
INSERT INTO authors (id, name, info, age, photo)
    VALUES (15, 'Author15', 'Author Description 15', 2003, 1014);
INSERT INTO authors (id, name, info, age, photo)
    VALUES (16, 'Author16', 'Author Description 16', 2004, 1015);
INSERT INTO authors (id, name, info, age, photo)
    VALUES (17, 'Author17', 'Author Description 17', 2005, 1013);
INSERT INTO authors (id, name, info, age, photo)
    VALUES (18, 'Author18', 'Author Description 18', 2006, 1014);
INSERT INTO authors (id, name, info, age, photo)
    VALUES (19, 'Author19', 'Author Description 19', 2007, 1015);
INSERT INTO authors (id, name, info, age, photo)
    VALUES (20, 'Author20', 'Author Description 20', 2004, 1014);
INSERT INTO authors (id, name, info, age, photo)
    VALUES (21, 'Author21', 'Author Description 21', 1999, 1013);
INSERT INTO authors (id, name, info, age, photo)
    VALUES (22, 'Author22', 'Author Description 22', 2000, 1014);
INSERT INTO authors (id, name, info, age, photo)
    VALUES (23, 'Author23', 'Author Description 23', 2001, 1015);
INSERT INTO authors (id, name, info, age, photo)
    VALUES (24, 'Author24', 'Author Description 24', 2002, 1013);
INSERT INTO authors (id, name, info, age, photo)
    VALUES (25, 'Author25', 'Author Description 25', 2003, 1014);
INSERT INTO authors (id, name, info, age, photo)
    VALUES (26, 'Author26', 'Author Description 26', 2004, 1015);
INSERT INTO authors (id, name, info, age, photo)
    VALUES (27, 'Author27', 'Author Description 27', 2005, 1013);
INSERT INTO authors (id, name, info, age, photo)
    VALUES (28, 'Author28', 'Author Description 28', 2006, 1014);
INSERT INTO authors (id, name, info, age, photo)
    VALUES (29, 'Author29', 'Author Description 29', 2007, 1015);
INSERT INTO authors (id, name, info, age, photo)
    VALUES (30, 'Author30', 'Author Description 30', 2003, 1013);
select * from authors;

INSERT INTO author_book (id, book, author) VALUES (1, 1, 1);
INSERT INTO author_book (id, book, author) VALUES (2, 1, 11);
INSERT INTO author_book (id, book, author) VALUES (3, 1, 23);
INSERT INTO author_book (id, book, author) VALUES (4, 2, 2);
INSERT INTO author_book (id, book, author) VALUES (5, 2, 3);
INSERT INTO author_book (id, book, author) VALUES (6, 3, 4);
INSERT INTO author_book (id, book, author) VALUES (7, 3, 5);
INSERT INTO author_book (id, book, author) VALUES (8, 3, 6);
INSERT INTO author_book (id, book, author) VALUES (9, 4, 7);
INSERT INTO author_book (id, book, author) VALUES (10, 4, 9);
INSERT INTO author_book (id, book, author) VALUES (11, 5, 10);
INSERT INTO author_book (id, book, author) VALUES (12, 5, 15);
INSERT INTO author_book (id, book, author) VALUES (13, 5, 19);
INSERT INTO author_book (id, book, author) VALUES (14, 6, 13);
INSERT INTO author_book (id, book, author) VALUES (15, 6, 20);
INSERT INTO author_book (id, book, author) VALUES (16, 7, 23);
INSERT INTO author_book (id, book, author) VALUES (17, 7, 15);
INSERT INTO author_book (id, book, author) VALUES (18, 7, 19);
INSERT INTO author_book (id, book, author) VALUES (19, 8, 1);
INSERT INTO author_book (id, book, author) VALUES (20, 8, 2);
INSERT INTO author_book (id, book, author) VALUES (21, 9, 3);
INSERT INTO author_book (id, book, author) VALUES (22, 9, 4);
INSERT INTO author_book (id, book, author) VALUES (23, 9, 5);
INSERT INTO author_book (id, book, author) VALUES (24, 10, 6);
INSERT INTO author_book (id, book, author) VALUES (25, 10, 7);
INSERT INTO author_book (id, book, author) VALUES (26, 11, 8);
INSERT INTO author_book (id, book, author) VALUES (27, 11, 9);
INSERT INTO author_book (id, book, author) VALUES (28, 11, 10);
INSERT INTO author_book (id, book, author) VALUES (29, 12, 11);
INSERT INTO author_book (id, book, author) VALUES (30, 12, 12);
INSERT INTO author_book (id, book, author) VALUES (31, 13, 13);
INSERT INTO author_book (id, book, author) VALUES (32, 13, 14);
INSERT INTO author_book (id, book, author) VALUES (33, 13, 15);
INSERT INTO author_book (id, book, author) VALUES (34, 14, 16);
INSERT INTO author_book (id, book, author) VALUES (35, 14, 17);
INSERT INTO author_book (id, book, author) VALUES (36, 15, 18);
INSERT INTO author_book (id, book, author) VALUES (37, 15, 19);
INSERT INTO author_book (id, book, author) VALUES (38, 15, 20);
INSERT INTO author_book (id, book, author) VALUES (39, 16, 21);
INSERT INTO author_book (id, book, author) VALUES (40, 16, 22);
INSERT INTO author_book (id, book, author) VALUES (41, 17, 23);
INSERT INTO author_book (id, book, author) VALUES (42, 17, 24);
INSERT INTO author_book (id, book, author) VALUES (43, 17, 25);
INSERT INTO author_book (id, book, author) VALUES (44, 18, 26);
INSERT INTO author_book (id, book, author) VALUES (45, 18, 27);
INSERT INTO author_book (id, book, author) VALUES (46, 19, 28);
INSERT INTO author_book (id, book, author) VALUES (47, 19, 29);
INSERT INTO author_book (id, book, author) VALUES (48, 19, 30);
INSERT INTO author_book (id, book, author) VALUES (49, 20, 15);
INSERT INTO author_book (id, book, author) VALUES (50, 20, 16);
INSERT INTO author_book (id, book, author) VALUES (51, 21, 17);
INSERT INTO author_book (id, book, author) VALUES (52, 21, 18);
INSERT INTO author_book (id, book, author) VALUES (53, 21, 19);
INSERT INTO author_book (id, book, author) VALUES (54, 22, 20);
INSERT INTO author_book (id, book, author) VALUES (55, 22, 21);
INSERT INTO author_book (id, book, author) VALUES (56, 23, 22);
INSERT INTO author_book (id, book, author) VALUES (57, 23, 23);
INSERT INTO author_book (id, book, author) VALUES (58, 23, 24);
INSERT INTO author_book (id, book, author) VALUES (59, 24, 25);
INSERT INTO author_book (id, book, author) VALUES (60, 24, 26);
INSERT INTO author_book (id, book, author) VALUES (61, 25, 27);
INSERT INTO author_book (id, book, author) VALUES (62, 25, 28);
INSERT INTO author_book (id, book, author) VALUES (63, 25, 29);
INSERT INTO author_book (id, book, author) VALUES (64, 26, 30);
INSERT INTO author_book (id, book, author) VALUES (65, 26, 11);
INSERT INTO author_book (id, book, author) VALUES (66, 27, 12);
INSERT INTO author_book (id, book, author) VALUES (67, 27, 13);
INSERT INTO author_book (id, book, author) VALUES (68, 27, 14);
INSERT INTO author_book (id, book, author) VALUES (69, 28, 15);
INSERT INTO author_book (id, book, author) VALUES (70, 28, 16);
INSERT INTO author_book (id, book, author) VALUES (71, 29, 17);
INSERT INTO author_book (id, book, author) VALUES (72, 29, 18);
INSERT INTO author_book (id, book, author) VALUES (73, 29, 19);
INSERT INTO author_book (id, book, author) VALUES (74, 30, 20);
INSERT INTO author_book (id, book, author) VALUES (75, 30, 21);
INSERT INTO author_book (id, book, author) VALUES (76, 31, 22);
INSERT INTO author_book (id, book, author) VALUES (77, 31, 23);
INSERT INTO author_book (id, book, author) VALUES (78, 31, 1);
INSERT INTO author_book (id, book, author) VALUES (79, 32, 2);
INSERT INTO author_book (id, book, author) VALUES (80, 32, 3);
INSERT INTO author_book (id, book, author) VALUES (81, 33, 4);
INSERT INTO author_book (id, book, author) VALUES (82, 33, 5);
INSERT INTO author_book (id, book, author) VALUES (83, 33, 6);
INSERT INTO author_book (id, book, author) VALUES (84, 34, 7);
INSERT INTO author_book (id, book, author) VALUES (85, 34, 8);
INSERT INTO author_book (id, book, author) VALUES (86, 35, 9);
INSERT INTO author_book (id, book, author) VALUES (87, 35, 10);
INSERT INTO author_book (id, book, author) VALUES (88, 35, 11);
INSERT INTO author_book (id, book, author) VALUES (89, 36, 12);
INSERT INTO author_book (id, book, author) VALUES (90, 36, 13);
INSERT INTO author_book (id, book, author) VALUES (91, 37, 14);
INSERT INTO author_book (id, book, author) VALUES (92, 37, 15);
INSERT INTO author_book (id, book, author) VALUES (93, 37, 16);
INSERT INTO author_book (id, book, author) VALUES (94, 38, 29);
INSERT INTO author_book (id, book, author) VALUES (95, 38, 27);
INSERT INTO author_book (id, book, author) VALUES (96, 38, 26);
INSERT INTO author_book (id, book, author) VALUES (97, 39, 25);
INSERT INTO author_book (id, book, author) VALUES (98, 39, 23);
INSERT INTO author_book (id, book, author) VALUES (99, 40, 24);
INSERT INTO author_book (id, book, author) VALUES (100, 40, 30);
INSERT INTO author_book (id, book, author) VALUES (101, 40, 29);
select * from author_book;


select * from authors AS a, books AS b, author_book ab 
  where a.id = ab.author AND b.id = ab.book;

select a.name, b.name from authors AS a, books AS b, author_book ab 
  where a.id = ab.author AND b.id = ab.book;
