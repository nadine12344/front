import React,{useState} from 'react'
import Axios from 'axios'
import {backendLink} from '../../../../keys_dev'

export default function DeleteFaculty(props) {
  const [details, setDetails] = useState({name:""})
  const [success, setSuccess] = useState("")
 const Submit=event=>{
   event.preventDefault();
  Axios({
    method: "Delete",
    url: `${backendLink}/departments/${details}`,
    headers: {
      token:sessionStorage.getItem("token")
    }
  }).then(res => {
   if(res.data.message){
    setSuccess(res.data.message);
    return;
   }
   
      setSuccess(res.data);
    return;
  }).catch((err) => {
    console.log(err.response)
    setSuccess("error");
   return;
  });  
 }
  return (
    <form onSubmit={Submit}>

    <h3>Delete a Department</h3>
    <div className="form-group">
        <label>Name</label>
        <input type="text" required onChange={e=>{setDetails(e.target.value)}}className="form-control" placeholder="Name" />
    </div>
    
                    <button type="submit" className="btn btn-dark btn-lg btn-block ">Done</button>
                    <p>{success}</p>
                </form>
  )
}
