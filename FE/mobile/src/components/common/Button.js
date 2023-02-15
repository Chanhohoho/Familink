import React from "react";
import styled, { css } from "styled-components";
import palette from "../../lib/styles/palette";
import { Link } from "react-router-dom";


const StyledButton = styled.button`
padding: 0.75rem 2rem;
margin: 0.75rem;
line-height: 1;
border-radius: 1.875rem;
box-shadow: 0 0 1px rgb(0 0 0 / 0%);
border: 1px solid transparent;
color: #fff;
display: inline-block;
cursor: pointer;
border: none;
outline: none;
background-color: ${palette.orange[6]};
font-weight: var(--font-bold);
font-family: var(--body-font);
font-size: var(--normal-font-size);
&:hover {
  animation: button-push 0.3s linear 1;
  background: ${palette.orange[4]};
}
@keyframes button-push {
  50% {
    transform: scale(0.8);
  }

  100% {
    transform: scale(1);
  }
}
  // border: 1px solid;
  // border-radius: 25px;
  // font-size: 1rem;
  // font-weight: 700;
  // margin-top: 2.5rem;
  // padding-top: 0.5rem;
  // justify-content: center;
  // //   padding: 0.25rem 1rem;
  // color: white;
  // // box-shadow: 0 0 8px rgba(0, 0, 0, 0.05);
  // outline: none;
  // cursor: pointer;
  // background: ${palette.gray[8]};
  // &:hover {
  //   background: ${palette.gray[6]};
  // }
  ${(props) =>
    props.fullWidth 
    // &&
    // css`
    //   padding-top: 0, 75rem;
    //   padding-bottom: 0.75rem;
    //   width: 100%;
    //   font-size: 1.125rem;
    // `
  }
  ${(props) =>
    props.orange 
    // &&
    // css`
    //   background: ${palette.orange[7]};
    //   &:hover {
    //     background: ${palette.orange[4]};
    //     transition: 0.5s;
    //   }
    // `
  }
`;

const ButtonStyle = styled.button`
      ${StyledButton}
`

const StyledLink = styled(Link)`
      ${StyledButton}
`

const Button = (props) => {

  return props.to ? (

<StyledButton {...props} orange={props.orange ? 1 : 0}/>
  ) : (
    <StyledButton {...props} />
  )
}
export default Button;
