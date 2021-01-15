import React,{useEffect,useState} from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import logo from '../../Images/GUC.png'
import '../../Stylesheets/Rokaya/ViewSchedule.css'
import '../../Stylesheets/Rokaya/MainAcademic.css'
import '../../Stylesheets/Rokaya/viewSentReplacementRequests.css'
import Table from 'react-bootstrap/Table'
import {Modal,ModalBody,ModalFooter,ModalHeader,Button} from 'reactstrap'
import axios from 'axios'
import {backendLink} from '../../keys_dev'
import {FormGroup,Input,Label,Form,FormText} from 'reactstrap'



var mem1=""
 var mem2=""
  var mem3=""
  var mem4=""
  var mem5=""
  var req1=""
 var req2=""
  var req3=""
  var req4=""
  var req5=""

  var globalReplacements=[]
  var globalRequests=[]
  function setReplacementsg(){
    if(mem1!=""){
      globalReplacements[0]=mem1
    }
    if(mem2!=""){
      globalReplacements[1]=mem2
    }
    if(mem3!=""){
      globalReplacements[2]=mem3
    }
    if(mem4!=""){
      globalReplacements[3]=mem4
    }
    if(mem5!=""){
      globalReplacements[4]=mem5
    }
  
  }


  function setRequestsg(){
    if(req1!=""){
      globalRequests[0]=req1
    }
    if(req2!=""){
      globalRequests[1]=req2
    }
    if(req3!=""){
      globalRequests[2]=req3
    }
    if(req4!=""){
      globalRequests[3]=req4
    }
    if(req5!=""){
      globalRequests[4]=req5
    }
  
  }
var success=0;
export default function SendAnnualLeave(props){
  const [error,setError]=useState('')
  const [modal,setModal]=useState(false)
  const [state, setState] = useState({
    reason:'',
    date:''
  })
  const [requests,setRequests]=useState([])
  const [replacements,setReplacements]=useState([])


  const handleChange = (event) => {
    let newValue = event.target.value
    let name = event.target.name
    setError('')
    setState((prevState) => {
      if(name==='replacements1'){
        mem1=newValue
      }
      if(name==='replacements2'){
        mem2=newValue
      }
      if(name==='replacements3'){
        mem3=newValue
      }
      if(name==='replacements4'){
        mem4=newValue
      }
      if(name==='replacements5'){
        mem5=newValue
      }
      if(name==='requests1'){
        req1=newValue
      }
      if(name==='requests2'){
        req2=newValue
      }
      if(name==='requests3'){
        req3=newValue
      }
      if(name==='requests4'){
        req4=newValue
      }
      if(name==='requests5'){
        req5=newValue
      }
      setReplacementsg()
      setRequestsg()
      setReplacements(globalReplacements)
      setRequests(globalRequests)
      return {
        ...prevState,
        [name]: newValue,
      }
    })
  }
  
  const toggle = () => {
    setError('')
    setState({
      reason:'',
      date:'',
    })
    setReplacements([])
    setRequests([])
    var mem1=""
  mem2=""
   mem3=""
   mem4=""
   mem5=""
   req1=""
  req2=""
 req3=""
   req4=""
 req5=""

   globalReplacements=[5]
   globalRequests=[5]
    props.setShow(!props.show)
    }

    const toggle2 = () => {
       setModal(!modal)
       if(success===1){
        props.setShow(!props.show)
        setState({
          reason:'',
          date:'',
        })
        setReplacements([])
    setRequests([])
    var mem1=""
  mem2=""
   mem3=""
   mem4=""
   mem5=""
   req1=""
  req2=""
 req3=""
   req4=""
 req5=""

   globalReplacements=[5]
   globalRequests=[5]
      
        }
        }

    const handleSubmit= async ()=>{
     
      
     
      setModal(!modal)
        await axios({
            url: `${backendLink}/request/sendAnnualLeaveRequest`,
            method: 'post',
            headers: {
              token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFjLTEiLCJyb2xlIjoiY29vcmRpbmF0b3IiLCJpYXQiOjE2MDkzNDA3MTR9.Gj-oLfyvDPDNY6f_PBmPuWU6_Ep8ZJtKc9h4NEBiAZE",
            },
            data:{
                   date:state.date,
                   reason:state.reason,
                   replacements:replacements,
                   requests:requests
            },

           
          }).then((res) => {
              console.log(res)
              if(res.data.statusCode===2 || res.data.statusCode===1){
                success=0
                  setError(res.data.error)

              }
              else{
                success=1
                  setError(res.data.msg)
              }
              
          }).catch((err) => {
              console.log(err.response)
            })
    }

  return (
      <div>
  <Modal isOpen={modal} toggle={toggle2}>
    <ModalHeader toggle={toggle2}>Take Care</ModalHeader>
    <ModalBody>
    {/* {JSON.stringify(error).substring(1,error.length-1)} */}
    {error}
    </ModalBody>
    <ModalFooter>
      <Button color="primary" onClick={toggle2}  className="sendReplacementButton">Ok</Button>
    </ModalFooter>
  </Modal>

<Modal  isOpen={props.show} toggle={toggle} className="sendReplacementModal">
<ModalHeader toggle={toggle} className="sendReplacementHeaderFont">Send Annual Leave Request</ModalHeader>
<ModalBody>
<Form>
 
  <FormGroup>
    <Label for="exampleEmail" className="sendReplacementTitleFont">Date Of Request * </Label>
    <Input  className="sendReplacementInput"  name='date'  onChange={handleChange} placeholder="date of the request " />
  </FormGroup>
  <FormGroup>
    <Label for="exampleEmail" className="sendReplacementTitleFont">Replacement Memmbers  </Label>
    <Input  className="sendReplacementInput"  name='replacements1'  onChange={handleChange} placeholder="Member 1 ID" />
    <Input  className="sendReplacementInput"  name='replacements2'  onChange={handleChange} placeholder="Member 2 ID" />
    <Input  className="sendReplacementInput"  name='replacements3'  onChange={handleChange} placeholder="Member 3 ID " />
    <Input  className="sendReplacementInput"  name='replacements4'  onChange={handleChange} placeholder="Member 4 ID " />
    <Input  className="sendReplacementInput"  name='replacements5'  onChange={handleChange} placeholder="Member 5 ID " />
  </FormGroup>
  <FormGroup>
    <Label for="exampleEmail" className="sendReplacementTitleFont">Request ID's  </Label>
    <Input  className="sendReplacementInput"  name='requests1'  onChange={handleChange} placeholder="Request 1 ID " />
    <Input  className="sendReplacementInput"  name='requests2'  onChange={handleChange} placeholder="Request 2 ID " />
    <Input  className="sendReplacementInput"  name='requests3'  onChange={handleChange} placeholder="Request 3 ID " />
    <Input  className="sendReplacementInput"  name='requests4'  onChange={handleChange} placeholder="Request 4 ID " />
    <Input  className="sendReplacementInput"  name='requests5'  onChange={handleChange} placeholder="Request 5 ID " />
  </FormGroup>

  <FormGroup>
    <Label for="exampleText" className="sendReplacementTitleFont">Reason For Leave</Label>
    <Input className="sendReplacementTextInput" type="textarea" placeholder="Optional Reason" name='reason'  onChange={handleChange}/>
  </FormGroup>
  
   
</Form>
<Button color="primary" onClick={handleSubmit} className="sendReplacementButton" >Submit</Button>
</ModalBody>
</Modal>
</div>

  )
}

