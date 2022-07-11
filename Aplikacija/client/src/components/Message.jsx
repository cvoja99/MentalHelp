import React from "react";
import styled from 'styled-components';
const StyledDiv=styled.div`
    background-color:rgba(187, 6, 99, 0.8);
    color:rgba(252, 252, 252, 0.8);
    margin:10px;
    border-radius:20px;
    padding:5px;
`
const StyledDiv2=styled.div`
    background-color:rgba(129, 157, 244, 0.8);
    color:rgba(252, 252, 252, 0.8);
    display:flex;
    justify-content:flex-end;
    margin:10px;
    border-radius:20px;
    padding:5px;

`
export const MessageLeft = (props) => {
    const message = props.message ? props.message : "no message";
    const timestamp = props.timestamp ? props.timestamp : "";
    return (
      <>
        <StyledDiv>
          <div>
            <div>
              <div>
                <p >{message}</p>
              </div>
              <div >{timestamp}</div>
            </div>
          </div>
        </StyledDiv>
      </>
    );
  };
  export const MessageRight = (props) => {
    const message = props.message ? props.message : "no message";
    const timestamp = props.timestamp ? props.timestamp : "";
    return (
      <StyledDiv2>
        <div>
          <p>{message}</p>
          <div>{timestamp}</div>
        </div>
      </StyledDiv2>
    );

  };
  