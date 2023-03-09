import './css/startPage.css';
import React, { useState } from "react";

function BtnSection(props) {
    return (
        <div>
            <button onClick={props.onClick}>game start</button>
            <button>ranck</button>
        </div>
    );
}

function LoginSection(props) {
    return (
        <div>
            <label htmlFor=""><p>id</p><input type="text" /></label>
            <label htmlFor=""><p>password</p><input type="password" /></label>
            <button onClick={props.onClick}>login</button>
        </div>
    );
}

function StartPage(props) {
    const [login, setLogin] = useState("FALSE");
    let content = login === "TRUE" ? <BtnSection onClick={props.setGamePage}/> : <LoginSection onClick={()=>{setLogin("TRUE")}}/>
    return (
        <div id="StartPage" className="page-container">
            <section id='title'>
                <div>고양이</div>                
                <div>용사</div>
            </section>
            <section id='switcing-section'>
                {content}
            </section>
        </div>
    );
}

export default StartPage;