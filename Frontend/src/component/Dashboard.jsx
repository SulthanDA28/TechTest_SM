import NavbarApprover from './NavbarApprover'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import { ResponsiveContainer } from 'recharts';
import {
    VStack,
    Heading, 
} from '@chakra-ui/layout'
import { FormControl,
        FormLabel,
       } from '@chakra-ui/form-control'
import { Select } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import { utils, write } from 'xlsx';
import React from 'react'
import axios from 'axios';



const LineChartWeek = ({ data }) => {
    return (
        <ResponsiveContainer width="60%" height={400}>
        <LineChart
          data={data}
          width={600}
          height={600}
          margin={{
            top: 0,
            // right: 30,
            // left: -15,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
        </ResponsiveContainer>
    );
}
const LineChartMonth = ({ data }) => {
  return (
      <ResponsiveContainer width="60%" height={400}>
      <LineChart
        data={data}
        width={600}
        height={600}
        margin={{
          top: 0,
          // right: 30,
          // left: -15,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month_year" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
      </ResponsiveContainer>
  );
}

const LineChartYear = ({ data }) => {
  return (
      <ResponsiveContainer width="60%" height={400}>
      <LineChart
        data={data}
        width={600}
        height={600}
        margin={{
          top: 0,
          // right: 30,
          // left: -15,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
      </ResponsiveContainer>
  );
}

function Dashboard(){
    if(localStorage.getItem('id') === null){
        window.location.href = '/login'
    }
    if(localStorage.getItem('level') <= 1){
        alert('You are not allowed to access this page, your level is not enough')
        window.location.href = '/login'
    }
    function exportData(){
        axios.get('http://localhost:8008/index.php/export').then((response)=>{
            let filename = 'data.xlsx'
            const ws = utils.json_to_sheet(response.data)
            const wb = utils.book_new()
            utils.book_append_sheet(wb, ws, 'Sheet1')
            const excelBuffer = write(wb, {type: 'buffer', bookType: 'xlsx'})
            const data = new Blob([excelBuffer], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'})
            const url = window.URL.createObjectURL(data)
            const link = document.createElement('a')
            link.href = url
            link.download = filename
            link.click()
        })
    }
    const [select, setSelect] = React.useState('week')
    const [data, setData] = React.useState([])
    React.useEffect(()=>{
        axios.get('http://localhost:8008/index.php/request_week').then((response)=>{
            setData(response.data)
        })
    },[])
    const handleChange = (event) => {
        setSelect(event.target.value);
        console.log(event.target.value)
        let pilih = event.target.value
        if(pilih === 'week'){
            axios.get('http://localhost:8008/index.php/request_week').then((response)=>{
                setData(response.data)
            })
        }
        else if(pilih === 'month'){
            axios.get('http://localhost:8008/index.php/request_month').then((response)=>{
                setData(response.data)
            })
        }
        else if(pilih === 'year'){
            axios.get('http://localhost:8008/index.php/request_year').then((response)=>{
                setData(response.data)
            })
        }
    }
    const displaychart = () => {
        if(select === 'week'){
            return <LineChartWeek data={data} />
        }
        else if(select === 'month'){
            return <LineChartMonth data={data} />
        }
        else if(select === 'year'){
            return <LineChartYear data={data} />
        }
    }
    


    return(
        <div align='center'>
            <NavbarApprover/>
            <VStack
          spacing={1}
          w={'80%'}
          align={['flex-start','center']}
          >
            <Heading>
              Dashboard
            </Heading>
            <Select w={'30%'} value={select} onChange={handleChange}>
                <option value="week">Week</option>
                <option value="month">Month</option>
                <option value="year">Year</option>
            </Select>
            {displaychart()}
            <Button colorScheme="blue" onClick={exportData}>Export</Button>

          </VStack>

        </div>
    )
}

export default Dashboard;