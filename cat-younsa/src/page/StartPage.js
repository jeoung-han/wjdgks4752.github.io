import './css/startPage.css';
import React, { useState } from "react";

function BtnSection(props) {
    return (
        <div id='btn-box'>
            <button onClick={props.onClick}>게임시작</button>
            <button>기록확인</button>
        </div>
    );
}

function LoginSection(props) {
    return (
        <div>
            <label htmlFor=""><p>ID</p><input type="text" /></label>
            <label htmlFor=""><p>PASSWORD</p><input type="password" /></label>
            <button onClick={props.onClick}>시작하기</button>
        </div>
    );
}

function StartPage(props) {
    const [login, setLogin] = useState("FALSE");
    let content = login === "TRUE" ? <BtnSection onClick={props.setGamePage}/> : <LoginSection onClick={()=>{setLogin("TRUE")}}/>
    return (
        <div id="StartPage" className="page-container">
            <section id='title'>

            </section>
            <section id='switcing-section'>
                {content}
            </section>
        </div>
    );
}

export default StartPage;