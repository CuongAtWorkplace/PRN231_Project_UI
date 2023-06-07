import { DataGrid } from '@mui/x-data-grid';
import React, { Component } from "react";

const columns = [
{ field: 'id', headerName: 'ID', width: 200 },
  { field: 'title', headerName: 'Full Name', width: 200 },
  { field: 'content', headerName: 'Password', width: 150 },
  { field: 'createDate', headerName: 'Phone', width: 150 },
  { field: 'fullName', headerName: 'Address', width: 200 },
];

export class CommentBrowseTable extends Component {
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
    fetch("https://localhost:7248/api/Comment/GetCommentBrowseList")
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
          checkboxSelection
        />
      </div>
    );
  }
}

