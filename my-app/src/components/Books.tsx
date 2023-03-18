import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { selectAccess } from '../slices/loginSlice';
import { getBooksAsync, addBookAsync, deleteBookAsync, updateBookAsync, selectBook, selectRefresh } from '../slices/BooksSlice';
import { Dropdown, Button, Input, Text, Row, Col, Card, Tooltip, Table } from "@nextui-org/react";
import { FcSynchronize,FcOk,FcCancel } from "react-icons/fc";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Books = () => {

  const dispatch = useAppDispatch();
  const books = useAppSelector(selectBook);
  const refresh = useAppSelector(selectRefresh);
  const access = useAppSelector(selectAccess);

  const [bookName, setbookName] = useState("")
  const [author, setauthor] = useState("")
  const [publishedYear, setpublishedYear] = useState("")
  const [bookType, setbookType] = useState(0)
  const [bookStatus, setbookStatus] = useState<boolean>()
  const [search, setsearch] = useState("")
  const [condition, setcondition] = useState<any>()

  function addBook(){
    dispatch(addBookAsync({ book:{bookName,author,publishedYear,bookType,bookStatus:true},access}))
    toast("Book was added", {position: "top-right",autoClose: 5000,
      hideProgressBar: false,closeOnClick: true,pauseOnHover: true,draggable: true,progress: undefined,type:'success',theme:"colored",});
  };

  useEffect(()=>{
    dispatch(getBooksAsync(access))
    setcondition(condition)
  },[refresh])

  return (
    <>
      {/* ADD BOOK */}
      <Col css={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <Text h1 size={60} css={{textGradient: "45deg, $blue600 -20%, $pink600 50%",}} weight="bold" style={{ fontFamily: 'fantasy' }}>Books</Text><br/>
        <Input clearable bordered width='75%' labelPlaceholder="Book Name" color="primary" onChange={(e) => setbookName(e.target.value)} />
        <br /><br />
        <Input clearable bordered width='75%' labelPlaceholder="Author" onChange={(e) => setauthor(e.target.value)} />
        <br /><br />
        <Input clearable bordered width='75%' labelPlaceholder="Published Year" onChange={(e) => setpublishedYear(e.target.value)}/>
        <br />
        <Dropdown>
          <Dropdown.Button bordered flat style={{ paddingInline: '5%' }}>{bookType === 0 ? "Book Type.." : ""}{bookType === 1 ? "Teenages Book" : ""}{bookType === 2 ? "Adults Book" : ""}{bookType === 3 ? "Comics" : ""}</Dropdown.Button>
          <Dropdown.Menu css={{ fontFamily: 'fantasy' }} onAction={(key) => setbookType(+key)} aria-label="Single selection actions" color="secondary" disallowEmptySelection selectionMode="single">
            <Dropdown.Item key="1">Teenages Book</Dropdown.Item>
            <Dropdown.Item key="2">Adults Book</Dropdown.Item>
            <Dropdown.Item key="3">Comics</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <br />
        <Button size="lg" color="gradient" auto onClick={() => {addBook()}}>Add a new book</Button><br />
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="colored"/>
      <Card.Divider/><br />

      {/* SHOW BOOKS + DELETE + UPDATE*/}
      <Button.Group color="gradient" ghost>
        <Button onClick={() => setcondition("all")}>All Books</Button>
        <Button onClick={() => setcondition(true)}>Books in stock</Button>
        <Button onClick={() => setcondition(false)}>Books out of stock</Button>
      </Button.Group>

      {/* SEARCH BOOK */}
      <hr/><br/>
      <Input clearable bordered width='75%' labelPlaceholder="Search book by name" onChange={(e) => setsearch(e.target.value)}/><br/>
      </Col>

      {/* DISPLAY */}
      <hr/>
      <Table headerLined align='left' css={{ height: "auto", minWidth: "100%" }} selectionMode="none">
        <Table.Header>
          <Table.Column align={"start"}><Text css={{ textGradient: "45deg, #FFFFD2 -5%, $purple600 50%", fontFamily:'Poppins-Regular', fontSize:'$2xl'}} weight="bold">Book Name</Text></Table.Column>
          <Table.Column align={"start"}><Text css={{ textGradient: "45deg, #FFFFD2 -5%, $purple600 50%", fontFamily:'Poppins-Regular', fontSize:'$2xl'}} weight="bold">Author</Text></Table.Column>
          <Table.Column align={"start"}><Text css={{ textGradient: "45deg, #FFFFD2 -5%, $purple600 50%", fontFamily:'Poppins-Regular', fontSize:'$2xl'}} weight="bold">Published</Text></Table.Column>
          <Table.Column align={"start"}><Text css={{ textGradient: "45deg, #FFFFD2 -5%, $purple600 50%", fontFamily:'Poppins-Regular', fontSize:'$2xl'}} weight="bold">Book Type</Text></Table.Column>
          <Table.Column align={"start"}><Text css={{ textGradient: "45deg, #FFFFD2 -5%, $purple600 50%", fontFamily:'Poppins-Regular', fontSize:'$2xl'}} weight="bold">Status</Text></Table.Column>
          <Table.Column align={"start"}><Text css={{ textGradient: "45deg, #FFFFD2 -5%, $purple600 50%", fontFamily:'Poppins-Regular', fontSize:'$2xl'}} weight="bold">Update</Text></Table.Column>
        </Table.Header>
        <Table.Body css={{ p: 0, tt: "capitalize" }}>
          {books.filter(book=> condition === "all" ||book.bookStatus === condition).filter(book => book.bookName.includes(search)).map((book, i) =>
            <Table.Row css={{ textAlign: 'start'}} key={i}>
              <Table.Cell><Col>{book.bookName}</Col></Table.Cell>
              <Table.Cell><Col>{book.author}</Col></Table.Cell>
              <Table.Cell><Col>{book.publishedYear}</Col></Table.Cell>
              <Table.Cell><Col>{book.bookType == 1 ? "Teenage Book" : book.bookType == 2 ? "Adult book" : "Comics"}</Col></Table.Cell>
              <Table.Cell> <Col><Button size={'xs'} shadow color={`${book.bookStatus === true ? "success" : "error"}`} css={{pointerEvents: 'none', align:'center'}}>{book.bookStatus ? "in stock" : "out of stock"}</Button></Col></Table.Cell>
              <Table.Cell>
                <Row >
                  <Col>
                    <Tooltip content="Edit book" >
                    <p style={{cursor:'pointer', position:'absolute',right:'65%'}} onClick={() => dispatch(updateBookAsync({ book: { id: book.id, bookName: bookName || book.bookName, author: author || book.author, publishedYear: publishedYear || book.publishedYear, bookType: bookType || book.bookType, bookStatus: book.bookStatus }, access }))}><FcSynchronize/></p></Tooltip>
                  </Col>
                  <Col>
                    <Tooltip content={book.bookStatus === true ? "Take out of stock" : "Return to stock"}>
                      <p style={{cursor:'pointer'}} onClick={() => dispatch(deleteBookAsync({ book: { id: book.id, bookName: book.bookName, author: book.author, publishedYear: book.publishedYear, bookType: book.bookType, bookStatus: !book.bookStatus }, access }))}>{book.bookStatus === true ?<FcOk/>:<FcCancel/>}</p>
                    </Tooltip>
                  </Col>
                </Row> </Table.Cell>
            </Table.Row>)}
        </Table.Body>
      </Table>
    </>

  )
}

export default Books