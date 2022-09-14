import React, { useState, useEffect, useReducer } from "react";
import "../profile.css";
import { fileName, dateforme } from "../Regex";
import { BsBoxArrowUp } from "react-icons/bs";
import { storage } from "../firebase";
import { ref, listAll, getDownloadURL, getStorage, deleteObject,} from "firebase/storage";
import SingleFolder from "../components/SingleFolder";
import Fl2 from "../components/Fl2";

export default function Profile2({ user }) {
  const [audioList, setAudioList] = useState([]);
  const [, forceUpdate] = useState(0);
  const [folders, setFolders] = useState([]);
  const [files, setFiles] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [forceRender, setForceRender] = useState(0); // <=== Create new forceRender state
  const [filterFolders, setFilterFolders] = useState([]);
  const [folderInfo, setFolderInfo] = useState({});
  const audioListRef = ref(storage, `${user.username}`);
  const mystorage = getStorage();
  const [input, setInput] = useState("");
  // set  state true/false  to rerender

  const deleteAudio = (name) => {
    const thisAudio = ref(storage, name);
    deleteObject(thisAudio).then(() => {
      console.log("File deleted successfully");
      setForceRender(prev => prev + 1);
     
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
        url: e.target.firebase.value,
      }),
    });
    const data = await res.json();
    console.log(data);
    setForceRender(prev => prev + 1);
  };

  const removefromFolder = async (e) => {
    e.preventDefault();
    const res = await fetch("http://127.0.0.1:5000/api/remove", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({

        filename: e.target.filename.value,
        foldername: e.target.foldername.value
  
      }),
    });
    const data = await res.json();
    console.log(data);
    setForceRender(prev => prev + 1);
    getOneFolder(e.target.foldername.value)
   
  };

 
  const listAllAudio = () =>{
     // const audioListRef = ref(storage, `${user.username}`)
     listAll(audioListRef).then((response) => {
      console.log(response);
      const emptylst=[]
      setAudioList(emptylst)
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setAudioList((prev) => [...prev, [url, item]]);
        });
      });
     
    });
 
  }
  useEffect(() => {
   
    listAllAudio()
  }, [ forceRender]);

  const getFolders = async () => {
    if (audioList !== []) {
      const res = await fetch(
        `http://127.0.0.1:5000/api/myfolders/${user.username}`
      );
      const data = await res.json();
      console.log("data", data);
      setFolders(data.folders);
      setFiles(data.files);
    }
  };
  const getOneFolder = async (foldername) => {
    const res = await fetch(
      `http://127.0.0.1:5000/api/myfolder//${user.username}/${foldername}`
    );
    const data = await res.json();
    console.log(data);
    setFolderInfo(data);
    
  };

  useEffect(() => {
    getFolders();
  }, [forceRender]);
  useEffect(() => {}, [folderInfo]);

  const listFolders = async () => {
    listAll(audioListRef).then((response) => {
      console.log(response);
      
      response.items.forEach((item) => {
        console.log(typeof files);
        if (files.includes(item._location.path_)) {
          getDownloadURL(item).then((url) => {
            setFilterFolders((prev) => [...prev, [url, item]]);
            console.log("did it");
          });
        }
      });
    });
  };
  useEffect(() => {
    listFolders();

    console.log("built");
  }, [files, forceRender]);

  return (
    <>
      <div className="profile-body" id="profile-bod">
      {audioList? <>
      <ul className="nav nav-tabs" id="myTab" role="tablist">
      <li className="nav-item" role="presentation">
        <button onClick={()=>getOneFolder()} className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">All Recordings</button>
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

      <div className="tab-content" id="nav-tabContent">
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
                              <br />
                              <div className="card-btns">
                              <audio src={url[0]} controls />
                                <button onClick={() => { deleteAudio(url[1]._location.path_); setToggle(!toggle);}}
                                  className="btn btn-outline-danger mr-5 profile-btn" >
                                  Delete
                                </button>
                                <button type="button" onClick={()=>setInput(url[1]._location.path_)} className="btn btn-dark profile-btn" data-toggle="modal" data-target="#exampleModal" >
                                  Add to Folder
                                </button>
                                <button onClick={() => handleSaveToFolder(url)} className="btn btn-outline-dark mr-5 profile-btn" >
                                  Add note
                                </button>
                                <BsBoxArrowUp size={"1.5rem"} />
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
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    
              </div>
              
            </div>
            
          
      </div>
      
      {folderInfo.folder_info ? (
            <>
             
              {folderInfo.folder_info.map((fold,i)=>{return(
        <div className="d-flex  justify-content-center" key={i}>
           <div className="border-folder-item mt-3">
              <h5>   {fileName.exec(fold.filename)} -{" "}
                                {dateforme.exec(fold.filename)}</h5>
              <li className="list-group-item d-inline-flex align-items-center">
                <audio src={fold.url} controls />
                <button  onClick={() => { deleteAudio(fold.filename)}} className="btn btn-outline-danger">Delete</button>
                <form onSubmit={(e) => removefromFolder(e)}>
                <button className="btn btn-outline-dark">Remove From Folder</button>
                <input type = "hidden" name = "filename" value ={fold.filename} />
                <input type = "hidden" name = "foldername" value ={fold.foldername} />
                </form>
                <BsBoxArrowUp size={"1.5rem"} />
              </li>
            </div>
        </div>
        )})}
      
            
              
            </>
          ) : (
            <></>
          )}
        
      </div>

              </>:<><h4 className="mt-4 text-center">No saved audio clips.</h4></>}
        </div>
      
    </>
  );
}
