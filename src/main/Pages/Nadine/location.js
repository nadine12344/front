import React from 'react';

import '../../Stylesheets/Nadine/faculty.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useHistory } from 'react-router'
import logo from '../../Images/GUC.png'
import axios from 'axios'
import {backendLink} from '../../keys_dev'
import Add from "./components/Location/addLocation";
import Delete from "./components/Location/deleteLocation";
import Update from "./components/Location/updateLocation";
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
          <Link className="navbar-brand" to={"/addLocation"}>Location</Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to={"/addLocation"}>Add </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/deleteLocation"}>Delete </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/updateLocation"}>Update </Link>
              </li>
            </ul>
          </div>
        </div>
        <i className="fa offset-3 fa-sign-out fa-lg sign-out-ALL" onClick={logoutClick}></i>
        <img class="small  " src={logo} alt="Logo" />
      </nav>

      <div className="outer">
        <div className="inner">
          <Switch>
            <Route exact path='/' component={Add} />
            <Route path="/addLocation" component={Add} />
            <Route path="/deleteLocation" component={Delete} />
            <Route path="/updateLocation" component={Update} />
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default App;