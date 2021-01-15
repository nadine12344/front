import React from 'react'

import '../../Stylesheets/Nadine/main.css'
import Header from './components/Header/Header';

import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from 'react-router'




export default function MainAcademicPage(props) {
  const history = useHistory()
  //const name = useSelector((state) => state.name)


  return (
    <div class="main">
    <div class="purple">
    <Header name="Page Not Found or unautorized"/>
    </div>
  
 <div class="row center2">
    <div id="class">
      <span id="id"></span>
      <span class="text" onClick={()=> history.push("/main")}>Go to Main Page</span>
      </div>   
    
   
    
</div></div>
  )
}
