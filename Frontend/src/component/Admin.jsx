
import NavbarAdmin from "./NavbarAdmin";
import {
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
function Admin(){
    if(localStorage.getItem('id') === null){
        window.location.href = '/login'
    }
    const [vehicle, setVehicle] = React.useState('')
    const [driver, setDriver] = React.useState('')
    const [approver, setApprover] = React.useState('')
    const [listvehicle, setListVehicle] = React.useState([])
    const [listdriver, setListDriver] = React.useState([])
    const [listapprover, setListApprover] = React.useState([])

    function onSubmit(){
        if(vehicle === '' || driver === '' || approver === ''){
            alert('Please fill all the fields')
        }
        else{
            let id = localStorage.getItem('id')
            axios.post('http://localhost:8008/index.php/request', {
                vehicle: vehicle,
                driver: driver,
                approver: approver,
                admin: id
            }).then((res)=>{
                if(res.data.message === 'success'){
                    alert('Request has been sent')
                }
                else{
                    alert('Request failed')
                }
            })
        }
    }
    React.useEffect(()=>{
        axios.get('http://localhost:8008/index.php/vehicle').then((response)=>{
            setListVehicle(response.data)
        })
        axios.get('http://localhost:8008/index.php/driver').then((response)=>{
            setListDriver(response.data)
        })
        axios.get('http://localhost:8008/index.php/approver').then((response)=>{
            setListApprover(response.data)
        })
    },[])
    const optionvehicle = listvehicle.map((item)=>{
        return(
            <option value={item.id}>{item.name}</option>
        )
    })
    const optiondriver = listdriver.map((item)=>{
        return(
            <option value={item.id}>{item.name}</option>
        )
    })
    const optionapprover = listapprover.map((item)=>{
        return(
            <option value={item.id} >{item.username}</option>
        )
    })

    return(
        <div>
            <NavbarAdmin/>
            <VStack
          spacing={1}
          w={['full']}
          align={['flex-start','center']}
          >
            <Heading>
              Request
            </Heading>

          </VStack>
          <VStack
          spacing={1}
          w={['full']}
          align={['flex-start']}
          >
          <FormControl>
              <FormLabel>
                Vehicle
              </FormLabel>
              <Select placeholder='Select option' value={vehicle} onChange={(e)=>setVehicle(e.target.value)}>
                {optionvehicle}
                </Select>
          </FormControl>
          </VStack>
          <VStack
          spacing={1}
          w={['full']}
          align={['flex-start']}
          >
          <FormControl>
              <FormLabel>
                Driver
              </FormLabel>
              <Select placeholder='Select option' value={driver} onChange={(e)=>setDriver(e.target.value)}>
                {optiondriver}
                </Select>
          </FormControl>
          </VStack>
          <VStack
          spacing={1}
          w={['full']}
          align={['flex-start','center']}
          >
          <FormControl>
              <FormLabel >
                Approver
              </FormLabel>
              <Select placeholder='Select option' value={approver} onChange={(e)=>setApprover(e.target.value)}>
                {optionapprover}
                </Select>
          </FormControl>
          </VStack>
          <VStack
          spacing={1}
          w={['full']}
          align={['flex-start','center']}
          >
          <FormControl>
              <Button colorScheme='facebook' w={'full'} onClick={onSubmit}>
                Request
                </Button>
          </FormControl>
          </VStack>
        </div>
    )
}

export default Admin;