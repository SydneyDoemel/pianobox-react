
import React, { useCallback, useEffect, useState} from "react";
import * as Tone from "tone";
import "../App2.css";

export default function Effects({synth}) {
    const [effect, setEffect]=useState({"vibrato":6, "delay":.5, "shifter":.5})
    const [vibOn, setVibOn] =useState(false)
    const [vib, setVib]=useState(6)
    const [delay, setDelay]=useState(.5)
    const [shifter, setShifter]=useState(.5)
    const mydelay = new Tone.PingPongDelay(delay, 0.6).toDestination();
  const reverb = new Tone.Reverb(5).toDestination()
  const shift = new Tone.FrequencyShifter(shifter).toDestination();
  const vibrato = new Tone.Vibrato(vib,.1).toDestination();
  const changeVib = async (e) => {
    e.preventDefault()
    const myvib = e.target.value
    const imyvib = parseInt(myvib, 10)
    setVib(imyvib)
  
}
const changeShifter = async (e) => {
  e.preventDefault()
  const myshift = e.target.value
  const imyshift= parseFloat(myshift, 10)
  setShifter(imyshift)

}
const changeDelay = async (e) => {
  e.preventDefault()
  const mydelay = e.target.value
  const imydelay= parseFloat(mydelay, 10)
  setDelay(imydelay)

}


  const startVibrato=() =>{
    synth.connect(vibrato);
    setVibOn(true)
}
  const stopVibrato=()=> {
      synth.disconnect(vibrato)
      setVibOn(false)
    };

  const startVerb=() =>{
    synth.connect(reverb);}
  const stopVerb=()=> {
      synth.disconnect(reverb)};

  const startShift=() =>{
    synth.connect(shift);}
  const stopShift=()=> {
      synth.disconnect(shift)};

  const startDelay=() =>{
      synth.connect(mydelay);}
  const stopDelay=()=> {
        synth.disconnect(mydelay)};


  
  return (
    <div>
        <div className="effects mx-auto">
        <div className="pitch-shift">
          <h6 className="text-center">Pitch Shift</h6>
          <div className="btn-group" role='group'>
          <button className="btn btn-dark ml-5 " onClick={()=>startShift()}>Start</button>
          <button className="btn btn-outline-dark ml-5 " onClick={()=>stopShift()}>Stop</button>
          <input onChange={(e)=>{changeShifter(e)}} id="shift" type="range" min="0" max="1" step=".1" value={shifter}></input>
 
        
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
          <input onChange={(e)=>{changeVib(e)}} id="vib" type="range" min="0" max="10" step="1" value={vib}></input>
          </div>
          </div>
          <div className="delay">
          <h6 className="text-center">Delay</h6>
          <div className="btn-group" role='group'>
          <button className="btn btn-dark ml-5 " onClick={()=>startDelay()}>Start</button>
          <button className="btn btn-outline-dark ml-5 " onClick={()=>stopDelay()}>Stop</button>
          <input onChange={(e)=>{changeDelay(e)}} id="delay" type="range" min=".1" max="1.5" step=".1" value={delay}></input>
          </div>
          </div>
       
      </div>
    </div>
  )
}
