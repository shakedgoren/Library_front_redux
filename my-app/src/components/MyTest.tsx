import { Card, Container, Input,Button, Text,Row } from '@nextui-org/react'
import React from 'react'
import myImage from '../LoginPage/images/myImage.jpg';

const MyTest = () => {
  return (
    <Container style={{backgroundImage:`url(${myImage})`,justifyContent:"center",display: "block",
    zIndex: "-1",
    width: "100%",
    height: "100%",
    backgroundColor: "255,255,255,0.9"}}>
     <Card  style={{margin:"30%",height:'80%', width:'35%' ,marginLeft:"30%",backgroundColor:"linear-gradient(112deg, #06B7DB -63.59%, #FF4ECD -20.3%, #0072F5 70.46%)"}}>
          <Card.Header>
          <Text>logun</Text>
          </Card.Header>
          <Card.Divider />
          <Card.Body css={{ py: "$10" }}>
          <Input bordered></Input>
        <br/>
        <Input bordered></Input>
        <br/>
          </Card.Body>
          <Card.Divider />
          <Card.Footer>
            <Row justify="flex-end">
              <Button size="sm">Agree</Button>
            </Row>
          </Card.Footer>
        </Card>
    </Container>
  )
}

export default MyTest