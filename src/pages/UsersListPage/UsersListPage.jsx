import React, { useState } from 'react';
import './userslistpage.css';
import './../../components/ContextMenu/contextmenu.css';
import TableCompon from '../../components/TableCompon.js';
// import SvcUsers from '../../service/SvcUsers';
import AuthorsProvider from '../../model/AuthorsProvider';

const UsersListPage = ({ setPageRef }) => {
    const [aboveUser2, setAboveUser2] = useState("");
    const [curSelectUser, setCurSelectUser] = useState("");

    let aboveUser = '';
    function setAboveUser(param) {
        aboveUser = param;
        setAboveUser2(param);
    }

    function mouseOverUser(e) {
        setAboveUser(e.target);
    }

    function mouseOutUser() {
        setAboveUser("");
    }

    function mouseClickUser(e) {
        setCurSelectUser(e.target);
        setPageRef(e.target.id);
    }

    async function getData(url = "", data = {}) {
        const response = await fetch(url, {
            method: "GET",
            mode: "same-origin",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            redirect: "follow",
            referrerPolicy: "same-origin",
            // body: JSON.stringify(data),
        });
        return response.json();
    }

    getData("http://localhost:3001/books", { answer: 123 }).then((data) => {
        console.log(data);
    });

    fetch('http://localhost:3001/users')
        .then((response) => response.json())
        .then((data) => console.log(data))

        .then(userItem => {

            console.log('item::' + userItem);

        }).catch(e => {
            console.log('Error: ' + e);
        });

    let userItems = AuthorsProvider.all();
    // let userItems = SvcUsers.getAll();

    userItems.map(user => {
        user.view = "/viewUser?id=" + user.id;
        user.edit = "/editUser?id=" + user.id;
    });

    const columnItems = React.useMemo(
        () => [
            {
                Header: 'Name',
                accessor: 'name',
            },
            {
                Header: 'Since',
                accessor: 'age',
            },
            {
                Header: 'Amount',
                accessor: 'numOfBooks',
            },
            {
                Header: 'View',
                accessor: 'view',
                Cell: (row: CellProps<any>) => {
                    const obj = "" + row.cell.value;
                    return <span id={obj}
                        className={aboveUser === obj ? "contextOp above" : "contextOp"}
                        onMouseOver={mouseOverUser} onMouseOut={mouseOutUser} onClick={mouseClickUser}
                    >View</span>;
                },
            },
            {
                Header: 'Edit',
                accessor: 'edit',
                Cell: (row: CellProps<any>) => {
                    const obj = "" + row.cell.value;
                    return <span id={obj}
                        className={aboveUser === obj ? "contextOp above" : "contextOp"}
                        onMouseOver={mouseOverUser} onMouseOut={mouseOutUser} onClick={mouseClickUser}
                    >Edit</span>;
                },
            },
        ],
        []
    )

    return (
        <div className='usersList' id="idUserListPage" name="idUserListPage">
            <TableCompon columnItems={columnItems} dataItems={userItems} defPage={15}
                cssRowH={'usersListHeader'} cssCellH={'usersInfoHeader'} cssRow={'usersListItem'} cssCell={'usersInfoItem'} />
        </div>
    );
};

export default UsersListPage;