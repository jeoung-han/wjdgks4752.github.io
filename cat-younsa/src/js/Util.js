let leftMove;
let rightMove;
let topMove;
let downMove;
let atkInterval;

let isPressLeft = false;
let isPressRight = false;
let isPressUp = false;
let isPressDown = false;

let LkeyDownTime = 0;
let RkeyDownTime = 0;
let DkeyDownTime = 0;
let UkeyDownTime = 0;

let catStatus;

function setKeyPress(key, isPress) {
    const cat = document.querySelector("#cat");
    if(cat.style.left === "") cat.style.left = "0%";
    if(cat.style.top === "") cat.style.top = "0%";

    const speed = catStatus.speed;
    switch (key) {
        case "left":
            if(isPress){
                LkeyDownTime = 0;
                leftMove = setInterval(() => {
                    let left = parseFloat(cat.style.left.substring(0, cat.style.left.length - 1)) - (4 * speed * 0.9);
                    left = left < 0 ? 0 : left;
                    cat.style.left = left + "px";
                    LkeyDownTime += 45;
                }, 45);
            }else{
                clearInterval(leftMove);
            }
            break;

        case "right":
            if(isPress){
                RkeyDownTime = 0;
                rightMove = setInterval(() => {
                    let left = parseFloat(cat.style.left.substring(0, cat.style.left.length - 1)) + (4 * speed * 0.9);
                    left = left > 1000 - 60 ? 1000 - 60 : left;
                    cat.style.left = left + "px";
                    RkeyDownTime += 45;
                }, 45);
            }else{
                clearInterval(rightMove);
            }
            break;

        case "up":
            if(isPress){
                UkeyDownTime = 0;
                topMove = setInterval(() => {
                    let top = parseFloat(cat.style.top.substring(0, cat.style.top.length - 1)) - (4 * speed * 0.9);
                    top = top < 0 ? 0 : top;
                    cat.style.top = top + "px";
                    UkeyDownTime += 45;
                }, 45);
            }else{
                clearInterval(topMove);
            }
            break;

        case "down":
            if(isPress){
                DkeyDownTime = 0;
                downMove = setInterval(() => {
                    let top = parseFloat(cat.style.top.substring(0, cat.style.top.length - 1)) + (4 * speed * 0.9);
                    top = top > 600 - 60 ? 600 - 60 : top;
                    cat.style.top = top + "px";
                    DkeyDownTime += 45;
                }, 45);
            }else{
                clearInterval(downMove);
            }
            break;
    
        default: break;
    }
}

let canAttack = true;
function attack(key) {
    const cat = document.querySelector("#cat");
    if(!canAttack) return;
    canAttack = false;

    const div = document.createElement("div");
    div.classList.add("fish");
    
    div.style.position = "absolute";
    div.style.left = parseInt(cat.style.left.substring(0,cat.style.left.length-1)) + 30 + "px";
    div.style.top = parseInt(cat.style.top.substring(0,cat.style.top.length-1)) + 30 + "px";
    
    const GamePage = document.querySelector('#GamePage');
    GamePage.append(div);

    let count = 0;
    const shotSpeed = 10;
    const range = catStatus.range;
    let direction = "Non";
    if(key === "ArrowLeft" || key === "ArrowRight") {
        direction = isPressDown ? "D" : isPressUp ? "U" : "Non";
    };
    if(key === "ArrowDown" || key === "ArrowUp") {
        direction = isPressLeft ? "L" : isPressRight ? "R" : "Non";
    };
    let subShotSpeed = 0;
    switch (direction) {
        case "R": subShotSpeed = shotSpeed*RkeyDownTime*0.001 > shotSpeed/2 ? shotSpeed/2 : shotSpeed*RkeyDownTime*0.001; break;
        case "L": subShotSpeed = shotSpeed*LkeyDownTime*0.001 > shotSpeed/2 ? shotSpeed/2 : shotSpeed*LkeyDownTime*0.001;; break;
        case "U": subShotSpeed = shotSpeed*UkeyDownTime*0.001 > shotSpeed/2 ? shotSpeed/2 : shotSpeed*UkeyDownTime*0.001;; break;
        case "D": subShotSpeed = shotSpeed*DkeyDownTime*0.001 > shotSpeed/2 ? shotSpeed/2 : shotSpeed*DkeyDownTime*0.001;; break;
        default: break;
    }
    let atk = setInterval(() => {
        switch (key) {
            case "ArrowRight":
                div.style.left = parseInt(div.style.left.substring(0,div.style.left.length-1)) + shotSpeed + "px";
                break;
            case "ArrowLeft":
                div.style.left = parseInt(div.style.left.substring(0,div.style.left.length-1)) - shotSpeed + "px";
                break;
            case "ArrowUp":
                div.style.transform = "translate(-50%, -50%) rotate(-90deg)";
                div.style.top = parseInt(div.style.top.substring(0,div.style.top.length-1)) - shotSpeed + "px";
                break;
            case "ArrowDown":
                div.style.transform = "translate(-50%, -50%) rotate(90deg)";
                div.style.top = parseInt(div.style.top.substring(0,div.style.top.length-1)) + shotSpeed + "px";
                break;
            default: break;
        }
        switch (direction) {
            case "R":
                div.style.left = parseInt(div.style.left.substring(0,div.style.left.length-1)) + subShotSpeed + "px";
                break;
            case "L":
                div.style.left = parseInt(div.style.left.substring(0,div.style.left.length-1)) - subShotSpeed + "px";
                break;
            case "U":
                div.style.top = parseInt(div.style.top.substring(0,div.style.top.length-1)) - subShotSpeed + "px";
                break;
            case "D":
                div.style.top = parseInt(div.style.top.substring(0,div.style.top.length-1)) + subShotSpeed + "px";
                break;
            default: break;
        }
        count += shotSpeed;
        if(count > range) {
            clearInterval(atk);
            div.remove();
        }
    }, 45);

    
    const fishDelay = catStatus.fishDelay;
    setTimeout(() => {
        canAttack = true;
    }, 1000 / fishDelay);
}


function setEvent(cs) {
    const cat = document.querySelector("#cat");    
    const status = document.querySelector("#status-menu");
    const miniMap = document.querySelector("#mini-map");

    catStatus = cs;

    document.addEventListener('keydown', (event)=>{
        const key = event.key;
        // if(!(key==="Tab" || key.toLowerCase()==="m")) return;
        
        if (key==="Tab") {
            event.preventDefault();
            if(!status) return;
            status.classList.toggle("move");          
        }

        if(key.toLowerCase()==="m"){
            if(!miniMap) return;
            miniMap.classList.toggle("move");          
        }

        if(cat){

            if(key.toLowerCase() === "a"){
                if(isPressLeft) return;
                isPressLeft = true;
                setKeyPress("left", true);
            }
            if(key.toLowerCase() === "d"){
                if(isPressRight) return;
                isPressRight = true;
                setKeyPress("right", true);
            }
            if(key.toLowerCase() === "w"){
                if(isPressUp) return;
                isPressUp = true;
                setKeyPress("up", true);
            }
            if(key.toLowerCase() === "s"){
                if(isPressDown) return;
                isPressDown = true;
                setKeyPress("down", true);
            }
        }

        if(key==="ArrowRight" || key==="ArrowLeft" || key==="ArrowUp" || key==="ArrowDown"){
            attack(key);
            clearInterval(atkInterval);
            atkInterval = setInterval(() => {
                if(!canAttack) return;
                attack(key);
            }, 45);
        }
    
    });

    document.addEventListener('keyup', (event)=>{
        const key = event.key;
        // if(!(key==="Tab" || key.toLowerCase()==="m")) return;
        
        if(cat){
            
            if(key.toLowerCase() === "a"){
                isPressLeft = false;
                setKeyPress("left", false);
            }
            if(key.toLowerCase() === "d"){
                isPressRight = false;
                setKeyPress("right", false);
            }
            if(key.toLowerCase() === "w"){
                isPressUp = false;
                setKeyPress("up", false);
            }
            if(key.toLowerCase() === "s"){
                isPressDown = false;
                setKeyPress("down", false);
            }
        }

        if(key==="ArrowRight" || key==="ArrowLeft" || key==="ArrowUp" || key==="ArrowDown"){
            clearInterval(atkInterval);
        }
    
    });    
}

export default setEvent;