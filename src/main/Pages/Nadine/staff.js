import React from 'react';

import '../../Stylesheets/Nadine/faculty.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useHistory } from 'react-router'
import logo from '../../Images/GUC.png'
import axios from 'axios'
import {backendLink} from '../../keys_dev'
import Add from "./components/staff/addStaff";
import Delete from "./components/staff/deleteStaff";
import Update from "./components/staff/updateStaff";
import Edit from "./components/staff/editSalary";
function App() {
  const history = useHistory()
  //const name = useSelector((state) => state.name)
  
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
          <Link className="navbar-brand" to={"/addStaff"}>Staff</Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to={"/addStaff"}>Add </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/deleteStaff"}>Delete </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/updateStaff"}>Update </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/editSalary"}>Update Salary</Link>
              </li>
            </ul>
          </div>
        </div>
      
        <img class="small offset-5 " src={logo} alt="Logo" />
      </nav>

      <div className="outer">
        <div className="inner">
          <Switch>
            <Route exact path='/' component={Add} />
            <Route path="/addStaff" component={Add} />
            <Route path="/deleteStaff" component={Delete} />
            <Route path="/updateStaff" component={Update} />
            <Route path="/editSalary" component={Edit} />
          </Switch>
          <i className="fa offset-6 pointer  fa-sign-out fa-lg sign-out-ALL" onClick={logoutClick}>logout</i>
        </div>
      </div>
    </div>
  );
}

export default App;