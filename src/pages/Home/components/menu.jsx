import React, { useState } from "react";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { useNavigate } from 'react-router-dom'
// import RestoreIcon from '@mui/icons-material/Restore';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import LocationOnIcon from '@mui/icons-material/LocationOn';

const HomeMenu=()=>{
    const [value,setValue] = useState(0)
    const navigate  = useNavigate ()
	// 页面跳转方法
	
    return(
        <BottomNavigation
        showLabels
        value={value}
        style={{justifyContent:"space-around"}}
        onChange={(event, newValue) => {
          setValue(newValue);
          navigate('/ImgsToIcons')
        }}
        >
            <BottomNavigationAction label="Recents"  />
            <BottomNavigationAction label="Favorites"  />
            <BottomNavigationAction label="Nearby"  />
        </BottomNavigation>
    )
}
export default HomeMenu