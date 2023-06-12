import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import { CommentBrowseTable } from './compoments/table/CommentBrowseTable';
import { SideBar } from './compoments/SideBar/SideBar';
import { Table } from './compoments/table/Table';

function App() {
  return (
    <div>
      <BrowserRouter>
        <SideBar />
      </BrowserRouter>
    </div>);
}

export default App;
