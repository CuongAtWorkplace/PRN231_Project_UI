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

import ModalHome from './compoments/Home/ModalHome';
import { Ok } from './Pages/Ok';
import Advertisement from './compoments/advertise/advertisement';
import { AdvertisementTable } from './compoments/table/AdvertisementTable';
function App() {
  return (
    <BrowserRouter>
      {/* <Switch>
        <Route exact path="/" component={Advertisement} />
        <Route exact path="/ad" component={AdvertisementTable} />

        <Route exact path="/Ok" component={Ok} />
        <Route exact path="/Ok/:amount" component={Ok} />

      </Switch> */}
      <SideBar/>
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
