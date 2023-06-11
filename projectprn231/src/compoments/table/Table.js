import { DataGrid } from '@mui/x-data-grid';
import React, { Component } from "react";

const columns = [
  { field: 'fullName', headerName: 'Full Name', width: 200 },
  { field: 'password', headerName: 'Password', width: 150 },
  { field: 'phone', headerName: 'Phone', width: 150 },
  { field: 'address', headerName: 'Address', width: 200 },
  { field: 'roleId', headerName: 'Role ID', width: 100 },
];

export class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
    };
  }
  
  componentDidMount() {
    this.refreshList();
  }
  
  refreshList() {
    fetch("https://localhost:7248/api/User/GetAllUser")
      .then(response => response.json())
      .then(data => {
        this.setState({ rows: data });
      });
  }


  render() {
    return (
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={this.state.rows}
          columns={columns}
          pageSize={5}
        />
      </div>
    );
  }
}

