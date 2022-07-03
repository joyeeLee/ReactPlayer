
import { useState,useRef} from "react";
import './music.scss'
function MusicControls() {
    let [musicData,setMusicData] = useState({
        url:'',
        songName:'林宥嘉·脆弱一分钟',
        user:'',
        poster:'https://sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/music/poster-small.jpeg',
        songList:[],
        playIndex:0,
    })
    let progressBtn = useRef()
    let [drop,setDrop] = useState(false)

    let [dropData,setDropData] = useState({
        x:'',
        y:''
    })

    function changeData (){
        setMusicData((c)=>{
            c.songName = '遍地撒安抚'
            return {...c}
        })
    }
    function bar_down(e){
        setDrop(true)
        setDropData((c)=>{
            return {x:e.clientX,y:e.clientY}
        })
        // progressBtn.current.style.display  = ' none'
        // console.log(progressBtn)
        // console.log(this.progressBtn)
    }
    function bar_move(e){
        if(drop){
            let s_x  = dropData.x -e.clientX
            console.log(progressBtn.current.style,s_x)
            // progressBtn.current.style.transform = `translate(${s_x}'px', 0)`
        }
    }
    function bar_up(e){
        setDrop(false)
    }
    return  (
        <div className="music_con_wrapper">
            <div className="song_msg">
                <div className="poster_img" onClick={changeData}><img src={musicData.poster} alt="" /></div>
                <div className="msg_dox">
                    <p className="song_name">{musicData.songName}</p>
                </div>
            </div>
            <div className="controls_progress">
                <div className="progress_box" onMouseMove={bar_move} onMouseUp={bar_up}>
                    <i className="progress_btn" ref={progressBtn}  onMouseDown={bar_down} ></i>
                    <div className="progress_bar"></div>
                </div>
            </div>
        </div>
    )
}

export default MusicControls