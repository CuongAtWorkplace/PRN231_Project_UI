import './App.css';
import { Leader } from './compoments/Leader/Leader';
import { UpdateAssignTask } from './compoments/Leader/UpdateAssigTask';
import { Reporter } from './compoments/Reporter/Reporter';
import { ListGenre } from './compoments/Leader/ListGenre';
import { ListAssignTask } from './compoments/Leader/ListAssignTask';
import { Writer } from './compoments/Writer/Writer';
import { ViewTaskDetail } from './compoments/Leader/ViewTaskDetail';
//import { Reporter } from './compoments/Reporter/Reporter';
import { ImportFile } from './compoments/TestFile/ImportFile';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Table} from './compoments/table/Table'
import { CommentBrowseTable } from './compoments/table/CommentBrowseTable';
function App() {
  return (
    <CommentBrowseTable/>
  );
}

export default App;
