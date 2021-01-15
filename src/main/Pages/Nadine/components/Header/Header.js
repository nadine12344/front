import React, { Component } from 'react';
import logo from '../../../../Images/GUC.png'
import './Header.css';

class Header extends Component {
  render() {
    return (
        <nav id="white">
         <div class="row">
         <div class="logo offset-3">
        <img className="MainAcademicLogo" src={logo} alt="Logo" />
             </div> </div>
             <div class="row">
        <div class="col-7 col-sm-5 offset-2 offset-sm-4 ">
          <h1 class="white">{this.props.name}</h1>  
        </div>
       </div>
      </nav>
    );
  }
}

export default Header;