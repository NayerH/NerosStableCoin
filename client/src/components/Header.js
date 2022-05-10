import React, {Component} from 'react';
import { StyledHeader } from './styles/Header.styled';
import { Flex } from './styles/Flex.styled';
import { Container } from './styles/Container.styled';
import {Button} from './styles/Button.styled'
import {Link} from "react-router-dom";

export default function Header(){
    return(
        <StyledHeader>
            <Container>
            <h1>Welcome to Neros Stablecoin</h1>
            <Flex>
                <div>
                    <p>Ready to be a millionaire? exchange now from fiat to stablecoins or vise versa. 100% redeemable and no losses at all</p>
                    <Link to="/Payment"><Button bg='#ff0099' color='#fff'>
                        Purchase
                    </Button></Link>
                    <Link to="/Redeem"><Button bg='#fdf542' color='#fff'>
                        Redeem
                    </Button></Link>
                    
                </div>
            </Flex>
            </Container>
            </StyledHeader>
    )
}