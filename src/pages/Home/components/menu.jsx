import React, { useState } from "react";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { useNavigate } from 'react-router-dom'
import './components.scss'
import Face6Icon from '@mui/icons-material/Face6';
import Face5Icon from '@mui/icons-material/Face5';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import RestoreIcon from '@mui/icons-material/Restore';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import LocationOnIcon from '@mui/icons-material/LocationOn';

const HomeMenu=()=>{
    const [value,setValue] = useState(-1)
    const navigate  = useNavigate ()

    const [menuData] = useState([
        {path:'/ImgsToIcons',label:'icons',icon:<Face6Icon />}
    ])
	// 页面跳转方法
	const onChange = ()=>{

    }
    return(
            // <BottomNavigationAction  icon={<ArrowBackIcon/>}/>
    <div style={{position: 'relative'}}>
        {value!=-1&&<ArrowBackIcon className="ArrowBackIcon" onClick={()=>{setValue(-1);navigate('/')}}/>}
        <BottomNavigation
        showLabels
        value={value}
        className="menuBox"
        style={{justifyContent:"space-around",}}
        onChange={(event, newValue) => {
          setValue(newValue);
          navigate(menuData[newValue].path)
        }}
        >
            {menuData.map(item=><BottomNavigationAction key={item.label} label={item.label}  icon={item.icon}/>)}
        </BottomNavigation>
    </div>
    )
}
export default HomeMenu