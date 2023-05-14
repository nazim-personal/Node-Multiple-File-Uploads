
import './App.css';
import React, { useEffect, useState } from 'react';
import FileUploader from './components/FileUploader.js';
import { getSingleFile, getMultipleFile } from './api/api.js';


const App = () => {

  const [singleFile, setSingleFile] = useState([]);
  const [multipleFile, setMultipleFile] = useState([]);

  const getSingleFileslist = async () => {
    try {
      const  filesList  = await getSingleFile();
      setSingleFile(filesList);
    } catch (error) {
      console.log(error.message);
    }
  }

  const getMultipleFileslist = async () => {
    try {
      const  filesList  = await getMultipleFile();
      setMultipleFile(filesList);
      console.log(filesList);
    } catch (error) {
      console.log(error.message);
    }
  }
  useEffect(() => {
    getSingleFileslist();
    getMultipleFileslist();
  }, []);

  return (
    <>
      <div className="container">
        <h3 className="text-danger font-weight-bolder border-bottom text-center">Single & Multiple File Upload Using MERN Stack </h3>
        {/* <FileUploader getsingle={() => getSingleFileslist()} getMultiple={() => getMultipleFilesList()}/> */}
        <FileUploader getsingle={() => getSingleFileslist()} getMultiple={() => getMultipleFileslist()} />
      </div>
      <div className="container-fluid mt-5">
        <div className="row">
          <div className="col-6">
            <h4 className="text-success font-weight-bold">Single Files List</h4>
            <div className="row">
              {
              singleFile && singleFile.map((file, index) =>
                <div className="col-6">
                  <div className="card mb-2 border-0 p-0">
                    <img src={`http://localhost:3000/${file.filePath}`} height="200" className="card-img-top img-responsive" alt="img" />
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="col-6">
            <h4 className="text-success font-weight-bold">Multiple Files List</h4>
            {multipleFile.map((element, index) =>
          <div key={element._id}>
              <h6 className="text-danger font-weight-bold">{element.title}</h6>
              <div className="row">
                {element.files.map((file, index) =>
                  <div className="col-6">
                      <div className="card mb-2 border-0 p-0">
                        <img src={`http://localhost:3000/${file.filePath}`} height="200" className="card-img-top img-responsive" alt="img"/>
                        </div>
                    </div>
                 )}
                </div>
          </div>
        )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
