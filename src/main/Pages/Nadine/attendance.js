import React from 'react';

import '../../Stylesheets/Nadine/faculty.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import logo from '../../Images/GUC.png'
import axios from 'axios'
import { useHistory } from 'react-router'
import {backendLink} from '../../keys_dev'
import Add from "./components/Attendance/viewMissing";
import staff from "./components/Attendance/Attendance";
import sign from "./components/Attendance/sign";
function App() {
    const history=useHistory()
  const logoutClick= async ()=>{
    sessionStorage.removeItem("token")
    await axios({
      url: `${backendLink}/logging/logout`,
      method: 'post',
    }).then((res) => {
        console.log(res)
        
    }).catch((err) => {
        console.log(err.response)
      })
    history.push("/")
  }
  return (
    
    <div className="App">
     
      <nav className="navbar navbar-expand col-12 navbar-dark fixed-top">
        <div className="container">
      <Link className="navbar-brand" >Attendance</Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to={"/viewMissing"}>Missing Attendance</Link>
                <Link className="nav-link" to={"/staffAttendance"}>Attendance</Link>
                <Link className="nav-link" to={"/sign"}>Add signin/sign out</Link>
              </li>
             
    
 
      
    
            </ul>
       
          </div>
        </div>
     
       
       <i className="fa offset-sm-2  fa-sign-out fa-lg sign-out-ALL" onClick={logoutClick}></i>
        <img class="small  " src={logo} alt="Logo" />
      </nav>

      <div className="outer">
        <div className="inner ">
          <Switch>

            <Route path="/viewMissing" component={Add} />
            <Route path="/staffAttendance" component={staff} />
            <Route path="/sign" component={sign} />
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default App;