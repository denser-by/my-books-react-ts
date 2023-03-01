import React, { useState } from 'react';
import './authorslistpage.css'

const AuthorsListPage = ({ authorItems }) => {

    return (
        <span className='authorsList'>
            {authorItems.map(author =>
                <div className='authorsListItem'>List of authors {author.name}</div>
            )}
        </span>
    );
};

export default AuthorsListPage;