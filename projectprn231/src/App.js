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
      <Reporter/>
      {/* <ImportFile/> */}
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
