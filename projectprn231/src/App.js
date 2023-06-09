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
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Table} from './compoments/table/Table'
import { CommentBrowseTable } from './compoments/table/CommentBrowseTable';
import { Admin_Comment } from './Pages/Admin_Comment';
function App() {
  return (

    <Admin_Comment/>


  );
}

export default App;
