import { NavBar } from '../compoments/NavBar/NavBar'
import { SideBar } from '../compoments/SideBar/SideBar'
import './Layout.css'


const Layout = () => {
    return (
        <div className='layout'>
            <SideBar />
            <div className='layoutContainer'>
            <NavBar />
            </div>
        </div>
    )
}