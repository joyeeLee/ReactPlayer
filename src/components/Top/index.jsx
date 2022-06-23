import React from "react";
import {pageRouter} from '../../router/routersList.jsx'
import { Link } from 'react-router-dom'
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
                <div className="tag_box">
                    {
                        this.state.tabLists.map(item =>{
                            return(
                                <Link className="top_tag" to={item.path} key={item.title}>{item.title}</Link>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

export default Top