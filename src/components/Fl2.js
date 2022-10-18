import React, { useEffect } from "react";
import "../App2.css";
import { fileName, dateforme } from "../Regex";
import { BsBoxArrowUp } from "react-icons/bs";

export default function Fl2({ folderInfo, user, p }) {
  console.log(folderInfo, "yooo!!!");
  useEffect(() => {}, []);
  return (
    <>
      {folderInfo.folder_info.map((fold, i) => {
        return (
          <div className="d-flex  justify-content-center" key={i}>
            <ul className="list-group">
              <div className="border-folder-item">
                <h5> {fold.foldername}</h5>
                <li className="list-group-item d-inline-flex align-items-center">
                  <audio src={fold.url} controls />
                  <button className="btn btn-outline-danger">Delete</button>
                  <button className="btn btn-outline-dark">
                    Remove From Folder
                  </button>
                  <BsBoxArrowUp size={"1.5rem"} />
                </li>
              </div>
            </ul>
          </div>
        );
      })}
    </>
  );
}
