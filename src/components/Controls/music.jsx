
import { useState,useEffect,useRef} from "react";
import './music.scss'
import { Slider } from 'tdesign-react';
import {durationConversio} from "../../utils/common.js"
function MusicControls(props) {
    let {musicPData} = props
    const [value, setValue] = useState(0);
    let [musicData,setMusicData] = useState({
        url:'https://sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/music/audio.mp3',
        songName:'林宥嘉·脆弱一分钟',
        user:'',
        poster:'https://sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/music/poster-small.jpeg',
        songList:[],
        timeNow:musicPData.duration*(value/100),
        timeNowtext:durationConversio(musicPData.duration*(value/100)),
        playIndex:0,
        duration:musicPData.duration,
        durationText:durationConversio(musicPData.duration),
        isplay:false
    })
    let controlsAudio = useRef()
    // const [rangeValue, setRangeValue] = useState([10, 80]);


    function changeData (){
        setMusicData((c)=>{
            c.songName = '遍地撒安抚'
            return {...c}
        })
    }
    function playAudio (){
        setMusicData((c)=>{
            c.isplay = true
            return {...c}
        })
        controlsAudio.current.play()
        props.playAudio()
    }

    function pauseAudio (){
        setMusicData((c)=>{
            c.isplay = false
            return {...c}
        })
        controlsAudio.current.pause()
        props.pauseAudio()
    }
    useEffect(()=>{
        // controlsAudio.current.onloadedmetadata=  () => {
        //     let t_now = controlsAudio.current.duration*(value/100)
        //     setMusicData((e)=>{
        //         return {...e,
        //             timeNow:t_now,
        //             timeNowtext:durationConversio(t_now),
        //             duration: controlsAudio.current.duration,
        //             durationText:durationConversio(controlsAudio.current.duration),
        //         }})
        // };
        
    })
    useEffect(()=>{
        let t_now = controlsAudio.current.duration*(value/100)

        setMusicData((e)=>{
            return {...e,
                timeNow:t_now,
                timeNowtext:durationConversio(t_now),
            }})
            controlsAudio.current.currentTime  = Number(t_now)?t_now:0

    },[value])
    return  (
        <div className="music_con_wrapper">
            <div className="song_msg">
                <div className="poster_img" onClick={changeData}><img src={musicData.poster} alt="" /></div>
                <div className="msg_dox">
                    <p className="song_name">{musicData.songName}</p>
                </div>
            </div>
            <audio src={musicData.url} style={{display:'none'}} ref={controlsAudio}></audio>
            <div className="controls_progress2">
                <p className="time_now">{musicData.timeNowtext}</p>
                <Slider label={false} value={value} onChange={setValue}></Slider>
                <p className="durationText">{musicData.durationText}</p>
            </div>
            {musicData.isplay?(<p onClick={pauseAudio}>暂停</p>):(<p onClick={playAudio}>播放</p>)}
        </div>
    )
}

export default MusicControls