import './App.css';
import Admin from './Pages/Admin';
import { Admin_UserManagement } from './Pages/Admin_UserManagement';
import { Leader } from './compoments/Leader/Leader';
import { UpdateAssignTask } from './compoments/Leader/UpdateAssigTask';
import { Reporter } from './compoments/Reporter/Reporter';
import { ListGenre } from './compoments/Leader/ListGenre';
import { ListAssignTask } from './compoments/Leader/ListAssignTask';
import { ToastContainer} from 'react-toastify';
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
      <ListAssignTask/>
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
