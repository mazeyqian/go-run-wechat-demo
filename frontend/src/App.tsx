import {useState} from 'react';
import logo from './assets/images/logo-universal.jpg';
import './App.css';
import {Greet} from "../wailsjs/go/main/App";

function App() {
    const [resultText, setResultText] = useState("除");
    const [name, setName] = useState('');
    const updateName = (e: any) => setName(e.target.value);
    const updateResultText = (result: string) => setResultText(result);

    function greet() {
        Greet(name).then(updateResultText);
    }

    return (
        <div id="App">
            <img src={logo} id="logo" alt="logo"/>
            <div id="result" className="result">{resultText}</div>
            <button className="btn" onClick={greet}>Greet</button>
            <button className="btn" onClick={greet}>Greet</button>
        </div>
    )
}

export default App
