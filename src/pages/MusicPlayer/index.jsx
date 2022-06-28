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
        this.container = document.getElementById('MusicPlayer_wrapper_box')
        let panel_w = this.container.offsetWidth
        let panel_h = this.container.offsetHeight
        this.scene = new THREE.Scene()
        this.camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 500);
        this.camera.position.set(20, 50,50);
        this.camera.lookAt(this.scene.position);
        let grid = new THREE.GridHelper( 50, 50, 0xffffff, 0x555555 );
        this.scene.add( grid );
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
        this.setAudioPillars(16)
        this.setAudioinit()
        this.addplant()
        this.animate()
    }
    // 添加地图控件
	addControls = (camera)=> {
		this.controls = new OrbitControls(camera, this.renderer.domElement);
        // this.controls.minDistance = 20;
        // this.controls.maxDistance = 500;
        // this.controls.enablePan = false;

        this.controls.update() 
	}
    addplant =()=>{


    }
    addLight = ()=>{
        var ambient = new THREE.AmbientLight( 0xffffff, 0.1 );
        this.scene.add( ambient );

        let spotLight = new THREE.SpotLight( 0xffffff, 6 );
        spotLight.position.set( 15, 100, 35 );
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

        // this.lightHelper = new THREE.SpotLightHelper( spotLight );
        // this.scene.add( this.lightHelper );

        // this.shadowCameraHelper = new THREE.CameraHelper( spotLight.shadow.camera );
        // this.scene.add( this.shadowCameraHelper );

        // this.scene.add( new THREE.AxesHelper( 10 ) );        
    }
    setAudioinit=()=>{
        let material = new THREE.MeshPhongMaterial( { color: 0x808080 } );

        let geometry = new THREE.BoxGeometry( 1, 1 );

        let mesh = new THREE.Mesh( geometry, material );
        mesh.position.set( 0, 0, 0 );
        
        this.A_listener  = new THREE.AudioListener()
        this.camera.add(this.A_listener );

        this.A_audio = new THREE.PositionalAudio(this.A_listener)
        this.A_audioLoader = new THREE.AudioLoader();
        this.A_audioLoader.load('https://sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/music/audio.mp3', (AudioBuffer)=> {
            this.A_audio.setBuffer(AudioBuffer);
            this.A_audio.setVolume(0.9); //音量
            this.A_audio.setRefDistance(2000); //参数值越大,声音越大
        })
        mesh.add(this.A_audio)
        this.scene.add(mesh)
        this.analyser  = new THREE.AudioAnalyser(this.A_audio,32)
// console.log(this.analyser.getAverageFrequency())
    }
    setAudioPillars=(num)=>{
        let max_w = 20
        let w_li= Math.floor(max_w/num)
        this.pillars_g = new THREE.Group()
        for (let i = 0; i < num; i++) {
            let pillars = new THREE.BoxGeometry( 1, 10);
            let material = new THREE.MeshPhongMaterial( { color: 0x00ff00 } );
            let cube = new THREE.Mesh( pillars, material );
            cube.castShadow = true;
            cube.position.set(i*w_li,5)      
            this.pillars_g.add(cube)
        }  
        this.scene.add(this.pillars_g)
        var material = new THREE.MeshPhongMaterial( { color: 0x808080, dithering: true } );

        var geometry = new THREE.PlaneBufferGeometry( 2000, 2000 );

        var mesh = new THREE.Mesh( geometry, material );
        mesh.position.set( 0, 0, 0 );
        mesh.rotation.x = - Math.PI * 0.5;
        mesh.receiveShadow = true;
        this.scene.add( mesh );

    }
    // 
    animate =() => {
        requestAnimationFrame( this.animate );
        let analyer_arr = this.analyser.getFrequencyData()
        // let s_d =new Uint8Array(this.analyser.getAverageFrequency())
        // let bufferLength = this.analyser.data
        // let dataArray = new Uint8Array(bufferLength);
        // console.log(bufferLength)
        this.pillars_g.children.forEach((item,index) => {
            item.scale.y  = analyer_arr[index]*.01
        })
        this.renderer.render( this.scene, this.camera );
      }
    playAudio =()=>{
        this.A_audio.play()
    }
    render(){
        return(
            <div className="MusicPlayer_wrapper">
                <div className="MusicPlayer_wrapper_box" id="MusicPlayer_wrapper_box">
                
                </div>
                <p className="playmsg" onClick={this.playAudio}>播放音乐</p>
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