import React, { useState, useEffect, useCallback } from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import * as Tone from "tone";
import "../App2.css";
import { BsMicFill, BsFillStopCircleFill, BsRecordFill, BsStopFill} from "react-icons/bs";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";
import { v4 } from "uuid";


export default function Record({gainNode, user}) {
    const [audioUpload, setAudioUpload] = useState(null);
    const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({ audio: true });
    const mutePiano = ()=>{
        gainNode.gain.rampTo(0)
      };
      const enablePiano = ()=>{
        gainNode.gain.rampTo(1)
      };
      
      const handleSave = async (e) => {
        e.preventDefault();
        const title = e.target.thing.value;
        let today = new Date();
        const audioBlob = await fetch(mediaBlobUrl).then((r) => r.blob());
        const audioFile = new File([audioBlob], "voice.wav", { type: "audio/wav" });
        setAudioUpload(audioFile);
        if (audioFile === null) return;
        const audioRef = ref(storage, `${user.username}/${title}_${v4()}=${today.getMonth()}-${today.getDate()}-${today.getFullYear()}`);
        uploadBytes(audioRef, audioFile).then(() => {
          console.log("audio uploaded");
          console.log(audioFile);

        });
      };
    
  return (
    <div><div className="d-flex flex-wrap record justify-content-center align-items-center mt-3">
    <p className="mt-2 status alert recordalert rec">
      -- {status} --</p>

    <button className=" btn rec" onClick={startRecording} ><BsRecordFill className="rec" size={30}/>
    </button>
    <button className=" btn rec" onClick={stopRecording}>
      <BsStopFill className="rec" size={30}/>
      
    </button>
    <audio src={mediaBlobUrl} controls loop />
    
    <button type="button" onClick={() => { mutePiano() }} className="btn btn-outline-dark ms-3" data-bs-toggle="modal" data-bs-target="#exampleModal" > Save Audio
    </button>

    <div className="modal fade " id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              New Audio
            </h5>
            <button type="button" onClick={()=>{mutePiano()}} className="btn-close btn-outline-dark" data-bs-dismiss="modal" aria-label="Close" ></button>
          </div>
          <form onSubmit={(e) => { handleSave(e); enablePiano()}}>
            <div className="modal-body">
              <input name="thing" type='text'/>
              
              <button type="submit" className="btn btn-outline-primary mx-3">
                Save
              </button>
             
            </div>
          </form>
          </div>
          
        </div>
      </div>
  </div>

    </div>
  )
}
