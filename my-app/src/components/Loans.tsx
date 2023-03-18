import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { selectAccess } from '../slices/loginSlice';
import { getLoansAsync, addLoanAsync, deleteLoanAsync, updateLoanAsync, selectLoan, selectRefresh } from '../slices/LoansSlice'; 
import { selectBook, getBooksAsync } from '../slices/BooksSlice';
import { selectClient, getClientsAsync } from '../slices/ClientsSlice';
import Book from '../models/Book';
import Client from '../models/Client';
import { Dropdown, Button, Input, Text, Row, Col, Card, Tooltip, Table } from "@nextui-org/react";
import { FcSynchronize,FcOk,FcCancel } from "react-icons/fc";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Loans = () => {

  const dispatch = useAppDispatch();
  const loans = useAppSelector(selectLoan);
  const books = useAppSelector<Book[]>(selectBook);
  const clients = useAppSelector<Client[]>(selectClient);
  const refresh = useAppSelector(selectRefresh);
  const access = useAppSelector(selectAccess);

  const [clientID, setclientID] = useState(0)
  const [bookID, setbookID] = useState(0)
  const [startDate, setstartDate] = useState("")
  const [endDate, setendDate] = useState("")
  const [loanStatus, setloanStatus] = useState<boolean>()
  const [book_type, setbook_type] = useState(0)
  const [search, setsearch] = useState("")
  const [condition, setcondition] = useState<any>()

  function addLoan(){
    dispatch(addLoanAsync({loan:{clientID, bookID, startDate, endDate:dateLoans(book_type,startDate) ,bookStatus:false},access}))
    toast("Loan was added", {position: "top-right",autoClose: 5000,
      hideProgressBar: false,closeOnClick: true,pauseOnHover: true,draggable: true,progress: undefined,type:'success',theme:"colored",});
  };

  const dateLoans = (book_type:number,mydate:string) => {
    const date = new Date(String(mydate))
    if (book_type === 1) {date.setDate(date.getDate() + 10)}
    if (book_type === 2) {date.setDate(date.getDate() + 5)}
    if (book_type === 3) {date.setDate(date.getDate() + 3)}
    let days = date.getDate()
    let month = date.getMonth() + 1
    let years = date.getFullYear()
    const newdate = `${years}-${month}-${days}`
    return newdate
  }

  useEffect(()=>{
    dispatch(getLoansAsync(access))
    dispatch(getBooksAsync(access))
    dispatch(getClientsAsync(access))
    setcondition(condition)
  },[refresh])

  return (
    <>
      {/* ADD LOAN */}
      <Col css={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <Text h1 size={60} css={{textGradient: "45deg, $blue600 -20%, $pink600 50%",}} weight="bold" style={{ fontFamily: 'fantasy' }}>Loans</Text><br/>
        <Dropdown>
          <Dropdown.Button bordered flat style={{ width:'75%' }}>{clientID === 0 ? "Select Client.." : clients.filter(c => c.id === clientID).map(c=> c.clientName)}</Dropdown.Button>
          <Dropdown.Menu css={{ fontFamily: 'fantasy' }} onAction={(key) => setclientID(+key)} aria-label="Single selection actions" color="secondary" disallowEmptySelection selectionMode="single">
          {clients.filter(c=> c.clientStatus === true).map((client) => 
            <Dropdown.Item key={client.id}>{client.clientName}
            </Dropdown.Item>)}
          </Dropdown.Menu>
        </Dropdown><br/><br/>
        <Dropdown>
          <Dropdown.Button bordered flat style={{ width:'75%' }}>{bookID === 0 ? "Select Book.." : books.filter(b => b.id === bookID).map(b=> b.bookName)}</Dropdown.Button>
          <Dropdown.Menu css={{ fontFamily: 'fantasy' }} onAction={(key) => setbookID(+key)} aria-label="Single selection actions" color="secondary" disallowEmptySelection selectionMode="single">
          {books.filter(b=> b.bookStatus === true).map((book) =>
            <Dropdown.Item key={book.id} textValue={`${book.bookName}`} ><p style={{width:"150%"}} onClick={()=> setbook_type(book.bookType)}>{book.bookName}</p>
            </Dropdown.Item>)}
          </Dropdown.Menu>
        </Dropdown><br/><br/>
        <Input bordered color='primary' width="40%" label="Loan Date" type="date" onChange={(e) => setstartDate(e.target.value)}/>
        <br/>
        <Button size="lg" color="gradient" auto onClick={() =>addLoan()} >Add a new loan</Button><br/>
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="colored"/>
      <Card.Divider/><br/>

        {/* SHOW BOOKS + DELETE + UPDATE*/}
        <Button.Group color="gradient" ghost>
          <Button onClick={()=> setcondition("all")}>All Loans</Button>
          <Button onClick={()=> setcondition(false)}>Open Loans</Button>
          <Button onClick={()=> setcondition(true)}>Close Loans</Button>
        </Button.Group>

        {/* SEARCH Loan */}
        <hr/><br/>
        <Input clearable bordered width='75%' labelPlaceholder="Search loan by client name" onChange={(e) => setsearch(e.target.value)} /><br />
      </Col>

      {/* DISPLAY */}
      <hr/>
      <Table headerLined align='left' css={{ height: "auto", minWidth: "100%" }} selectionMode="none">
        <Table.Header>
          <Table.Column align={"start"}><Text css={{ textGradient: "45deg, #FFFFD2 -5%, $purple600 50%", fontFamily:'Poppins-Regular', fontSize:'$2xl'}} weight="bold">Client Name</Text></Table.Column>
          <Table.Column align={"start"}><Text css={{ textGradient: "45deg, #FFFFD2 -5%, $purple600 50%", fontFamily:'Poppins-Regular', fontSize:'$2xl'}} weight="bold">Book Name</Text></Table.Column>
          <Table.Column align={"start"}><Text css={{ textGradient: "45deg, #FFFFD2 -5%, $purple600 50%", fontFamily:'Poppins-Regular', fontSize:'$2xl'}} weight="bold">Loan Date</Text></Table.Column>
          <Table.Column align={"start"}><Text css={{ textGradient: "45deg, #FFFFD2 -5%, $purple600 50%", fontFamily:'Poppins-Regular', fontSize:'$2xl'}} weight="bold">Returen Date</Text></Table.Column>
          <Table.Column align={"start"}><Text css={{ textGradient: "45deg, #FFFFD2 -5%, $purple600 50%", fontFamily:'Poppins-Regular', fontSize:'$2xl'}} weight="bold">Status</Text></Table.Column>
          <Table.Column align={"start"}><Text css={{ textGradient: "45deg, #FFFFD2 -5%, $purple600 50%", fontFamily:'Poppins-Regular', fontSize:'$2xl'}} weight="bold">Update</Text></Table.Column>
        </Table.Header>
        <Table.Body css={{ p: 0, tt: "capitalize" }}>
          {loans.filter(loan=> condition === "all" || loan.loanStatus === condition).filter(loan => loan.clientID.name.includes(search)).map((loan, i) =>
            <Table.Row css={{ textAlign: 'start'}} key={i}>
              <Table.Cell><Col>{loan.clientID.name}</Col></Table.Cell>
              <Table.Cell><Col>{loan.bookID.name}</Col></Table.Cell>
              <Table.Cell><Col>{loan.startDate}</Col></Table.Cell>
              <Table.Cell><Col>{loan.endDate}</Col></Table.Cell>
              <Table.Cell><Col><Button size={'xs'} shadow color={`${loan.loanStatus === true ?  "success" : "error" }`} css={{pointerEvents: 'none', align:'center'}}>{loan.loanStatus ? "Returned" : "On loan"}</Button></Col></Table.Cell>
              <Table.Cell>
                <Row >
                  <Col>
                    <Tooltip content="Edit loan" >
                    <p style={{cursor:'pointer', position:'absolute',right:'65%'}} onClick={() => dispatch(updateLoanAsync({loan:{id:loan.id,bookID:bookID||loan.bookID.id,clientID:clientID||loan.clientID.id,startDate:startDate||loan.startDate,endDate:dateLoans(book_type !==0 ?book_type:loan.bookID.type,startDate||loan.startDate),loanStatus:loan.loanStatus},access}))}><FcSynchronize/></p></Tooltip>
                  </Col>
                  <Col>
                    <Tooltip content={loan.loanStatus === true ? "open loan" : "close loan"}>
                      <p style={{cursor:'pointer'}} onClick={() => dispatch(deleteLoanAsync({loan:{id:loan.id,bookID:loan.bookID.id,clientID:loan.clientID.id,startDate:loan.startDate,endDate:loan.endDate,loanStatus:!loan.loanStatus},access}))}>{loan.loanStatus === true ?<FcOk/>:<FcCancel/>}</p>
                    </Tooltip>
                  </Col>
                </Row> </Table.Cell>
            </Table.Row>)}
        </Table.Body>
      </Table>
    </>
    
  )
}

export default Loans