// import AuthorImage1 from './../images/author1.gif';
// import AuthorImage2 from './../images/author2.gif';
// import AuthorImage3 from './../images/author3.gif';

// let authorItems = [
//     { id: 1, name: "modern Author1", books: [1, 3], info: "short Author Description 1", age: 1999, photo: AuthorImage1 },
//     { id: 2, name: "modern Author2", books: [2, 4], info: "short Author Description 2", age: 2000, photo: AuthorImage2 },
//     { id: 3, name: "modern Author3", books: [1, 3], info: "short Author Description 3", age: 2001, photo: AuthorImage3 },
//     { id: 4, name: "modern Author4", books: [2, 4], info: "short Author Description 4", age: 2002, photo: AuthorImage1 },
//     { id: 5, name: "modern Author5", books: [1, 3], info: "short Author Description 5", age: 2003, photo: AuthorImage2 },
//     { id: 6, name: "modern Author6", books: [2, 4], info: "short Author Description 6", age: 2004, photo: AuthorImage3 },
//     { id: 7, name: "modern Author7", books: [1, 3], info: "short Author Description 7", age: 2005, photo: AuthorImage1 },
//     { id: 8, name: "modern Author8", books: [2, 4], info: "short Author Description 8", age: 2006, photo: AuthorImage2 },
//     { id: 9, name: "modern Author9", books: [1, 3], info: "short Author Description 9", age: 2007, photo: AuthorImage3 },
//     { id: 10, name: "modern Author10", books: [2, 3], info: "short Author Description 10", age: 2005, photo: AuthorImage2 },
//     { id: 11, name: "modern Author11", books: [2, 4], info: "short Author Description 11", age: 1999, photo: AuthorImage1 },
//     { id: 12, name: "modern Author12", books: [1, 3], info: "short Author Description 12", age: 2000, photo: AuthorImage2 },
//     { id: 13, name: "modern Author13", books: [2, 4], info: "short Author Description 13", age: 2001, photo: AuthorImage3 },
//     { id: 14, name: "modern Author14", books: [1, 3], info: "short Author Description 14", age: 2002, photo: AuthorImage1 },
//     { id: 15, name: "modern Author15", books: [2, 4], info: "short Author Description 15", age: 2003, photo: AuthorImage2 },
//     { id: 16, name: "modern Author16", books: [1, 3], info: "short Author Description 16", age: 2004, photo: AuthorImage3 },
//     { id: 17, name: "modern Author17", books: [2, 4], info: "short Author Description 17", age: 2005, photo: AuthorImage1 },
//     { id: 18, name: "modern Author18", books: [1, 3], info: "short Author Description 18", age: 2006, photo: AuthorImage2 },
//     { id: 19, name: "modern Author19", books: [2, 4], info: "short Author Description 19", age: 2007, photo: AuthorImage3 },
//     { id: 20, name: "modern Author20", books: [4], info: "short Author Description 20", age: 2004, photo: AuthorImage2 },
//     { id: 21, name: "modern Author21", books: [1, 3], info: "short Author Description 21", age: 1999, photo: AuthorImage1 },
//     { id: 22, name: "modern Author22", books: [2, 4], info: "short Author Description 22", age: 2000, photo: AuthorImage2 },
//     { id: 23, name: "modern Author23", books: [1, 3], info: "short Author Description 23", age: 2001, photo: AuthorImage3 },
//     { id: 24, name: "modern Author24", books: [2, 4], info: "short Author Description 24", age: 2002, photo: AuthorImage1 },
//     { id: 25, name: "modern Author25", books: [1, 3], info: "short Author Description 25", age: 2003, photo: AuthorImage2 },
//     { id: 26, name: "modern Author26", books: [2, 4], info: "short Author Description 26", age: 2004, photo: AuthorImage3 },
//     { id: 27, name: "modern Author27", books: [1, 3], info: "short Author Description 27", age: 2005, photo: AuthorImage1 },
//     { id: 28, name: "modern Author28", books: [2, 4], info: "short Author Description 28", age: 2006, photo: AuthorImage2 },
//     { id: 29, name: "modern Author29", books: [1, 3], info: "short Author Description 29", age: 2007, photo: AuthorImage3 },
//     { id: 30, name: "modern Author30", books: [2], info: "short Author Description 30", age: 2003, photo: AuthorImage1 }
// ]


// class AuthorsProvider {

//     static anyFirst() {
//         return authorItems[1 - 1];
//     }

//     static size() {
//         return authorItems.length;
//     }

//     static create(dat44a) {
//         const authorIdx = authorItems.length;
//         authorItems.push(this.newAuthor());
//         authorItems[authorIdx].name = dat44a.name;
//         authorItems[authorIdx].age = dat44a.age;
//         authorItems[authorIdx].books = dat44a.books;
//         authorItems[authorIdx].info = dat44a.info;
//         authorItems[authorIdx].photo = dat44a.photo;
//         this.commit(authorIdx, authorItems[authorIdx], 'create');
//     }

//     static commit(idx, obj, opp) {
//         console.log('ready {opp}' + idx + '  ' + JSON.stringify(obj));
//     }

//     static all() {
//         var result = [];
//         result.push(...authorItems);
//         // console.log('all ' + result.length);
//         return result;
//     }

//     static find(id) {
//         let first = authorItems.filter(author => id == author.id)[0];
//         return first;
//     }

//     static update(data) {
//         let author = authorItems.filter(author => data.id == author.id)[0];
//         const authorIdx = authorItems.indexOf(author);
//         authorItems[authorIdx].name = data.name;
//         authorItems[authorIdx].age = data.age;
//         authorItems[authorIdx].books = data.books;
//         authorItems[authorIdx].info = data.info;
//         authorItems[authorIdx].photo = data.photo;
//         this.commit(authorIdx, authorItems[authorIdx], 'update');
//     }

//     static delete(id) {
//         let author = authorItems.filter(author => id == author.id)[0];
//         const authorIdx = authorItems.indexOf(author);
//         authorItems.splice(authorIdx, 1);
//     }

//     static deleteAll() {
//         const authorIdx = 1 - 1;
//         const count = this.size();
//         authorItems.splice(authorIdx, count);
//     }

//     static newAuthor() {
//         var newAuthor = {
//             id: this.size() + 1,
//             name: "",
//             books: [],
//             info: "",
//             age: "",
//             photo: ""
//         };
//         return newAuthor;
//     }

//     static generate20Authors() {
//         [1, 1, 1, 1, 1,
//             1, 1, 1, 1, 1,
//             1, 1, 1, 1, 1,
//             1, 1, 1, 1, 1].map(time => {
//                 let author = this.newAuthor();
//                 author.name = "Authors_" + author.id;
//                 author.books = author.id % 2 == 0 ? [1, 2, 3] : [4, 5, 6];
//                 author.info = "Description_" + author.id;
//                 author.age = author.id % 2 == 0 ? 2002 : 2004;
//                 author.cover_img = author.id % 2 == 0 ? AuthorImage1 : (author.id % 3 == 0 ? AuthorImage2 : AuthorImage3);
//                 this.create(author);
//             });
//     }
// }

// export default AuthorsProvider;