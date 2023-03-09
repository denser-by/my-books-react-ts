const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db.sqlite3');


class BooksProviderSqlite {

    static forseClose() {
        db.close();
    }

    async size() {
        let result = db.get("SELECT COUNT(*) booksNum FROM books", []);
        console.log("result=" + result + "-" + JSON.stringify(result) + "-" + result.booksNum);

        db.get("SELECT COUNT(*) booksNum FROM books", [], (err, row) => {
            console.log("row=" + row + "-" + JSON.stringify(row) + "-" + row.booksNum);
            return row.booksNum;
        });

        return result;
    }
}

module.exports = BooksProviderSqlite;