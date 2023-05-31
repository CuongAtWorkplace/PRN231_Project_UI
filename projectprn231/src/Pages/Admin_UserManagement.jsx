import  Table  from '../Component/table/Table'
import NavBar from '../Component/NavBar/NavBar'
import SideBar from '../Component/SideBar/SideBar'
import './user.scss'

const Admin_UserManagement = () => {
    return (
        <div className='user'>
            <SideBar />
            <div className='userContainer'>
                <NavBar />
                <div className="ListContainer">
                    <div className="tableHead"> User Management</div>
                    <Table/>
                </div>
            </div>
        </div>

    )
}

export default Admin_UserManagement