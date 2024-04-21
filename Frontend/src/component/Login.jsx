import {
    Box,
    VStack,
    Heading, 
} from '@chakra-ui/layout'
import { FormControl,
        FormLabel,
       } from '@chakra-ui/form-control'
import { Button } from '@chakra-ui/react'
import React from 'react'
import { Input } from '@chakra-ui/react'
import { Radio, RadioGroup } from '@chakra-ui/react'
import axios from 'axios'

function Login() {
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [type, setType] = React.useState('admin')

  const login = () => {
      if(username==='' || password===''){
          alert('Please fill all the fields')
      }
      else {

          axios.post('http://localhost:8008/index.php/login', {
              username: username,
              password: password,
              type: type
          }).then((res)=>{
              if(res.data.message === 'error'){
                  alert('Wrong username or password')
              }
              else{
                  if(type === 'admin'){
                      window.location.href = '/admin'
                      localStorage.setItem('id', res.data.id)
                  }
                  else{
                      window.location.href = '/approver'
                      localStorage.setItem('id', res.data.id)
                      localStorage.setItem('level', res.data.level)
                  }
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
              Login
            </Heading>

          </VStack>
          <FormControl>
              <FormLabel>
                Username
              </FormLabel>
              <Input variant={'filled'} value={username} onChange={(e)=>setUsername(e.target.value)}   />
          </FormControl>
          <FormControl>
              <FormLabel>
                Password
              </FormLabel>
              <Input variant={'filled'} type='password' value={password} onChange={(e)=>setPassword(e.target.value)}   />
          </FormControl>
          <RadioGroup onChange={setType} value={type}>
                <Radio value="admin" paddingRight={2}>Admin</Radio>
                <Radio value="approver">Approver</Radio>
          </RadioGroup>
          <Button colorScheme='facebook' w={'full'} onClick={login}>
            Login
          </Button>
        </VStack>
        <FormLabel>
          Don't have an account? <a href='/register'>Register</a>
        </FormLabel>
      </Box>
  )
}

export default Login;