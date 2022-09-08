
import React, { useCallback, useEffect, useState} from "react";
import * as Tone from "tone";
import {BsFillPlayFill,BsFillStopFill} from "react-icons/bs";
import "../effects.css";


let mydelay = null
let reverb = null
let shift = null
let vibrato = null
let cheby = null
let crush = null
let wah = null
let phaser = null
export default function Effects({synth}) {
  
    const [vib, setVib]=useState(6)
    const [delay, setDelay]=useState(.5)
    const [shifter, setShifter]=useState(.5)
    const [verb, setVerb]=useState(5)
    const [vibOn, setVibOn]= useState(false)
    const [delayOn, setDelayOn]= useState(false)
    const [shifterOn, setShifterOn]= useState(false)
    const [verbOn, setVerbOn]= useState(false)
    const [delayValue, setDelayValue] = useState(.5)
    const [reverbValue, setReverbValue] = useState(5)
    const [shiftValue, setShiftValue] = useState(.5)
    const [vibratoValue, setVibratoValue] = useState(6)
    const [chebyValue, setChebyValue] = useState(50)
    const [crushValue, setCrushValue] = useState(8)
    const [wahValue, setWahValue] = useState(6)
    const [phaserValue, setPhaserValue] = useState(15)


    /*const mydelay = new Tone.PingPongDelay(delay, 0.6).toDestination();
  const reverb = new Tone.Reverb(verb).toDestination()
  const shift = new Tone.FrequencyShifter(shifter).toDestination();
  const vibrato = new Tone.Vibrato(vib,.1).toDestination();*/

  useEffect(
    () => {
      mydelay = new Tone.PingPongDelay(.5, 0.6).toDestination();
      reverb = new Tone.Reverb(5).toDestination()
      shift = new Tone.FrequencyShifter(.5).toDestination();
      vibrato = new Tone.Vibrato(6,.1).toDestination();
      cheby = new Tone.Chebyshev(50).toDestination();
      crush = new Tone.BitCrusher(8).toDestination();
      wah = new Tone.AutoWah(440,12,-40).toDestination();
      phaser = new Tone.Phaser(21,2,1000).toDestination();
    },[]
  )

  // const distortion = new Tone.Distortion();
  // // ...
  // distortion.distortion = 0.9;
  // // or using `set`
  // distortion.set('distortion', 0.9);

  const changeVib = async (e) => {
    e.preventDefault()
    const myvib = e.target.value
    const imyvib = parseInt(myvib, 10)
    setVibratoValue(imyvib)
    vibrato.set({'frequency': imyvib})
    console.log(vibrato.frequency)

  
}
const changeShifter = async (e) => {
  e.preventDefault()
  const myshift = e.target.value
  const imyshift= parseFloat(myshift, 10)
  setShiftValue(imyshift)
  shift.set({"frequency": imyshift})
  console.log(shift.frequency)

}
const changeDelay = async (e) => {
  e.preventDefault()
  const mydelayval = e.target.value
  const imydelay= parseFloat(mydelayval, 10)
  setDelayValue(imydelay)
 mydelay.set({'delayTime': imydelay})
 console.log(mydelay.delayTime)

}
const changecheby = async (e) => {
  e.preventDefault()
  const mychebyval = e.target.value
  const imycheby= parseInt(mychebyval, 10)
  setChebyValue(imycheby)
 cheby.set({'order': imycheby})
 console.log(cheby.order)

}
const changeVerb = async (e) => {
  e.preventDefault()
  const myverb = e.target.value
  const imyverb= parseInt(myverb, 10)
  setReverbValue(imyverb)
  reverb.set({"decay":imyverb})
  console.log(reverb.decay)


}
const changeCrush = async (e) => {
  e.preventDefault()
  const mycrush = e.target.value
  const imycrush= parseInt(mycrush, 10)
  setCrushValue(imycrush)
  crush.set({"bits":imycrush})
  console.log(crush.bits)


}
const changeWah = async (e) => {
  e.preventDefault()
  const mywah = e.target.value
  const imywah= parseInt(mywah, 10)
  setWahValue(imywah)
  wah.set({"octaves":imywah})
  console.log(wah.octaves)


}
const changePhaser = async (e) => {
  e.preventDefault()
  const myphase = e.target.value
  const imyphase= parseInt(myphase, 10)
  setPhaserValue(imyphase)
  phaser.set({"frequency":imyphase})
  console.log(phaser.frequency)


}
  const startVibrato=() =>{
    synth.connect(vibrato);
}
  const stopVibrato=()=> {
      synth.disconnect(vibrato)
    };
    const startCrush=() =>{
      synth.connect(crush);
  }
    const stopCrush=()=> {
        synth.disconnect(crush)
      };
  
    const startcheby=() =>{
      synth.connect(cheby);
  }
    const stopcheby=()=> {
        synth.disconnect(cheby)
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
  const startWah=() =>{
    synth.connect(wah);}
const stopWah=()=> {
      synth.disconnect(wah)};
    

  const startPhaser=() =>{
    synth.connect(phaser);}
const stopPhaser=()=> {
      synth.disconnect(phaser)};
        
    


  return (
    <div>
       <div className="effects mx-auto ">
      <div id="carouselExampleControls" className="carousel slide" data-bs-interval="false">
  <div className="carousel-inner">
    <div className="carousel-item active">
      
       <div className="pg1 d-flex">
        <div className="pitch-shift mx-4">
          <h6 className="text-center m-2">Pitch Shift</h6>
          <div className="btn-group m-2" role='group'>
          <button className="btn btn-outline-dark ml-5 " onClick={()=>startShift()}><BsFillPlayFill size={26}/></button>
          <button className="btn btn-outline-dark ml-5 " onClick={()=>stopShift()}><BsFillStopFill size={26}/></button>
          </div><br/>
          <input className="mb-2 " onChange={(e)=>{changeShifter(e)}} id="shift" type="range" min="0" max="1" step=".1" value={shiftValue}></input>
 
        
         
          </div>
          <div className="reverb mx-4">
          <h6 className="text-center m-2">Reverb</h6>
          <div className="btn-group m-2" role='group'>
          <button className="btn  btn-outline-dark ml-5 " onClick={()=>startVerb()}><BsFillPlayFill size={26}/></button>
          <button className="btn btn-outline-dark ml-5 " onClick={()=>stopVerb()}><BsFillStopFill size={26}/></button>
          </div><br/>
          <input className="mb-2 " onChange={(e)=>{changeVerb(e)}} id="verb" type="range" min="0" max="10" step="1" value={reverbValue}></input>
          </div>
          <div className="vibrato mx-4">
          <h6 className="text-center m-2">Vibrato</h6>
          <div className="btn-group m-2" role='group'>
          <button className="btn btn-outline-dark ml-5 "  onClick={()=>startVibrato()}><BsFillPlayFill size={26}/></button>
          <button className="btn btn-outline-dark ml-5 " onClick={()=>stopVibrato()}><BsFillStopFill size={26}/></button>
          </div><br/>
          <input className="mb-2 " onChange={(e)=>{changeVib(e)}} id="vib" type="range" min="0" max="10" step="1" value={vibratoValue}></input>
          
          </div>
          <div className="delay mx-4">
          <h6 className="text-center m-2">Delay</h6>
          <div className="btn-group m-2" role='group'>
          <button className="btn btn-outline-dark ml-5 "  onClick={()=>startDelay()}><BsFillPlayFill size={26}/></button>
          <button className="btn btn-outline-dark ml-5 " onClick={()=>stopDelay()}><BsFillStopFill size={26}/></button>
          </div><br/>
          <input className="mb-2 " onChange={(e)=>{changeDelay(e)}} id="delay" type="range" min=".1" max="1.5" step=".1" value={delayValue}></input>
         
          </div>
       
          </div>
    </div>
    <div className="carousel-item">
    <div className="pg1 d-flex">
        <div className="pitch-shift mx-4">
          <h6 className="text-center m-2">Distortion</h6>
          <div className="btn-group m-2" role='group'>
          <button className="btn btn-outline-dark ml-5 " onClick={()=>startcheby()}><BsFillPlayFill size={26}/></button>
          <button className="btn btn-outline-dark ml-5 " onClick={()=>stopcheby()}><BsFillStopFill size={26}/></button>
          </div><br/>
          <input className="mb-2 " onChange={(e)=>{changecheby(e)}} id="shift" type="range" min="1" max="100" step="1" value={chebyValue}></input>
 
        
         
          </div>
          <div className="reverb mx-4">
          <h6 className="text-center m-2">Crush</h6>
          <div className="btn-group m-2" role='group'>
          <button className="btn  btn-outline-dark ml-5 " onClick={()=>startCrush()}><BsFillPlayFill size={26}/></button>
          <button className="btn btn-outline-dark ml-5 " onClick={()=>stopCrush()}><BsFillStopFill size={26}/></button>
          </div><br/>
          <input className="mb-2 " onChange={(e)=>{changeCrush(e)}} id="verb" type="range" min="1" max="16" step="1" value={crushValue}></input>
          </div>
          <div className="vibrato mx-4">
          <h6 className="text-center m-2">Phaser</h6>
          <div className="btn-group m-2" role='group'>
          <button className="btn btn-outline-dark ml-5 "  onClick={()=>startPhaser()}><BsFillPlayFill size={26}/></button>
          <button className="btn btn-outline-dark ml-5 " onClick={()=>stopPhaser()}><BsFillStopFill size={26}/></button>
          </div><br/>
          <input className="mb-2 " onChange={(e)=>{changePhaser(e)}} id="vib" type="range" min="0" max="100" step="1" value={phaserValue}></input>
          
          </div>
          <div className="delay mx-4">
          <h6 className="text-center m-2">Wah</h6>
          <div className="btn-group m-2" role='group'>
          <button className="btn btn-outline-dark ml-5 "  onClick={()=>startWah()}><BsFillPlayFill size={26}/></button>
          <button className="btn btn-outline-dark ml-5 " onClick={()=>stopWah()}><BsFillStopFill size={26}/></button>
          </div><br/>
          <input className="mb-2 " onChange={(e)=>{changeWah(e)}} id="delay" type="range" min="1" max="12" step="1" value={wahValue}></input>
         
          </div>
       
          </div>
    </div>
    <div className="carousel-item">
      
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
    <span className="carousel-control-prev-icon "  aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
</div>
    </div>
  )
}
