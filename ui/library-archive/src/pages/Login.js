import React, { useState } from 'react'
import './CSS/Login.css'
const Login = () => {
  const [state,setState] = useState("Login");
  const [formData,setFormData]= useState({
    username:"",
    email:"",
    password:""
  });
  const login = async ()=>{
   let result;
   await fetch("http://localhost:4100/auth/login",{
    method:'POST',
    headers:{
      Accept:'application/form-data',
      'Content-Type':'application/json',
    },
    body:JSON.stringify(formData)
   }).then(res=>res.json()).then(data=>{result=data});
   
     if(result.success){
      localStorage.setItem("auth-token",result.accessToken)
      localStorage.setItem("refresh-token",result.refreshToken)
      window.location.replace('/');
     }else{
      alert(result.error);
     }
  }
  const signUp = async ()=>{
    let result;
   await fetch("http://localhost:4000/createuser",{
    method:'POST',
    headers:{
      Accept:'application/form-data',
      'Content-Type':'application/json',
    },
    body:JSON.stringify(formData)
   }).then(res=>res.json()).then(data=>{result=data})
     if(result.success){
     alert(result.message);
     }else{
      alert(result.error);
     }

  }
  const handleChange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }
  return (
    <div className='loginsignup'>
      <div className="container">
        <h1>{state}</h1>
        <div className="signup-fields">
          {state=="Sign Up"?<input name="username"value={formData.username} type="text" placeholder='Your Name' onChange={handleChange}/>:<></>}
          <input name="email" value={formData.email} type="email" placeholder='Email Address' onChange={handleChange} />
          <input name="password"value={formData.password} type="password" placeholder='Password' onChange={handleChange} />
        </div>
        <button onClick={()=>{state==="Login"?login():signUp()}}>Continue</button>
        {state=="Sign Up"?<p className='login'>Already have an account? <a onClick={()=>setState("Login")}>Login here</a></p>:
        <p className='login'>Create an account? <a onClick={()=>setState("Sign Up")}>Click here</a></p>}
      </div>
    </div>
  )
}

export default Login
