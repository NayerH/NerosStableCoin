import React from 'react';
import styled from 'styled-components'
import {Link} from "react-router-dom"

export const Button3=styled(Link)`
border-radius:50px;
background:${({primary})=>(primary?'#FFA500':'#fff')};
white-space:nowrap;
padding:${({big})=>(big?'14px 48px':'12px 30px')};
color:${({dark})=>(dark?'#010606':'#fff')};
font-size:${({fontBig})=>(fontBig?'20px':'16px')};
outline:none;
border:none;
cursor:pointer;
display:flex;
justify-content:center;
align-items:center;
transition:all 0.2s ease-in-out;
margin:10px;
&:hover{
    transition:all 0.2s ease-in-out;
    background: ${({primary})=>(primary?'#FFA500':'#fff')};

}`