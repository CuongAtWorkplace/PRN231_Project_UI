import React from 'react';
import { BrowserRouter, Switch, Route, Router } from 'react-router-dom';
import './App.css';
import { CommentBrowseTable } from './compoments/table/CommentBrowseTable';
import { SideBar } from './compoments/SideBar/SideBar';
import { Table } from './compoments/table/Table';
import { Reporter } from './compoments/Reporter/Reporter';
import { ListGenre } from './compoments/Leader/ListGenre';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from './compoments/Login/Login';
import NewsDetail from './compoments/Home/NewsDetail';
import Header from './compoments/Home/Header';
import NewsByGenre from './compoments/Home/NewsByGenre';
import { UserDetail } from './compoments/Home/UserDetail';
import Home from './compoments/Home/Home';

import { Ok } from './Pages/Ok';
import Advertisement from './compoments/advertise/advertisement';
import { AdvertisementTable } from './compoments/table/AdvertisementTable';
import SaveNews from './compoments/User/SaveNews';
import SearchNews from './compoments/Home/SearchNews';
import ListAdvertisement from './compoments/User/ListAdvertisement';
//import { AccountProfile } from './compoments/AccountProfile/AccountProfile';

import { TestSocket } from './compoments/TestFile/TestSocket';

function App() {
  return (
    <BrowserRouter>
      <Switch>
       
        <Route exact path="/"><Home/></Route>
        <Route exact path="/advertisement"><Advertisement/></Route>
        <Route exact path="/listadvertisement"><ListAdvertisement/></Route>
        <Route path="/newsdetail/:id"> <NewsDetail/></Route>
        <Route path="/newsbygenre/:Gid"><NewsByGenre/></Route>
        <Route path="/user"><UserDetail/></Route>
        <Route path="/savenews/:Nid"><SaveNews/></Route>
        <Route path ="/header"><Header/></Route>
        <Route path ="/Ok/:amount"><Ok/></Route>
        <Route path="/search/:newsname"> <SearchNews/></Route>
      </Switch>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </BrowserRouter>);
}

export default App;