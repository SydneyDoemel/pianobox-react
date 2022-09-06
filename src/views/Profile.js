import React, { useState, useEffect } from 'react'
import "../App2.css";
import { fileName, dateforme} from '../Regex';
import {BsBoxArrowUp}  from "react-icons/bs";
import {storage} from '../firebase';
import {v4 as uuidv4} from 'uuid';
import { ref, listAll, getDownloadURL, getStorage, deleteObject } from 'firebase/storage';
// import { uuidv4 } from '@firebase/util';



export default function Profile({user}) {
    const [filename, setFilename] = useState([])
    const [audioList, setAudioList]=useState([]);
    const [render, setRender]=useState(false)
    const audioListRef = ref(storage, `${user.username}`)
    const mystorage = getStorage();
    

  const deleteAudio = (name)=>{
        const thisAudio = ref(storage, name);
        deleteObject(thisAudio).then(() => {
          console.log('File deleted successfully');
       
        });   
       
      }
   
  
  useEffect(() => {
    // const audioListRef = ref(storage, `${user.username}`)
    
    listAll(audioListRef).then((response)=>{
      console.log(response)
      
      response.items.forEach((item)=>{
       
        getDownloadURL(item).then((url)=>{
        setAudioList((prev)=>[...prev,[url, item]] );
        
         
        })
        
      })
    })
    
  }, []);
  return (
    <>
    <div className='profile-body'>
    <div className="accordion accordion-flush" id="accordionFlushExample">
  <div className="accordion-item">
    <h2 className="accordion-header" id="flush-headingOne">
      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
        Saved Audio Clips
      </button>
    </h2>
    <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
      <div className="accordion-body">
    <div className="d-flex flex-wrap justify-content-around">
      {audioList.map((url, i)=>{
      return (
      <div className='card m-3'>
        <div className='card-body'>
      <h6 className='card-title profile-audio-title' key={i*-1}>{fileName.exec((url[1]._location.path_))} - {dateforme.exec((url[1]._location.path_))}</h6>
      <p></p>
      <audio key={i+1} src={url[0]} controls/><br/>
     <div className='d-flex justify-content-between'>
      <button onClick={()=>deleteAudio(url[1]._location.path_)} className='btn btn-outline-danger mr-5'>Delete</button>
      <BsBoxArrowUp size={'1.5rem'}/>
      </div>
      </div>
      </div>
      )
    })}
    </div>
      </div>
    </div>
  </div>
  
</div>
   </div>
  </>
   
  )
  }
