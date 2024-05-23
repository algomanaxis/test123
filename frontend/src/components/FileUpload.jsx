import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2'
import styled from 'styled-components';
import { colors } from '@mui/material';
import UserView from './UserView';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import FileOpenIcon from '@mui/icons-material/FileOpen';




const DataContainer = styled.div`
    flex: 1 1;    
    padding: 10px 0px 0px 20px;
`



const DataGrid = styled.div`
    display: flex;
    flex-wrap: wrap;   
    align-items: center;
    // justify-content: center;
    margin-top: 30px;
    margin-bottom: 30px;
   
`

const DataFile = styled.div`
    text-align: center;
    border: 1px solid rgb(204 204 204 / 46%);
    margin: 10px;
    min-width: 160px;
    padding: 10px 0px 0px 0px;
    border-radius: 5px; 
    width:190px;
    height :200px;
    
    // svg {
    //     font-size: 70px;
    //     color:gray
    // }
    p {
        border-top: 1px solid #ccc;        
        margin-top: 5px;
        font-size: 12px;
        background: whitesmoke;
        padding: 10px 0px;
       
        word-wrap: break-word;
    }
    
`



const btnContainer=styled.div `
    display: flex;
    justify-content: center;
    align-items: center;
    
`






function FileUpload(props) {
    const[file, setFile]=useState();
    const [data, setData]=useState([])
    const [allData, setAllData]=useState([])

    const handleFile=(e)=>{
        setFile(e.target.files[0])
    }



    //
    useEffect(()=>{
        axios.get('/api/data')
        .then(res=>{
            setAllData(res.data);
            setData(res.data[0]);
           //setData(res.data)
        })
        .catch(err=>console.log(err));
    },[])

 
    const handleUpload=()=>{
         // console.log("uploading file...");
        const formdata =new FormData();
        // console.log(file.fileName)
        formdata.append('ami',file);
        axios.post('/api/upload',formdata)
        .then(res=>{
            if(res.data.Status==="Success"){
                    //console.log("Succeded")
                    Swal.fire({
                        position: "top",
                        icon: "success",
                        title: "File Uploaded",
                        showConfirmButton: false,
                        timer: 1500
                      });

                      setTimeout(function() {
                        window.location.reload();
                      }, 800);

            }else {
                alert(res.data.Message)
                console.log("Failed")
            }
        })
        .catch(err=>console.log(err));     
    }






    const redirectToFile=(event,val)=>{
        if(props.userRole==="admin"){
        event.preventDefault();
        let url=`http://192.168.1.147:8081/images/`+val.fileName;
        window.location.href = url;
        }else {
            
             event.preventDefault();
              let url=`http://192.168.1.147:8081/images/`+val.fileName;
              window.location.href = `/UserView?url=${val.fileName}`;
            //  let url=`http://192.168.1.147:8081/images/`+val.fileName+`#toolbar=0`;
            //   window.location.href = url;
                  
        }        
    }




    const downloadFile=(event,val)=>{
             let url=`http://192.168.1.147:8081/images/`+val.fileName;
             const pdfUrl = url;
             const link = document.createElement('a');
             link.href = pdfUrl;
             link.download = 'document.pdf';
             document.body.appendChild(link);
             link.click();
             document.body.removeChild(link);              
    }




    const deleteFile=(event,val)=>{              
        event.preventDefault();
        axios.post('/api/delete',{val})
        .then(res=>{
          if(res.data.Status==="Success"){

            Swal.fire({
                position: "top",
                icon: "success",
                title: "File Deleted",
                showConfirmButton: false,
                timer: 1500
              });

              setTimeout(function() {
                window.location.reload();
              }, 800);                
           
          }else {
            alert("error ")
          }
          
        }).catch(err=>console.log(err))
      }








    const ncard=(val)=>{
        const myclickStyle={            
            cursor: "pointer",    
        
        }

        const myPtext={
            lineHeight: "1.5em",
            height: "4em", /* height is 2x line-height, so two lines will display */
            overflow: "hidden" /* prevents extra lines from being visible */
        }


        const mybtnStyle={
            margin: "0 5px",
            width: "30px",
            height :"30px",
            // color :"blue"
        //    backgroundColor:"#d8d8d8",
            borderWidth: "0"
        } 


        const myIconStyle={           
            width: "20px",
            height :"20px",  
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginLeft :"-6px",
            marginTop :"-2px",            

        } 
       
        let url="http://192.168.1.147:8081/images/"+val.fileName;
        return( 

            
                <DataFile >  
                    { 
                            props.userRole=="user"?
                            <div style={myclickStyle} onClick={(event)=>{redirectToFile(event, val) }}>                    
                                <img src="./icons8-pdf-80.png" alt="" />
                                <p > {val.fileName}</p>  
                            </div>
                            :
                            <div>
                                <div style={myclickStyle} onClick={(event)=>{redirectToFile(event, val) }}>                    
                                    <img src="./icons8-pdf-80.png" alt="" />
                                    <p style={myPtext}> {val.fileName}</p>                    
                                </div>
                                <btnContainer>
                                    <button class="btn btn-secondary   btn-xs" style={mybtnStyle}  onClick={(event)=>{redirectToFile(event, val) }}><FileOpenIcon style={ myIconStyle}/></button> 
                                    {/* <button class="btn btn-secondary  btn-xs" style={mybtnStyle}  onClick={(event)=>{downloadFile(event, val) }}><DownloadIcon style={ myIconStyle}/></button>  */}
                                    <button class="btn btn-secondary  btn-xs" style={mybtnStyle}   onClick={(event)=>{deleteFile(event, val) }}><DeleteIcon style={ myIconStyle}/></button> 
                                </btnContainer>
                                
                            </div>
                    }                    
                </DataFile>
        )
    }


  return (
    <div className="container">

        {
          props.userRole=="admin"?
          <div>
            <br />
                    <input type="File"  onChange={handleFile} />
                    <button className="btn btn-success " onClick={handleUpload} >Upload</button>
                  
              
          </div>
          :
          <div>
                  {/* <h1>You dont have access to upload the file </h1> */}
          </div>

        }

     


        <DataContainer>
            <div>
                <DataGrid>          
                     {allData.map(ncard)} 
                </DataGrid>
            </div>
        </DataContainer>
    
    </div>
  )
}

export default FileUpload