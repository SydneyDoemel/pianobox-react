import React, { useState, useEffect, useReducer } from "react";
import "../App2.css";
import { fileName, dateforme } from "../Regex";
import { BsBoxArrowUp } from "react-icons/bs";
import { storage } from "../firebase";
import { v4 as uuidv4 } from "uuid";
import { ref, listAll, getDownloadURL, getStorage, deleteObject, uploadBytes, } from "firebase/storage";
import { ScaleExp } from "tone";
import SingleFolder from "../components/SingleFolder";
import { Link } from "react-router-dom";
// import { uuidv4 } from '@firebase/util';

export default function Profile({ user }) {
  const [filename, setFilename] = useState([]);
  const [audioList, setAudioList] = useState([]);
  const [, forceUpdate] = useState(0);
  const [audioUpload, setAudioUpload] = useState(null);
  const [folders, setFolders] = useState([]);
  const [files, setFiles] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [filterFolders, setFilterFolders]=useState([])
  const [folderInfo,setFolderInfo]=useState({})
  const audioListRef = ref(storage, `${user.username}`);
  const mystorage = getStorage();
  const [input, setInput] = useState('');
  // set  state true/false  to rerender

  const deleteAudio = (name) => {
    const thisAudio = ref(storage, name);
    deleteObject(thisAudio).then(() => {
      console.log("File deleted successfully");
      
    });
    
  
  };
  const handleSaveToFolder = async (e) => {
    e.preventDefault();
    const res = await fetch("http://127.0.0.1:5000/api/folder", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        foldername: e.target.foldername.value,
        filename: e.target.filename.value,
        url: e.target.firebase.value
      }),
    });
    const data = await res.json();
    console.log(data);
    setToggle(!toggle)
  };

  

  const showFolders = () => {
    if (folderInfo){
    return (
      folders.map((p,i)=>{<SingleFolder  key={i} folder={p} user={user}/>}))
  }
}

  useEffect(() => {
    // const audioListRef = ref(storage, `${user.username}`)
    listAll(audioListRef).then((response) => {
      console.log(response);
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setAudioList((prev) => [...prev, [url, item]]);
        });
      });
    });
  }, []);


  const getFolders = async () => {
    if (audioList !== []){
    const res = await fetch(
      `http://127.0.0.1:5000/api/myfolders/${user.username}`
    );
    const data = await res.json();
    console.log("data", data);
    setFolders(data.folders);
    setFiles(data.files);
    }
  };
  const getOneFolder = async (foldername) =>{
    const res = await fetch(
      `http://127.0.0.1:5000/api/myfolder//${user.username}/${foldername}`
    );
    const data = await res.json();
    console.log(data);
    setFolderInfo(data.folder_info)
    }
  useEffect(() => {
    // const audioListRef = ref(storage, `${user.username}`)
   
    getFolders();
    
  }, []);
  useEffect(() => {
    
  }, [folderInfo]);
   
   
  const listIt = async ()=>{
    listAll(audioListRef).then((response) => {
      console.log(response);
      response.items.forEach((item) => {
        console.log(typeof files);
        
       if (files.includes(item._location.path_)){
        getDownloadURL(item).then((url) => {
          setFilterFolders((prev) => [...prev, [url, item]]);
          console.log("did it")
        }
        );}
      })
    });};
  useEffect(() => {
    
      listIt();
      
      console.log('built')
  }, [files]);
   
  return (
    <>
   
  <div className="profile-body" id="profile-bod">
        
    <ul className="nav nav-tabs" id="myTab" role="tablist">
      <li className="nav-item" role="presentation">
        <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">All Recordings</button>
      </li>

        {folders? <>
        {folders.map((fold,i)=>{
        return(
        <li className="nav-item" role="presentation">
        <button className="nav-link" id={`${fold}-tab`} onClick={()=>getOneFolder(fold)} data-bs-toggle="tab" data-bs-target={`#${fold}`} type="button" role="tab" aria-controls={`${fold}`} aria-selected="false">{fold}</button>
      </li>
        )
      })}</>:<></>}
      

    </ul>
    <div className="tab-content" id="myTabContent">
      <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab"><div className="accordion accordion-flush" id="accordionFlushExample">
                    <div className="d-flex flex-wrap justify-content-around">
                      {audioList.map((url, i) => {
                        return (
                          <div className="card m-3" key={i}>
                            <div className="card-body">
                              <h6 className="card-title profile-audio-title" >
                                {fileName.exec(url[1]._location.path_)} -{" "}
                                {dateforme.exec(url[1]._location.path_)}
                              </h6>
                              <audio src={url[0]} controls />
                              <br />
                              <div className="d-flex justify-content-between">
                                <button onClick={() => { deleteAudio(url[1]._location.path_); forceUpdate(Math.random()); }}
                                  className="btn btn-outline-danger mr-5" >
                                  Delete
                                </button>
                              
                                <button type="button" onClick={()=>setInput(url[1]._location.path_)} className="btn btn-dark" data-toggle="modal" data-target="#exampleModal" >
                                  Add to Folder
                                </button>
                                <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                                  <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                      <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel" >
                                          Folder Title
                                        </h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" >
                                          <span aria-hidden="true">&times;</span>
                                        </button>
                                      </div>
                                      <div className="modal-body">
                                        <form onSubmit={(e) => handleSaveToFolder(e)} >
                                          <input className="form-control form-control-lg" type="text" name="foldername" placeholder="New Folder" />
                                          <input className="form-control form-control-lg" type="text" name="filename" defaultValue={input} />
                                          <input type = "hidden" name = "firebase" value ={url[0]} />
                                          <button type="submit" className="btn btn-primary" >
                                            Save changes
                                          </button>
                                        </form>
                                      </div>
                                      <div className="modal-footer"></div>
                                    </div>
                                  </div>
                                </div>
                                <button onClick={() => handleSaveToFolder(url)} className="btn btn-outline-dark mr-5" >
                                  Add note
                                </button>
                                <BsBoxArrowUp size={"1.5rem"} />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    
              </div>
            </div>
          
      </div>
        
      
          {folderInfo.folder_info? <>
        <SingleFolder folderInfo={folderInfo.folder_info}/></>:<></>
      }
      
    </div>

      
          </div>
          
    </>
  );
}
