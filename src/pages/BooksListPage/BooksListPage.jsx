import { useState } from 'react';
import './bookslistpage.css';
import './../../components/ContextMenu/contextmenu.css';
import axios from 'axios';
import BooksProvider from '../../model/BooksProvider';

const BooksListPage = ({ setPageRef }) => {
    const [above, setAbove] = useState("")
    const [curSelect, setCurSelect] = useState("")

    function mouseOver(e) {
        setAbove(e.target)
    }

    function mouseOut() {
        setAbove("")
    }

    function mouseClick(e) {
        setCurSelect(e.target)
        setPageRef(e.target.id)
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

    return (
        <span className='booksList'>
            <table>
                <thead>
                    <tr>
                        <th className='booksInfoHeader'>
                            <span>Name</span>
                        </th>
                        <th className='booksInfoHeader'>
                            <span>Published</span>
                        </th>
                        <th className='booksInfoHeader'>
                            <span>View</span>
                        </th>
                        <th className='booksInfoHeader'>
                            <span>Edit</span>
                        </th>
                        <th className='booksInfoHeader'>
                            <span>Delete</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {bookItems.map(book =>
                        <tr className='booksListItem' key={book.id}>
                            <th className='booksInfoItem'>{book.name}</th>
                            <th className='booksInfoItem'>{book.year}</th>
                            <th>
                                <span id={"/viewBook?id=" + book.id}
                                    className={curSelect.id == "/viewBook?id=" + book.id ? "contextOp selected" : (above.id == "/viewBook?id=" + book.id ? "contextOp above" : "contextOp")}
                                    onMouseOver={mouseOver} onMouseOut={mouseOut} onClick={mouseClick}>
                                    View
                                </span>
                            </th>
                            <th>
                                <span id={"/editBook?id=" + book.id}
                                    className={curSelect.id == "/editBook?id=" + book.id ? "contextOp selected" : (above.id == "/editBook?id=" + book.id ? "contextOp above" : "contextOp")}
                                    onMouseOver={mouseOver} onMouseOut={mouseOut} onClick={mouseClick}>
                                    Edit
                                </span>
                            </th>
                            <th>
                                <span id={"/deleteBook?id=" + book.id}
                                    className={curSelect.id == "/deleteBook?id=" + book.id ? "contextOp selected" : (above.id == "/deleteBook?id=" + book.id ? "contextOp above" : "contextOp")}
                                    onMouseOver={mouseOver} onMouseOut={mouseOut} onClick={mouseClick}>
                                    Delete
                                </span>
                            </th>
                        </tr>
                    )}
                </tbody>
            </table>
        </span>
    );
};

export default BooksListPage;