import React, { Component, useEffect, useState } from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import {Image,Message,Step,Select,Checkbox,Radio, Container, Header, Button,Card,Icon,Grid,Form } from 'semantic-ui-react';
import { NextResponse } from 'next/server';
import {Link} from "react-router-dom";

function Account(){

    
    return(
    <div>
        <Container>
            <Grid>
        <Card centered> 
              
    <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} />
    
    <Card.Content>
      <Card.Header>Matthew</Card.Header>
      <Card.Meta>
        <span className='date'>Joined in 2015</span>
      </Card.Meta>
      <Card.Description>
        Matthew is a musician living in Nashville.
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <a>
        <Icon name='user' />
        22 transactions
      </a>
    </Card.Content>
  </Card>
  <Card
    centered
    link
    header='Fiat balance'
    meta='USD'
    description={[
      '100678',
      
    ].join('')}
  />
  <Card
    centered
    link
    header='Neros balance'
    meta='Neros'
    description={[
      '100',
      
    ].join('')}
  />
  </Grid>
  </Container>
    </div>

    )
}

export default Account