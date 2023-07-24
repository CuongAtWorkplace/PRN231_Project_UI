import React, { Component } from 'react';
import './ad.css';
import Header from '../Home/Header';
import Footer from '../Home/Footer';
class Advertisement extends Component {

  handleJoinNowClick = (amount) => {
    window.location.href = `/Ok/${amount}`;
  }
  

  render() {
    return (
      <div>
        <head>
          <meta charset="UTF-8" />
          <title>Document</title>
          <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css" />
          <link rel="stylesheet" href="https://netdna.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.css" />
        </head>
        
        <body>
          <Header/>

          <section className="container" style={{marginTop:"20px"}}>
            <div className="row white"> 

              <div className="block">

                <div className="col-xs-12 col-sm-6 col-md-3">
                  <ul className="pricing p-green">
                    <li>
                      <img src="http://bread.pp.ua/n/settings_g.svg" alt="" />
                      <big>15 Days</big>
                    </li>
                    <li>Responsive Design</li>
                    <li>Color Customization</li>
                    <li>News Updates</li>
                    <li>Dynamic Content</li>
                    <li>
                      <h4>100.000 VND</h4>
                      <span>per month</span>
                    </li>
                    <li>
                      <button onClick={() => this.handleJoinNowClick(100000)}>Join Now</button>
                    </li>
                  </ul>
                </div>

                <div className="col-xs-12 col-sm-6 col-md-3">
                  <ul className="pricing p-yel">
                    <li>
                      <img src="http://bread.pp.ua/n/settings_y.svg" alt="" />
                      <big>1 Months</big>
                    </li>
                    <li>Responsive Design</li>
                    <li>Color Customization</li>
                    <li>News Updates</li>
                    <li>Dynamic Content</li>
                    <li>
                      <h4>200.000 VND</h4>
                      <span>per month</span>
                    </li>
                    <li>
                      <button onClick={() => this.handleJoinNowClick(200000)}>Join Now</button>
                    </li>
                  </ul>
                </div>

                <div className="col-xs-12 col-sm-6 col-md-3">
                  <ul className="pricing p-red">
                    <li>
                      <img src="http://bread.pp.ua/n/settings_r.svg" alt="" />
                      <big>6 Months</big>
                    </li>
                    <li>Responsive Design</li>
                    <li>Color Customization</li>
                    <li>News Updates</li>
                    <li>Dynamic Content</li>

                    <li>
                      <h4>500.000 VND</h4>
                      <span>per month</span>
                    </li>
                    <li>
                      <button onClick={() => this.handleJoinNowClick(500000)}>Join Now</button>
                    </li>
                  </ul>
                </div>

                <div className="col-xs-12 col-sm-6 col-md-3">
                  <ul className="pricing p-blue">
                    <li>
                      <img src="http://bread.pp.ua/n/settings_b.svg" alt="" />
                      <big>1 Years</big>
                    </li>
                    <li>Responsive Design</li>
                    <li>Color Customization</li>
                    <li>News Updates</li>
                    <li>Dynamic Content</li>
                    <li>
                      <h4>1.000.000 VND</h4>
                      <span>per month</span>
                    </li>
                    <li>
                      <button onClick={() => this.handleJoinNowClick(1000000)}>Join Now</button>
                    </li>
                  </ul>
                </div>

              </div>
            </div>
          </section>
          <Footer/>
          <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>
        </body>
      </div>
    );
  }
}

export default Advertisement;
