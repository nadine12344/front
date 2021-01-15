import React,{useEffect,useState} from 'react'
import Axios from 'axios'
import {backendLink} from '../../../../keys_dev'

export default function Missing(props) {
  const [staff, setstaff] = useState({signIn:[],signOut:[]})
  const [details, setDetails] = useState([])
  const [success, setsuccess] = useState([])
 const Go= async (e) => {
  if(details==""){
    setstaff({signIn:[],signOut:[]})
    setsuccess("enter id")
    return;
  }
  await Axios({
                url: `${backendLink}/attendance/${details}`,
                method: 'get',
                headers: {
                  token:sessionStorage.getItem("token")
                },
               
              }).then((res) => {
               if(res.data.signIn==undefined){
                setstaff({signIn:[],signOut:[]})
                setsuccess("invalid input")
                return;
               }
                  if(res.status===200){
               setstaff(res.data)
            
             
              
                  }
              }).catch((err) => {
                  console.log(err.response)
                })}
             
 
  return (
    <div>
     <input type="text"  onChange={e=>{setDetails(e.target.value)}}className="form-control" placeholder="id" />
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

