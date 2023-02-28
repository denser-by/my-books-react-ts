import React from "react";
import './mainpage.css'
import ContextMenu from './../ContextMenu/ContextMenu';

const MainPage = ({ selectedItem, setSelectedItem, navigator }) => {

    function displayCurrent(sel) {
        let result = "undef"
        navigator.map(item =>
            result = ((sel == item.icon) ? item.text : result)
        )
        return result;
    }

    function getOps(sel, booksOps, authorsOps, searchOps, aboutOps) {
        let first = navigator.filter(item => sel == item.icon)[0];
        return first.text == "Books" ? booksOps : (first.text == "About" ? aboutOps : (first.text != "Search" ? authorsOps : searchOps));
    }

    const contextOpsBooks = [
        { icon: "anchor", href: "/create", name: "Create" },
        { icon: "anchor", href: "/delete", name: "Delete" },
        { icon: "anchor", href: "/view", name: "View" },
        { icon: "anchor", href: "/edit", name: "Edit" },
        { icon: "anchor", href: "/eraseAll", name: "Erase All" },
        { icon: "anchor", href: "/generate20", name: "Generate 20" }
    ]

    const contextOpsAuthors = [
        { icon: "anchor", href: "/view", name: "View" },
        { icon: "anchor", href: "/edit", name: "Edit" }
    ]

    const contextOpsSearch = [
    ]

    const contextOpsAbout = [
        { icon: "anchor", href: "/contacts", name: "Contacts" },
        { icon: "anchor", href: "/order", name: "Order" },
        { icon: "anchor", href: "/info", name: "Info" }
    ]

    return (
        <div className="mainPage">
            <h4>{displayCurrent(selectedItem)}</h4>
            <ContextMenu selectedItem={selectedItem} operations={getOps(selectedItem, contextOpsBooks, contextOpsAuthors, contextOpsSearch, contextOpsAbout)} />
            <span className="centerPanel">World</span>
        </div>
    );
};

export default MainPage;