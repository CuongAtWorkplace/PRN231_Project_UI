import "./sidebar.scss"
import DashboardIcon from '@mui/icons-material/Dashboard';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import LogoutIcon from '@mui/icons-material/Logout';
const SideBar = () => {
    return (
        <div className="sidebar">
            <div className="top">
                <span className="logo">
                    Sbotop
                </span>
            </div>
            <hr />
            <div className="center">
                <ul>
                    <p className="Title">Main</p>
                    <li>
                        <DashboardIcon className="icon" />
                        <span>Dashboard</span>
                    </li>
                    <p className="Title">Lists</p>
                    <li>
                        <InsertEmoticonIcon className="icon" />
                        <span>User</span>
                    </li>
                    <li>
                        <ProductionQuantityLimitsIcon className="icon" />
                        <span>Product</span>
                    </li>

                    <li>
                        <NewspaperIcon className="icon" />
                        <span>News</span>
                    </li>
                    <p className="Title">Name</p>

                    <li>
                        <LogoutIcon className="icon" />
                        <span>Log out</span>
                    </li>
                </ul>
            </div>
            <div className="bottom">

                <div className="colorOption"></div>
                <div className="colorOption"></div>
                <div className="colorOption"></div>

            </div>

        </div>
    )
}

export default SideBar