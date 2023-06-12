import { DataGrid } from '@mui/x-data-grid';
import React, { Component } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import "./table.css";

const columns = [
  { field: 'fullName', headerName: 'Full Name', width: 200 },
  { field: 'password', headerName: 'Password', width: 150 },
  { field: 'phone', headerName: 'Phone', width: 150 },
  { field: 'address', headerName: 'Address', width: 200 },
  { field: 'roleId', headerName: 'Role ID', width: 10 },
];

export class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      open: false,
      fullName: "",
      email: "",
      password: "",
      phone: "",
      address: "",
      roleId: "1"
    };
  }

  handleSubmit = () => {
    const { fullName, email, password, phone, address, roleId } = this.state;

    // Gửi yêu cầu POST đến API
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
        roleId: roleId
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
      });
  }

  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
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

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { open, fullName, email, password, phone, address, roleId } = this.state;

    return (
      <div>
        <h2>User Management</h2>
        <div className='TableLayout'>
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={this.state.rows}
              columns={columns}
              pageSize={5}
              checkboxSelection
            />
          </div>
        </div>
        <div className="btn_class">
          <button className="ban_btn" onClick={this.handleOpen}>
            Ban User
          </button>

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
                <label htmlFor="avatar">Avatar:</label>
                <input
                  id="avatar"
                  type="file"
                />
              </div>

              <button className="submit_btn" onClick={this.handleSubmit}>Submit</button>
            </Typography>
          </Box>
        </Modal>
      </div>
    );
  }
}
