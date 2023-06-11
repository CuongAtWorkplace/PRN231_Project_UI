import './App.css';
import { Leader } from './compoments/Leader/Leader';
import { UpdateAssignTask } from './compoments/Leader/UpdateAssigTask';
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
import { CommentBrowseTable } from './compoments/table/CommentBrowseTable';
import { Admin_Comment } from './Pages/Admin_Comment';
import { Chart } from './compoments/chart/Chart';
import { Admin_Home } from './Pages/Admin_Home';
import { Admin_UserManagement } from './Pages/Admin_UserManagement';
function App() {
  return (
   <NavBar/>
  );
}

export default App;
