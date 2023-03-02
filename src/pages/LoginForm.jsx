import * as React from 'react';
import './loginform.css';

const LoginForm = () => {
    return (
        <div className='loginForm'>
            <form>
                <div>
                    <label htmlFor="email">Email</label>
                    <input id="email" type="text" />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" />
                </div>
                <button>Submit</button>
            </form>
        </div>
    );
};

export { LoginForm };