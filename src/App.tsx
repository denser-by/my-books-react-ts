import React, { useState } from 'react';
import './App.css';
import NavItem from './components/NavItem/NavItem';

function App() {

  const navBarItems = [
    { icon: "apps", href: "/books", text: "Books" },
    { icon: "assignment_ind", href: "/authors", text: "Authors" },
    { icon: "android", href: "/search", text: "Search" },
    { icon: "archive", href: "/about", text: "About" },
  ]

  const [navItemSelected, setNavItemSelected] = useState("apps")

  return (
    <div className="App">

      <nav className='navBar'>
        {navBarItems.map(item =>
          <NavItem selectedItem={navItemSelected} setSelectedItem={setNavItemSelected} icon={item.icon} text={item.text} />
        )}
      </nav>

      <main>
        Hello
      </main>

    </div>
  );
}

export default App;