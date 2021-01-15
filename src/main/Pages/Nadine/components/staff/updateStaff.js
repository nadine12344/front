import React,{useState} from 'react'
import Axios from 'axios'
import {backendLink} from '../../../../keys_dev'
import qs from 'qs';
import { isBuffer } from 'util';
const querystring = require('querystring');
export default function AddStaff(props) {
  const [details, setDetails] = useState("")
  const [email, setemail] = useState("")
  const [extra, setextra] = useState("")
  const [success, setSuccess] = useState("")
  const [work, setwork] = useState("")
  const [role, setrole] = useState("")
  const [salary, setSalary] = useState("")
  const [office, setoffice] = useState("")
  const [gender, setgender] = useState("")
  const [off, setoff] = useState("")
  const [id, setid] = useState("")
 const Submit=event=>{
   if(salary!=""){
   if(!parseInt(salary)){
     
     setSuccess("salary not a number")
     return;
   }}
 
   event.preventDefault();
   let data={};
if(details!=""){
   data.name=details;}
   if(email!=""){
   data.email=email;}
   if(work===""){
setSuccess("select hr or acadamic")
return;
   }
   
   if(work==="acadamic"){
   if(off!=""){
    
       data.dayOff=off;}}
if(salary!=""){
     data.salary=salary}
     if(gender!=""){
       data.gender=gender}
      
   if(work==="acadamic"){
     if(role!==""){
      
       data.role=role;
     }
   }
   if(extra!==""){
     data.extraInformation=extra
   }
 if(office!==""){
   console.log(office)
   data.officeLocation=office;
 }

  const options = {
    method: 'PUT',
    headers: {   token:sessionStorage.getItem("token") },
    data: querystring.stringify(data),
    url:  `${backendLink}/${work}/${id}`,
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
      setSuccess("success");
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

    <h3>Update Profile</h3>
    <div className="form-group">
        <label>id</label>
        <input type="text" required onChange={e=>{setid(e.target.value)}}className="form-control" placeholder="Name" />
    </div>
    <div className="form-group">
        <label>Name</label>
        <input type="text"  onChange={e=>{setDetails(e.target.value)}}className="form-control" placeholder="Name" />
    </div>
   
    <div className="form-group">
        <label>Email</label>
        <input type="text"  onChange={e=>{setemail(e.target.value)}}className="form-control" placeholder="Email" />
    </div>
   
    <div  onChange={e=>{setwork(e.target.value)}}>
   <input type="radio"  value="acadamic" name="work" /> Acadamic Member
        <input type="radio"  value="hrStaff" name="work" /> Hr
      </div>
      {work === "acadamic" &&
    <div className="form-group">
        <label>Role</label>
        <div onChange={e=>{setrole(e.target.value)}}>
        <input type="radio"  value="coordinator" name="r" /> coordinator
        <input type="radio"  value="HOD" name="r" /> HOD
        <input type="radio"  value="DOC" name="r" /> DOC
        <input type="radio"  value="TA" name="r" /> TA
        </div>   </div> 
 
      }
      {work === "acadamic" &&
      <div className="form-group">
      <label>DayOff:</label>
      <div  onChange={e=>{setoff(e.target.value)}}>
      
        <input type="radio" value="Saturday" name="day" /> Saturday
        <input type="radio" value="Sunday" name="day" /> Sunday
        <input type="radio" value="Monday" name="day" /> Monday
        <input type="radio" value="Tuesday" name="day" /> Tuesday
        <input type="radio" value="Wednesday" name="day" /> Wednesday
        <input type="radio" value="Thursday" name="day" /> Thursday
        </div>   </div>}
      <div  onChange={e=>{setgender(e.target.value)}}>
        <input type="radio" value="male" name="gender" /> Male
        <input type="radio" value="female" name="gender" /> Female
       
      </div>
   
    <div  className="form-group">
        <label>Salary</label>
        <input type="text"  className="form-control" placeholder="Enter Number" onChange={e=>{setSalary(e.target.value)}}/> 
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
