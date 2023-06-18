import { render } from '@testing-library/react';
import React , { Component } from 'react';

class ModalHome extends Component {
 
  render() {
    const { onClose, showModal } = this.props;

    return (
      <div className={`modal ${showModal ? 'show' : ''}`}>
        <div className="modal-content">
          <span className="close" onClick={onClose}>&times;</span>
          <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                                <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">


                                <div class="login_wrapper">
                                    <div class="row">
                                        <div class="col-lg-6 col-md-6 col-xs-12 col-sm-6">
                                            <a href="#" class="btn btn-primary facebook"> <span>Login with Facebook</span> <i class="fa fa-facebook"></i> </a>
                                        </div>
                                        <div class="col-lg-6 col-md-6 col-xs-12 col-sm-6">
                                            <a href="#" class="btn btn-primary google-plus"> Login  with Google <i class="fa fa-google-plus"></i> </a>
                                        </div>
                                    </div>
                                    <h2>or</h2>
                                    <form onSubmit={this.handleLogin}>

                                  
                                    <div class="formsix-pos">
                                        <div class="form-group i-email">
                                            <input type="email" class="form-control" required="" id="email2"  placeholder="Email Address *" />
                                        </div>
                                    </div>
                                    <div class="formsix-e">
                                        <div class="form-group i-password">
                                            <input type="password" class="form-control" required="" id="password2"  placeholder="Password *" />
                                        </div>
                                    </div>
                                    <div class="login_remember_box">
                                        <label class="control control--checkbox">Remember me
                                            <input type="checkbox" />
                                            <span class="control__indicator"></span>
                                        </label>
                                        <a href="#" class="forget_password">
                                            Forgot Password
                                        </a>
                                    </div>
                                    <div class="login_btn_wrapper">
                                        <a href="#" class="btn btn-primary login_btn"> Login </a>
                                        <button type="submit"  class=" btn btn-block mybtn btn-primary tx-tfm">Login</button>
                                    </div>
                                    </form>
                                    <div class="login_message">
                                        <p>Don&rsquo;t have an account ? <a href="#"> Sign up </a> </p>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
        </div>
      </div>
    );
  }
}

export default ModalHome;