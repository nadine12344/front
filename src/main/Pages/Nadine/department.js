import React from 'react';

import '../../Stylesheets/Nadine/faculty.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import logo from '../../Images/GUC.png'
import axios from 'axios'
import { useHistory } from 'react-router'
import {backendLink} from '../../keys_dev'
import Add from "./components/Department/addDepartment";
import Delete from "./components/Department/deleteDepartment";
import Update from "./components/Department/updateDepartment";
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
        <div className="container row">
          <Link className="navbar-brand" to={"/addDepartment"}>Department</Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to={"/addDepartment"}>Add </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/deleteDepartment"}>delete</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/updateDepartment"}>update </Link>
              </li>
            </ul>
          </div>
        </div>
         
     
        <img class="small offset-5 " src={logo} alt="Logo" />
      </nav>
  
      <div className="outer">
        <div className="inner ">

          <Switch>
            <Route exact path='/' component={Add} />
            <Route path="/addDepartment" component={Add} />
            <Route path="/deleteDepartment" component={Delete} />
            <Route path="/updateDepartment" component={Update} />
          </Switch>
          <i className="fa offset-6 pointer  fa-sign-out fa-lg sign-out-ALL" onClick={logoutClick}>logout</i>
        </div>
      </div>
    </div>
  );
}

export default App;