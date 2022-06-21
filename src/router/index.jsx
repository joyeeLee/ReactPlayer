import React from 'react'; 
import { Route, Routes} from 'react-router-dom'
// import Home from '../pages/home/index.jsx'
// import Login from '../pages/login/index.jsx'
import {pageRouter} from './routersList.jsx'

function RouterBox (){
        return (
            <Routes>
                {
                    pageRouter.map( r => 
                        <Route path={r.path} element={r.element} key={r.path}></Route>
                    )
                }
            </Routes>
        )
}
export default RouterBox;