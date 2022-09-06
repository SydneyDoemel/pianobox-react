
import React, { useCallback, useEffect, useState} from "react";
import * as Tone from "tone";
import "../effects.css";

export default function Effects({synth}) {
    const [vib, setVib]=useState(6)
    const [delay, setDelay]=useState(.5)
    const [shifter, setShifter]=useState(.5)
    const [verb, setVerb]=useState(5)
    const [vibOn, setVibOn]= useState(false)
    const [delayOn, setDelayOn]= useState(false)
    const [shifterOn, setShifterOn]= useState(false)
    const [verbOn, setVerbOn]= useState(false)
    const mydelay = new Tone.PingPongDelay(delay, 0.6).toDestination();
  const reverb = new Tone.Reverb(verb).toDestination()
  const shift = new Tone.FrequencyShifter(shifter).toDestination();
  const vibrato = new Tone.Vibrato(vib,.1).toDestination();

  // const distortion = new Tone.Distortion();
  // // ...
  // distortion.distortion = 0.9;
  // // or using `set`
  // distortion.set('distortion', 0.9);

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
  
  const mydelayval = e.target.value
  const imydelay= parseFloat(mydelayval, 10)
  setDelay(imydelay)
 

}
const changeVerb = async (e) => {
  e.preventDefault()
  const myverb = e.target.value
  const imyverb= parseInt(myverb, 10)
  setVerb(imyverb)

}


  const startVibrato=() =>{
    synth.connect(vibrato);
}
  const stopVibrato=()=> {
      synth.disconnect(vibrato)
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
        <div className="effects mx-auto ">
        <div className="pitch-shift">
          <h6 className="text-center m-2">Pitch Shift</h6>
          <div className="btn-group m-2" role='group'>
          <button className="btn btn-dark ml-5 " style={{ backgroundColor: "rgb(25, 1, 102)"}} onClick={()=>startShift()}>Start</button>
          <button className="btn btn-outline-dark ml-5 " onClick={()=>stopShift()}>Stop</button>
          </div><br/>
          <input className="mb-2 " onChange={(e)=>{changeShifter(e)}} id="shift" type="range" min="0" max="1" step=".1" value={shifter}></input>
 
        
         
          </div>
          <div className="reverb">
          <h6 className="text-center m-2">Reverb</h6>
          <div className="btn-group m-2" role='group'>
          <button className="btn btn-dark ml-5 " style={{ backgroundColor: "rgb(25, 1, 102)"}} onClick={()=>startVerb()}>Start</button>
          <button className="btn btn-outline-dark ml-5 " onClick={()=>stopVerb()}>Stop</button>
          </div><br/>
          <input className="mb-2 " onChange={(e)=>{changeVerb(e)}} id="verb" type="range" min="0" max="10" step="1" value={verb}></input>
          </div>
          <div className="vibrato">
          <h6 className="text-center m-2">Vibrato</h6>
          <div className="btn-group m-2" role='group'>
          <button className="btn btn-dark ml-5 " style={{ backgroundColor: "rgb(25, 1, 102)"}} onClick={()=>startVibrato()}>Start</button>
          <button className="btn btn-outline-dark ml-5 " onClick={()=>stopVibrato()}>Stop</button>
          </div><br/>
          <input className="mb-2 " onChange={(e)=>{changeVib(e)}} id="vib" type="range" min="0" max="10" step="1" value={vib}></input>
          
          </div>
          <div className="delay">
          <h6 className="text-center m-2">Delay</h6>
          <div className="btn-group m-2" role='group'>
          <button className="btn btn-dark ml-5 " style={{ backgroundColor: "rgb(25, 1, 102)"}} onClick={()=>startDelay()}>Start</button>
          <button className="btn btn-outline-dark ml-5 " onClick={()=>stopDelay()}>Stop</button>
          </div><br/>
          <input className="mb-2 " onChange={(e)=>{changeDelay(e)}} id="delay" type="range" min=".1" max="1.5" step=".1" value={delay}></input>
         
          </div>
       
      </div>
    </div>
  )
}
