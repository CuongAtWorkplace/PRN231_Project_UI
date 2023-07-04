import React, { Component } from "react";
import jwtDecode from "jwt-decode";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export class Ok extends Component {
  constructor(props) {
    super(props);
    this.state = {
      UserId: "",
      showModal: true,
      amount: null,
      image: null,
      imageName: "",
      title: "",
      description: "",
    };
  }


  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token != null) {
      const decodedToken = jwtDecode(token);
      this.setState({ UserId: decodedToken.Id });
    }

    const pathname = window.location.pathname;
    const amount = pathname.split("/").pop();
    if (!isNaN(amount)) {
      this.setState({ amount: amount });

      // Gọi API để lấy thông tin quảng cáo dựa trên amount
    }
  }

  handleCancel = () => {
    this.handleCloseModal();
    window.location.href = "http://localhost:3000/";
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };


  handleSaveChange = () => {
    const { UserId, amount, imageName, title, description } = this.state;
    this.setState({ saveButtonDisabled: true });
  
    this.uploadFile();
  
    fetch(`https://localhost:7248/api/Adertisement/GetAdertisementByAmount?amount=${amount}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(advertisementData => {
        this.setState({ advertisementData });
  
        const { UserId } = this.state;
        this.setState({ saveButtonDisabled: true });
  
        const currentDate = new Date().toLocaleString();
        const endDate = new Date(
          new Date().getTime() + advertisementData.totalDate * 24 * 60 * 60 * 1000
        ).toISOString();
  
        fetch("https://localhost:7248/api/AdertisementOrder/InsertAdvertisementOrder", {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            userId: UserId,
            advertisementId: advertisementData.id,
            title: title,
            image: imageName,
            createdDate: currentDate,
            endDate: endDate,
            description: description,
            isPending: false,
            isApprove: false,
            discount: 0
          })
        })
          .then(response => response.json())
          .then(result => {
            const adId = result.id;
            toast.success("Save changes successfully!");
  
            // Gọi API GetAdertisementOrderByDate sau khi đã thêm thành công Advertisement Order
            fetch(`https://localhost:7248/api/AdertisementOrder/GetAdertisementOrderByDate?date=${encodeURIComponent(currentDate)}`, {
              method: 'GET',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }
            })
              .then(response => response.json())
              .then(advertisementOrder => {
                const adId = advertisementOrder.id;
                this.sendEmail(adId);
                setTimeout(() => {
                  window.location.href = "http://localhost:3000/";
                }, 10000);
              })
              .catch(error => {
                toast.error("An error occurred. Please try again later.");
                this.setState({ saveButtonDisabled: false });
              });
          })
          .catch(error => {
            toast.error("An error occurred. Please try again later.");
            this.setState({ saveButtonDisabled: false });
          });
      })
      .catch(error => {
        console.error(error);
      });
  }
  
  

  sendEmail = (adId) => {
    const userId = this.state.UserId; // ID người dùng cần lấy từ API
    const amount = this.state.amount; // Lấy giá trị amount từ trạng thái ứng dụng
  
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
          text: `You can pay your payment in this link: http://localhost:16262/vnpay_pay.aspx?amount=${amount}&adId=${adId}` // Nội dung email với liên kết có giá trị amount và adId từ trạng thái
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
  
    

  uploadFile = () => {
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


  handleFileChange = (event) => {
    const file = event.target.files[0];
    this.setState({ image: file, imageName: file.name });
  };


  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    const { UserId, amount, saveButtonDisabled } = this.state;

    return (
      <div>
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
              <input className="form__field" type="text" name="title" onChange={this.handleChange} />
              <p>Description</p>
              <input className="form__field" type="text" name="description" onChange={this.handleChange} />
              <p>Your Banner</p>
              <input
                id="avatar"
                type="file"
                onChange={this.handleFileChange}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.handleSaveChange}
                disabled={saveButtonDisabled}
              >
                Save changes
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={this.handleCancel}
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
