import { Button } from '@mui/base';
import { DataGrid } from '@mui/x-data-grid';
import React, { Component } from "react";
import "./CommentTable.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'username', headerName: 'Name', width: 200 },
  { field: 'adType', headerName: 'Advertisement Type', width: 100 },
  { field: 'title', headerName: 'Title', width: 200 },
  { field: 'description', headerName: 'Description', width: 300 },
  {
    field: 'image',
    headerName: 'Image',
    width: 300,
    renderCell: (params) => {
      const handleClick = () => {
        const fileName = encodeURIComponent(params.value);
        const url = `https://localhost:7248/api/User/DisplayImage?fileName=${fileName}`;
        window.open(url, '_blank');
      };
      return (
        <a href="#" onClick={handleClick}>
          View Image
        </a>
      );
    }    
  },
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
    const selectedRows = this.selectedRows;
    const promises = [];
  
    selectedRows.forEach((id) => {
      this.updateCommentTrue(id);
      const row = this.state.rows.find(row => row.id === id);
      const amount = row.adType; // Thay "amount" bằng tên cột chứa giá trị amount
      const adId = row.id; // Thay "id" bằng tên cột chứa giá trị adId
      const userId = row.userId; // Thay "userId" bằng tên cột chứa giá trị UserId
  
      const promise = this.sendEmail(amount, adId, userId);
      promises.push(promise);
    });
  
    Promise.all(promises)
      .then(() => {
        toast.success("Emails sent successfully!");
        setTimeout(() => {
          window.location.reload();
        }, 5000); // Reload after 5 seconds
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error sending emails!");
        setTimeout(() => {
          window.location.reload();
        }, 5000); // Reload after 5 seconds
      });
  };
  
  
  

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
          userId: row.userId, // Cập nhật giá trị cho cột "userId"
        }));

        this.setState({ rows: rowsWithData });
      });
  }

  sendEmail = (amount, adId, userId) => {
    console.log("Sending email to user with userId:", userId);

    fetch(`https://localhost:7248/api/User/GetUserById?id=${userId}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error fetching user data');
        }
      })
      .then(user => {
        const emailData = {
          to: user.email, // Email người nhận từ đối tượng user
          subject: 'Payment Announcement', // Tiêu đề email
          text: `
          You can pay your payment in this link: http://localhost:16262/vnpay_pay.aspx?amount=${amount}&adId=${adId}
        
          
          Join us to catch the opportunity and become successful!
        
          Contact Us :
          Advertising Department
             Address: Gas Station 39 National Highway 21, Thach Hoa Commune, Thach That District, Hanoi
             Phone: 0964918288, Hotline: 0944775777
        ` // Nội dung email dưới dạng text
        };
  
        fetch('https://localhost:7248/api/Email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(emailData)
        })
        .then(response => {
          if (response.ok) {
            toast.success("Send Email Successfully!");
            return response.text();
          } else {
            throw new Error('Error sending email');
          }
        })
        .then(result => {
          console.log(result);
          // Xử lý kết quả, ví dụ: hiển thị thông báo gửi email thành công
        })
        .catch(error => {
          console.error(error);
          // Xử lý lỗi, ví dụ: hiển thị thông báo lỗi
        });
      })
      .catch(error => {
        console.error(error);
        // Xử lý lỗi khi lấy dữ liệu người dùng, ví dụ: hiển thị thông báo lỗi
      });
  };
  

  

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
        <h2>Advertisement Management </h2>

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

