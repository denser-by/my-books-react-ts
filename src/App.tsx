// import React, { useState } from 'react';
import React, { useState, useEffect } from 'react';
import './App.css';
import NavItem from './components/NavItem/NavItem';
import MainPage from './components/main/MainPage';
import { LoginForm } from './pages/LoginForm';

function App() {

  const navBarItems = [
    { icon: "apps", href: "/books", text: "Books" },
    { icon: "assignment_ind", href: "/authors", text: "Authors" },
    { icon: "android", href: "/search", text: "Search" },
    { icon: "archive", href: "/about", text: "About" },
  ]

  const [navItemSelected, setNavItemSelected] = useState("apps")


  var apiUrl = 'https://localhost:3001/books/';

  const [posts, setPosts] = useState([]);
  useEffect(() => {
    //  fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
     fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
           console.log(data);
           setPosts(data);
        })
        .catch((err) => {
           console.log(err.message);
        });
  }, []);

  return (
    <div className="App">

      {/* <LoginForm /> */}


      {posts.map(post =>
                <div>
{JSON.stringify(post)}
                </div>
      )}


      <nav className='navBar'>
        <span className='navBarWrap'>
          {navBarItems.map(item =>
            <NavItem selectedItem={navItemSelected} setSelectedItem={setNavItemSelected} icon={item.icon} text={item.text} />
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