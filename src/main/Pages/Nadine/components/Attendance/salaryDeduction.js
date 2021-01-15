import React,{useEffect,useState} from 'react'
import Axios from 'axios'
import {backendLink} from '../../../../keys_dev'
const qs = require('querystring');
export default function Salary(props) {

  const [staff3, setstaff3] = useState(0)
  const [success, setsuccess] = useState("")
  
 const Go= async (e) => {
     let m;
     let days;
    
     console.log("here")
     const options3={
        url: `${backendLink}/staff/viewProfile`,
        method: 'get',
      
        headers: {
          token:sessionStorage.getItem("token")
                  
        },
     
       
      }
      const options={
        url: `${backendLink}/staff/missinghours`,
        method: 'get',
      
        headers: {
          token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImhyLTMiLCJpYXQiOjE2MDk5OTc3Njd9.5rxaVDt6DLWj0qhJPiZ1ysJfH6y3LIcRBGfsn97DLGU",
        },
     
       
      }
      const options2={
        url: `${backendLink}/staff/missingdays`,
        method: 'get',
      
        headers: {
          token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImhyLTMiLCJpYXQiOjE2MDk5OTc3Njd9.5rxaVDt6DLWj0qhJPiZ1ysJfH6y3LIcRBGfsn97DLGU",
        },
     
       
      }
      console.log("l"+options.data)
       Axios(options2).then((res) => {
      
        setsuccess("Done")
                  
                      if(res.data!=undefined){
                  days=(res.data.length)
     
                      }
                  }).catch((err) => {
                      console.log(err.response)
                    })
     await Axios(options3).then((res) => {
        console.log("heree")
          setsuccess("Done")
                    
                        if(res.data!=undefined){
                      
                  m=(res.data.salary)
                   
                    
                        }
                    }).catch((err) => {
                      console.log("heree2")
                      setsuccess("Error")
                        console.log("e"+err)
                        return;
                      })
  console.log("l"+options.data)
   Axios(options).then((res) => {
      let Deduction=0;
  console.log("heree")
    setsuccess("Done")
              
                  if(res.data!=undefined){
                    console.log("heree2")
              
               if(parseFloat(res.data.substring(0, res.data.length - 5))>2.98){
         let min=  (parseFloat(res.data.substring(0, res.data.length - 5))%1)*60
         let hours=  (parseInt(res.data.substring(0, res.data.length - 5)))
         console.log(hours+"s")
         Deduction=(Deduction+(min*m)/(180*60))
        +(hours*m)/180+(days*m)/60   }
                  }
                  setstaff3(Deduction)
              }).catch((err) => {
                console.log("heree2")
                setsuccess("Error")
                  console.log(err.response)
                })
               }
                            
             
 
  return (
    <div>

     <button onClick={Go}>Go</button>
    <h3>Attendance</h3>
    
    <h4>Salary Deduction</h4>    
      <div>{staff3}</div>  
    
          <p>{success}</p></div>
          
          
  )
}

