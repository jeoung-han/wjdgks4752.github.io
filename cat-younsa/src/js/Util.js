function getStyleSlicePx(element, style) {
    return parseFloat(getComputedStyle(element)[style].replace("px"));
}

function setStyleAddPx(element, style, num) {
    element.style[style] = num + "px";
}

let catStatus;

const directionOption = {

    leftInterval : null,
    rightInterval : null,
    upInterval : null,
    downInterval : null,

    leftkeyDownTime : 0,
    rightkeyDownTime : 0,
    upkeyDownTime : 0,
    downkeyDownTime : 0,

    leftIsPress : false,
    rightIsPress : false,
    upIsPress : false,
    downIsPress : false,

    leftIntervalClear : ()=>{clearInterval(this.leftInterval)},
    rightIntervalClear : ()=>{clearInterval(this.rightInterval)},
    upIntervalClear : ()=>{clearInterval(this.upInterval)},
    downIntervalClear : ()=>{clearInterval(this.downInterval)}
}

function catMove(key, sum) {
    const cat = document.querySelector("#cat");
    const speed = catStatus.speed;

    if(!directionOption[key + "IsPress"]) {clearInterval(directionOption[key+"Interval"]); return;}
    
    const leftOrTop = key === "left" ||  key === "right" ? "left" : "top";

    directionOption[key+"keyDownTime"] = 0;
    directionOption[key +"Interval"] = setInterval(() => {
        
        let movePx = sum === "+" ? getStyleSlicePx(cat, leftOrTop) + (4 * speed * 0.9) : getStyleSlicePx(cat, leftOrTop) - (4 * speed * 0.9);
        switch (key) {
            case "left":    movePx = movePx = movePx < 0 ? 0 : movePx;                  break;
            case "right":   movePx = movePx = movePx > 1000 - 60 ? 1000 - 60 : movePx;  break;
            case "up":      movePx = movePx = movePx < 0 ? 0 : movePx;                  break;
            case "down":    movePx = movePx = movePx > 600 - 60 ? 600 - 60 : movePx;    break;
            default: break;
        }

        setStyleAddPx(cat, leftOrTop, movePx);
        directionOption[key+"keyDownTime"] += 45;

    }, 45);
}

let canAttack = true;
let atkInterval;
function attack(key) {
    const cat = document.querySelector("#cat");
    if(!canAttack) return;
    canAttack = false;

    const div = document.createElement("div");
    div.classList.add("fish");
    
    div.style.position = "absolute";
    div.style.left = getStyleSlicePx(cat, "left") + 30 - 7.5 + "px";
    div.style.top = getStyleSlicePx(cat, "top") + 30 - 7.5 + "px";
    
    const GamePage = document.querySelector('#GamePage');
    GamePage.append(div);

    let count = 0;
    const shotSpeed = 10;
    const range = catStatus.range;

    const divWidth = getStyleSlicePx(div, "width");
    const divHeight = getStyleSlicePx(div, "height");
    
    let direction = "Non";
    if(key === "ArrowLeft" || key === "ArrowRight") {
        direction = directionOption.downIsPress ? "down" : directionOption.upIsPress ? "up" : "Non";
    };
    if(key === "ArrowDown" || key === "ArrowUp") {
        setStyleAddPx(div, "width", divHeight);
        setStyleAddPx(div, "height", divWidth);
        direction = directionOption.leftIsPress ? "left" : directionOption.rightIsPress ? "right" : "Non";
    };

    let subShotSpeed = 0;
    if(direction !== "Non"){
        const keyDonwTime = directionOption[direction+"keyDownTime"];
        subShotSpeed = shotSpeed*keyDonwTime*0.001 > shotSpeed/2 ? shotSpeed/2 : shotSpeed*keyDonwTime*0.001;
    }

    let atk = setInterval(() => {

        if(!div) return;
        const divLeft = getStyleSlicePx(div, "left");
        const divTop = getStyleSlicePx(div, "top");

        switch (key) {
            case "ArrowRight":  div.style.left = divLeft + shotSpeed + "px"; div.direction = "right"; break;
            case "ArrowLeft":   div.style.left = divLeft - shotSpeed + "px"; div.direction = "left"; break;
            case "ArrowUp":     div.style.top = divTop - shotSpeed + "px"; div.direction = "up"; break;
            case "ArrowDown":   div.style.top = divTop + shotSpeed + "px"; div.direction = "down"; break;
            default: break;
        }
        switch (direction) {
            case "right": div.style.left = divLeft + subShotSpeed + "px"; break;
            case "left": div.style.left = divLeft - subShotSpeed + "px"; break;
            case "up": div.style.top = divTop - subShotSpeed + "px"; break;
            case "down": div.style.top = divTop + subShotSpeed + "px"; break;
            default: break;
        }

        count += shotSpeed;

        if(count > range) {
            clearInterval(atk);
            div.remove();
        }

        checkAttack(div, catStatus.atk, atk);
    }, 45);

    
    const fishDelay = catStatus.fishDelay;
    setTimeout(() => {
        canAttack = true;
    }, 1000 / fishDelay);

}

function checkCrash(a, b) {
    
    const mobLeft = getStyleSlicePx(a, "left");
    const mobTop = getStyleSlicePx(a, "top");
    const mobWidth = getStyleSlicePx(a, "width");
    const mobHeight = getStyleSlicePx(a, "height");

    const fishLeft = getStyleSlicePx(b, "left");
    const fishTop = getStyleSlicePx(b, "top");
    const fishWidth = getStyleSlicePx(b, "width");
    const fishHeight = getStyleSlicePx(b, "height");

    if((((fishLeft > mobLeft)&&(fishLeft < mobWidth + mobLeft)) || ((fishLeft + fishWidth > mobLeft)&&(fishLeft + fishWidth < mobWidth + mobLeft)))
    && (((fishTop > mobTop)&&(fishTop < mobTop + mobHeight)) || ((fishTop + fishHeight > mobTop)&&(fishTop + fishHeight < mobTop + mobHeight)))){
        return true;
    }else{
        return false;
    }
}

function checkAttack(fish, atk) {

    const objects = document.querySelectorAll(".mob");
    for (let index = 0; index < objects.length; index++) {
        const mob = objects[index];

        if(checkCrash(mob,fish)){

            mob.attributes.hp.value = mob.attributes.hp.value - atk;

            switch (fish.direction) {
                case "left":    setStyleAddPx(mob, "left", getStyleSlicePx(mob, "left") - 15); break;
                case "right":   setStyleAddPx(mob, "left", getStyleSlicePx(mob, "left") + 15); break;
                case "up":      setStyleAddPx(mob, "top", getStyleSlicePx(mob, "top") - 15); break;
                case "down":    setStyleAddPx(mob, "top", getStyleSlicePx(mob, "top") + 15); break;
                default : break;
            }
            
            fish.remove();
            break;
        }
            
    }
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
            let tempKey = key.toLowerCase();
            if(tempKey === "a" || tempKey === "s" || tempKey === "d" || tempKey === "w"){
                switch (tempKey) {
                    case "a": tempKey = "left"; break;
                    case "d": tempKey = "right"; break;
                    case "w": tempKey = "up"; break;
                    case "s": tempKey = "down"; break;
                    default: break;
                }

                if(directionOption[tempKey+"IsPress"]) return;

                directionOption[tempKey+"IsPress"] = true;
                if(tempKey === "left" || tempKey === "up"){
                    catMove(tempKey, "-");
                }else{
                    catMove(tempKey, "+");
                }
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
        
        if(cat){
            let tempKey = key.toLowerCase();
            if(tempKey === "a" || tempKey === "s" || tempKey === "d" || tempKey === "w"){
                switch (tempKey) {
                    case "a": tempKey = "left"; break;
                    case "d": tempKey = "right"; break;
                    case "w": tempKey = "up"; break;
                    case "s": tempKey = "down"; break;
                    default: break;
                }
                directionOption[tempKey+"IsPress"] = false;
                clearInterval(directionOption[tempKey + "Interval"]);
            }
        }

        if(key==="ArrowRight" || key==="ArrowLeft" || key==="ArrowUp" || key==="ArrowDown"){
            clearInterval(atkInterval);
        }
    
    });    
}

export class MobEvent {
    
    constructor(id) {
    this.id = id;
    this.interval = null;
    }

    move = ()=>{
    
        this.interval = setInterval(() => {
            const speed = 2;
            this.mob = document.getElementById(this.id);
            let cat = document.querySelector('#cat');

            if(!cat) return;

            if(checkCrash(cat, this.mob)){
                if(cat.classList.contains("hit")) return;
                const hps = document.querySelectorAll(".hp");
                if(hps.length === 1){
                    alert("gameover");
                    clearInterval(this.interval);
                }

                cat.classList.toggle("hit");
                setTimeout(() => {
                    cat.classList.toggle("hit");
                }, 2000);
                hps[0].remove();
            }

            const cLeft = parseFloat(cat.style.left.replace("px", ""));
            const cTop = parseFloat(cat.style.top.replace("px", ""));
            const mLeft = parseFloat(this.mob.style.left.replace("px", ""));
            const mTop = parseFloat(this.mob.style.top.replace("px", ""));

            if(mLeft > cLeft + 2 * speed) this.mob.style.left = (mLeft - 2 * speed) + "px";
            if(mLeft < cLeft - 2 * speed) this.mob.style.left = (mLeft + 2 * speed) + "px";
            if(mTop > cTop + 2 * speed) this.mob.style.top = (mTop - 2 * speed) + "px";
            if(mTop < cTop - 2 * speed) this.mob.style.top = (mTop + 2 * speed) + "px";

            if(this.mob.attributes.hp.value < 0) {
                this.mob.remove();
                clearInterval(this.interval);
            }

        }, 45);
    }

    stop = ()=>{
        clearInterval(this.interval);
    }
}

export default setEvent;