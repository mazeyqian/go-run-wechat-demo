import {useState} from "react";
import logo from "./assets/images/logo-universal-w256.jpg";
import "./App.css";
import {LogInSuccess, SwitchAccountSuccess} from "../wailsjs/go/main/App";

function App() {
    const [resultText, setResultText] = useState("");
    // const [name, setName] = useState("除");
    const name = "除";
    // const updateName = (e: any) => setName(e.target.value);
    const updateResultText = (result: string) => setResultText(result);

    // function greet() {
    //     Greet(name).then(updateResultText);
    // }

    function logIn() {
        LogInSuccess(name).then(updateResultText);
    }

    function switchAccount() {
        SwitchAccountSuccess().then(updateResultText);
    }

    return (
        <div id="App">
            <img src={logo} id="logo" alt="logo"/>
            <div id="result" className="result name">{resultText || name}</div>
            <button className="btn log-in" onClick={logIn}>Log In</button>
            <button className="btn switch-account" onClick={switchAccount}>Switch Account</button>
        </div>
    )
}

export default App
