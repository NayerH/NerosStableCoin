import React, {Component} from 'react';
import {MenuItems} from "./MenuItems";
import './Navbar.css';
import {Button2} from '../Button2'
class Navbar extends Component{
    state={clicked:false}
    handleClick=()=>{
        this.setState({clicked:!this.state.clicked})
    }
    render(){
        return(
            <nav className='NavbarItems'>
                <h1 className='navbar-logo'>NEROS<i className='fa-solid fa-coins'></i></h1>
                <div className='menu-icon' onClick={this.handleClick}>
                <i className={this.state.clicked?'fas fa-times':"fa-solid fa-bars"}></i>
                </div>
                <ul className={this.state.clicked?'nav-menu active':'nav-menu'}>
                    {MenuItems.map((item,index)=>{
                        return(
                            <li key={index}>
                                <a className={item.cName} href={item.url}>
                                {item.title}
                                </a>
                            </li>
                        )
                    })}
                </ul>
                <Button2>Sign up</Button2>
            </nav>
        )
    }
}

export default Navbar