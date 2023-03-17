import './index.scss';
import React, { useEffect ,useState} from 'react'; 
import Top from '../../components/Top/index.jsx'
import { timerOut } from './model/actions';
import {BrowserRouter,Outlet} from 'react-router-dom'
import { createPortal } from 'react-dom';
import { useSelector,useDispatch} from 'react-redux';
import Button from '@mui/material/Button';
import {testNode} from '../../api/home'
import HomeMenu from './components/menu'
// import RouterCen from '../../router/index'

const Home  = ()=> {
    const {value} = useSelector(state=>{console.log(state); return state['home']})
    const disPatch = useDispatch()
    const [selectedFile, setSelectedFile] = useState(null);
    // const [num,setNum] = useState(0)
    const addNum = ()=>{
        disPatch({
            type:'home/increment'
        })
        disPatch(timerOut())
    }

    const imgChange =(files)=>{
        var formData = new FormData();
        formData.append("files", files[0]);
        formData.append("name", '图片名称');
        testNode(formData).then(res=>{
            console.log(res)
        })
    }
      return(
      <div className='home'>
            <div className='homeWrapper' id='homeWrapper'>
                <HomeMenu></HomeMenu>
            </div>
            <div className="homeRouter">
                <Outlet/>
            </div>

      </div>
      )
    
  }
  
  export default Home;