import styled from 'styled-components'

export const StyledFooter = styled.footer`
  background-color: #000;
  color: #fff;
  padding: 10px;
  margin:0px;
  margin-bottom: 0px;

  ul {
    list-style-type: none;
  }

  ul li {
    margin-bottom: 20px;
  }

  p {
    text-align: right;
  }

  @media (max-width:100%) {
    text-align: center;
    ul {
      padding: 0;
    }
    p {
      text-align: center;
    }
  }
`