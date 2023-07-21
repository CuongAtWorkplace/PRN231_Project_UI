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
import { Admin_Home } from './Pages/Admin_Home';
function App() {
  return (
    <BrowserRouter>
       <Route exact path="/" component={Advertisement} /> 

        <Route path="/ad" component={AdvertisementTable} />
        <Route path="/table" component={Table} />
        <Route path="/comment" component={CommentBrowseTable} />
        <Route path="/home" component={Admin_Home} />
        <Route exact path="/Ok" component={Ok} />
        <Route exact path="/Ok/:amount" component={Ok} /> 
      </BrowserRouter>
)
{/*}
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
      }
export default App;
