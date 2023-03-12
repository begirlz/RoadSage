import React, {useState} from 'react'
import Sound from 'react-sound'
const Audio = require('../audio/cinematic-ambient-prayer-10007.mp3')

function Playlist (){

    const [isPlaying, setIsPlaying] = useState(false)
// TODO: need to finish adding the player or edits. 
    return(
        <>
        <div>
        <button onClick={()=>setIsPlaying(!isPlaying)}>{!isPlaying? 'Play':'Stop'}</button>
            <Sound url={Audio} playStatus={isPlaying?"PLAYING": "STOPPED"} />
            {/* <Sound url={Audio} playStatus="STOPPED" /> */}
            {/* <h3>Playlist</h3>
            <audio src={Audio} autoplay /> */}
            {/* <audio controls>
            {
                (new Audio().canPlayType('audio/mpeg'))? <source src="/audio/cinematic-ambient-prayer-10007.mp3" type="audio/mpeg" />:<audio src="/audio/cinematic-ambient-prayer-10007.mp3" controls/>
            }
            </audio> */}
        </div>
        </>
    )
}

export default Playlist