import React, { useState, useEffect, useCallback } from "react";

import * as Tone from "tone";
import "../App2.css";
import { BsChevronUp, BsChevronDown, BsFillCircleFill, BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";

import Effects from "../components/Effects";
import Record from "../components/Record";
import Infomodal from "../components/Infomodal";
import { Link } from "react-router-dom";



export default function SynthTest({user}) {
 
  const [octave, setOctave] = useState(3);
  const [dur, setDur]=useState(4)
  const [checked, setChecked]=useState(false)
  const gainNode = new Tone.Gain(1).toDestination();
  const synth = new Tone.PolySynth().connect(gainNode);
  

     
  const playNote = useCallback(
    async (note) => {
      synth.triggerAttackRelease(`${note}`, `${dur}n`);
      await Tone.start();
    },
    [synth, dur]
  );
  


  const keyDots = (keyname) => {
    const newDot = document.querySelector(`.${keyname} .dot`);
    newDot.setAttribute(
      "style",
      "visibility: visible; color:rgb(255, 17, 61); font-size: 10px;"
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


  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);


  return (
    <>
    <div className="body ">
      <div className="d-flex align-items-center control-group">
        <label htmlFor="help" className="ms-5 me-3 mt-1 control control-checkbox">Info View
        <input type="checkbox" id="help" className="mt-1 checkbox" checked={checked}  onChange={() => setChecked((prev) => !prev)}></input>
        <div className="control_indicator"></div>
        </label>
      
      </div>
      <p className="tool text-center">{checked? <><p className="tooltips d-inline-flex">Use corresponding keys to play</p></>:<></>}</p>
    <div className="d-flex justify-content-center align-items-center">
     
    <button type="button" style={{"border":"none"}}  className="bg-c" onClick={() => setOctave(octave - 1)} ><span className="tool">
      {checked? <><p className="tooltips">Down one octave</p></>:<></>}</span><BsArrowLeftCircle size={30} className="me-2 mt-5 octave-arrow"/> </button>

    <div className="piano ">
   
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
         
      
      <div className="controls d-flex justify-content-center pb-3 pt-2">
        <div className="octave text-center mx-5 mt-4">
          <h6>Note Duration</h6>
          <div className="btn-group" role="group" aria-label="Basic example">
            <button type="button" onClick={() => setDur(dur - 1)} className="btn btn-outline-dark" >
            Longer<BsChevronDown /></button>
            <button type="button" onClick={() => setDur(dur + 1)} className="btn btn-outline-dark" > Shorter <BsChevronUp />
            </button>
          </div> 
        </div>
      </div>
      </div>
         <button type="button" style={{"border":"none"}}onClick={() => setOctave(octave + 1)} className="oct2"><span className="tool2">
          {checked? <><p className="tooltips">Up one octave</p></>:<></>}</span><BsArrowRightCircle size={30} className="ms-2 mt-5 octave-arrow"/></button>
      
      </div>
      <Effects synth={synth} /><span className="tool effect-tool ms-5">
        {checked? <><p className="tooltips d-inline-flex">Enable/disable effects</p></>:<></>}</span>
        <span className="tool effect-tool2 ms-3">{checked? <><p className="tooltips d-inline-flex ">Adjust effects with slider</p></>:<></>}</span>
      {user.username? <>
        <Record gainNode={gainNode} user={user}/>
        <span className="tool record-tool">{checked? <><p className="tooltips d-inline-flex">Record audio</p></>:<></>}</span>
          <span className="tool record-tool2">{checked? <><p className="tooltips d-inline-flex ">Save audio to library</p></>:<></>}</span> </>
          :
          <><p className="mt-5 text-center">To save and store your masterpieces, <Link to='/signup'>Sign Up</Link> for PianoBox</p>
          </>}
      
      </div>
    </>
  );
}
