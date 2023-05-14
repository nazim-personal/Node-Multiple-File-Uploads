import React,{ useState } from "react";
import { uploadSingleFile, uploadMultipleFile } from "../api/api.js";
import {buildStyles, CircularProgressbar} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css'
const FileUploader = (props) => {

    const [singleFile, setSingleFile] = useState('');
    const [multipleFiles, setMultipleFile] = useState('');
    const [title, setTitle] = useState('');
    const [singleProgress, setSingleProgress] = useState(0);
    const [multipleProgress, setMultipleProgress] = useState(0);

    const singleFileChange = (e) =>{
       setSingleFile(e.target.files[0]);
       setSingleProgress(0);
    }
    const singleUpload = async() =>{
        const formData = new FormData();

        formData.append('file',singleFile);
        // @ts-ignore
        await uploadSingleFile(formData, singleFileOption);
        console.log(formData);
        props.getsingle();
    }

    const singleFileOption = {
        onUploadProgress: (progressEvent) =>{
           const {loaded, total} = progressEvent;
           const percentage = Math.floor(((loaded / 1000) * 100) / (total / 1000));
           setSingleProgress(percentage);
        }
    }

    const multipleFileChange = (e) =>{
        setMultipleFile(e.target.files);
        setMultipleProgress(0);
     }
     const multipleUpload = async() =>{
         const formData = new FormData();
         formData.append('title', title);

         for (let i = 0; i < multipleFiles.length; i++) {
            formData.append('files', multipleFiles[i]);   
         }
         await uploadMultipleFile(formData, multipleFileOption);
         props.getMultiple();
     }

     const multipleFileOption = {
        onUploadProgress: (progressEvent) =>{
           const {loaded, total} = progressEvent;
           const percentage = Math.floor(((loaded / 1000) * 100) / (total / 1000));
           setMultipleProgress(percentage);
        }
    }
  
    return (
        <div className="row mt-3">
            <div className="col-6">
                <div className="form-group">
                    <label>Single Upload File</label>
                    <input type="file" name="file" className="form-control" onChange={(e)=>singleFileChange(e)}/>
                </div>
                <div className="row">
                    <div className="col-10">
                        <button type="button" className="btn btn-danger" onClick={singleUpload}>Upload</button>
                    </div>
                    <div className="col-2">
                        <CircularProgressbar 
                           value={singleProgress}
                           text={`${singleProgress}%`}
                           styles={
                               buildStyles({
                                   rotation:0.25,
                                   strokeLinecap: 'butt',
                                   textSize: '16px',
                                   pathTransitionDuration: 0.5,
                                   pathColor: `rgba(255, 136, 136, ${singleProgress / 100})`,
                                   textColor: '#f88',
                                   trailColor: '#d6d6d6',
                                   backgroundColor: '#3e98c7'
                               })
                           }
                        />
                    </div>
                </div>
            </div>
            <div className="col-6">
                <div className="row">
                    <div className="col-6">
                         <label>
                             Title
                         </label>
                         <input type="text" className="form-control" placeholder="Enter title" onChange={(e)=> setTitle(e.target.value) }/>
                    </div>
                    
                </div>
                <div className="form-group">
                    <label>Multiple Upload Files</label>
                    <input type="file" name="file" className="form-control" onChange={(e)=>multipleFileChange(e)} multiple/>
                </div>
                <div className="row">
                    <div className="col-10">
                        <button type="button" className="btn btn-danger" onClick={multipleUpload}>Upload</button>
                    </div>
                    <div className="col-2">
                        <CircularProgressbar 
                           value={multipleProgress}
                           text={`${multipleProgress}%`}
                           styles={
                               buildStyles({
                                   rotation:0.25,
                                   strokeLinecap: 'butt',
                                   textSize: '16px',
                                   pathTransitionDuration: 0.5,
                                   pathColor: `rgba(255, 136, 136, ${multipleProgress / 100})`,
                                   textColor: '#f88',
                                   trailColor: '#d6d6d6',
                                   backgroundColor: '#3e98c7'
                               })
                           }
                        />
                    </div>
                </div>
            </div>

        </div>
    );
}

export default FileUploader;
