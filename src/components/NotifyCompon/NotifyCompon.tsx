import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './notifycompon.css';

export function notify(msg: string) {
    console.log('__msg__' + msg + '_');
    toast(msg);
}

function NotifyCompon() {

    return (
        <span className='notifyWrap'>
            <ToastContainer />
        </span>
    );
}

export default NotifyCompon;