import React from "react";
import * as THREE from 'three'
import TWEEN from '@tweenjs/tween.js'
import './index.scss'
import {MapControls} from '../../lib/MapControls'
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
        this.camera =new THREE.PerspectiveCamera( 75, panel_w / panel_h, 0.1, 1000 );
        this.renderer = new THREE.WebGLRenderer();
		this.renderer.setPixelRatio(window.devicePixelRatio);
		this.renderer.setClearColor(0x9ad2d0);
		this.renderer.setSize(panel_w, panel_h);
		this.container.appendChild(this.renderer.domElement);
		this.renderer.autoClear =false;
        this.addControls(this.camera)
        this.setAudioPillars(5)
        this.animate()
    }
	addControls = (camera)=> {
		this.controls = new MapControls(camera, this.renderer.domElement);
        this.controls.update() 
	}
    setAudioPillars=(num)=>{
        // this.pillars_g = new THREE.Group()
        // for (let i = 0; i < num; i++) {
        //     let pillars = new THREE.BoxGeometry( 1, 20);
        //     let material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        //     let cube = new THREE.Mesh( pillars, material );
        //     cube.position.set(i*10,0)      
        //     this.pillars_g.add(cube)
        // }
            let pillars = new THREE.BoxGeometry( 1,1,1);
            let material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
            let cube = new THREE.Mesh( pillars, material );   
            this.cube = cube     
        this.scence.add(this.cube)

    }
    animate =() => {
        requestAnimationFrame( this.animate );
        this.cube.rotation.x += 0.01;
        this.controls.update() 

        this.cube.rotation.y += 0.01;
        this.renderer.render( this.scence, this.camera );
      }
    render(){
        return(
            <div className="MusicPlayer_wrapper" id="MusicPlayer_wrapper">
                
            </div>
        )
    }
    componentDidMount(){
        const script = document.createElement("script")
        script.src = "./../lib/MapControls.js"
        script.async = true
        
        document.body.appendChild(script)
        this.initPlayer()
        // this.setState((state, props) => ({
        //     num:state.num++
        //   }));
        console.log(this.state.num,TWEEN)  
    }
}
export default MusicPlayer