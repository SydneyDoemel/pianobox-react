import React, { useState, useEffect, useCallback } from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import * as Tone from "tone";
import "../App2.css";
import { BsMicFill, BsFillStopCircleFill} from "react-icons/bs";
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
        if (audioUpload === null) return;
        const audioRef = ref(storage, `${user.username}/${title}_${v4()}=${today.getMonth()}-${today.getDate()}-${today.getFullYear()}`);
        uploadBytes(audioRef, audioFile).then(() => {
          console.log("audio uploaded");
          console.log(audioFile);
        });
      };
    
  return (
    <div><div className="d-flex record justify-content-center align-items-center mt-">
    <p className="mt-3 status alert alert-light recordalert">
      -- {status} --</p>

    <button className="my-1 mx-3 btn btn-outline-success" onClick={startRecording} > Start Recording <BsMicFill />
    </button>
    <button className="my-1 mx-3 btn-outline-danger btn" onClick={stopRecording}>
      Stop Recording <BsFillStopCircleFill />
    </button>
    
  </div>
  <div className="d-flex justify-content-center align-items-center mt-2 py-2">
  <audio src={mediaBlobUrl} controls loop />

    <button type="button" onClick={() => { mutePiano() }} className="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#exampleModal" > Save Audio
    </button>

    <div className="modal fade " id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              New Audio
            </h5>
            <button type="button" onClick={()=>{enablePiano()}} className="btn-close " data-bs-dismiss="modal" aria-label="Close" ></button>
          </div>
          <form onSubmit={(e) => { handleSave(e); enablePiano()}}>
            <div className="modal-body">
              <input name="thing" />
              
              <button type="submit" className="btn btn-outline-primary mx-3">
                Save
              </button>
             
            </div>
          </form>
          </div>
          
        </div>
      </div>
    </div></div>
  )
}
