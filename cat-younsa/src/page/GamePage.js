import './css/gamePage.css';
import setEvent from '../js/Util.js'
import React, { useEffect } from "react";

const status = {
    hp: 3
    , speed : 2
    , atk : 3
    , fishDelay : 5
    , range : 400
    , kind : "코숏"
}

function Hp(props) {

    let className = "hp"
    if(props.setHp){
        className += "half"
    }

    return(
        <span className={className}>
        </span>
    );
}

function HpBar(props) {

    const arrLoop = () => {
        const newArr = [];
        for (let i = 0; i < status.hp; i++) {
          newArr.push(<Hp/>);
        }
        return newArr;
    };

    return(
        <div id='hp-bar'>
            {arrLoop()}
        </div>
    );
}

function Cat() {
    return(
        <div id='cat' style={{top:"270px", left:"470px"}}>
        </div>
    );
}

function StatusMenu() {

    const box = (s) => {
        const newArr = [];
        let count = 0;
        for (let i = 0; i < s; i++) {
            newArr.push(<div className='status-box'></div>);
            count++;
        }
        while (count < 5) {
            newArr.push(<div className='status-box blanck'></div>);
            count++;
        }
        return newArr;
    };

    return(
        <div id="status-menu">
            <section id='status-header'>
                <div>고양이용사</div>
                <div>품종 : {status.kind}</div>
            </section>
            <section id='status-box'>
                <div>
                    <div>공격력</div>
                    <div>
                        {box(status.atk)}
                    </div>
                </div>
                <div>
                    <div>연사력</div>
                    <div>
                        {box(status.fishDelay)}
                    </div>
                </div>
                <div>
                    <div>이동속도</div>
                    <div>
                        {box(status.speed)}
                    </div>
                </div>
                <div>
                    <div>사거리</div>
                    <div>
                        {box(status.range/100)}
                    </div>
                </div>
            </section>
            <section id='item-list-box'>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </section>
        </div>
    );
}

function GamePage() {

    useEffect(()=>{
        setEvent(status);
    });

    return (
        <div id="GamePage">
            <HpBar/>
            <div id="mini-map"></div>
            <StatusMenu/>
            <Cat />
        </div>
    );
}

export default GamePage;