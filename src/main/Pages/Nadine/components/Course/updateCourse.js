import React,{useState,useEffect} from 'react'
import Axios from 'axios'
import {backendLink} from '../../../../keys_dev'
import  { Fragment } from "react";
import ReactDOM from "react-dom";
import qs from 'qs';
export default function AddCourse(props) {
  const [department, setdepartment] = useState([
  
  ]);
  const [details, setDetails] = useState("")
  const [newName, setnewName] = useState("")
  const [success, setSuccess] = useState("")
  let d="";
 const go=( async (e) => {
  setDetails(e.target.value);
  await Axios({
    url: `${backendLink}/courses/${e.target.value}`,
    method: 'get',
    headers: {
      token:sessionStorage.getItem("token")
    },
   
  }).then((res) => {
    console.log(e.target.value+"d")
    console.log("hhhh"+qs.stringify(res.data))
      if(res.status===200 && res.data.department){
        
   setdepartment(res.data.department)
  
      }else{
        setdepartment([])
      }
  }).catch((err) => {
      console.log(err.response)
    })
  });
 const Submit=event=>{
   console.log("submitting")
   event.preventDefault();
   let data={};
   data.name=details;
   if(newName!=""){
    data.name=newName;
       }
   if(department.length!=0){
data.department=department;
   }
   if(newName==="" && department.length===0){
   setSuccess("nothing prvided to update")
   return;
       }
   
const options = {
  method: 'PUT',
  headers: {   token:sessionStorage.getItem("token") },
  data: qs.stringify(data),
  url: `${backendLink}/courses/${details}`,
};
Axios(options)
.then(res => {
  if(res.data==="course does not exist"){
    setSuccess("course does not exist")
    return;
  }
    if(res.data.error){
      setSuccess(res.data.error);
      return;
    }
   if(res.data.message){
     if(res.data.message){
      setSuccess(res.data.message);
      return;
     }
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

    <h3>Update a Course</h3>
    <div className="form-group">
        <label>Name</label>
        <input type="text" required onChange={go}className="form-control" placeholder="Name" />
    </div>
    <div className="form-group">
        <label>New Name</label>
        <input type="text"  onChange={e=>{setnewName(e.target.value)}}className="form-control" placeholder="Name" />
        <p>leave empty if you don't want to change the name</p>
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
          <p>fill with all departments</p>
          <button
                  className="btn btn-link"
                  type="button"
                  onClick={() => handleAddFields()}
                >
                  +Add department
                </button>
        </div> 
        <p>remove departments fields in case youu don't want to change departments</p>
        <button type="submit" className="btn btn-dark btn-lg btn-block ">Done</button>
                    <p>{success}</p>
                
                </form>    
  )}
