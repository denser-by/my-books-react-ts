import React from "react";
import './navitem.css'

const NavItem = ({ icon, text, selectedItem, setSelectedItem }) => {
    return (
        <span className='navBarItem' onClick={() => setSelectedItem(icon)}>
            <span className={selectedItem == icon ? "material-icons navBarButton selected" : "material-icons navBarButton"}>{icon}</span>
            <span className={selectedItem == icon ? "navBarText selected" : "navBarText"}>{text}</span>
        </span>
    );
};

export default NavItem;