import React, {useState} from 'react'
import Sound from 'react-sound'
const Audio = require('../audio/cinematic-ambient-prayer-10007.mp3')

function Playlist (){

    const [isPlaying, setIsPlaying] = useState(false)
// TODO: need to finish adding the player or edits. 
const ref=React.createRef()

const handleclick=()=>{
    console.log("inside")
    if (isPlaying) {
        setIsPlaying(!isPlaying)
        ref.current.pause(
        )
    } else {
        setIsPlaying(!isPlaying)
        ref.current.play()
    }
}
    return(
        <>
        <div>
        <button onClick={handleclick}>
            {
                isPlaying?'Pause': 'Play'
            }
        </button>
            
            <audio ref={ref} src={Audio} /> 
           
        </div>
        </>
    )
}

export default Playlist