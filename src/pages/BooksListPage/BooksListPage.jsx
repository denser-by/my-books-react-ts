import React, { useState } from 'react';
import './bookslistpage.css';
import './../../components/ContextMenu/contextmenu.css';
import axios from 'axios';
import BooksProvider from '../../model/BooksProvider';
import TableCompon from '../../components/TableCompon.js';
// import mongoose from 'mongoose';
// import { Appointment } from '../../model/sequelizeEntryPoint';
// import Book from '../../model/Book';
// const mysql = require('mysql');
// import mysql from 'mysql';
// const { Sequelize } = require('sequelize');
// const { Client } = require('pg');
// const Pool = require('pg').Pool;
// const mysql2 = require('mysql2');
// import mysql from 'mysql2';
// const mariadb = require('mariadb');
// import mariadb from 'mariadb';
// import { openDatabase } from 'react-native-sqlite-storage';
// const sqlite3 = require('sqlite3').verbose();
// import sqlite3 from 'sqlite3';
// var Connection = require('tedious').Connection;
// import {Connection} from 'tedious';
// let oracledb = require('oracledb');
// import oracledb from 'oracledb';




// const connection = oracledb.getConnection({
//     user: "my_books_admin",
//     password: 'password',
//     connectString: "localhost/my_books2"
// });

// var config = {
//     server: "localhost",
//     options: {},
//     authentication: {
//         type: "default",
//         options: {
//             userName: "my_books_admin",
//             password: "password",
//         }
//     }
// };
// var connection = new Connection(config);

// let db = new sqlite3.Database(':memory:');

// var db = openDatabase({ name: 'UserDatabase.db' });

// conn = mariadb.createConnection({
//     host: "localhost",
//     port: 5009,
//     ssl: { ca: serverCert },
//     user: "my_books_admin",
//     password: "password",
//     database: "my_books2",
//     trace: true,
//  });

// const connection = mysql2.createConnection({
//     host: 'localhost',
//     user: 'my_books_admin',
//     database: 'my_books2'
// });

// const pool = new Pool({
//     user: 'my_books_admin',
//     host: 'localhost',
//     database: 'my_books2',
//     password: 'password',
//     port: 5432,
// });

// const sequelize = new Sequelize('postgres://my_books_admin:pass@localhost:5432/my_books2');
// const sequelize = new Sequelize('my_books2', 'my_books_admin', 'password', {
//     host: 'localhost',
//     dialect: 'postgres' /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
// });

// const db = mysql.createConnection({
//     host: "localhost",
//     user: "my_books_admin",
//     password: "",
//     database: "my_books2"
// });

// mongoose.connect('postgres://localhost:5432/my_books2',{
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });
// const db = mongoose.connection;

const BooksListPage = ({ setPageRef }) => {
    const [aboveBook2, setAboveBook2] = useState("");
    const [curSelectBook, setCurSelectBook] = useState("");

    let aboveBook = '';
    function setAboveBook(param) {
        aboveBook = param;
        setAboveBook2(param);
    }

    function mouseOverBook(e) {
        setAboveBook(e.target.id);
    }

    function mouseOutBook() {
        setAboveBook("");
    }

    function mouseClickBook(e) {
        setCurSelectBook(e.target);
        setPageRef(e.target.id);
    }

    var allRepos = [];
    var allData = '';
    var apiUrl = 'http://localhost:3001/books';
    function checkRestFetch() {
        axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
        axios.get(apiUrl).then((repos) => {
            allRepos = repos.data;
        });
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => allData = data);
    }

    let bookItems = BooksProvider.all();
    // let bookItems = BooksProviderSqlite.all2();
    // let b = new Book({id: 1, name: 'Book1', info: 'Description_1', year:2001});
    // let ap = Appointment();

    bookItems.map(book => {
        book.view = "/viewBook?id=" + book.id;
        book.edit = "/editBook?id=" + book.id;
        book.delete = "/deleteBook?id=" + book.id;
    });

    const columnItems = React.useMemo(
        () => [
            {
                Header: 'Name',
                accessor: 'name',
            },
            {
                Header: 'Published',
                accessor: 'year',
            },
            {
                Header: 'View',
                accessor: 'view',
                Cell: (row: CellProps<any>) => {
                    const obj = "" + row.cell.value;
                    return <span id={obj}
                        className={aboveBook === obj ? "contextOp above" : "contextOp"}
                        onMouseOver={mouseOverBook} onMouseOut={mouseOutBook} onClick={mouseClickBook}
                    >View</span>;
                },
            },
            {
                Header: 'Edit',
                accessor: 'edit',
                Cell: (row: CellProps<any>) => {
                    const obj = "" + row.cell.value;
                    return <span id={obj}
                        className={aboveBook === obj ? "contextOp above" : "contextOp"}
                        onMouseOver={mouseOverBook} onMouseOut={mouseOutBook} onClick={mouseClickBook}
                    >Edit</span>;
                },
            },
            {
                Header: 'Delete',
                accessor: 'delete',
                Cell: (row: CellProps<any>) => {
                    const obj = "" + row.cell.value;
                    return <span id={obj}
                        className={aboveBook === obj ? "contextOp above" : "contextOp"}
                        onMouseOver={mouseOverBook} onMouseOut={mouseOutBook} onClick={mouseClickBook}
                    >Delete</span>;
                },
            },
        ],
        []
    )

    return (
        <div className='booksList' id="idBooksListPage" name="idBooksListPage">
            <TableCompon columnItems={columnItems} dataItems={bookItems} defPage={15}
                cssRowH={'booksListHeader'} cssCellH={'booksInfoHeader'} cssRow={'booksListItem'} cssCell={'booksInfoItem'} />
        </div>
    );
};

export default BooksListPage;