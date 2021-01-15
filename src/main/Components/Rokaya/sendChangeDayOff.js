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


var success=0;



export default function SendChangeDayOffRequest(props) {
 
  const [error,setError]=useState('')
  const [modal,setModal]=useState(false)
  const [state, setState] = useState({
    reason: '',
    day:'',
  })

  const handleChange = (event) => {
    let newValue = event.target.value
    let name = event.target.name
    setError('')
    setState((prevState) => {
      return {
        ...prevState,
        [name]: newValue,
      }
    })
  }
  const toggle = () => {
    setError('')
    setState({
      reason: '',
      day:'',

    })
    props.setShow(!props.show)
    };

    const toggle2 = () => {
       setModal(!modal)
       if(success===1){
         console.log("toggle 2 success 1")
         console.log(success)
        props.setShow(!props.show)
        setState({
          reason: '',
          day:'',

        })
        }
        };

    const handleSubmit= async ()=>{
        setModal(!modal)
        await axios({
            url: `${backendLink}/request/sendChangeDayOffRequest`,
            method: 'post',
            headers: {
              token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFjLTEiLCJyb2xlIjoiY29vcmRpbmF0b3IiLCJpYXQiOjE2MDkzNDA3MTR9.Gj-oLfyvDPDNY6f_PBmPuWU6_Ep8ZJtKc9h4NEBiAZE",
            },
            data:{
                   reason:state.reason,
                   day:state.day
            },

           
          }).then((res) => {
              console.log(res)
              if(res.data.statusCode==2 || res.data.statusCode==1){
                success=0
                  console.log("gwa iff")
                  setError(res.data.error)

              }
              else{
                success=1;
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
      <Button color="primary" onClick={toggle2}>Ok</Button>
    </ModalFooter>
  </Modal>

<Modal  isOpen={props.show} toggle={toggle} className="sendReplacementModal">
<ModalHeader toggle={toggle} className="sendReplacementHeaderFont">Send Change Day Off Request</ModalHeader>
<ModalBody>
<Form>
  <FormGroup>
    <Label for="examplePassword" className="sendReplacementTitleFont">Day *</Label>
    <Input  className="sendReplacementInput"  onChange={handleChange} name='day' />
  </FormGroup>
  <FormGroup>
    <Label for="exampleText" className="sendReplacementTitleFont">Reason For Change</Label>
    <Input className="sendReplacementTextInput" type="textarea" placeholder="Optional Reason" name='reason'  onChange={handleChange}/>
  </FormGroup>
  
   
</Form>
<Button color="primary" onClick={handleSubmit} className="sendReplacementButton" >Submit</Button>
</ModalBody>
{/* <ModalFooter>
     
    </ModalFooter> */}
</Modal>
</div>

  )
}

