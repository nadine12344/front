import React,{useEffect,useState} from 'react'
import Axios from 'axios'
import {backendLink} from '../../../keys_dev'
import qs from 'qs';
export default function Missing(props) {
  const [staff, setstaff] = useState({signIn:[],signOut:[]})
  const [details, setDetails] = useState("")
  const [success, setsuccess] = useState("")
  
 const Go= async (e) => {
     
     console.log("here")
     let data={}
     console.log("d"+details)
  if(details!=""){
      console.log("here")
   data.month=details-1;

  }
  const options={
    url: `${backendLink}/staff/veiwAttendenceRecords`,
    method: 'put',
  
    headers: {
      token:sessionStorage.getItem("token")
    },
    data: qs.stringify(data)
   
  }
  console.log("l"+options.data)
   Axios(options).then((res) => {
               
               if(res.data.signIn==undefined){
                setstaff({signIn:[],signOut:[]})
                setsuccess("Done")
                return;
               }
               setsuccess("Done")
                  if(res.status===200){
               setstaff(res.data)
            
             
              
                  }
              }).catch((err) => {
                setsuccess("Error")
                  console.log(err.response)
                })}
             
 
  return (
    <div>
 <p>Enter Month if you want</p>
     <input type="text"  onChange={e=>{setDetails(e.target.value)}}className="form-control" placeholder="Month" />
     <button onClick={Go}>Go</button>
    <h3>Attendance</h3>
    
    <h4>Sign In</h4>
    {staff.signIn.map((inputField, index) => ( 
      <div>{inputField}</div>

          ))}
        
    <h4>Sign Out</h4>
    {staff.signOut.map((inputField, index) => ( 
      <div>{inputField}</div>

          ))}
          <p>{success}</p></div>
          
          
  )
}

