import React,{useEffect,useState} from 'react'
import Axios from 'axios'
import {backendLink} from '../../../keys_dev'

export default function Missing(props) {
  const [success, setsuccess] = useState("");

 const go=  (e) => {
console.log(e.target.value+"v")
 

  if(e.target.value==="in"||e.target.value==="out"){
  
   Axios({
                url: `${backendLink}/staff/${e.target.value}`,
                method: 'post',
                headers: {
                  token:sessionStorage.getItem("token")
                },
               
              }).then((res) => {
                console.log(res.data)
               if(res.data.message){              
                   setsuccess(res.data.message)   }
              }).catch((err) => {
                console.log(err.response)
                })}
               
              }
             
 
  return (
    <div>
    <button  onClick={go} value="in" className="btn btn-dark btn-lg btn-block ">Sign In</button>
    <button  onClick={go} value="out"  className="btn btn-dark btn-lg btn-block ">Sign Out</button>
    <p>{success}</p>
   </div>
          
          
  )
}

