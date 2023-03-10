import './css/gamePage.css';
import setEvent from '../js/Util.js'
import { MobEvent } from '../js/Util.js'
import React, { useEffect } from "react";

const status = {
    hp: 3
    , speed : 2
    , atk : 3
    , fishDelay : 5
    , range : 400
    , kind : "코숏"
}

const mobs = [];

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

    const arrLoop = (c) => {
        const newArr = [];
        for (let i = 0; i < c; i++) {
          newArr.push(<Hp key={i}/>);
        }
        return newArr;
    };

    return(
        <div id='hp-bar'>
            {arrLoop(props.status.hp)}
        </div>
    );
}

function Cat() {
    return(
        <div id='cat' style={{top:"350px", left:"350px"}}>
        </div>
    );
}

function Mob() {
    const id = "m." + Math.random().toString(36).substring(2, 16);
    const div = <div id={id} hp={10} className='mob move' style={{top:"300px", left:"300px"}}/>;
    const mobEvent = new MobEvent(id);

    mobs.push(mobEvent);

    return div;
}


function StatusMenu(props) {

    const box = (s) => {
        const newArr = [];
        let count = 0;
        for (let i = 0; i < s; i++) {
            newArr.push(<div key={i} className='status-box'></div>);
            count++;
        }
        while (count < 5) {
            newArr.push(<div key={count} className='status-box blanck'></div>);
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
                        {box(props.status.atk)}
                    </div>
                </div>
                <div>
                    <div>연사력</div>
                    <div>
                        {box(props.status.fishDelay)}
                    </div>
                </div>
                <div>
                    <div>이동속도</div>
                    <div>
                        {box(props.status.speed)}
                    </div>
                </div>
                <div>
                    <div>사거리</div>
                    <div>
                        {box(props.status.range/100)}
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
        mobs.forEach(mob => {
            mob.move();
        });
    });

    return (
        <div id="GamePage">
            <HpBar status={status}/>
            <div id="mini-map"></div>
            <StatusMenu status={status}/>
            <Cat />
            <Mob />
        </div>
    );
}

export default GamePage;