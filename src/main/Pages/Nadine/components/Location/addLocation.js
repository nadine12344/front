import React,{useState} from 'react'
import Axios from 'axios'
import {backendLink} from '../../../../keys_dev'

export default function AddLocation(props) {
  const [details, setDetails] = useState({name:""})
  const [type, settype] = useState("")
  const [capacity, setcapacity] = useState({capacity:""})
  const [success, setSuccess] = useState("")
 const Submit=event=>{
   event.preventDefault();
  
  if(type==""){
    setSuccess("select type");
    return;
  }
  Axios({
    method: "POST",
    url: `${backendLink}/location`,
    headers: {
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImhyLTEiLCJpYXQiOjE2MDk2MDEwMTN9.b9C36kkrTjXlUaFxeur0INCh-zB3_Mm21l88_rnPi78"
    },
    data:{"name":details,
  "type":type,
"capacity":capacity}
  }).then(res => {
    if(res.data.error){
      setSuccess(res.data.error);
      return;
    }
    if(res.data.message=="locatiion exists"){
      setSuccess("name must be unique");
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

    <h3>Add a Location</h3>
    <div className="form-group">
        <label>Name</label>
        <input type="text" required onChange={e=>{setDetails(e.target.value)}}className="form-control" placeholder="Name" />
    </div>
    <div className="form-group">
        <label>Type</label>
        <select   defaultValue="select"onChange={e=>{settype(e.target.value)}}>
        <option disabled   value="select" >select</option>
  <option value="tutorial room">tutorial room</option>
  <option value="lecture halls">lecture halls</option>
  <option selected value="offices">offices</option>
</select>
    </div>
    <div  className="form-group">
        <label>Capacity</label>
        <input type="text"  required onChange={e=>{setcapacity(e.target.value)}}className="form-control" placeholder="Name" />
    </div>

                    <button type="submit" className="btn btn-dark btn-lg btn-block ">Done</button>
                    <p>{success}</p>
                </form>
  )
}
