import React from 'react';

import '../../Stylesheets/Nadine/faculty.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import logo from '../../Images/GUC.png'
import axios from 'axios'
import { useHistory } from 'react-router'
import {backendLink} from '../../keys_dev'
import Add from "./components/Course/addCourse";
import Delete from "./components/Course/deleteCourse";
import Update from "./components/Course/updateCourse";
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
      <nav className="navbar navbar-expand navbar-dark fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={"/addCourse"}>Course</Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to={"/addCourse"}>Add </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/deleteCourse"}>Delete </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/updateCourse"}>Update </Link>
              </li>
            </ul>
          </div>
        </div>
        <i className="fa offset-3  fa-sign-out fa-lg sign-out-ALL" onClick={logoutClick}></i>
        <img class="small  " src={logo} alt="Logo" />
      </nav>

      <div className="outer">
        <div className="inner">
          <Switch>
            <Route exact path='/' component={Add} />
            <Route path="/addCourse" component={Add} />
            <Route path="/deleteCourse" component={Delete} />
            <Route path="/updateCourse" component={Update} />
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default App;