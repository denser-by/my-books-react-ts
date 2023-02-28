import React, {useState} from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import Menu from './Menu/Menu';
import Modal from './Modal/Modal';

function App() {
  const menuItems = [
    {value:"Приветствие", href:'/main', icon: "android"},
    {value:"Достижения", href:'/extension', icon: "apps"},
    {value:"Комманда", href:'/people', icon: "assignment_ind"},
    {value:"В последнее время", href:'/news', icon: "announcement"},
    {value:"О нас", href:'/about', icon: "archive"}
  ]

  const [menuActive, setMenuActive] = useState(false)
  const [modalActive, setModalActive] = useState(false)


  function onMenuOpen() {
    setMenuActive(!menuActive)
  }

  function openModalDialog() {
    setModalActive(!modalActive)
  }

  return (
    <div className="App">
      <nav>
        <div className='burger-btn' onClick={onMenuOpen}>
          <span />
        </div>
      </nav>
      <main>
        <button className='open-btn' onClick={openModalDialog}>Открыть окно</button>
        <p>Hello</p>
      </main>

      <Modal active={modalActive} setActive={setModalActive} >
        <form action="">
          <input type='text' />
          <input type='text' />
          <input type='text' />
          <button></button>
        </form>
      </Modal>


      <Menu active={menuActive} setActive={setMenuActive} header={"Меню закладки"} items={menuItems} />


      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Counter />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <a
            className="App-link"
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className="App-link"
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span>
      </header>
    </div>
  );
}

export default App;
