import React, { useState, useEffect, useCallback } from "react";

import { useReactMediaRecorder } from "react-media-recorder";
import * as Tone from "tone";
import "../App2.css";
import { BsMicFill, BsFillStopCircleFill, BsChevronUp, BsChevronDown, BsFillCircleFill } from "react-icons/bs";
import { Oscillator, PitchShift } from "tone";
import { ref, getStorage, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import { v4 } from "uuid";
import Profile from "./Profile";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SaveModal from "../components/SaveModal";

export default function SynthTest({user}) {
 const [delay,setDelay]=useState(true)
  const [octave, setOctave] = useState(3);
  const [audioUpload, setAudioUpload] = useState(null);
  const [dur, setDur]=useState(4)
  const [message, setMessage]= useState(false)
  const gainNode = new Tone.Gain(1).toDestination();

  const synth = new Tone.PolySynth().connect(gainNode);

  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({ audio: true });

  // const pitchShift = new Tone.PitchShift(4).toDestination();
  // const filter = new Tone.Filter("G5").toDestination();
  // const pingPong = new Tone.PingPongDelay("8n", 0.6).toDestination();
  const pingPong = new Tone.PingPongDelay("8n", 0.6).toDestination();
  const pingPong2 = new Tone.PingPongDelay("4n", 0.2).toDestination();
  const reverb = new Tone.JCReverb(0.8).toDestination();
  const reverb2 = new Tone.Reverb(5).toDestination()
  const shift = new Tone.FrequencyShifter(.5).toDestination();
  const vibrato = new Tone.Vibrato(6,.1).toDestination();

  const startVibrato=() =>{
    synth.connect(vibrato);}
  const stopVibrato=()=> {
      synth.disconnect(vibrato)};

  const startVerb=() =>{
    synth.connect(reverb2);}
  const stopVerb=()=> {
      synth.disconnect(reverb2)};

  const startShift=() =>{
    synth.connect(shift);}
  const stopShift=()=> {
      synth.disconnect(shift)};

  const startDelay=() =>{
      synth.connect(pingPong);}
  const stopDelay=()=> {
        synth.disconnect(pingPong)};
 
  const playNote = useCallback(
    async (note) => {
      synth.triggerAttackRelease(`${note}`, `${dur}n`);
      await Tone.start();
    },
    [synth, dur]
  );
const mutePiano = ()=>{
  gainNode.gain.rampTo(0)
};
const enablePiano = ()=>{
  gainNode.gain.rampTo(1)
};
  const keyDots = (keyname) => {
    const newDot = document.querySelector(`.${keyname} .dot`);
    newDot.setAttribute(
      "style",
      "visibility: visible; color:red; font-size: 10px;"
    );
    setTimeout(() => {
      newDot.setAttribute("style", "visibility: hidden;");
    }, 250);
  };
  const handleKeyPress = useCallback(
    (event) => {
      // if (event.key === "a") {
      switch (event.key) {
        case "a":
          playNote(`C${octave}`);
          console.log("you play a");
          keyDots("c3");
          break;
        case "s":
          playNote(`D${octave}`);
          keyDots("d3");
          break;
        case "d":
          playNote(`E${octave}`);
          keyDots("e3");
          break;
        case "f":
          playNote(`F${octave}`);
          keyDots("f3");
          break;
        case "g":
          playNote(`G${octave}`);
          keyDots("g3");
          break;
        case "h":
          playNote(`A${octave}`);
          keyDots("a3");
          break;
        case "j":
          playNote(`B${octave}`);
          keyDots("b3");
          break;
        case "k":
          playNote(`C${octave + 1}`);
          keyDots("c4");
          break;
        case "l":
          playNote(`D${octave + 1}`);
          keyDots("d4");
          break;
        case ";":
          playNote(`E${octave + 1}`);
          keyDots("e4");
          break;
        case "'":
          playNote(`F${octave + 1}`);
          keyDots("f4");
          break;
        case "z":
          playNote(`G${octave + 1}`);
          keyDots("g4");
          break;
        case "x":
          playNote(`A${octave + 1}`);
          keyDots("a4");
          break;
        case "c":
          playNote(`B${octave + 1}`);
          keyDots("b4");
          break;
        case "v":
          playNote(`C${octave + 2}`);
          keyDots("c5");
          break;
        case "w":
          playNote(`C#${octave}`);
          keyDots("cs3");
          break;
        case "e":
          playNote(`D#${octave}`);
          keyDots("ds3");
          break;
        case "t":
          playNote(`F#${octave}`);
          keyDots("fs3");
          break;
        case "y":
          playNote(`G#${octave}`);
          keyDots("gs3");
          break;
        case "u":
          playNote(`A#${octave}`);
          keyDots("as3");
          break;
        case "i":
          playNote(`C#${octave + 1}`);
          keyDots("cs4");
          break;
        case "o":
          playNote(`D#${octave + 1}`);
          keyDots("ds4");
          break;
        case "p":
          playNote(`F#${octave + 1}`);
          keyDots("fs4");
          break;
        case "[":
          playNote(`G#${octave + 1}`);
          keyDots("gs4");
          break;
        case "]":
          playNote(`A#${octave + 1}`);
          keyDots("as4");
          break;
        case "ArrowUp":
          setOctave(octave + 1);

          break;
        case "ArrowDown":
          setOctave(octave - 1);
          break;
      }
    },
    [playNote, setOctave, octave]
  );

  const handleSave = async (e) => {
    e.preventDefault();
    const title = e.target.thing.value;
    let today = new Date();
    const audioBlob = await fetch(mediaBlobUrl).then((r) => r.blob());
    const audioFile = new File([audioBlob], "voice.wav", { type: "audio/wav" });
    // const formData = new FormData(); // preparing to send to the server

    // formData.append('file', audioFile);  // preparing to send to the server
    setAudioUpload(audioFile);
    if (audioUpload === null) return;
    const audioRef = ref(storage, `${user.username}/${title}_${v4()}=${today.getMonth()}-${today.getDate()}-${today.getFullYear()}`);
    
   
    uploadBytes(audioRef, audioFile).then(() => {
      console.log("audio uploaded");
      console.log(audioFile);
      setMessage(true)
    });
  };

  const saveMessage = ()=>{
    if (message === true){
        
        return(
            <><div className="alert alert-success" role="alert">
                Audio saved
          </div></>
        )
    }
    
}

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <>
    <div className="body">
    <h1 className="display-4 pianobox mt-2 mb-4">PianoBox</h1>
    <div className="piano">
    <div className="container4">
      <div className="c3 white" onClick={() => {playNote(`C${octave}`);keyDots("c3");}}>
        <div> <p>a</p>{" "} <BsFillCircleFill className="dot" style={{ visibility: "hidden" }}/>
        </div>
      </div>
      <div className="d3 white" onClick={() => {playNote(`D${octave}`);keyDots("d3");}}>
        <div> <p>s</p>{" "} <BsFillCircleFill className="dot" style={{ visibility: "hidden" }}/>
        </div>
      </div>
      <div className="e3 white" onClick={() => {playNote(`E${octave}`);keyDots("e3");}}>
        <div> <p>d</p>{" "} <BsFillCircleFill className="dot" style={{ visibility: "hidden" }}/></div>
        </div>
      <div className="f3 white" onClick={() => {playNote(`F${octave}`);keyDots("f3");}}>
        <div><p>f</p>{" "}<BsFillCircleFill className="dot" style={{ visibility: "hidden" }}/>
        </div>
      </div>
      <div className="g3 white" onClick={() => {playNote(`G${octave}`);keyDots("g3");}}>
        <div><p>g</p>{" "}<BsFillCircleFill className="dot" style={{ visibility: "hidden" }}/>
        </div>
      </div>
      <div className="a3 white" onClick={() => { playNote(`A${octave}`); keyDots("a3");}}>
          <div> <p>h</p>{" "} <BsFillCircleFill className="dot" style={{ visibility: "hidden" }} />
          </div>
        </div>
      <div className="b3 white" onClick={() => { playNote(`B${octave}`); keyDots("b3"); }} >
          <div> <p>j</p>{" "} <BsFillCircleFill className="dot" style={{ visibility: "hidden" }} />
          </div>
      </div>
      <div className="c4 white" onClick={() => { playNote(`C${octave + 1}`); keyDots("c4"); }} >
          <div> <p>k</p>{" "} <BsFillCircleFill className="dot" style={{ visibility: "hidden" }} />
          </div>
        </div>
      <div className="d4 white" onClick={() => { playNote(`D${octave + 1}`); keyDots("d4"); }} >
          <div> <p>l</p>{" "} <BsFillCircleFill className="dot" style={{ visibility: "hidden" }} />
          </div>
        </div>
      <div className="e4 white" onClick={() => { playNote(`E${octave + 1}`); keyDots("e4"); }} >
          <div> <p>;</p>{" "} <BsFillCircleFill className="dot" style={{ visibility: "hidden" }} />
          </div>
        </div>
      <div className="f4 white" onClick={() => { playNote(`F${octave + 1}`); keyDots("f4"); }} >
          <div> <p>'</p>{" "} <BsFillCircleFill className="dot" style={{ visibility: "hidden" }} />
          </div>
        </div>
        <div className="g4 white" onClick={() => { playNote(`G${octave + 1}`); keyDots("g4"); }} >
          <div> <p>z</p>{" "} <BsFillCircleFill className="dot" style={{ visibility: "hidden" }} />
          </div>
        </div>
        <div className="a4 white" onClick={() => { playNote(`A${octave + 1}`); keyDots("a4"); }} >
          <div> <p>x</p>{" "} <BsFillCircleFill className="dot" style={{ visibility: "hidden" }} />
          </div>
        </div>
        <div className="b4 white" onClick={() => { playNote(`B${octave + 1}`); keyDots("b4"); }} >
          <div> <p>c</p>{" "} <BsFillCircleFill className="dot" style={{ visibility: "hidden" }} />
          </div>
        </div>
        <div className="c5 white" onClick={() => { playNote(`C${octave + 2}`); keyDots("c5"); }} >
          <div> <p>v</p>{" "} <BsFillCircleFill className="dot" style={{ visibility: "hidden" }} />
          </div>
        </div>
        <div className="cs3 black" onClick={() => { playNote(`C#${octave}`); keyDots("cs3"); }} >
          <div> <p>w</p>{" "} <BsFillCircleFill className="dot" style={{ visibility: "hidden" }} />
          </div>
        </div>
        <div className="ds3 black" onClick={() => { playNote(`D#${octave}`); keyDots("ds3"); }} >
          <div> <p>e</p>{" "} <BsFillCircleFill className="dot" style={{ visibility: "hidden" }} />
          </div>
        </div>
        <div className="fs3 black" onClick={() => { playNote(`F#${octave}`); keyDots("fs3"); }} >
          <div> <p>t</p>{" "} <BsFillCircleFill className="dot" style={{ visibility: "hidden" }} />
          </div>
        </div>
        <div className="gs3 black" onClick={() => { playNote(`G#${octave}`); keyDots("gs3"); }} >
          <div> <p>y</p>{" "} <BsFillCircleFill className="dot" style={{ visibility: "hidden" }} />
          </div>
        </div>
        <div className="as3 black" onClick={() => { playNote(`A#${octave}`); keyDots("as3"); }} >
          <div> <p>u</p>{" "} <BsFillCircleFill className="dot" style={{ visibility: "hidden" }} />
          </div>
        </div>
        <div className="cs4 black" onClick={() => { playNote(`C#${octave + 1}`); keyDots("cs4"); }} >
          <div> <p>i</p>{" "} <BsFillCircleFill className="dot" style={{ visibility: "hidden" }} />
          </div>
        </div>
        <div className="ds4 black" onClick={() => { playNote(`D#${octave + 1}`); keyDots("ds4"); }} >
          <div> <p>o</p>{" "} <BsFillCircleFill className="dot" style={{ visibility: "hidden" }} />
          </div>
        </div>
        <div className="fs4 black" onClick={() => { playNote(`F#${octave + 1}`); keyDots("fs4"); }} >
          <div> <p>p</p>{" "}
           <BsFillCircleFill className="dot" style={{ visibility: "hidden" }} />
          </div>
        </div>
        <div className="gs4 black" onClick={() => { playNote(`G#${octave + 1}`); keyDots("gs4"); }} >
          <div> <p>[</p>{" "} <BsFillCircleFill className="dot" style={{ visibility: "hidden" }} />
          </div>
        </div>
        <div className="as4 black" onClick={() => { playNote(`A#${octave + 1}`); keyDots("as4");}}>
          <div> <p>]</p>{" "} <BsFillCircleFill className="dot" style={{ visibility: "hidden" }} />
          </div>
        </div>
        
      </div>
      <div className="controls d-flex justify-content-center pb-4 pt-2">
        <div className="octave text-center mx-5 mt-5">
          <h6>Change Octave</h6>
          <div className="btn-group" role="group" aria-label="Basic example">
            <button type="button" onClick={() => setOctave(octave - 1)} className="btn btn-outline-dark" >
            Down<BsChevronDown /></button>
            <button type="button" onClick={() => setOctave(octave + 1)} className="btn btn-outline-dark" > Up <BsChevronUp />
            </button>
          </div> 
        </div>
        <div className="octave text-center mx-5 mt-5">
          <h6>Change Note Duration</h6>
          <div className="btn-group" role="group" aria-label="Basic example">
            <button type="button" onClick={() => setDur(dur - 1)} className="btn btn-outline-dark" >
            Longer<BsChevronDown /></button>
            <button type="button" onClick={() => setDur(dur + 1)} className="btn btn-outline-dark" > Shorter <BsChevronUp />
            </button>
          </div> 
        </div>
      </div>
      </div>
      
      <div className="effects mx-auto">
        <div className="pitch-shift">
          <h6 className="text-center">Pitch Shift</h6>
          <div className="btn-group" role='group'>
          <button className="btn btn-dark ml-5 " onClick={()=>startShift()}>Start</button>
          <button className="btn btn-outline-dark ml-5 " onClick={()=>stopShift()}>Stop</button>
          </div>
          </div>
          <div className="reverb">
          <h6 className="text-center">Verb</h6>
          <div className="btn-group" role='group'>
          <button className="btn btn-dark ml-5 " onClick={()=>startVerb()}>Start</button>
          <button className="btn btn-outline-dark ml-5 " onClick={()=>stopVerb()}>Stop</button>
          </div>
          </div>
          <div className="vibrato">
          <h6 className="text-center">Vibrato</h6>
          <div className="btn-group" role='group'>
          <button className="btn btn-dark ml-5 " onClick={()=>startVibrato()}>Start</button>
          <button className="btn btn-outline-dark ml-5 " onClick={()=>stopVibrato()}>Stop</button>
          </div>
          </div>
          <div className="delay">
          <h6 className="text-center">Delay</h6>
          <div className="btn-group" role='group'>
          <button className="btn btn-dark ml-5 " onClick={()=>startDelay()}>Start</button>
          <button className="btn btn-outline-dark ml-5 " onClick={()=>stopDelay()}>Stop</button>
          </div>
          </div>
      </div>
     
      <div className="d-flex record justify-content-center align-items-center mt-">
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
        </div>
      </div>
    </>
  );
}
