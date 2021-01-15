import React,{useState} from 'react'
import Axios from 'axios'
import {backendLink} from '../../../../keys_dev'

export default function AddFaculty(props) {
  const [details, setDetails] = useState({name:""})
  const [success, setSuccess] = useState("")
 const Submit=event=>{
   event.preventDefault();
  Axios({
    method: "POST",
    url: `${backendLink}/faculties`,
    headers: {
      token:sessionStorage.getItem("token")
    },
    data:{"name":details}
  }).then(res => {
    if(res.data.error){
      setSuccess("name is required");
      return;
    }
      setSuccess("success");
    return;
  }).catch((err) => {
 if(err.response.data.error.keyPattern.name==1){
    setSuccess("enter unique name");}
   else{ setSuccess("invalid form");}
   return;
  });  
 }
  return (
    <form onSubmit={Submit}>

    <h3>Add a Faculty</h3>
    <div className="form-group">
        <label>Name</label>
        <input type="text" required onChange={e=>{setDetails(e.target.value)}}className="form-control" placeholder="Name" />
    </div>
                    <button type="submit" className="btn btn-dark btn-lg btn-block ">Done</button>
                    <p>{success}</p>
                </form>
  )
}
