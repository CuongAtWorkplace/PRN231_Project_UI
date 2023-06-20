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
import Home from './compoments/Home/Home';
import NewsDetail from './compoments/Home/NewsDetail';
import Header from './compoments/Home/Header';
import NewsByGenre from './compoments/Home/NewsByGenre';
import { UserDetail } from './compoments/Home/UserDetail';
import { LoginByGoogle } from './compoments/TestFile/LoginByGoogle';
import { LoginByFaceBook } from './compoments/TestFile/LoginByFaceBook';
function App() {
  return (
    <div>
      <BrowserRouter>
        {/* <Switch>
      <Route exact path="/login"><Login/></Route>
        <Route path="/home"><Home/></Route>
        <Route path="/newsdetail/:id"> <NewsDetail/></Route>

        <Route path="/newsbygenre/:Gid"><NewsByGenre/></Route>
        <Route path="/user"><UserDetail/></Route>
      </Switch> */}
        <SideBar />
      </BrowserRouter>
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

    </div>
  );

}

export default App;
