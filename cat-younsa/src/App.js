import './App.css';
import StartPage from './page/StartPage';
import GamePage from './page/GamePage';
import React, { useState } from "react";

function App() {

  const [page, setPage] = useState("startPage");

  let pageObject = null;
  switch (page) {
    case "gamePage":
      pageObject = <GamePage/>;
      break;

    default:
      pageObject = <StartPage setGamePage={()=>{setPage("gamePage")}}/>;
      break;
  }

  return (
    <div className="App">
      <div id="back-ground">
        <div id="game-container">
          {pageObject}
        </div>
      </div>
    </div>
  );
}

export default App;
