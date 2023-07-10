import { Button } from '@mui/base';
import { DataGrid } from '@mui/x-data-grid';
import React, { Component } from "react";
import "./CommentTable.css"


const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'username', headerName: 'Name', width: 200 },
  { field: 'adType', headerName: 'Advertisement Type', width: 100 },
  { field: 'title', headerName: 'Title', width: 200 },
  { field: 'description', headerName: 'Description', width: 300 },
  { field: 'image', headerName: 'Image', width: 300 },
  { field: 'createdDate', headerName: 'Created Date', width: 300 },
  { field: 'endDate', headerName: 'Created Date', width: 300 },
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
      this.DeleteAdorder(id);
    });
    alert("ok");
    window.location.reload();
  }

  refreshList() {
    fetch("https://localhost:7248/api/AdertisementOrder/GetAdertisementOrderByApprove")
      .then(response => response.json())
      .then(data => {
        // Kiểm tra dữ liệu và thêm thuộc tính selected mặc định nếu không có
        const rowsWithData = data.map(row => ({
          ...row,
          selected: row.selected || false,
        }));

        this.setState({ rows: rowsWithData });
      });
  }


  updateCommentTrue = (id) => {
    fetch(`https://localhost:7248/api/AdertisementOrder/UpdateIsApprove/isApprove/${id}`, {
      method: 'POST',
    })
      .then(response => response.json())
      .then(data => {
        // Cập nhật trạng thái của comment đã được xác nhận thành true
        // Ví dụ:
        const updatedRows = this.state.rows.map(row => {
          if (row.id === id) {
            return {
              ...row,
              confirmed: true,
            };
          }
          return row;
        });

        this.setState({ rows: updatedRows });
      })
      .catch(error => {
        console.error('Error updating comment:', error);
      });
  }

  DeleteAdorder = (id) => {
    fetch(`https://localhost:7248/api/AdertisementOrder/DeleteAdvertisementOrder?id=${id}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => {
        // Cập nhật trạng thái của comment đã được xác nhận thành true
        // Ví dụ:
        const updatedRows = this.state.rows.map(row => {
          if (row.id === id) {
            return {
              ...row,
              confirmed: true,
            };
          }
          return row;
        });

        this.setState({ rows: updatedRows });
      })
      .catch(error => {
        console.error('Error updating comment:', error);
      });
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

