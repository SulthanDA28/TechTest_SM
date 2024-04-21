
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
            console.log(vehicle)
            console.log(driver)
            console.log(approver)
        }
    }

    const examplevehicle = [
        {
            id: 1,
            name: 'Mobil 1'
        },
        {
            id: 2,
            name: 'Mobil 2'
        }
    ]
    const exampledriver = [
        {
            id: 1,
            name: 'Driver 1'
        },
        {
            id: 2,
            name: 'Driver 2'
        }
    ]
    const exampleapprover = [
        {
            id: 1,
            name: 'Approver 1'
        },
        {
            id: 2,
            name: 'Approver 2'
        }
    ]
    React.useEffect(()=>{
        setListVehicle(examplevehicle)
        setListDriver(exampledriver)
        setListApprover(exampleapprover)
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
            <option value={item.id} >{item.name}</option>
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