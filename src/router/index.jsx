import React from 'react'; 
import { Route, Routes} from 'react-router-dom'
import {pageRouter} from './routersList.jsx'

function RouterBox ({routeList}){


    const checkRouter=(routerItems)=>{
        if(routerItems && routerItems.length){
            return routerItems.map(({element,children,path},index)=>{
                return children && children.length ? (
                    <Route path={path} element={element} key={index}>
                           {checkRouter(children)} 
                    </Route>
                ):(
                  <Route   key={index} path={path} element={element} index={routerItems?.redirect}>
                  </Route> 
                )
            })
        }
    }
        return (
            <Routes>
            {checkRouter(routeList)}
        </Routes>
          )  
}

const AppRuter =()=>{
    return <RouterBox routeList={pageRouter}></RouterBox>
}
// const HomeRuter =()=>{
//     return <RouterBox routeList={homeChildrensRouter}></RouterBox>
// }
export {AppRuter};