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
//import { AccountProfile } from './compoments/AccountProfile/AccountProfile';

import { TestSocket } from './compoments/TestFile/TestSocket';
import { Admin_UserManagement } from './Pages/Admin_UserManagement';

function App() {
  return (
    <BrowserRouter>
    <Switch>
      {/* <Switch>
      <Route exact path="/" component={Advertisement} />
      <Route exact path="/ad" component={AdvertisementTable} />
    <Switch>

    <Route  path="/login"><Login/></Route>
      <Route exact path="/"><Home/></Route>
      <Route exact path="/Advertisement"><Advertisement/></Route>
      <Route path="/newsdetail/:id"> <NewsDetail/></Route>
      <Route path="/newsbygenre/:Gid"><NewsByGenre/></Route>
      <Route path="/user"><UserDetail/></Route>
      <Route path="/savenews/:Nid"><SaveNews/></Route>
      <Route path ="/header"><Header/></Route>
  
    
      {/* <Route exact path="/" component={Advertisement} /> */}

      {/* <Route path="/" component={Advertisement} />
      <Route path="/ad" component={AdvertisementTable} />

      <Route exact path="/Ok" component={Ok} />
      <Route exact path="/Ok/:amount" component={Ok} /> */}
    {/* <TestSocket/> */}
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