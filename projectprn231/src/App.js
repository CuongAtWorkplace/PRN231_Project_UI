import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import { CommentBrowseTable } from './compoments/table/CommentBrowseTable';
import { SideBar } from './compoments/SideBar/SideBar';
import { Table } from './compoments/table/Table';
import { Reporter } from './compoments/Reporter/Reporter';
import { ListGenre } from './compoments/Leader/ListGenre';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Admin_Home } from './Pages/Admin_Home';
import Advertisement from './compoments/advertise/advertisement';
import { Ok } from './Pages/Ok';

function App() {
  return (
    <div>
      <BrowserRouter>
        <SideBar />
      </BrowserRouter>

    </div>
  );

}

export default App;
