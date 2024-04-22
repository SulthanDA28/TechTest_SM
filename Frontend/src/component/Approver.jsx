
import NavbarApprover from './NavbarApprover'
import {
    Box,
    VStack,
    Heading, 
} from '@chakra-ui/layout'
import { FormControl,
        FormLabel,
       } from '@chakra-ui/form-control'
import { Select } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import React from 'react'
import axios from 'axios'
import Admin from './Admin'
function Approver(){
    if(localStorage.getItem('id') === null){
        window.location.href = '/login'
    }
    if(localStorage.getItem('level') <= 1){
        alert('You are not allowed to access this page, your level is not enough')
        window.location.href = '/login'
    }
    const [listrequest, setListRequest] = React.useState([])

    function approveRequest(id){
        axios.put('http://localhost:8008/index.php/request/approved',
        {
            id: id
        }).then((response)=>{
            if(response.data.message === 'success'){
                alert('Request has been approved')
                window.location.reload()
            }
            else{
                alert('Request failed')
                window.location.reload()
            }
        })
    }
    function rejectRequest(id){
        axios.put('http://localhost:8008/index.php/request/rejected',
        {
            id: id
        }).then((response)=>{
            if(response.data.message === 'success'){
                alert('Request has been rejected')
                window.location.reload()
            }
            else{
                alert('Request failed')
                window.location.reload()
            }
        })
    }

    React.useEffect(()=>{
        let url = 'http://localhost:8008/index.php/approver/'+localStorage.getItem('id')
        axios.get(url).then((response)=>{
            setListRequest(response.data)
        })
    },[])

    const listrequestjsx = listrequest.map((item)=>{
        return(
            <Box key={item.id} border='1px solid gray' p={4} borderRadius={10} mb={4}>
                <FormLabel>
                    Vehicle : {item.vehicle}
                </FormLabel>
                <FormLabel>
                    Driver : {item.driver}
                </FormLabel>
                <FormLabel>
                    Request : {item.admin}
                </FormLabel>
                <FormLabel>
                    Date : {item.date}
                </FormLabel>
                <Button colorScheme='facebook' onClick={()=>approveRequest(item.id)}>
                    Approve
                </Button>
                <Button colorScheme='red' ml={2} onClick={()=>rejectRequest(item.id)}>
                    Reject
                </Button>
            </Box>
        )
    })


    return(
        <div>
            <NavbarApprover/>
            {listrequestjsx}
        </div>
    )
}

export default Approver;