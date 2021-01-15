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


var success=0



export default function DeleteSlot(props) {
  
  const [error,setError]=useState('')
  const [modal,setModal]=useState(false)
  const [state, setState] = useState({
   slot:'',
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
      slot:'',
    })
    props.setShow(!props.show)
    };

    const toggle2 = () => {
       setModal(!modal)
       if(success===1){
        props.setShow(!props.show)
        setState({
          slot:'',
        })
        }
        };

    const handleSubmit= async ()=>{
        console.log("state")
        console.log(state.start)
        setModal(!modal)
        await axios({
            url: `${backendLink}/request/deleteSlot`,
            method: 'delete',
            headers: {
              token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFjLTEiLCJyb2xlIjoiY29vcmRpbmF0b3IiLCJpYXQiOjE2MDkzNDA3MTR9.Gj-oLfyvDPDNY6f_PBmPuWU6_Ep8ZJtKc9h4NEBiAZE",
            },
            data:{
                   slot:state.slot

            },

           
          }).then((res) => {
             // console.log(res)
              if(res.data.statusCode==2 || res.data.statusCode==1){
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
      <Button color="primary" onClick={toggle2}>Ok</Button>
    </ModalFooter>
  </Modal>

<Modal  isOpen={props.show} toggle={toggle} className="sendReplacementModal">
<ModalHeader toggle={toggle} className="sendReplacementHeaderFont">Delete Slot</ModalHeader>
<ModalBody>
<Form>
  <FormGroup>
    <Label for="exampleEmail" className="sendReplacementTitleFont">Slot Id *</Label>
    <Input  className="sendReplacementInput"  name='slot'  onChange={handleChange} placeholder="" />
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

