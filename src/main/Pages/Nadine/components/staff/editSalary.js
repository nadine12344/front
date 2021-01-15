import React,{useState} from 'react'
import Axios from 'axios'
import {backendLink} from '../../../../keys_dev'

export default function PUTFaculty(props) {
  const [details, setDetails] = useState({name:""})
  const [success, setSuccess] = useState("")
  const [work, setwork] = useState("")
  const [salary, setSalary] = useState("")
 const Submit=event=>{
   event.preventDefault();
   if(!parseInt(salary)){
     
    setSuccess("salary not a number")
    return;
  }
  Axios({
    method: "PUT",
    url: `${backendLink}/${work}/salary/${details}`,
    data:{"salary":salary},
    headers: {
      token:sessionStorage.getItem("token")
    }
  }).then(res => {
    if(res.data==="staff does not exist"){
      setSuccess("staff does not exist");
      return;
    }
    setSuccess("success");
    return;
  }).catch((err) => {
    setSuccess("error");
   return;
  });  
 }
  return (
    <form onSubmit={Submit}>

    <h3>Update a Staff Salary</h3>
    <div className="form-group">
        <label>Id</label>
        <input type="text" required onChange={e=>{setDetails(e.target.value)}}className="form-control" placeholder="Name" />
    </div>
    <div  className="form-group">
        <label>Salary</label>
        <input type="text" required className="form-control" placeholder="Enter Number" onChange={e=>{setSalary(e.target.value)}}/> 
    </div> 
    <div  onChange={e=>{setwork(e.target.value)}}>
   <input type="radio"  value="acadamic" name="work" /> Acadamic Member
        <input type="radio"  value="hrStaff" name="work" /> Hr
      </div>
                    <button type="submit" className="btn btn-dark btn-lg btn-block ">Done</button>
                    <p>{success}</p>
                </form>
  )
}
