import React, { useState } from "react";
import '../css/layout.scss'
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import Cloud from '@mui/icons-material/Cloud';
import { Link,useNavigate } from 'react-router-dom'
import {pageRouter} from '../router/routersList'

const Menu = ()=>{
    const [value,setValue] = useState('/')
    const navigate  = useNavigate ()
    const goMenu =(data)=>{
        setValue(data)
        navigate(data)
    }
        return(
            <div className="MenuWrapper">
                <MenuList  sx={{color:'white'}}>
                    {pageRouter.map(item=>{
                        return(
                            item.icon?
                            // <Link className="top_tag" to={item.path} key={item.title}>
                                <MenuItem  key={item.title} classes={{'border-radius':'20px'}} sx={{color:value==item.path?'white':'rgb(157, 164, 174)'}} onClick={()=>goMenu(item.path)}>
                                  <ListItemIcon sx={{color:value==item.path?'white':'rgb(157, 164, 174)'}}>
                                      {item.icon}
                                  </ListItemIcon>
                                  <ListItemText>{item.title}</ListItemText>
                                </MenuItem>
                            // </Link>
                          :''
                        )
                    })}
                </MenuList>
            </div>
        )
    
}


export default Menu