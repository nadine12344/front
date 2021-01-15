import React,{useState} from 'react'
import Axios from 'axios'
import {backendLink} from '../../../../keys_dev'
import  { Fragment } from "react";
import ReactDOM from "react-dom";
import qs from 'qs';
export default function AddCourse(props) {
  const [department, setdepartment] = useState([
      
  ]);
  const [details, setDetails] = useState({name:""})
  const [success, setSuccess] = useState("")
 const Submit=event=>{
   console.log("submitting")
   event.preventDefault();
   let data={};
   data.name=details;
  
   if(department.length!=0){
data.department=department;
   }
 
const options = {
  method: 'POST',
  headers: {   token:sessionStorage.getItem("token") },
  data: qs.stringify(data),
  url: `${backendLink}/courses`,
};
Axios(options)
.then(res => {
    if(res.data.error){
      setSuccess(res.data.error);
      return;
    }
   
      setSuccess("success");
    return;
  }).catch((err) => {
    if(err.response.data.message){
    if(err.response.data.message=="some departments do not exist or not array"){
      setSuccess("some departments do not exist or not array");
      return;
    }}
    if(err.response.data.error){
    if(err.response.data.error.keyPattern.name==1){
      setSuccess("enter unique name");}}
     else{ setSuccess("invalid form");}
   return;
  });  
 }
 
  const handleAddFields = () => {
    const values = [...department];
    values.push('' );
    setdepartment(values);
  };

  const handleRemoveFields = index => {
    const values = [...department];
    values.splice(index, 1);
    setdepartment(values);
  };

  const handleInputChange = (index, event) => {
    const values = [...department];
      values[index]= event.target.value;
    setdepartment(values);
  };



  return (
    <form onSubmit={Submit}>

    <h3>Add a Course</h3>
    <div className="form-group">
        <label>Name</label>
        <input type="text" required onChange={e=>{setDetails(e.target.value)}}className="form-control" placeholder="Name" />
    </div>
       <div >
          {department.map((inputField, index) => (
            <div className="form-group">
         
                <label >Departments</label>
                <input type="text" 
                className="form-control block" 
                  value={inputField}
                
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
                  +Add department
                </button>
        </div> 
        <button type="submit" className="btn btn-dark btn-lg btn-block ">Done</button>
                    <p>{success}</p>
                
                </form>    
  )}
