import './App.css';
import { Leader } from './compoments/Leader/Leader';
import { UpdateAssignTask } from './compoments/Leader/UpdateAssigTask';
//import { Reporter } from './compoments/Reporter/Reporter';
import { ListGenre } from './compoments/Leader/ListGenre';
import { ListAssignTask } from './compoments/Leader/ListAssignTask';
import { Writer } from './compoments/Writer/Writer';
import { ViewTaskDetail } from './compoments/Leader/ViewTaskDetail';
import { ImportFile } from './compoments/TestFile/ImportFile';
import { NavBar } from './compoments/NavBar/NavBar';
import { SideBar } from './compoments/SideBar/SideBar';
import { ListReportTask } from './compoments/Reporter/ListReportTask';
import { ListReject } from './compoments/Leader/ListReject';
import { ListWritingTask } from './compoments/Writer/ListWritingTask';
import { RedirectPage } from './compoments/TestFile/RedirectPage';
import { ToDoReportTask } from './compoments/Reporter/ToDoReportTask';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Switch, Route, Routes, NavLink } from 'react-router-dom';
import { Navigate} from 'react-router-dom';
import { Table } from '../src/Pages/Admin'
import { CommentBrowseTable } from './compoments/table/CommentBrowseTable';
import { Admin_Comment } from './Pages/Admin_Comment';
import { Chart } from './compoments/chart/Chart';
import { Admin_Home } from './Pages/Admin_Home';
import { Admin_UserManagement } from './Pages/Admin_UserManagement';
function App() {
  return (



    //<Leader/>
    //<UpdateAssignTask/>
    //<Reporter/>
    <>
      <BrowserRouter>
        {/* <ListGenre /> */}
        {/* <Leader/> */}
        {/* <UpdateAssignTask/> */}
        {/* <ListAssignTask/> */}
        {/* <ViewTaskDetail/> */}
        {/* <Writer/> */}
        {/* <Reporter/> */}
        {/* <ImportFile/> */}
        {/* <SideBar/> */}
        {/* <ListReportTask/> */}
        {/* <ListReject/> */}
        {/* <ListWritingTask/> */}
        {/* <ToDoReportTask/> */}
        {/* <RedirectPage /> */}
        <NavLink to="/home">
          <button>Well</button>
        </NavLink>
        <Routes>
          <Route path='/home' element={<RedirectPage />} />
          <Route path='/reporter' element={<Reporter />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

    </>


  );
}

export default App;
