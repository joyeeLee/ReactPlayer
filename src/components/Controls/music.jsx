
import { useState} from "react";
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
    function changeData (){
        setMusicData((c)=>{
            c.songName = '遍地撒安抚'
            return {...c}
        })
    }
    return  (
        <div className="music_con_wrapper">
            <div className="song_msg">
                <div className="poster_img" onClick={changeData}><img src={musicData.poster} alt="" /></div>
                <div className="msg_dox">
                    <p className="song_name">{musicData.songName}</p>
                </div>
            </div>
            <div className="controls_progress"></div>
        </div>
    )
}

export default MusicControls