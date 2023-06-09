import { Button } from '@mui/base';
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
    this.selectedRows=[];
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
  

  updateCommentTrue = (id) => {
    fetch(`https://localhost:7248/api/Comment/UpdateCommentTrue?Id=${id}`, {
      method: 'PUT',
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


  refreshList() {
    fetch("https://localhost:7248/api/Comment/GetCommentBrowseList")
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

  render() {


    return (
      <div>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={this.state.rows}
            columns={columns}
            pageSize={5}
            checkboxSelection
            onRowSelectionModelChange={this.handleCheckboxChange}
          />
        </div>
        <Button onClick={this.updateSelectedRows}>Confirm</Button>
      </div>

    );
  }
}

