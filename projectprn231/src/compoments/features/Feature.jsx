import './Feature.scss'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const feature = () => {
  return (
    <div className='Feature'>
      <div className='top'>

        <h1 className='title'>Total revenue</h1>

        <MoreVertIcon fontSize='small' />
      </div>
      <div className='bottom'>
        <div className='featureChart'>

          <CircularProgressbar value={70} text={"70%"} strokeWidth={5} />
        </div>
        <p className='Title'>Total sales  today</p>
        <p className='amount'>421 $$$</p>
        <div className='summary'>

          <div className='item'>
            <div className='itemTitle'>Last Month</div>
            <div className='itemResult positive'>
              <KeyboardArrowDownIcon fontSize='small' />
              <div className='resultAmount'>$12.4k</div>
            </div>
          </div>


          <div className='item'>
            <div className='itemTitle'>Last Year</div>
            <div className='itemResult negative'>
              <KeyboardArrowDownIcon fontSize='small' />
              <div className='resultAmount'>$112.4k</div>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default feature