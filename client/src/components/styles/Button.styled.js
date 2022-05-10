import styled from "styled-components";

export const Button=styled.button`
border-radius:80px;
border:none;
padding:15px 60px;
margin:20px;
box-shadow:0 0 10px rgba(0,0,0,0.15);
cursor=pointer;
font-size:16 px;
font-weight:700;
background-color:${({bg})=>bg||'#fff'};
color:${({color})=>color||'#333'};

&:hover{
    opacity:0.9;
    transform:scale(0.98);
}
`