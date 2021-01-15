import React, { useState } from "react";
import DatePicker from "react-datepicker";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import "react-datepicker/dist/react-datepicker.css";
import qs from 'qs';
import {backendLink} from '../../../../keys_dev'
import Axios from 'axios'

 
export default function Sign(props) {
    const [startDate, setStartDate] = useState(
  
      );
      const [signOut, setsignOut] = useState(
     
      );

      const [details, setDetails] = useState([])
      const [success, setsuccess] = useState([])
      const Submit= async (e) => {
     
        e.preventDefault();
        
        if(details==""){
       
          setsuccess("enter id")
          return;
        }
        console.log("s"+startDate)
        console.log("o"+signOut)
        let data={};
        if(startDate!==null){
          console.log("un")
          data.signIn=startDate;
        
        }
        if(signOut!==null){
       
          data.signOut=signOut;
      
        }
        console.log("erre")
        console.log("d"+data)
        await Axios({
                      url: `${backendLink}/attendance/${details}`,
                      method: 'post',
                      data: qs.stringify(data),
                      headers: {
                        token:sessionStorage.getItem("token")
                      },
                     
                    }).then((res) => {
                    if(res.data.error){
                      setsuccess(res.data.error)
                      return
                    }
                    if(res.data.message){
                      setsuccess(res.data.message)
                      return
                    }
                    setsuccess(res.data)
                    return 
                    }).catch((err) => {
                        console.log(err.response)
                      })}
  return (
      <form>
      <h4>Add missing sign in or sign out</h4>
      <input type="text" required onChange={e=>{setDetails(e.target.value)}}className="form-control" placeholder="id" />  
      <div>
      <label>Sign in</label></div>
    <DatePicker
    selected={startDate}
    onChange={date => setStartDate(date)}
    showTimeSelect
    timeFormat="HH:mm"
    injectTimes={[
      setHours(setMinutes(new Date(), 1), 0),
      setHours(setMinutes(new Date(), 5), 12),
      setHours(setMinutes(new Date(), 59), 23)
    ]}
    dateFormat="MMMM d, yyyy h:mm aa"
  />
  <div>
  <label>Sign out</label></div>
    <DatePicker
    selected={signOut}
    onChange={date => setsignOut(date)}
    showTimeSelect
    timeFormat="HH:mm"
    injectTimes={[
      setHours(setMinutes(new Date(), 1), 0),
      setHours(setMinutes(new Date(), 5), 12),
      setHours(setMinutes(new Date(), 59), 23)
    ]}
    dateFormat="MMMM d, yyyy h:mm aa"
  />  <button type="submit" onClick={Submit} className="btn btn-dark btn-lg btn-block ">Done</button>
  <p>{success}</p></form>
  );
};