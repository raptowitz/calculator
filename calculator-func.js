let display = document.querySelector(".display");

let calculator = {
    addition: function add(a,b){
        return (a*1) + (b*1);
    },
    subtraction: function subtract(a,b){
        return a-b;
    },
    multiplication: function multiply(a,b){
        return a*b;
    },
    division: function divide(a,b){
         if (Number(b) === 0){
             return display.textContent = "NOPE";
        } else {
             return a/b;
        }
    },
};

function operate(operator, a, b){
    return operator(a,b);
}

let currentNum = "";
let firstNum = "";
let secondNum = "";
let operator = "";
let result = "";

function storeNumber(){
    if (operator === ""){
        firstNum = currentNum;
    }
    else{
        secondNum = currentNum;
    }
}

let numbers = document.querySelectorAll(".number");
numbers.forEach(button => button.addEventListener("click", (e)=>{
        //remove leading zeros
        if(currentNum.indexOf("0") === 0){
            currentNum = currentNum.slice(1);
        } 
        if(currentNum.length<8){
            currentNum += e.target.value;
        }
        display.textContent = currentNum;
        storeNumber();
}));

let operators = document.querySelectorAll(".operator");
operators.forEach(button => button.addEventListener("click", (e)=>{
    //if user presses another operator before =
    if(firstNum !== "" & secondNum !== ""){
        result = operate(operator, firstNum, secondNum);
        limitResult();
        display.textContent = result;
        firstNum = result;
        secondNum = "";
    }
    //if user wants to operate on consecutive results
    else if(result !== "0" && result !== "NOPE" && firstNum === ""){
        firstNum = result;
        secondNum = "";
    }
    operator = calculator[e.target.value];
    currentNum = "";
}));

let calculate = document.querySelector(".operate");
calculate.addEventListener("click", operateNow);
function operateNow(){
    //if user presses = before entering operator
    if (operator === ""){
        clearNow();
    }
    //if user presses = before entering second number
    if(secondNum === ""){
        secondNum = firstNum;
    }
    result = operate(operator, firstNum, secondNum);
    limitResult();
    display.textContent = result;
    currentNum = "";
    firstNum = "";
    secondNum = "";
    operator = "";
};

function limitResult(){
    if(result.toString().length>8){
        result = result.toPrecision(6);
    }
}

let back = document.querySelector(".back");
back.addEventListener("click", backspace);
function backspace(){
    if(currentNum === ""){
        display.textContent = 0;
    }
    else{
        currentNum = currentNum.slice(0, currentNum.length-1);
        display.textContent = currentNum;
        storeNumber();
    }
};

let negate = document.getElementById("negate");
negate.addEventListener("click", negateNow);
function negateNow(){
    if(currentNum === ""){
        result = result * -1;
        result = result.toString();
        display.textContent = result;
    }
    else{
        currentNum = currentNum * -1;
        currentNum = currentNum.toString();
        display.textContent = currentNum;
        storeNumber();
    }
};

window.addEventListener("click", () =>{
    if(currentNum.indexOf(".") === -1){
        document.getElementById("decimal").disabled = false;
    }
    else{
        document.getElementById("decimal").disabled = true;
    }
});

let clear = document.querySelector(".clear");
clear.addEventListener("click", clearNow);
function clearNow(){
    currentNum = "";
    firstNum = "";
    secondNum = "";
    operator = "";
    result = "";
    display.textContent = 0;
};


//keyboard support below
window.addEventListener("keypress", (e) => {
    if(e.charCode<58 && e.charCode>47){
        //remove leading zeros
        if(currentNum.indexOf("0") === 0){
            currentNum = currentNum.slice(1);
        }
        if(currentNum.length<8){
            currentNum += String.fromCharCode(e.charCode);
        }
        display.textContent = currentNum;
        storeNumber();
    }
    //add decimal if there isn't one already
    else if(e.charCode === 46 && currentNum.indexOf(".") === -1){
            currentNum += String.fromCharCode(e.charCode);
            display.textContent = currentNum;
            storeNumber();
        }
    else if(e.charCode===47 || e.charCode===42 || e.charCode===45 || e.charCode===43){
        //if user presses another operator before =
        if(firstNum !== "" & secondNum !== ""){
            result = operate(operator, firstNum, secondNum);
            limitResult();
            display.textContent = result;
            firstNum = result;
            secondNum = "";
        }
        //if user wants to operate on consecutive results
        else if(result !== "0" && result !== "NOPE" && firstNum === ""){
            firstNum = result;
            secondNum = "";
        }
        let keyCalculator = {
            43: "addition",
            45: "subtraction",
            42: "multiplication",
            47: "division",
        };
        operator = calculator[keyCalculator[e.charCode]];
        currentNum = "";
    }
});

window.addEventListener("keydown", (e) => {
     //operates for equals sign or enter key
    if(e.charCode === 61 || e.keyCode === 13){
        operateNow();
    }
    else if(e.keyCode === 46){
        backspace();
    }
    else if(e.keyCode === 8){
        clearNow();
    }
});

window.addEventListener("keypress", () =>{
    if(currentNum.indexOf(".") === -1){
        document.getElementById("decimal").disabled = false;
    }
    else{
        document.getElementById("decimal").disabled = true;
    }
});