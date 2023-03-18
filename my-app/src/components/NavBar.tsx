import React from 'react';
import { Navbar, Button, Text, Container } from "@nextui-org/react";
import { Link } from 'react-router-dom';
import { logout } from '../slices/loginSlice';
import { PoweroffOutlined } from '@ant-design/icons';
import { useAppDispatch } from '../app/hooks';

const NavBar = () => {
  const dispatch = useAppDispatch();

  return (
    <Navbar variant="sticky" style={{fontFamily:"fantasy", position:'fixed'}}>
      <Navbar.Toggle showIn="xs" />
        <Navbar.Brand css={{"@xs": {w: "12%",},}}>
          <Text size={'$4xl'} b color="gradient" hideIn="xs"> Shaked Library </Text>
        </Navbar.Brand>
        <Navbar.Content enableCursorHighlight activeColor="secondary" variant={'underline-rounded'}>
          <Navbar.Link><br/><Link to="/home"><Text css={{ textGradient: "45deg, $blue600 -20%, $pink600 50%", fontFamily:'fantasy', fontSize:'25px'}} weight="bold">Home</Text></Link></Navbar.Link>
          <Navbar.Link><br/><Link to="/books"><Text css={{ textGradient: "45deg, $blue600 -20%, $pink600 50%", fontFamily:'fantasy', fontSize:'25px'}} weight="bold">Books</Text></Link></Navbar.Link>
          <Navbar.Link><br/><Link to="/clients"><Text css={{ textGradient: "45deg, $blue600 -20%, $pink600 50%", fontFamily:'fantasy', fontSize:'25px'}} weight="bold">Clients</Text></Link></Navbar.Link>
          <Navbar.Link><br/><Link to="/loans"><Text css={{ textGradient: "45deg, $blue600 -20%, $pink600 50%", fontFamily:'fantasy', fontSize:'25px'}} weight="bold">Loans</Text></Link></Navbar.Link>
        </Navbar.Content>
        <Navbar.Content css={{"@xs":{w: "12%", jc: "flex-end",},}}>
          <Navbar.Item>
            <Button auto flat icon={<PoweroffOutlined/>} onClick={() => dispatch(logout())}></Button>
          </Navbar.Item>
        </Navbar.Content>
    </Navbar>
  )
}

export default NavBar