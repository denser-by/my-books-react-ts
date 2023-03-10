import React, { useState, useEffect } from 'react';
import './App.css';
import NavItem from './components/NavItem/NavItem';
import MainPage from './pages/main/MainPage';

function App() {

  const navBarItems = [
    { icon: "apps", href: "/books", key: "nbi1", text: "Books" },
    { icon: "assignment_ind", href: "/authors", key: "nbi2", text: "Authors" },
    { icon: "android", href: "/search", key: "nbi3", text: "Search" },
    { icon: "archive", href: "/about", key: "nbi4", text: "About" },
  ]

  const [navItemSelected, setNavItemSelected] = useState("apps")

  return (
    <div className="App">
      <nav className='navBar'>
        <span className='navBarWrap'>
          {navBarItems.map(item =>
            <NavItem key={item.key} 
              selectedItem={navItemSelected} setSelectedItem={setNavItemSelected} icon={item.icon} text={item.text} />
          )}
        </span>
      </nav>
      <main>
        <MainPage selectedItem={navItemSelected} setSelectedItem={setNavItemSelected} navigator={navBarItems} />
      </main>
    </div>
  );
}

export default App;