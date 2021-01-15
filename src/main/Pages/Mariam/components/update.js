import React,{useState} from 'react'
import Axios from 'axios'
import {backendLink} from '../../../keys_dev'
import qs from 'qs';
import { isBuffer } from 'util';
const querystring = require('querystring');
export default function UpStaff(props) {
 
  const [email, setemail] = useState("")
  const [extra, setextra] = useState("")
  const [success, setSuccess] = useState("")
 
  const [password, setpassword] = useState("")
  const [office, setoffice] = useState("")
  const [gender, setgender] = useState("")

 const Submit=event=>{
   if(password!=""){
   if(!parseInt(password)){
     
     setSuccess("password not a number")
     return;
   }}
 
   event.preventDefault();
   let data={};

   if(email!=""){
   data.email=email;}
   
 
  
if(password!=""){
     data.password=password}
     if(gender!=""){
       data.gender=gender}
    
   if(extra!==""){
     data.extraInformation=extra
   }
 if(office!==""){
   console.log(office)
   data.officeLocation=office;
 }
console.log(querystring.stringify(data)+"d")
  const options = {
    method: 'PUT',
    headers: {   token:sessionStorage.getItem("token") },
    data: querystring.stringify(data),
    url:  `${backendLink}/staff/UpdateProfile`,
  };
  console.log("o"+options.url)
  Axios(options)
  .then(res => {
    console.log(res.data)
    if(res.data.error){
      setSuccess(res.data.error);
      return;
    }
    if(res.data==="staff does not exist"){
      setSuccess(res.data);
      return;
    }
    if(res.data.message){
      setSuccess(res.data.message);
      return;
    }
 console.log(res.data);
      setSuccess(res.data);
    return;
  }).catch((err) => {
    console.log("here7")
    console.log(err.response)
    if(err.response.data.message){
      
      setSuccess(err.response.data.message);}
     else{ setSuccess("invalid form");}
   return;
  });  
 }

  return (
    <form onSubmit={Submit}>

    <h3>Update a Staff</h3>
    
   
    <div className="form-group">
        <label>Email</label>
        <input type="text"  onChange={e=>{setemail(e.target.value)}}className="form-control" placeholder="Email" />
    </div>
   
 
    
    
      <div  onChange={e=>{setgender(e.target.value)}}>
        <input type="radio" value="male" name="gender" /> Male
        <input type="radio" value="female" name="gender" /> Female
       
      </div>
   
    <div  className="form-group">
        <label>Password</label>
        <input type="text"  className="form-control" placeholder="Enter Number" onChange={e=>{setpassword(e.target.value)}}/> 
    </div> 
  
    <div  className="form-group">
        <label>
        office Location</label>
        <input type="text" className="form-control" onChange={e=>{setoffice(e.target.value)}} /> 
    </div> 
    <div  className="form-group">
        <label>
        Extra Information</label>
        <input type="text" className="form-control" onChange={e=>{setextra(e.target.value)}} /> 
    </div> 
  

                    <button type="submit" className="btn btn-dark btn-lg btn-block ">Done</button>
                    <p>{success}</p>
                </form>
  )
}
