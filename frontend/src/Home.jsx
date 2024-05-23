import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Data from './components/Data'
import FileUpload from './components/FileUpload'


function Home() {
  const [auth, setAuth] =useState(false)
  const [name , setName] =useState('')
  const [role, setRole]=useState('')
  const [message, setMessage]=useState('')


  axios.defaults.withCredentials=true;
  
  useEffect(()=>{
      axios.get('/api')
      .then (res=>{
        if(res.data.Status==="Success"){
          setAuth(true);
          setName(res.data.name);
          setRole(res.data.role);
        
        }else {
            setAuth(false);
            setMessage(res.data.Message)
        }
      })
  },[])


const handleLogout=()=>{
  axios.get('/api/logout')
  .then(res=>{
    if(res.data.Status==="Success"){
      window.location.reload(true);    
    }else {
      alert("error ")
    }
    
  }).catch(err=>console.log(err))
}



  return (
    // <div className="container">
    <div className='cntr'>
        {
          auth?
          <div>
              {/* <h3>You are Authorised {name}</h3>
              <button className='btn btn-danger' onClick={handleLogout}> Logout</button> */}

               <Header userName={name}  userRole={role}/>
               <div className="App">
                  <Sidebar userName={name}/> 
                  {/* <Data/> */}
                  <FileUpload userRole={role}/>              
              </div>  
              
          </div>
          :
          <div>
              <h3>{message}</h3>
              <h3>Login Now</h3>
              <Link to ="/login"  className='btn btn-primary'>Login</Link>
          </div>

        }
    </div>    
  )
}

export default Home