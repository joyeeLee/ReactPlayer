import React from "react";
import * as THREE from 'three'
import TWEEN from '@tweenjs/tween.js'
import './index.scss'
import {OrbitControls} from '../../lib/MapControls'
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
        this.scene = new THREE.Scene()
        // this.scene.color = new THREE.Color( 0xffffff );
   
        // this.camera =new THREE.OrthographicCamera( 75, panel_w / panel_h, 0.1, 1000 );
        this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
        this.camera.position.set(65, 8, - 10);
        this.camera.lookAt(this.scene.position);

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setPixelRatio( window.devicePixelRatio );
		this.renderer.setSize(panel_w, panel_h);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.gammaInput = true;
        this.renderer.gammaOutput = true;

		this.container.appendChild(this.renderer.domElement);
        this.addLight()
        this.addControls(this.camera)
        this.setAudioPillars(5)
        
        this.addplant()
        this.animate()
    }
    // 添加地图控件
	addControls = (camera)=> {
		this.controls = new OrbitControls(camera, this.renderer.domElement);
        this.controls.minDistance = 20;
        this.controls.maxDistance = 500;
        this.controls.enablePan = false;

        this.controls.update() 
	}
    addplant =()=>{


    }
    addLight = ()=>{
        var ambient = new THREE.AmbientLight( 0xffffff, 0.1 );
        this.scene.add( ambient );

        let spotLight = new THREE.SpotLight( 0xffffff, 1 );
        spotLight.position.set( 15, 40, 35 );
        spotLight.angle = Math.PI / 4;
        spotLight.penumbra = 0.05;
        spotLight.decay = 2;
        spotLight.distance = 200;

        spotLight.castShadow = true;
        spotLight.shadow.mapSize.width = 1024;
        spotLight.shadow.mapSize.height = 1024;
        spotLight.shadow.camera.near = 10;
        spotLight.shadow.camera.far = 200;
        this.scene.add( spotLight );

        this.lightHelper = new THREE.SpotLightHelper( spotLight );
        this.scene.add( this.lightHelper );

        this.shadowCameraHelper = new THREE.CameraHelper( spotLight.shadow.camera );
        this.scene.add( this.shadowCameraHelper );

        this.scene.add( new THREE.AxesHelper( 10 ) );        
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
        // this.scene.add(this.pillars_g)
        var material = new THREE.MeshPhongMaterial( { color: 0x808080, dithering: true } );

        var geometry = new THREE.PlaneBufferGeometry( 2000, 2000 );

        var mesh = new THREE.Mesh( geometry, material );
        mesh.position.set( 0, - 1, 0 );
        mesh.rotation.x = - Math.PI * 0.5;
        mesh.receiveShadow = true;
        this.scene.add( mesh );


        var material2 = new THREE.MeshPhongMaterial( { color: 0x4080ff, dithering: true } );

        var geometry2 = new THREE.BoxBufferGeometry( 3, 10, 2 );

        var mesh2 = new THREE.Mesh( geometry2, material2 );
        mesh2.position.set( 10, 2, 0 );
        mesh2.castShadow = true;
        this.scene.add( mesh2 );


        // let pillars = new THREE.BoxGeometry( 10, 10,10);
        // let material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        // let cube = new THREE.Mesh( pillars, material );
        // cube.position.set(0,0,0)   
        // this.scene.add(cube)

    }
    // 
    animate =() => {
        requestAnimationFrame( this.animate );
        // this.pillars_g.rotation.x += 0.01;
        this.controls.update() 
        this.lightHelper.update();

        this.shadowCameraHelper.update();
        // this.pillars_g.rotation.y += 0.01;
        this.renderer.render( this.scene, this.camera );
      }
    render(){
        return(
            <div className="MusicPlayer_wrapper" id="MusicPlayer_wrapper">
                
            </div>
        )
    }
    componentDidMount(){
        // const script = document.createElement("script")
        // script.src = "./../lib/MapControls.js"
        // script.async = true
        
        // document.body.appendChild(script)
        this.initPlayer()
        console.log(this.state.num,TWEEN)  
    }
}
export default MusicPlayer