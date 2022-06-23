import React from "react";
import * as THREE from 'three'
import TWEEN from '@tweenjs/tween.js'
import './index.scss'
// import * as Tween from  '../../lib/Tween.min.js'
class MusicPlayer extends React.Component{
    constructor(props){
        super(props)
        this.state={
        }
        window.THREE = THREE;
    }
    initPlayer = ()=>{
        this.container = document.getElementById('MusicPlayer_wrapper')
        let panel_w = this.container.offsetWidth
        let panel_h = this.container.offsetHeight
        this.scence = new THREE.Scene()
        this.camera = new THREE.OrthographicCamera(-panel_w / 2, panel_w / 2, panel_h / 2, -panel_h/ 2, 1, 1000);
        this.renderer = new THREE.WebGLRenderer();
		this.renderer.setPixelRatio(window.devicePixelRatio);
		this.renderer.setClearColor(0x9ad2d0);
		this.renderer.setSize(panel_w, panel_h);
		this.container.appendChild(this.renderer.domElement);
		this.renderer.autoClear =false;
    }
    render(){
        return(
            <div className="MusicPlayer_wrapper" id="MusicPlayer_wrapper">
                
            </div>
        )
    }
    componentDidMount(){
        console.log(TWEEN)
        this.initPlayer()
        // this.setState((state, props) => ({
        //     num:state.num++
        //   }));
        // console.log(this.state.num,TWEEN)  
    }
}
export default MusicPlayer