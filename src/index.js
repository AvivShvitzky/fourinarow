import React from "react";
import ReactDOM from "react-dom";

import BoardElm from './components/Board/Board'

import Board from './class/Board/Board'

let board = new Board()

function App() {
  return (
    <div className="App">
      <BoardElm board={board}/>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
