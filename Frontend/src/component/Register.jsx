import {
    Box,
    VStack,
    Heading, 
} from '@chakra-ui/layout'
import { FormControl,
        FormLabel,
       } from '@chakra-ui/form-control'
import { Button,Input } from '@chakra-ui/react'
import { Radio, RadioGroup } from '@chakra-ui/react'
import React from 'react'
import axios from 'axios'

function Register() {
    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [type, setType] = React.useState('admin')
    const [level, setLevel] = React.useState(0)

    let jenjang
    if(type ==='approver'){
        jenjang = <FormControl>
              <FormLabel>
                Level
              </FormLabel>
              <Input variant={'filled'} type='number' value={level} onChange={(e)=>setLevel(e.target.value)}/>
        </FormControl>
    }

    const register = () => {
        if (/\s/.test(username) || /\s/.test(password)) {
            alert('Invalid username or password')
        }
        else if(username==='' || password===''){
            alert('Please fill all the fields')
        }
        else if (username.length < 5 || password.length < 5) {
            alert('Username and password must be at least 5 characters')
        }
        else if(type === 'approver'){
            if(level < 1){
                alert('Level must more than 0')
            }
            else
            {
                axios.post('http://localhost:8008/index.php/register', {
                    username: username,
                    password: password,
                    type: type,
                    level: level
                }).then((res)=>{
                    if(res.data.message === 'error'){
                        alert('Username already exists')
                    }
                    else{
                        alert('Register success')
                        window.location.href = '/login'
                    }
                })
            }
        }
        else {
            axios.post('http://localhost:8008/index.php/register', {
                username: username,
                password: password,
                type: type,
                level: level
            }).then((res)=>{
                if(res.data.message === 'error'){
                    alert('Username already exists')
                }
                else{
                    alert('Register success')
                    window.location.href = '/login'
                }
            })
        }
    }

  return (
      <Box
      w={['full','md']}
      p={[8,10]}
      mx='auto'
      border={['none','1px solid gray']}
      mt={[20,'10hv']}
      borderRadius={10}
      borderColor={['','gray.200']}
      >
        <VStack
        spacing={4}
        align='flex-start'
        w='full'
        >
          <VStack
          spacing={1}
          w={['full']}
          align={['flex-start','center']}
          >
            <Heading>
              Register
            </Heading>
          </VStack>
          <FormControl>
          </FormControl>
          <FormControl>
              <FormLabel>
                Username
              </FormLabel>
              <Input variant={'filled'} value={username} onChange={(e)=>setUsername(e.target.value)}/>
          </FormControl>
          <FormControl>
              <FormLabel>
                Password
              </FormLabel>
              <Input variant={'filled'} type='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
          </FormControl>
            <RadioGroup onChange={setType} value={type}>
                <Radio value="admin" paddingRight={2}>Admin</Radio>
                <Radio value="approver">Approver</Radio>
            </RadioGroup>
            {jenjang}
          <Button colorScheme='facebook' w={'full'} onClick={register}>
            Register
          </Button>
        </VStack>
        <FormLabel>
          Already have an account? <a href='/login'>Login</a>
        </FormLabel>
      </Box>
  )
}

export default Register