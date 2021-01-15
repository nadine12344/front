import React,{useEffect,useState} from 'react'
import Axios from 'axios'
import {backendLink} from '../../../../keys_dev'

export default function Missing(props) {
  const [staff, setstaff] = useState([])
 
   useEffect( async () => {
  
       await Axios({
                url: `${backendLink}/attendance`,
                method: 'get',
                headers: {
                  token:sessionStorage.getItem("token")
                },
               
              }).then((res) => {
                  if(res.status===200){
               setstaff(res.data)
              
                  }
              }).catch((err) => {
                  console.log(err.response)
                })
              });
 
  return (
    <div>
  
    <h3>Staff with Missing Attendance</h3>
    {staff.map((inputField, index) => ( 
      <div>{inputField}</div>

          ))}</div>
  )
}
