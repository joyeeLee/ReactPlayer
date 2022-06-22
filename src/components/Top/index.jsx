import React from "react";
import {pageRouter} from '../../router/routersList.jsx'
import './index.scss'
class Top extends React.Component{
    constructor(props){
        super(props);
        this.state={
            tabLists:pageRouter
        }
    }
    


    render(){
        return(
            <div className="TopWrapper">
                
            </div>
        )
    }
}

export default Top