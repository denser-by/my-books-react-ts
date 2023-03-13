import BookImage1 from './../images/1.jpg';
import BookImage2 from './../images/2.jpg';
import BookImage3 from './../images/3.jpg';
import BookImage4 from './../images/4.jpg';
import BookImage5 from './../images/5.jpg';
import BookImage6 from './../images/6.jpg';
import BookImage7 from './../images/7.jpg';
import BookImage8 from './../images/8.jpg';
import BookImage9 from './../images/9.jpg';
import BookImage10 from './../images/10.jpg';
import BookImage11 from './../images/11.jpg';
import BookImage12 from './../images/12.jpg';
import BookImage13 from './../images/13.jpg';
import BookImage14 from './../images/14.jpg';
import BookImage15 from './../images/15.jpg';
import BookImage16 from './../images/16.jpg';
import BookImage17 from './../images/17.jpg';
import BookImage18 from './../images/18.jpg';
import BookImage19 from './../images/19.jpg';
import BookImage20 from './../images/20.jpg';

let bookItems = [
    { id: 1, name: "Book1", authors: [1, 5], info: "Book Description 1", year: 1999, cover_img: BookImage1 },
    { id: 2, name: "Book2", authors: [3, 5], info: "Book Description 2", year: 1995, cover_img: BookImage2 },
    { id: 3, name: "Book3", authors: [1, 3], info: "Book Description 3", year: 2001, cover_img: BookImage3 },
    { id: 4, name: "Book4", authors: [1], info: "Book Description 4", year: 2003, cover_img: BookImage4 },
    { id: 5, name: "Book5", authors: [3, 5], info: "Book Description 5", year: 2004, cover_img: BookImage5 },
    { id: 6, name: "Book6", authors: [1, 3, 5], info: "Book Description 6", year: 2001, cover_img: BookImage6 },
    { id: 7, name: "Book7", authors: [1, 5], info: "Book Description 7", year: 2010, cover_img: BookImage7 },
    { id: 8, name: "Book8", authors: [3, 5], info: "Book Description 8", year: 1992, cover_img: BookImage8 },
    { id: 9, name: "Book9", authors: [1, 3], info: "Book Description 9", year: 1995, cover_img: BookImage9 },
    { id: 10, name: "Book10", authors: [1, 3, 5], info: "Book Description 10", year: 2011, cover_img: BookImage10 },
    { id: 11, name: "Book11", authors: [1, 5], info: "Book Description 11", year: 1999, cover_img: BookImage11 },
    { id: 12, name: "Book12", authors: [3, 5], info: "Book Description 12", year: 1995, cover_img: BookImage12 },
    { id: 13, name: "Book13", authors: [1, 3], info: "Book Description 13", year: 2001, cover_img: BookImage13 },
    { id: 14, name: "Book14", authors: [1], info: "Book Description 14", year: 2003, cover_img: BookImage14 },
    { id: 15, name: "Book15", authors: [3, 5], info: "Book Description 15", year: 2004, cover_img: BookImage15 },
    { id: 16, name: "Book16", authors: [1, 3, 5], info: "Book Description 16", year: 2001, cover_img: BookImage16 },
    { id: 17, name: "Book17", authors: [1, 5], info: "Book Description 17", year: 2010, cover_img: BookImage17 },
    { id: 18, name: "Book18", authors: [3, 5], info: "Book Description 18", year: 1992, cover_img: BookImage18 },
    { id: 19, name: "Book19", authors: [1, 3], info: "Book Description 19", year: 1995, cover_img: BookImage19 },
    { id: 20, name: "Book20", authors: [1, 3, 5], info: "Book Description 20", year: 2011, cover_img: BookImage20 },
    { id: 21, name: "Book21", authors: [1, 5], info: "Book Description 21", year: 1999, cover_img: BookImage1 },
    { id: 22, name: "Book22", authors: [3, 5], info: "Book Description 22", year: 1995, cover_img: BookImage2 },
    { id: 23, name: "Book23", authors: [1, 3], info: "Book Description 23", year: 2001, cover_img: BookImage3 },
    { id: 24, name: "Book24", authors: [1], info: "Book Description 24", year: 2003, cover_img: BookImage4 },
    { id: 25, name: "Book25", authors: [3, 5], info: "Book Description 25", year: 2004, cover_img: BookImage5 },
    { id: 26, name: "Book26", authors: [1, 3, 5], info: "Book Description 26", year: 2001, cover_img: BookImage6 },
    { id: 27, name: "Book27", authors: [1, 5], info: "Book Description 27", year: 2010, cover_img: BookImage7 },
    { id: 28, name: "Book28", authors: [3, 5], info: "Book Description 28", year: 1992, cover_img: BookImage8 },
    { id: 29, name: "Book29", authors: [1, 3], info: "Book Description 29", year: 1995, cover_img: BookImage9 },
    { id: 30, name: "Book30", authors: [1, 3, 5], info: "Book Description 30", year: 2011, cover_img: BookImage10 },
    { id: 31, name: "Book31", authors: [4], info: "Book Description 31", year: 2003, cover_img: BookImage11 },
    { id: 32, name: "Book32", authors: [4, 5], info: "Book Description 32", year: 2004, cover_img: BookImage12 },
    { id: 33, name: "Book33", authors: [4, 6, 7], info: "Book Description 33", year: 2001, cover_img: BookImage13 },
    { id: 34, name: "Book34", authors: [4, 5], info: "Book Description 34", year: 2010, cover_img: BookImage14 },
    { id: 35, name: "Book35", authors: [4, 6], info: "Book Description 35", year: 1992, cover_img: BookImage15 },
    { id: 36, name: "Book36", authors: [4, 3], info: "Book Description 36", year: 2004, cover_img: BookImage16 },
    { id: 37, name: "Book37", authors: [4, 6, 7], info: "Book Description 37", year: 2011, cover_img: BookImage17 },
    { id: 38, name: "Book38", authors: [14, 16], info: "Book Description 38", year: 1997, cover_img: BookImage18 },
    { id: 39, name: "Book39", authors: [14, 13], info: "Book Description 39", year: 2003, cover_img: BookImage19 },
    { id: 40, name: "Book40", authors: [4, 16, 17], info: "Book Description 40", year: 2001, cover_img: BookImage20 }
];

class BooksProvider {

    static anyFirst() {
        return bookItems[1 - 1];
    }

    static size() {
        return bookItems.length;
    }

    static create(dat3a) {
        const bookIdx = bookItems.length;
        bookItems.push(this.newBook());
        bookItems[bookIdx].name = dat3a.name;
        bookItems[bookIdx].year = dat3a.year;
        bookItems[bookIdx].authors = dat3a.authors;
        bookItems[bookIdx].info = dat3a.info;
        bookItems[bookIdx].cover_img = dat3a.cover_img;
        this.commit(bookIdx, bookItems[bookIdx], 'create');
    }

    static commit(idx, obj, opp) {
        console.log('ready {opp}' + idx + '  ' + JSON.stringify(obj));
    }

    static all() {
        var result = [];
        result.push(...bookItems);
        // console.log('all ' + result.length);
        return result;
    }

    static find(id) {
        let first = bookItems.filter(book => id == book.id)[0];
        return first;
    }

    static update(data) {
        let book = bookItems.filter(book => data.id == book.id)[0];
        const bookIdx = bookItems.indexOf(book);
        bookItems[bookIdx].name = data.name;
        bookItems[bookIdx].year = data.year;
        bookItems[bookIdx].authors = data.authors;
        bookItems[bookIdx].info = data.info;
        bookItems[bookIdx].cover_img = data.cover_img;
        this.commit(bookIdx, bookItems[bookIdx], 'update');
    }

    static delete(id) {
        let book = bookItems.filter(book => id == book.id)[0];
        const bookIdx = bookItems.indexOf(book);
        bookItems.splice(bookIdx, 1);
    }

    static deleteAll() {
        const bookIdx = 1 - 1;
        const count = this.size();
        bookItems.splice(bookIdx, count);
    }

    static newBook() {
        var newBook = {
            id: this.size() + 1,
            name: "",
            authors: [],
            info: "",
            year: "",
            cover_img: ""
        };
        return newBook;
    }

    static generate20Books() {
        [1, 1, 1, 1, 1,
            1, 1, 1, 1, 1,
            1, 1, 1, 1, 1,
            1, 1, 1, 1, 1].map(time => {
                let book = this.newBook();
                book.name = "Book_" + book.id;
                book.authors = book.id % 2 == 0 ? [1, 2, 3] : [4, 5, 6];
                book.info = "Description_" + book.id;
                book.year = book.id % 2 == 0 ? 2002 : 2004;
                book.cover_img = book.id % 2 == 0 ? BookImage4 : (book.id % 3 == 0 ? BookImage7 : BookImage9);
                this.create(book);
            });
    }
}

export default BooksProvider;