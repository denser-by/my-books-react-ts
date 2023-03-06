import { useState } from 'react';
import './authorslistpage.css';
import './../../components/ContextMenu/contextmenu.css';
import AuthorsProvider from '../../model/AuthorsProvider';

const AuthorsListPage = ({ setPageRef }) => {
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
                                    className={curSelect.id == "/viewAuthor?id=" + author.id ? "contextOp selected" : (above.id == "/viewAuthor?id=" + author.id ? "contextOp above" : "contextOp")}
                                    onMouseOver={mouseOver} onMouseOut={mouseOut} onClick={mouseClick}>
                                    View
                                </span>
                            </td>
                            <td>
                                <span id={"/editAuthor?id=" + author.id}
                                    className={curSelect.id == "/editAuthor?id=" + author.id ? "contextOp selected" : (above.id == "/editAuthor?id=" + author.id ? "contextOp above" : "contextOp")}
                                    onMouseOver={mouseOver} onMouseOut={mouseOut} onClick={mouseClick}>
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