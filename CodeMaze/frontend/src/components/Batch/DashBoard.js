import { Center } from '@chakra-ui/react'
import React from 'react'
import FileUploadComponent from './FileUploadComponent'
import SendCredentials from './SendCredientials'

const DashBoard = () => {
  return (
    <div > 
      <Center><h4>Add new Batch with excel file</h4></Center>
      <FileUploadComponent/>
      <br></br>
      <hr></hr>
      <Center>Send Credentials to students </Center>
      <SendCredentials/>
    </div>

  )
}

export default DashBoard