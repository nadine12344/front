import React from 'react';

import '../../Stylesheets/Nadine/faculty.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import logo from '../../Images/GUC.png'
import axios from 'axios'
import { useHistory } from 'react-router'
import {backendLink} from '../../keys_dev'
import Add from "./components/Faculty/addFaculty";
import Delete from "./components/Faculty/deleteFaculty";
import Update from "./components/Faculty/updateFaculty";
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
          <Link className="navbar-brand" to={"/addFaculty"}>Faculty</Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to={"/addFaculty"}>Add</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/deleteFaculty"}>delete </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/updateFaculty"}>update</Link>
              </li>
            </ul>
          </div>
        </div>
        <i className="fa offset-2 fa-sign-out fa-lg sign-out-ALL" onClick={logoutClick}></i>
        <img class="small  " src={logo} alt="Logo" />
      </nav>

      <div className="outer">
        <div className="inner ">
          <Switch>
            <Route exact path='/' component={Add} />
            <Route path="/addFaculty" component={Add} />
            <Route path="/deleteFaculty" component={Delete} />
            <Route path="/updateFaculty" component={Update} />
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default App;