import { NavBar } from '../compoments/NavBar/NavBar'
import { SideBar } from '../compoments/SideBar/SideBar'
import { Widget }  from '../compoments/widget/Widget'
import { Feature }from '../compoments/features/Feature'
import { Chart } from '../compoments/chart/Chart'
import './home.css'

const Admin = () => {
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

export default Admin