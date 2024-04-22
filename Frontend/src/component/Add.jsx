import NavbarApprover from "./NavbarApprover";
import {
    VStack,
    Heading, 
} from '@chakra-ui/layout'
import { FormControl,
        FormLabel,
       } from '@chakra-ui/form-control'
import { Input } from "@chakra-ui/react";
import { Button } from '@chakra-ui/react'
import React from 'react'
import axios from "axios";

function Add(){
    if(localStorage.getItem('id') === null){
        window.location.href = '/login'
    }
    if(localStorage.getItem('level') <= 1){
        alert('You are not allowed to access this page, your level is not enough')
        window.location.href = '/login'
    }
    const [vehicle, setVehicle] = React.useState('')
    const [driver, setDriver] = React.useState('')

    function addDriver(){
        if(driver === ''){
            alert('Please fill the driver field')
        }
        else{
            axios.post('http://localhost:8008/index.php/add_driver', {
                driver: driver
            }).then((response)=>{
                if(response.data.message === 'success'){
                    alert('Driver added')
                }
                else{
                    alert('Driver failed to add')
                }
            })
        }
    }
    function addVehicle(){
        if(vehicle === ''){
            alert('Please fill the vehicle field')
        }
        else{
            axios.post('http://localhost:8008/index.php/add_vehicle', {
                vehicle: vehicle
            }).then((response)=>{
                if(response.data.message === 'success'){
                    alert('Vehicle added')
                }
                else{
                    alert('Vehicle failed to add')
                }
            })
        }
    }
    return(
        <div>
            <NavbarApprover/>
            <VStack
          spacing={1}
          w={['full']}
          align={['flex-start','center']}
          >
            <Heading>
              Add Data
            </Heading>

          </VStack>
            <div align='center'>
            <VStack
            spacing={1}
            w={['50%']}
            align={['flex-start']}
            >
            <FormControl>
                <FormLabel>
                  Vehicle
                </FormLabel>
                <Input placeholder='Input Vehicle' value={vehicle} onChange={(e)=>setVehicle(e.target.value)}/>
                <Button colorScheme='facebook' w = {'100%'} top={1} onClick={addVehicle}>
                    Add Vehicle
                </Button>
            </FormControl>
            </VStack>
            </div>
            <div align='center'>
            <VStack
            spacing={1}
            w={['50%']}
            align={['flex-start']}
            top={10}
            >
            <FormControl>
                <FormLabel>
                  Driver
                </FormLabel>
                <Input placeholder='Input Driver' value={driver} onChange={(e)=>setDriver(e.target.value)}/>
                <Button colorScheme='facebook' w = {'100%'} top={1} onClick={addDriver}>
                    Add Driver
                </Button>
            </FormControl>
            </VStack>
            </div>
        </div>
    )
}

export default Add;