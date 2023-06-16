import React from 'react';
import { BrowserRouter, Switch, Route,Router } from 'react-router-dom';
import './App.css';
import { CommentBrowseTable } from './compoments/table/CommentBrowseTable';
import { SideBar } from './compoments/SideBar/SideBar';
import { Table } from './compoments/table/Table';
import { Reporter } from './compoments/Reporter/Reporter';
import { ListGenre } from './compoments/Leader/ListGenre';
import Home from './compoments/Home/Home';
import NewsDetail from './compoments/Home/NewsDetail';
import Login from './compoments/Login/Login';
function App() {
  return (
    <div>
      {/* <BrowserRouter>
   <Login/>
      </BrowserRouter> */}
     
        <BrowserRouter> 
        <Switch>

        <Route exact path="/login"><Login/></Route>
        <Route path="/home"><Home/></Route>
        <Route path="/newsdetail/:id"> <NewsDetail/></Route>
          {/* <Route path="/newsdetail/:id" NewsDetail />
          <Route path="/home" component={Home} /> */}
           </Switch>
        </BrowserRouter>
          
   
    </div>
  );

}

export default App;
