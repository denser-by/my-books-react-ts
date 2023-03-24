import React, { useState, useEffect } from 'react';
import './userslistpage.css';
import './../../components/ContextMenu/contextmenu.css';
import TableCompon from '../../components/TableCompon.js';
import { getColumns } from './userColumns.js';
import { fineDate } from './../common.js';

const UsersListPage = ({ setPageRef, pr }) => {
    if (pr.indexOf("UsersAll") < 1) return;

    const [userPageState, setUserPageState] = useState({
        pageSize: 10,
        pageNumber: 0
    });
    const [listUserItems, setListUserItems] = useState([]);

    function mouseClickUser(e) {
        setPageRef(e.target.id);
    }

    useEffect(() => {
        fetch('http://localhost:3001/users')
            .then((response) => response.json())
            .then(entireBody => {
                var userItems = [];
                var seq_num = 1;
                entireBody.map(userItem => {
                    userItems.push({
                        seq_num: seq_num,
                        login: userItem.login,
                        first_name: userItem.first_name,
                        last_name: userItem.last_name,
                        deleted: userItem.deleted,
                        mailbox: userItem.email,
                        modified: fineDate(new Date(userItem.updatedAt)),
                        view: "/viewUser?id=" + userItem.id,
                    });
                    seq_num++;
                })
                setListUserItems(userItems);
            });
    }, [userPageState]);

    const columnItems = React.useMemo(() => getColumns(mouseClickUser), []);

    return (
        <div className='usersList' id="idUserListPage" name="idUserListPage">
            <TableCompon columnItems={columnItems} dataItems={listUserItems} curPageSize={userPageState.pageSize} curPageIndex={userPageState.pageNumber}
                cssRowH={'usersListHeader'} cssCellH={'usersInfoHeader'} cssRow={'usersListItem'} cssCell={'usersInfoItem'} />
        </div>
    );
};

export default UsersListPage;