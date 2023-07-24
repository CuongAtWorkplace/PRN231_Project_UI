import { DataGrid } from '@mui/x-data-grid';
import React, { Component } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import "./table.css";

const columns = [
  { field: 'fullName', headerName: 'Full Name', width: 100 },
  { field: 'email', headerName: 'Email', width: 150 },
  { field: 'password', headerName: 'Password', width: 150 },
  { field: 'phone', headerName: 'Phone', width: 150 },
  { field: 'address', headerName: 'Address', width: 200 },
  { field: 'roleName', headerName: 'Role Name', width: 150 },
  { field: 'createDate', headerName: 'Create Date', width: 150 },
];

export class Table extends Component {
  constructor(props) {
    super(props);
    this.selectedRows = [];
    this.state = {
      rows: [],
      open: false,
      fullName: "",
      email: "",
      password: "",
      phone: "",
      address: "",
      roleId: "1",
      image: null,
      imageName: "",
      imageUrl: "",
      activeButtonClicked: false,
      deactiveButtonClicked: false,
    };
  }

  handleSubmit = () => {
    const { fullName, email, password, phone, address, roleId, imageName  } = this.state;

    const currentDate = new Date().toISOString();

    this.uploadAvatar();

    // Gửi yêu cầu POST đến API với FormData
    fetch("https://localhost:7248/api/User/InsertUser", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fullName: fullName,
        email: email,
        password: password,
        phone: phone,
        address: address,
        roleId: roleId,
        createDate: currentDate,
        isBan: false,
        image: imageName
      })
    })
      .then(response => response.json())
      .then(result => {
        // Xử lý kết quả từ API (nếu cần)
        // Sau khi gửi yêu cầu POST thành công, làm mới trang
        window.location.reload();
      })
      .catch(error => {
        // Xử lý lỗi (nếu có)
        alert(error)
      });
  }
  updateBanRows = () => {
    this.selectedRows.forEach((id) => {
      this.updateBan(id);
    });
    alert("ok");
    window.location.reload();
  }

  handleCheckboxChange = (selectionModel) => {
    this.selectedRows = selectionModel;
    // Lặp qua từng ID trong mảng selectedRows và gọi phương thức updateCommentTrue

  }

  updateBan = (id) => {
    const { activeButtonClicked } = this.state;
    const isBan = !activeButtonClicked; // Set the desired ban status here
  
    fetch(`https://localhost:7248/api/User/UpdateBanStatus?id=${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(isBan), // Set the request body to the ban status
    })
      .then(response => response.json())
      .then(data => {
        // Update the state with the updated rows
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
  

  uploadAvatar = () => {
    const { image } = this.state;

    if (!image) {
      // Không có tệp ảnh được chọn, không thực hiện gửi yêu cầu
      return;
    }

    const formData = new FormData();
    formData.append('avatar', image);

    fetch("https://localhost:7248/api/User/ImportFile", {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(result => {
        // Xử lý kết quả từ API (nếu cần)
        console.log(result);
      })
      .catch(error => {
        // Xử lý lỗi (nếu có)
        console.error(error);
      });
  }



  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList = () =>{
    fetch("https://localhost:7248/api/User/GetAllUserBan?Ban=true")
      .then(response => response.json())
      .then(data => {
        this.setState({ rows: data });
      });
      this.setState({ activeButtonClicked: true, deactiveButtonClicked: false });
    }

  refreshListBanFalse = () =>{
    fetch("https://localhost:7248/api/User/GetAllUserBan?Ban=false")
      .then(response => response.json())
      .then(data => {
        this.setState({ rows: data });
      });
      this.setState({ activeButtonClicked: false, deactiveButtonClicked: true });

  }

  handleOpen = () => {
    this.setState({ open: true, imageUrl: "" });

  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleAvatarChange = (event) => {
    const file = event.target.files[0];
    this.setState({ image: file,
       imageName: file.name ,
       imageUrl: URL.createObjectURL(file) // Tạo URL cho ảnh
    });

  };


  render() {
    const { open, fullName, email, password, phone, address, roleId,activeButtonClicked, deactiveButtonClicked , imageUrl  } = this.state;

    return (
      <div>
        <h2>User Management</h2>


        <div className="Active_Layout">
          <Button className='Active' onClick={this.refreshList} >
            Active
          </Button>
          <Button className='De_Active' onClick={this.refreshListBanFalse} >
            De-Active
          </Button>
        </div>
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
        <div className="btn_class">
         {!activeButtonClicked && (
            <Button className="Recover_btn" onClick={() => this.updateBanRows()}>Recover User</Button>
          )}
          {!deactiveButtonClicked && (
            <Button className="ban_btn" onClick={() => this.updateBanRows()}>
              Ban User
            </Button>
          )}
          <Button className="add_btn" onClick={this.handleOpen}>
            Add User
          </Button>
        </div>

        <Modal
          open={open}
          onClose={this.handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 700,
              bgcolor: 'background.paper',
              border: '2px solid #000',
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add User
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }} className="form-grid">
              <div className="left-column">
                <label htmlFor="fullname" className="fieldName">Full Name:</label>
                <input
                  id="fullName"
                  className="form__field"
                  type="text"
                  value={fullName}
                  onChange={this.handleChange}
                />
                <br />
                <label htmlFor="email" className="fieldName">Email:</label>
                <input
                  id="email"
                  className="form__field"
                  type="text"
                  value={email}
                  onChange={this.handleChange}
                />
                <br />
                <label htmlFor="password" className="fieldName">Password:</label>
                <input
                  id="password"
                  className="form__field"
                  type="password"
                  value={password}
                  onChange={this.handleChange}
                />
                <br />
                <label htmlFor="phone" className="fieldName">Phone:</label>
                <input
                  id="phone"
                  className="form__field"
                  type="text"
                  value={phone}
                  onChange={this.handleChange}
                />
                <br />
                <label htmlFor="address" className="fieldName">Address:</label>
                <input
                  id="address"
                  className="form__field"
                  type="text"
                  value={address}
                  onChange={this.handleChange}
                />
                <br />
                <label htmlFor="roleid" className="fieldName">Role ID:</label>
                <select
                  id="roleId"
                  className="form__field"
                  value={roleId}
                  onChange={this.handleChange}
                >
                  <option value="1">Admin</option>
                  <option value="2">User</option>
                  <option value="3">Reporter</option>
                  <option value="4">Writer</option>
                </select>
              </div>

              <div className="right-column">
              <label htmlFor="avatar" style={{ marginRight: "10px" }}>
      Avatar:
    </label>
                    <input
                  id="avatar"
                  type="file"
                  onChange={this.handleAvatarChange}
                />

                 {/* Hiển thị ảnh người dùng */}
                 {imageUrl && (
        <img src={imageUrl} alt="Avatar" className="avatar-preview" />
      )}
      </div>
              <button className="submit_btn" onClick={this.handleSubmit}>Submit</button>
            </Typography>
          </Box>
        </Modal>
      </div>
    );
  }
}
