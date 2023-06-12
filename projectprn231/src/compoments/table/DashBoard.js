import React, { Component } from "react";
import { Widget } from '../widget/Widget'
import { Feature } from '../features/Feature'
import { Chart } from '../chart/Chart'
import "./DashBoard.css"

export class Dashboard extends Component {
    render() {
        return (
            <div className='home'>
                <div className='homeContainer'>
                    <div className='widgets'>
                        <Widget type="user" />
                        <Widget type="order" />
                        <Widget type="earning" />
                        <Widget type="balance" />
                    </div>

                    <div className="charts">
                        <Feature />
                        <Chart />
                    </div>
                </div>

            </div>
        )
    }

}