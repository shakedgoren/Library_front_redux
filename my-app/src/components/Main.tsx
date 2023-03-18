import React, { useEffect, useState } from 'react';
import '../App.css';
import NavBar from './NavBar';
import { Link, Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectActive } from '../slices/loginSlice';
import Home from './Home';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Col, Container, Loading, Row, Text } from "@nextui-org/react";

const Main = () => {

    const active = useAppSelector(selectActive);
    const [load, setload] = useState(false)

    const pageUp=()=>{
        setTimeout(() => {
            setload(true)
        }, 2000)
    }

    useEffect(() => {
        if (active){
            pageUp()}
        else{setload(false)}
        console.log(load)
    }, [active])
    
    return (
        <div>
            {active ?  
            <Container css={{textAlign:'center', height:'100vh'}}>
                <Col css={{width:'50%', verticalAlign:'middle', position:'absolute', right:'15%', top:'25%' ,display:`${load ? 'none' : ''}`}}>
                    <Row><Text size={60} css={{textGradient: "45deg, $blue600 -20%, $pink600 50%", fontFamily:'Poppins-Regular'}} weight="bold">Loading The Web</Text></Row>
                    <Row style={{paddingLeft:'25%'}}><Loading loadingCss={{ $$loadingSize: "100px", $$loadingBorder: "10px" }}/></Row>
                </Col>
                <Row style={{display:`${!load ? 'none' : ''}`}}>
                <NavBar/>
                </Row><br/><br/><br/><br/>
                <Row style={{display:`${!load ? 'none' : ''}`}}>
                    <Col style={{ height: '100%', width: '25%', paddingRight:'3%' }}>
                        <Card style={{ height: 'active'}}>
                            <Card.Body style={{ padding: '20%' }}>
                                <Button color="gradient" auto ghost>
                                    <Link to={'/books'} style={{ textDecoration: "none" }}><Text css={{ textGradient: "45deg, $blue600 -20%, $pink600 50%", fontFamily:'fantasy'}} weight="bold">Books</Text></Link> <LaptopOutlined style={{ padding: '15%' }} />
                                </Button><br />
                                <Button color="gradient" auto ghost>
                                    <Link to={'/clients'} style={{ textDecoration: "none" }}><Text css={{ textGradient: "45deg, $blue600 -20%, $pink600 50%", fontFamily:'fantasy'}} weight="bold">Clients</Text></Link><UserOutlined style={{ padding: '15%' }} />
                                </Button><br />
                                <Button color="gradient" auto ghost>
                                    <Link to={'/loans'} style={{ textDecoration: "none" }}><Text css={{ textGradient: "45deg, $blue600 -20%, $pink600 50%", fontFamily:'fantasy'}} weight="bold">Loan</Text></Link><NotificationOutlined style={{ padding: '15%' }} />
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Card style={{ padding: '2% 5%', minHeight: 280, fontFamily: "fantasy" }}>
                    <Outlet/></Card>
                </Row>
            </Container>
                : <Home/>}
                </div>

    )
}

export default Main