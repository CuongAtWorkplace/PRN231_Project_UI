import './App.css';
import { Leader } from './compoments/Leader/Leader';
import { UpdateAssignTask } from './compoments/Leader/UpdateAssigTask';
import { Reporter } from './compoments/Reporter/Reporter';
import { ListGenre } from './compoments/Leader/ListGenre';
import { ListAssignTask } from './compoments/Leader/ListAssignTask';
import { Writer } from './compoments/Writer/Writer';
import { ViewTaskDetail } from './compoments/Leader/ViewTaskDetail';
import { ImportFile } from './compoments/TestFile/ImportFile';
//import { NavBar } from './compoments/NavBar/NavBar';
//import {SideBar} from '/compoments/SideBar/SideBar'
import { ListReportTask } from './compoments/Reporter/ListReportTask';
import { ListReject } from './compoments/Leader/ListReject';
import { ListWritingTask } from './compoments/Writer/ListWritingTask';
import { ToastContainer} from 'react-toastify';
import { Login } from './compoments/Login/Login';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    //<Leader/>
    //<UpdateAssignTask/>
    //<Reporter/>
    <>
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
      <ListReject/>
      {/* <ListWritingTask/> */}
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
