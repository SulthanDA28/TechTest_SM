
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
        alert('agree')
        console.log(id)
    }
    function rejectRequest(id){
        alert('disagree')
        console.log(id)
    }

    const examplelistrequest = [
        {
            id: 1,
            vehicle: 'Mobil 1',
            driver: 'Driver 1',
            Admin: 'Admin 1'
        },
        {
            id: 2,
            vehicle: 'Mobil 2',
            driver: 'Driver 2',
            Admin: 'Admin 2'
        }
    ]

    React.useEffect(()=>{
        setListRequest(examplelistrequest)
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
                    Request : {item.Admin}
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