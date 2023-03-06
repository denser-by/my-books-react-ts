import { useState } from 'react';
import './authorslistpage.css';
import './../../components/ContextMenu/contextmenu.css';
import AuthorsProvider from '../../model/AuthorsProvider';

const AuthorsListPage = ({ setPageRef }) => {
    const [aboveAuthor, setAboveAuthor] = useState("")
    const [curSelectAuthor, setCurSelectAuthor] = useState("")

    function mouseOverAuthor(e) {
        setAboveAuthor(e.target)
    }

    function mouseOutAuthor() {
        setAboveAuthor("")
    }

    function mouseClickAuthor(e) {
        setCurSelectAuthor(e.target)
        setPageRef(e.target.id)
    }

    let authorItems = AuthorsProvider.all();

    return (
        <span className='authorsList'>
            <table>
                <thead>
                    <tr>
                        <th className='authorsInfoHeader'>
                            <span>Name</span>
                        </th>
                        <th className='authorsInfoHeader'>
                            <span>Since</span>
                        </th>
                        <th className='authorsInfoHeader'>
                            <span>Amount</span>
                        </th>
                        <th className='authorsInfoHeader'>
                            <span>View</span>
                        </th>
                        <th className='authorsInfoHeader'>
                            <span>Edit</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {authorItems.map(author =>
                        <tr className='authorsListItem' key={author.id}>
                            <td className='authorsListItem'>{author.name}</td>
                            <td className='authorsListItem'>{author.age}</td>
                            <td className='authorsListItem'>{author.numOfBooks}</td>
                            <td>
                                <span id={"/viewAuthor?id=" + author.id}
                                    className={curSelectAuthor.id == "/viewAuthor?id=" + author.id ? "contextOp selected" : (aboveAuthor.id == "/viewAuthor?id=" + author.id ? "contextOp above" : "contextOp")}
                                    onMouseOver={mouseOverAuthor} onMouseOut={mouseOutAuthor} onClick={mouseClickAuthor}>
                                    View
                                </span>
                            </td>
                            <td>
                                <span id={"/editAuthor?id=" + author.id}
                                    className={curSelectAuthor.id == "/editAuthor?id=" + author.id ? "contextOp selected" : (aboveAuthor.id == "/editAuthor?id=" + author.id ? "contextOp above" : "contextOp")}
                                    onMouseOver={mouseOverAuthor} onMouseOut={mouseOutAuthor} onClick={mouseClickAuthor}>
                                    Edit
                                </span>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </span>
    );
};

export default AuthorsListPage;