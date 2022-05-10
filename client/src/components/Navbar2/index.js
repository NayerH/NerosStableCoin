import React,{useState,useEffect} from 'react';
import {FaBars} from 'react-icons/fa'
import { Nav, NavbarContainer,NavLogo, MobileIcon, NavMenu, NavItem, NavLinks, NavBtn, NavBtnLink } from './NavbarElements';
import { animateScroll as scroll } from 'react-scroll';


const toggleHome=()=>{
    scroll.scrollToTop();
};

const Navbar2=({toggle})=>{
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
                        to= 'Purchase'
                        smooth={true}
                        duration={500}
                        spy={true}
                        exact='true'
                        offset={-80}
                        >Purchase</NavLinks>
                    </NavItem>
                    <NavItem>
                        <NavLinks 
                        to= 'Redeem'
                        smooth={true}
                        duration={500}
                        spy={true}
                        exact='true'
                        offset={-80}
                        >Redeem</NavLinks>
                    </NavItem>
                    <NavItem>
                        <NavLinks 
                        to= 'Transfer'
                        smooth={true}
                        duration={500}
                        spy={true}
                        exact='true'
                        offset={-80}
                        >Transfer</NavLinks>
                    </NavItem>
                    <NavItem>
                        <NavLinks 
                        to= 'nft'
                        smooth={true}
                        duration={500}
                        spy={true}
                        exact='true'
                        offset={-80}
                        >NFTs</NavLinks>
                    </NavItem>
                    <NavItem>
                        <NavLinks 
                        to= 'stock'
                        smooth={true}
                        duration={500}
                        spy={true}
                        exact='true'
                        offset={-80}
                        >Stocks</NavLinks>
                    </NavItem>
                    <NavBtn>
                        <NavBtnLink 
                        to="/signin"
                        smooth={true}
                        duration={500}
                        spy={true}
                        exact='true'
                        offset={-80}
                        >Sign In</NavBtnLink>
                    </NavBtn>
                </NavMenu>
            </NavbarContainer>
        </Nav>
        </>
    );
};

export default Navbar2;