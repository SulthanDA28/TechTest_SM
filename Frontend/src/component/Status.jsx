import {
    Box
} from '@chakra-ui/layout'
import {
        FormLabel,
       } from '@chakra-ui/form-control'
import { Button } from '@chakra-ui/react'
import {
    VStack,
    Heading, 
} from '@chakra-ui/layout'
import NavbarAdmin from './NavbarAdmin'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Status() {
    const [listrequest, setListRequest] = useState([]);
    const id = localStorage.getItem('id')
    useEffect(()=>{
        axios.get('http://localhost:8008/index.php/admin/'+id).then((response)=>{
            setListRequest(response.data)
        })
    },[]) 
    const request = (status) => {
        if(status==='agree'){
            return(
                <FormLabel color='green'>
                Status : Approved
            </FormLabel>
            )
        }
        else if(status==='disagree'){
            return(
                <FormLabel color='red'>
                Status : Rejected
            </FormLabel>
            )
        }
        else{
            return(
                <FormLabel color='yellow'>
                Status : Pending
            </FormLabel>
            )
        }

    }

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
                    Request : {item.approver}
                </FormLabel>
                <FormLabel>
                    Date : {item.date}
                </FormLabel>
                {request(item.status)}
            </Box>
        )
    })
    return (
        <div>
            <NavbarAdmin/>
            {listrequestjsx}

        </div>
    );
}

export default Status;