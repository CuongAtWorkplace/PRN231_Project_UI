import React, { Component } from "react";
import jwtDecode from "jwt-decode";

export class Ok extends Component {
  constructor(props) {
    super(props);
    this.state = {
      UserId: "",
      showModal: true,
      amount: null,
    };
  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token != null) {
      const decodedToken = jwtDecode(token);
      this.setState({ UserId: decodedToken.Id });
    }

    const searchParams = new URLSearchParams(window.location.search);
    const amount = searchParams.get("amount");
    if (amount != null) {
      this.setState({ amount : amount});
    }
  }

  handleCancel = () => {
    this.handleCloseModal();
    window.location.href = "http://localhost:3000/";
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  handleAvatarChange = (event) => {
    // Xử lý sự kiện thay đổi giá trị của trường file input (nếu cần)
  };

  render() {
    const { UserId, amount } = this.state;

    return (
      <div>
        <div>{UserId}</div>
        <div>{amount}</div>

        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Advertisement Banner Information</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={this.handleCloseModal}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>Title</p>
              <input id="email" className="form__field" type="text" />

              <p>Your Banner</p>
              <input
                id="avatar"
                type="file"
                onChange={this.handleAvatarChange}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.handleCancel}
              >
                Save changes
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={this.handleCloseModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
//