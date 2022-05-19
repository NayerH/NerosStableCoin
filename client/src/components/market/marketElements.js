import styled from "styled-components";
import {Link} from 'react-router-dom'

export const Container=styled.div`
min-height:692px;
position:fixed;
bottom:0;
left:0;
right:0;
top:100;
z-index:0;
overflow: hidden;
background: linear-gradient(
    108deg,
    rgba(1,147,86,1)0%,
    rgba(10,201,122,1)100%
);
`;

export const FormWrap=styled.div`
height:100%;
display:flex;
flex-direction:column;
justify-content:center;

@media screen and (max-width:400px){
    height:80%
}
`;

export const Icon=styled(Link)`
margin-left:32px;
margin-top:42px;
text-decoration:none;
color:#fff;
font-weight:700;
font-size:32px;

@media screen and (max-width:480px){
    margin-left:16px;
    margin-top:8px;
}
`
export const Form2=styled.form`
background:#01bf71;
max-width:400px;
height:50px;
width:100%;
z-index:1;
display:flex;
margin:0 auto;
padding:80px 32px;
border-radius:4px;
box-shadow:0 1px 3px rgba(0,0,0,0.9);

@media screen and (max-width:480px){
    padding:32px 32px;
}
`

export const FormContent=styled.div`
height:100%;
display:flex;
flex-direction:column;
justify-content:center;
font-size:18px;
font-weight:400;
@media screen and (max-width:480px){
    padding:10px;
}

`;

export const FormH1=styled.h1`
margin-bottom:40px;
text-align:center;
color:#fff;
font-size:40px;
font-weight:400;
text-align:center;
`;

export const Text=styled.span`
text-align:center;
margin-top:24px;
color:#fff;
font-size:14px;
`;

export const FormLabel=styled.label`
margin-bottom:8px;
font-size:14px;
color:#000;
`

export const FormInput=styled.input`
padding:16px 16px
margin-bottom:32px;
border:100px;
border-radius:5px;
color:#000;
font-size:14px;
`

export const FormButton=styled.button`
background:#000;
padding:16px 0;
border:none;
margin:10px;
border-radius:4px;
color:#fff;
font-size:20px;
cursor:pointer;`


export const SerivicesH1=styled.h1`
font-size:2.5rem;
color:#fff;
margin-bottom:30px;
@media screen and (max-width:480px){
    font-size:2rem;
}`

export const SerivicesH11=styled.h1`
font-size:2.5rem;
color:#fff;
margin-bottom:64px;
@media screen and (max-width:480px){
    font-size:2rem;
}`

export const SerivicesH2=styled.h2`
font-size:1.4rem;
margin-bottom:50px;`


export const SerivicesP=styled.p`
font-size:1rem;
text-align:center;`

export const SerivicesContainer=styled.div`
height:800px;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
background:#010606;
@media screen and (max-width:768px){
    height:1100px;
}
@media screen and (max-width:480px){
    height:1300px;
}`

export const SerivicesWrapper=styled.div`
max-width:1000px;
margin:0 auto;
display:grid;
grid-template-columns:1fr;
align-items:center;
grid-gap:16px;
padding:0 50px;
@media screen and (max-width:1000px){
    grid-template-columns:1fr;
}
@media screen and (max-width:480px){
    height:1300px;
}`

export const SerivicesWrapperOwner=styled.div`
max-width:1000px;
margin:0 auto;
display:grid;
grid-template-columns:1fr 1fr;
align-items:center;
grid-gap:16px;
padding:0 50px;
@media screen and (max-width:1000px){
    grid-template-columns:1fr 1fr;
}
@media screen and (max-width:480px){
    height:1300px;
}`

export const SerivicesCard=styled.div`
display:flex;
flex-direction:column;
justify-content:flext-start;
align-items:center;
background:#fff;
border-radius:10px;
max-height:540px;
padding:30px;
box-shadow:0 1px 3px rgba(0,0,0,0.2);
transition:all 0.2s ease-in-out;

&:hover{
    transform:scale(1.02);
    transition:all 0.2s ease-in-out;
    cursor:pointer:
}
`

export const ServicesIcon=styled.img`
height:260px;
width:260px;
margin_bottom:10px;`

export const ServicesIcon2=styled.img`
height:60px;
width:260px;
margin_bottom:10px;`