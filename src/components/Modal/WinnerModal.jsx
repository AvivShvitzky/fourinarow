import React from "react";
import styled from 'styled-components';

import { PLAYER_ONE_WINNING_MESSAGE, PLAYER_TWO_WINNING_MESSAGE, TIE_MESSAGE } from '../../consts/consts'

let text = ''
const changeText = winner => {
  if (winner === 0) text = TIE_MESSAGE
  if (winner === 1) text = PLAYER_ONE_WINNING_MESSAGE
  if (winner === 2) text = PLAYER_TWO_WINNING_MESSAGE
}

function Modal({ winner }) {
 
  changeText(winner)

  return (
    <Box winner={winner}>
      <TextBox>
        {text}
      <button onClick={() => document.location.reload(true)}>Play Again</button>
      </TextBox>
    </Box>
  )

}

export default Modal


const Box = styled.div`
  display: ${( { winner } ) => winner < 0 ? 'none' : 'block'}; 
  position: fixed;
  left: 0;
  top: 0;

  width: 100%; 
  height: 100%;

  padding-top: 100px;

  z-index: 1; 

  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
`

const TextBox = styled.div`
  margin: 0;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);

  text-align: center;
  line-height: 50px;

  width: 200px;
  height: 150px;
  
  background: pink;
`