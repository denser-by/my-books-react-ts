import React, { useState } from 'react';
import './userslistpage.css';
import './../../components/ContextMenu/contextmenu.css';
import TableCompon from '../../components/TableCompon.js';

const UsersListPage = ({ setPageRef }) => {
    const [curSelectUser, setCurSelectUser] = useState("");
    const [curSelectUsersPageSize, setCurSelectUsersPageSize] = useState(12);
    const [listUserItems, setListUserItems] = useState([]);

    let aboveUser = '';
    function setAboveUser(param) {
        aboveUser = param;
    }

    function mouseOverUser(e) {
        setAboveUser(e.target.id);
        e.target.className = 'contextOp above';
    }

    function mouseOutUser(e) {
        setAboveUser('');
        e.target.className = 'contextOp';
    }

    function mouseClickUser(e) {
        setCurSelectUser(e.target);
        setPageRef(e.target.id);
    }

    fetch('http://localhost:3001/users')
        .then((response) => response.json())
        .then(entireBody => {
            var userItems = [];
            entireBody.map(userItem => {
                userItems.push({
                    login: userItem.login,
                    view: "/viewUser?id=" + userItem.id,
                    edit: "/editUser?id=" + userItem.id
                });
            })
            setListUserItems(userItems);
        });

    const columnItems = React.useMemo(
        () => [
            {
                Header: 'Username',
                accessor: 'login',
            },
        ],
        []
    )

    return (
        <div className='usersList' id="idUserListPage" name="idUserListPage">
            <TableCompon columnItems={columnItems} dataItems={listUserItems} defPage={curSelectUsersPageSize}
                cssRowH={'usersListHeader'} cssCellH={'usersInfoHeader'} cssRow={'usersListItem'} cssCell={'usersInfoItem'} />
        </div>
    );
};

export default UsersListPage;