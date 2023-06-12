import React, { Component } from "react";


import { SideBar } from "../compoments/SideBar/SideBar";
import { NavBar } from "../compoments/NavBar/NavBar";
import { Widget } from "../compoments/widget/Widget";
import { Chart } from "../compoments/chart/Chart";
import { Feature } from "../compoments/features/Feature";



import './home.css'

export class Admin_Home extends Component {

    render() {
        return (
            <div className='home'>
            <SideBar />
            <div className='homeContainer'>
                <NavBar />
                <div className='widgets'>
                    <Widget type="user" />
                    <Widget type="order"/>
                    <Widget type="earning"/>
                    <Widget type="balance"/>
                </div>

                <div className="charts">
                    <Feature/>
                    <Chart/>
                </div>


            </div>

        </div>


        )
    }

}