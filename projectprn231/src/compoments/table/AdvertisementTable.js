import { Button } from '@mui/base';
import { DataGrid } from '@mui/x-data-grid';
import React, { Component } from "react";
import "./CommentTable.css"


const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'User', headerName: 'Name', width: 200 },
  { field: 'AdvertisementType', headerName: 'Title', width: 100 },
  { field: 'Title', headerName: 'Content', width: 200 },
  { field: 'Image', headerName: 'Date', width: 300 },
  { field: 'CreatedDate', headerName: 'Date', width: 300 },
  { field: 'EndDate', headerName: 'Date', width: 300 },
  { field: 'Description', headerName: 'Date', width: 300 },

];

export class AdvertisementTable extends Component {
  constructor(props) {
    super(props);
    this.selectedRows = [];
    this.state = {
      rows: [],
    };
  }

  componentDidMount() {
    this.refreshList();
  }

  handleCheckboxChange = (selectionModel) => {
    this.selectedRows = selectionModel;
    // Lặp qua từng ID trong mảng selectedRows và gọi phương thức updateCommentTrue

  }

  updateSelectedRows = () => {
    this.selectedRows.forEach((id) => {
      this.updateCommentTrue(id);
    });
    alert("ok");
    window.location.reload();
  }
  deleteSelectedRows = () => {
    this.selectedRows.forEach((id) => {
      this.updateCommentFalse(id);
    });
    alert("ok");
    window.location.reload();
  }

  refreshList() {
  
  }
  


  render() {


    return (
      <div>
        <h2>Comment Management </h2>

        <div className='TableLayout'>
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={this.state.rows}
              columns={columns}
              pageSize={5}
              checkboxSelection
              onRowSelectionModelChange={this.handleCheckboxChange}
            />
          </div>
        </div>
        <div class="button-container">
            <Button className='btn1' onClick={this.updateSelectedRows}>Confirm</Button>
            <Button className='btn2' onClick={this.deleteSelectedRows}>Delete</Button>
          </div>
      </div>
    );
  }
}

