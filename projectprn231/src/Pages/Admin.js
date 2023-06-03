import NavBar from '../Component/NavBar/NavBar'
import SideBar from '../Component/SideBar/SideBar'
import Widget from '../Component/widget/Widget'
import Feature from '../Component/features/Feature'
import Chart from '../Component/chart/Chart'
import './home.scss'

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