import AuthorImage1 from './../images/author1.gif';
import AuthorImage2 from './../images/author2.gif';
import AuthorImage3 from './../images/author3.gif';

const authorItems = [
    { id: 1, name: "Author1", books: [1, 3], info: "Author Description 1", age: 1999, photo: AuthorImage1 },
    { id: 2, name: "Author2", books: [2, 4], info: "Author Description 2", age: 2000, photo: AuthorImage2 },
    { id: 3, name: "Author3", books: [1, 3], info: "Author Description 3", age: 2001, photo: AuthorImage3 },
    { id: 4, name: "Author4", books: [2, 4], info: "Author Description 4", age: 2002, photo: AuthorImage1 },
    { id: 5, name: "Author5", books: [1, 3], info: "Author Description 5", age: 2003, photo: AuthorImage2 },
    { id: 6, name: "Author6", books: [2, 4], info: "Author Description 6", age: 2004, photo: AuthorImage3 },
    { id: 7, name: "Author7", books: [1, 3], info: "Author Description 7", age: 2005, photo: AuthorImage1 },
    { id: 8, name: "Author8", books: [2, 4], info: "Author Description 8", age: 2006, photo: AuthorImage2 },
    { id: 9, name: "Author9", books: [1, 3], info: "Author Description 9", age: 2007, photo: AuthorImage3 },
    { id: 11, name: "Author11", books: [2, 4], info: "Author Description 11", age: 1999, photo: AuthorImage1 },
    { id: 12, name: "Author12", books: [1, 3], info: "Author Description 12", age: 2000, photo: AuthorImage2 },
    { id: 13, name: "Author13", books: [2, 4], info: "Author Description 13", age: 2001, photo: AuthorImage3 },
    { id: 14, name: "Author14", books: [1, 3], info: "Author Description 14", age: 2002, photo: AuthorImage1 },
    { id: 15, name: "Author15", books: [2, 4], info: "Author Description 15", age: 2003, photo: AuthorImage2 },
    { id: 16, name: "Author16", books: [1, 3], info: "Author Description 16", age: 2004, photo: AuthorImage3 },
    { id: 17, name: "Author17", books: [2, 4], info: "Author Description 17", age: 2005, photo: AuthorImage1 },
    { id: 18, name: "Author18", books: [1, 3], info: "Author Description 18", age: 2006, photo: AuthorImage2 },
    { id: 19, name: "Author19", books: [2, 4], info: "Author Description 19", age: 2007, photo: AuthorImage3 },
    { id: 21, name: "Author21", books: [1, 3], info: "Author Description 21", age: 1999, photo: AuthorImage1 },
    { id: 22, name: "Author22", books: [2, 4], info: "Author Description 22", age: 2000, photo: AuthorImage2 },
    { id: 23, name: "Author23", books: [1, 3], info: "Author Description 23", age: 2001, photo: AuthorImage3 },
    { id: 24, name: "Author24", books: [2, 4], info: "Author Description 24", age: 2002, photo: AuthorImage1 },
    { id: 25, name: "Author25", books: [1, 3], info: "Author Description 25", age: 2003, photo: AuthorImage2 },
    { id: 26, name: "Author26", books: [2, 4], info: "Author Description 26", age: 2004, photo: AuthorImage3 },
    { id: 27, name: "Author27", books: [1, 3], info: "Author Description 27", age: 2005, photo: AuthorImage1 },
    { id: 28, name: "Author28", books: [2, 4], info: "Author Description 28", age: 2006, photo: AuthorImage2 },
    { id: 29, name: "Author29", books: [1, 3], info: "Author Description 29", age: 2007, photo: AuthorImage3 }
]


class AuthorsProvider {

    static byIndex(idx) {
        return authorItems[idx]
    }

    static size() {
        return authorItems.length;
    }

    static all() {
        return authorItems;
    }

    static find(id) {
        let first = authorItems.filter(author => id == author.id)[0];
        return first;
    }

    static create(data) {
        authorItems.push(data);
    }

    static delete(id) {
        var book = find(id);
        authorItems.delete(book);
    }
}

export default AuthorsProvider;