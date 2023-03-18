import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { selectAccess } from '../slices/loginSlice';
import { getClientsAsync, addClientAsync, deleteClientAsync, updateClientAsync, selectClient, selectRefresh } from '../slices/ClientsSlice';
import { Button, Input, Text, Row, Col, Card, Tooltip, Table } from "@nextui-org/react";
import { FcSynchronize,FcOk,FcCancel } from "react-icons/fc";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Clients = () => {
  
  const dispatch = useAppDispatch();
  const clients = useAppSelector(selectClient);
  const refresh = useAppSelector(selectRefresh);
  const access = useAppSelector(selectAccess);

  const [clientName, setclientName] = useState("")
  const [age, setage] = useState(0)
  const [city, setcity] = useState("")
  const [clientStatus, setclientStatus] = useState<boolean>()
  const [search, setsearch] = useState("")
  const [condition, setcondition] = useState<any>()

  function addClient(){
    dispatch(addClientAsync({client:{clientName,age,city,clientStatus:true},access}))
    toast("Client was added", {position: "top-right",autoClose: 5000,
      hideProgressBar: false,closeOnClick: true,pauseOnHover: true,draggable: true,progress: undefined,type:'success',theme:"colored",});
  };

  useEffect(()=>{
    dispatch(getClientsAsync(access))
    setcondition(condition)
  },[refresh])

  return (
    <>
        {/* ADD CLIENT */}
        <Col css={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <Text h1 size={60} css={{textGradient: "45deg, $blue600 -20%, $pink600 50%",}} weight="bold" style={{ fontFamily: 'fantasy' }}>Clients</Text><br/>
          <Input clearable bordered width='75%' labelPlaceholder="Client Name" onChange={(e) => setclientName(e.target.value)}/>
        <br/><br/>
        <Input clearable bordered width='75%' labelPlaceholder="Age" onChange={(e) => setage(+e.target.value)}/>
        <br/><br/>
        <Input clearable bordered width='75%' labelPlaceholder="city" onChange={(e) => setcity(e.target.value)}/>
        <br/>
        <Button size="lg" color="gradient" auto onClick={() => {addClient()}}>Add a new client</Button><br />
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="colored"/>
        <Card.Divider/><br />

        {/* SHOW CLIENTS + DELETE + UPDATE*/}
        <Button.Group color="gradient" ghost>
          <Button onClick={()=> setcondition("all")}>All Clients</Button>
          <Button onClick={()=> setcondition(true)}>Available Clients</Button>
          <Button onClick={()=> setcondition(false)}>Disabled Clients</Button>
        </Button.Group>

        {/* SEARCH CLIENT */}
        <hr/><br/>
        <Input clearable bordered width='75%' labelPlaceholder="Search client by name" onChange={(e) => setsearch(e.target.value)} /><br />
      </Col>

        {/* DISPLAY */}
        <hr/>
        <Table headerLined align='left' css={{ height: "auto", maxWidth: "70%", marginLeft:'17%' }} selectionMode="none">
        <Table.Header>
          <Table.Column align={'start'}><Text css={{ textGradient: "45deg, #FFFFD2 -5%, $purple600 50%", fontFamily:'Poppins-Regular', fontSize:'$2xl'}} weight="bold">Client Name</Text></Table.Column>
          <Table.Column align={'start'}><Text css={{ textGradient: "45deg, #FFFFD2 -5%, $purple600 50%", fontFamily:'Poppins-Regular', fontSize:'$2xl'}} weight="bold">Age</Text></Table.Column>
          <Table.Column align={'start'}><Text css={{ textGradient: "45deg, #FFFFD2 -5%, $purple600 50%", fontFamily:'Poppins-Regular', fontSize:'$2xl'}} weight="bold">City</Text></Table.Column>
          <Table.Column align={'start'}><Text css={{ textGradient: "45deg, #FFFFD2 -5%, $purple600 50%", fontFamily:'Poppins-Regular', fontSize:'$2xl'}} weight="bold">Status</Text></Table.Column>
          <Table.Column align={'start'}><Text css={{ textGradient: "45deg, #FFFFD2 -5%, $purple600 50%", fontFamily:'Poppins-Regular', fontSize:'$2xl'}} weight="bold">Update</Text></Table.Column>
        </Table.Header>
        <Table.Body css={{ p: 0, tt: "capitalize" }}>
          {clients.filter(client=> condition === "all" ||client.clientStatus === condition).filter(client => client.clientName.includes(search)).map((client, i) =>
            <Table.Row css={{ textAlign: 'start'}} key={i}>
              <Table.Cell><Col>{client.clientName}</Col></Table.Cell>
              <Table.Cell><Col>{client.age}</Col></Table.Cell>
              <Table.Cell><Col>{client.city}</Col></Table.Cell>
              <Table.Cell> <Col><Button size={'xs'} shadow color={`${client.clientStatus === true ? "success" : "error"}`} css={{pointerEvents: 'none', align:'center'}}>{client.clientStatus ? "Available":"Disabled"}</Button></Col></Table.Cell>
              <Table.Cell>
                <Row >
                  <Col>
                    <Tooltip content="Edit client" >
                    <p style={{cursor:'pointer', position:'absolute',right:'65%'}} onClick={() => dispatch(updateClientAsync({ client: { id: client.id, clientName: clientName || client.clientName, age: age || client.age, city: city || client.city, clientStatus: client.clientStatus }, access }))}><FcSynchronize/></p></Tooltip>
                  </Col>
                  <Col>
                    <Tooltip content={client.clientStatus === true ? "Make Disabled":"Make Available"}>
                      <p style={{cursor:'pointer'}} onClick={() => dispatch(deleteClientAsync({ client: { id: client.id, clientName: client.clientName, age: client.age, city: client.city, clientStatus: !client.clientStatus }, access }))}>{client.clientStatus === true ?<FcOk/>:<FcCancel/>}</p>
                    </Tooltip>
                  </Col>
                </Row> </Table.Cell>
            </Table.Row>)}
            </Table.Body>
      </Table>
    </>
  )
}

export default Clients