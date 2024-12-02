import { useState } from 'react'
import '../App.css'
import { useEffect } from 'react';
import { useRef } from 'react';

const GuessTheNumber = () => {
    const [inputVal, setInputVal] = useState();
    const [count, setCount] = useState(1);
    const [realNum, setRealNum] = useState();
    const [guessList, setGuessList] = useState("");
    const resultRef = useRef()
    const guessRef = useRef()
    const submitRef = useRef();
    const startBtnRef = useRef()


    useEffect(() => {
        let num = Math.floor(Math.random() * 100);
        startBtnRef.current.disabled = true;
        setRealNum(num);
    }, [])

    const handleInputChange = (e) => {
        let val = e.target.value;
        setInputVal(val);
    }

    const handleSubmit = () => {
        let txt = "";
        setCount((prevCount) => ++prevCount);
        if (inputVal === realNum) {
            resultRef.current.textContent = "You got it! Congrats"
            if (count === 1) {
                txt = `Your guess is: ${inputVal}`;
            } else {
                txt = guessList + `, ${inputVal}`;
            }
            guessRef.current.textContent += txt;
            checkCount()
        } else if (inputVal < realNum) {
            resultRef.current.textContent = "Too Low!";
            if (count === 1) {
                txt = guessList + `Your guess is: ${inputVal}`;
            } else {
                txt = guessList + `, ${inputVal}`;
            }
            guessRef.current.textContent += txt;
            checkCount()
        } else if (inputVal > realNum) {
            resultRef.current.textContent = "Too High!";
            if (count === 1) {
                txt = guessList + `Your guess is: ${inputVal}`;
            } else {
                txt = guessList + `, ${inputVal}`;
            }
            guessRef.current.textContent += txt;
            checkCount()
        }
    }

    const restartGame = () => {
        submitRef.current.disabled = false;
        startBtnRef.current.disabled = true;
        resultRef.current.textContent = "";
    }

    const checkCount = () => {
        if (count === 10) {
            let num = Math.floor(Math.random() * 100);
            setRealNum(num);
            submitRef.current.disabled = true;
            startBtnRef.current.disabled = false;
            resultRef.current.textContent = `You Lost!, The correct number is ${realNum}`;
            guessRef.current.textContent = "";
            setCount(1);
        }
    }


    return (
        <div className="container">
            <p>Enter a guess between 0 to 100</p>
            <input type="number" id="num-input" min={0} max={100}
                placeholder="Enter a number" value={inputVal} onChange={handleInputChange} />
            <div className="button-container">
                <button ref={submitRef} onClick={() => handleSubmit()}>Submit</button>
                <button ref={startBtnRef} id="start-btn" onClick={() => restartGame()}>Start Game</button>
            </div>
            <p ref={resultRef} id="result-text"></p>
            <p ref={guessRef} id="guess-text"></p>
        </div>
    )
}

export default GuessTheNumber
