import React,{useState} from 'react'
import Axios from 'axios'
import {backendLink} from '../../../../keys_dev'

export default function DeleteFaculty(props) {
  const [details, setDetails] = useState({name:""})
  const [success, setSuccess] = useState("")
  const [work, setwork] = useState("")
 const Submit=event=>{
   event.preventDefault();
  Axios({
    method: "Delete",
    url: `${backendLink}/${work}/${details}`,
    headers: {
      token:sessionStorage.getItem("token")
    }
  }).then(res => {
    if(res.data.message){
      setSuccess("success");
      return;
    }
      setSuccess("invalid Staff");
    return;
  }).catch((err) => {
    setSuccess("error");
   return;
  });  
 }
  return (
    <form onSubmit={Submit}>

    <h3>Delete a Staff</h3>
    <div className="form-group">
        <label>Id</label>
        <input type="text" required onChange={e=>{setDetails(e.target.value)}}className="form-control" placeholder="Name" />
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
