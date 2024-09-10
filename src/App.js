import { useState, useEffect, useRef } from "react";
import './App.css';
function App() {
  const [value, setValue] = useState([]);
  const [className, setClassName] = useState(Array(12).fill("square"));
  const [prev, setPrev] = useState();
  const clicked = useRef(0);
  const [winStatus, setWinStatus] = useState('notWin');

  function handleLose(index) {
    const nextClassName = className.map((item, i) => {
      if (i === index) {
        return (item = "square");
      } else if (i === prev) {
        return (item = "square");
      } else {
        return item;
      }
    }); 
    setPrev();
    setTimeout(() => {
      setClassName(nextClassName);
      clicked.current = 0;
    }, 1200);
  }

  function handleWin(index) {
    const nextClassName = className.map((item, i) => {
      if (i === index) {
        return (item = "square clicked win");
      } else if (i === prev) {
        return (item = "square clicked win");
      } else {
        return item;
      }
    }); 
    setPrev();
    setTimeout(() => {
      setClassName(nextClassName);
      clicked.current = 0;
    }, 1200);
  }

  useEffect(() => {
    let results = className.filter((item) => item === "square clicked win");
    if (results.length === 12) {
      setWinStatus();
    } else {
      return;
    }
  }, [className]);

  function handleClick(index) {
    if (
      className[index].includes("clicked") || clicked.current !== 0
    ) {
      return;
    }
    const nextClassName = className.map((item, i) => {
      if (i === index) {
        return (item = "square clicked");
      } else {
        return item;
      }
    });
    setClassName(nextClassName);
    if (prev !== undefined) {
      if (value[prev] === value[index]) {
        clicked.current = 2;
        handleWin(index);
      } else {
        clicked.current = 2;
        handleLose(index);
      }
    } else {
      setPrev(index);
    }
  }

  useEffect(() => {
    function shuffle(array) {
      let currentIndex = array.length;
    
      // While there remain elements to shuffle...
      while (currentIndex != 0) {
    
        // Pick a remaining element...
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
    
        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex], array[currentIndex]];
      }
    }
  
    // Used like so
    let arr = ["😀",
      "😂",
      "😀",
      "😂",
      "😈",
      "😎",
      "😈",
      "😎",
      "🧐",
      "😭",
      "🧐",
      "😭",];
    shuffle(arr);
    setValue(arr);
  },[])

  return (
    <>  
    <h1 className="title">Memory Game</h1>
    <h1 className={winStatus}>You Won!!!</h1>
    <div className="board">
      {value.map((value, index) => (
        <Square
        className={className[index]}
        key={index}
        index={index}
        value={value}
        handleClick={() => handleClick(index)}
        />
      ))}
    </div>
    <h5>Click any two cards and enjoy the game</h5>
    </>
  );
}

function Square({ value, className, handleClick }) {
  return (
    <p className={className} onClick={handleClick}>
      {value}
    </p>
  );
}

export default App;