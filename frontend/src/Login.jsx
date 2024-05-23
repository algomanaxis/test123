import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from "./AxisLogo.jpg";


function Login() {
    const mystyle={
        marginTop :"2%",
        marginLeft:"25%",
        width:"50%" ,
    }


    const imagepro={
        display:"flex",
        justifyContent: "center",
        textAlign: "center",
        // marginBottom:"15px",
        marginTop:"50px"    
    }




    const [values, setValues]=useState({
        email:'',
        password: ''
    })


    const navigate=useNavigate()

    axios.defaults.withCredentials=true;
    const handleSubmit=(e)=>{
        e.preventDefault();
        axios.post('/api/login',values)
        .then(res=>{
            if(res.data.Status === "Success"){
                navigate('/')
            }else{
                alert(res.data.Message)
            }
        })
        .catch(err=>console.log(err))
    }


  return (
        <>

   <div  style={imagepro} >
        <img style={{    
          width:'20%',
          height: 'auto',        
        }} src={logo} alt="AxisMyIndia_logo"/>

    </div>  



    {/* vh-100 */}
        <div className="d-flex justify-content-center align-items-center " style={mystyle}>
            <div className="bg-white p-3 rounded w-50">
            {/* <h2>Sign-In</h2> */}
            <form onSubmit={handleSubmit}>
                <div class="mb-3">
                    <label htmlFor='email'><strong>Email</strong></label>
                    <input type='email' placeholder='Enter Email' name='email' autoComplete='off'
                       onChange={e=>setValues({...values,email:e.target.value})} className='form-control rounded-0' />
                </div>

                <div className="mb-3">
                    <label htmlFor="password"><strong>Password</strong></label>
                    <input type="password" placeholder='Enter Password' name='password'
                     onChange={e=>setValues({...values,password:e.target.value})} className='form-control rounded-0' />
                </div>
                <button type="submit"   className="btn btn-success w-100 rounded-0">Log in</button>


                {/* <p>You are agree to our terms and policies</p>
                <button className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'></button> */}

            </form>
            </div>
        </div>

        {/* <BasicExample/> */}
      
    </>

  )
}
export default Login