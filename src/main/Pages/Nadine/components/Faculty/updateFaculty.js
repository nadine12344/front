import React,{useState} from 'react'
import Axios from 'axios'
import {backendLink} from '../../../../keys_dev'

export default function UpdateFaculty(props) {
  const [details, setDetails] = useState({name:""})
  const [newName, setnewName] = useState({name:""})
  const [success, setSuccess] = useState("")
 const Submit=event=>{
   event.preventDefault();
  Axios({
    method: "PUT",
    url: `${backendLink}/faculties/${details}`,
    headers: {
      token:sessionStorage.getItem("token")
    },
    data:{"name":newName}
  }).then(res => {
    if(res.data=="facuulty does not exist"){
      setSuccess(res.data);
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

    <h3>Update a Faculty</h3>
    <div className="form-group">
        <label>Old Name</label>
        <input type="text" required onChange={e=>{setDetails(e.target.value)}}className="form-control" placeholder="Name" />
    </div>
    <div className="form-group">
        <label>New Name</label>
        <input type="text" required onChange={e=>{setnewName(e.target.value)}}className="form-control" placeholder="Name" />
    </div>
                    <button type="submit" className="btn btn-dark btn-lg btn-block ">Done</button>
                    <p>{success}</p>
                </form>
  )
}
