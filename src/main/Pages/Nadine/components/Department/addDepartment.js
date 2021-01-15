import React,{useState} from 'react'
import Axios from 'axios'
import {backendLink} from '../../../../keys_dev'
import  { Fragment } from "react";
import ReactDOM from "react-dom";
import qs from 'qs';
export default function AddDepartment(props) {
  const [details, setDetails] = useState({name:""})
  const [HOD, setHOD] = useState("")
  const [Faculty, setFaculty] = useState("")
  const [staff, setstaff] = useState([]);
  const [success, setSuccess] = useState("")
 const Submit=event=>{
   console.log("submitting")
   event.preventDefault();
   let data={};
   data.name=details;
   if(staff.length!=0){
    data.staffIds=staff;
       }
 if(HOD!=""){
   data.HOD=HOD
 }
 if(Faculty!=""){
  data.faculty=Faculty
}
const options = {
  method: 'POST',
  headers: {   token:sessionStorage.getItem("token") },
  data: qs.stringify(data),
  url: `${backendLink}/departments`,
};
Axios(options)
.then(res => {
    if(res.data.error){
      setSuccess(res.data.error);
      return;
    }
    if(res.data.message){
      setSuccess(res.data.message);
      return;
    }
      setSuccess("success");
    return;
  }).catch((err) => {
    if(err.response.data.error){
    if(err.response.data.error.keyPattern.name==1){
      setSuccess("enter unique name");}}
     else{ setSuccess("invalid form");}
   return;
  });  
 }
 const handleAddFields = () => {
  const values = [...staff];
  values.push('' );
  setstaff(values);
};

const handleRemoveFields = index => {
  const values = [...staff];
  values.splice(index, 1);
  setstaff(values);
};

const handleInputChange = (index, event) => {
  const values = [...staff];
    values[index]= event.target.value;
  setstaff(values);
};
 



  return (
    <form onSubmit={Submit}>

    <h3>Add a Department</h3>
    <div className="form-group">
        <label>Name</label>
        <input type="text" required onChange={e=>{setDetails(e.target.value)}}className="form-control" placeholder="Name" />
    </div>
    <div className="form-group">
        <label>HOD</label>
        <input type="text"  onChange={e=>{setHOD(e.target.value)}}className="form-control" placeholder="HOD" />
    </div>
    <div className="form-group">
        <label>Faculty</label>
        <input type="text"  onChange={e=>{setFaculty(e.target.value)}}className="form-control" placeholder="Faculty" />
    </div>
    <div >
          {staff.map((inputField, index) => (
            <div className="form-group">
         
                <label >staff id</label>
                <input type="text" 
                className="form-control block" 
                  value={inputField}
                  key={index}
                  onChange={event => handleInputChange(index, event)}
                />
              
              <div className="form-group col-sm-2">
                <button
                  className="btn btn-link"
                  type="button"
                  onClick={() => handleRemoveFields(index)}
                >
                  -
                </button>
                
              </div>
            </div>
          ))}
          <button
                  className="btn btn-link"
                  type="button"
                  onClick={() => handleAddFields()}
                >
                  +Add staff
                </button>
        </div> 
        <button type="submit" className="btn btn-dark btn-lg btn-block ">Done</button>
        <p>fill fields you want to add</p>
                    <p>{success}</p>
                
                </form>    
  )}
