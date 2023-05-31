import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import './signup.css'
import { RegisterAction } from "../../actions/authAction"
import { useToast } from "@chakra-ui/react"
import Spinner from 'react-bootstrap/Spinner';

export const SignUp= (props)=> {
const toast=useToast()

  const[data,setData]=useState({
    username:"",
    firstName:"",
    lastName:"",
    password:"",
    confirmPassword:""
  })

  const authdata=useSelector((state)=>state.ReducerRegister.authdata)
  const loading=useSelector((state)=>state.ReducerRegister.loading)
  const checkUser=authdata?authdata.success:""
  console.log("checkUser",authdata)





  const dispatch=useDispatch()

const submit=(e)=>{
  e.preventDefault()
  if(data.password===data.confirmPassword){
    dispatch(RegisterAction(data))
  }else{
    alert("pass")
  }
}

const handleChange=(e)=>{
  setData({...data,[e.target.name]:e.target.value})
  
}

const submitt=()=>{
  if(checkUser){
    toast({
      title: `successfully signup`,
      position: "top",
      isClosable: true,
    })
   }
}

  return (
    <div className="Auth-form-container">
     {loading?<Spinner  animation="border" role="status">
      <span  className="visually-hidden">Loading...</span>
    </Spinner>:  <form className="Auth-form" onSubmit={submit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign Up</h3>
          <div className="form-group mt-3">
            <label>username</label>
            <input
            style={{outline:'none'}}
              type="text"
              required={true}
              name="username"
              value={data.username}
              onChange={handleChange}
              className="form-control mt-1"
              placeholder="Enter email"
            />
          </div>
          <div className="form-group mt-3" style={{display:'flex'}}>
          <div>
            <label>First Name</label>
            <input
            required={true}
             style={{outline:'none',border:'none'}}
              type="text"
              name="firstName"
              value={data.firstName}
              onChange={handleChange}
              className="form-control mt-1"
              placeholder="Enter password"
            />
            </div> &nbsp;
            <div>
            <label>Last Name</label>
            <input
              required={true}
              type="text"
              name="lastName"
              value={data.lastName}
              onChange={handleChange}
              className="form-control mt-1"
              placeholder="Enter password"
            />
            </div>
          </div>
          <div className="form-group mt-3" style={{display:'flex'}}>
          <div>
            <label>Password</label>
            <input
            required={true}
              type="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              className="form-control mt-1"
              placeholder="Enter password"
            />
            </div> &nbsp;
            <div>
            <label>confirm Password</label>
            <input
              required={true}
              type="password"
              name="confirmPassword"
              value={data.confirmPassword}
              onChange={handleChange}
              className="form-control mt-1"
              placeholder="Enter password"
            />
            </div>
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary"
             disabled={loading} onClick={submitt}
              >
              signup
            </button>
          </div>
          <p className="forgot-password text-right mt-2">
            Forgot <a href="#">password?</a>
          </p>
        </div>
      </form>}
    </div>
  )
}