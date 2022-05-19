import React,{useState,useEffect} from 'react';
import {FaBars} from 'react-icons/fa'
import { Nav, NavbarContainer,NavLogo, MobileIcon, NavMenu, NavItem, NavLinks, NavBtn, NavBtnLink } from './NavElements';
import { animateScroll as scroll } from 'react-scroll';


const toggleHome=()=>{
    scroll.scrollToTop();
};

const NavGen=({toggle})=>{
    const [scrollNav,setScrollNav]=useState(false);

    const changeNav=()=>{
        if(window.scrollY>=80){
            setScrollNav(true);
        }else{
            setScrollNav(false);
        }
    };

    useEffect(()=>{
        window.addEventListener('scroll',changeNav);
    },[]);


    return (
        <>
        <Nav scrollNav={scrollNav}>
            <NavbarContainer>
                <NavLogo to='/' onClick={toggleHome}>
                    Neros
                </NavLogo>
                <MobileIcon>
                    <FaBars />
                </MobileIcon>
                <NavMenu>
                    <NavItem>
                        <NavLinks 
                        to= 'about'
                        smooth={true}
                        duration={500}
                        spy={true}
                        exact='true'
                        offset={-80}
                        >About</NavLinks>
                    </NavItem>
                    <NavItem>
                        <NavLinks 
                        to= '/Payment'
                        smooth={true}
                        duration={500}
                        spy={true}
                        exact='true'
                        offset={-80}
                        >Purchase</NavLinks>
                    </NavItem>
                    <NavItem>
                        <NavLinks 
                        to= '/Redeem'
                        smooth={true}
                        duration={500}
                        spy={true}
                        exact='true'
                        offset={-80}
                        >Redeem</NavLinks>
                    </NavItem>
                    <NavItem>
                        <NavLinks 
                        to= '/Transfer'
                        smooth={true}
                        duration={500}
                        spy={true}
                        exact='true'
                        offset={-80}
                        >Transfer</NavLinks>
                    </NavItem>
                    <NavItem>
                        <NavLinks 
                        to= '/Nft'
                        smooth={true}
                        duration={500}
                        spy={true}
                        exact='true'
                        offset={-80}
                        >NFTs / Stocks</NavLinks>
                    </NavItem>
                    <NavItem>
                        <NavLinks 
                        to= '/transactions'
                        smooth={true}
                        duration={500}
                        spy={true}
                        exact='true'
                        offset={-80}
                        >History</NavLinks>
                    </NavItem>
                    <NavItem>
                        <NavLinks 
                        to= '/market'
                        smooth={true}
                        duration={500}
                        spy={true}
                        exact='true'
                        offset={-80}
                        >NFT store</NavLinks>
                    </NavItem>
                    <NavBtn>
                        <NavBtnLink 
                        to="/Account"
                        smooth={true}
                        duration={500}
                        spy={true}
                        exact='true'
                        offset={-80}
                        > Account</NavBtnLink>
                    </NavBtn>
                </NavMenu>
            </NavbarContainer>
        </Nav>
        </>
    );
};

export default NavGen;