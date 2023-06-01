import "./navbar.scss"
import SearchIcon from '@mui/icons-material/Search';
import LanguageIcon from '@mui/icons-material/Language';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import OpenWithIcon from '@mui/icons-material/OpenWith';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';


const NavBar = () => {
    return (
        <div className="navbar">
            <div className="wrapper">
                <div className="search">
                    <input type="text" placeholder="Search  ... " />
                    <SearchIcon />
                </div>

                <div className="items">
                    <div className="items">
                        <LanguageIcon  className="icon"/>
                        English
                    </div>

                    <div className="item">
                        <DarkModeIcon className="icon"/>
                    </div>

                    <div className="item">
                        <OpenWithIcon className="icon"/>
                    </div>
                    <div className="item">
                        <NotificationsNoneIcon className="icon"/>
                        <div className="counter">1</div>
                    </div>
                    <div className="item">
                        <FormatListBulletedIcon className="icon"/>
                    </div>

                    <div className="item">
                    </div>
                    <img src="https://th.bing.com/th/id/R.e900afd2d9b0b93857b0ffa8310f5247?rik=e6eWtgl4bA%2bbGg&pid=ImgRaw&r=0"
                     alt="" 
                     className="userAvantar"
                     />
                </div>

            </div>
        </div>
    )
}

export default NavBar