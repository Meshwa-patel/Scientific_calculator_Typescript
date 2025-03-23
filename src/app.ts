import { reply } from "./input.js";
import { keyboardInput } from "./keyboardinput.js";
import { convert_to_infix } from "./toinfix.js";
import { convert_to_postfix } from "./topostfix.js";
import { evaluatePostfix } from "./evaluatepostfix.js";
import { history , displayHistory  } from "./history.js";

const clockElem = <HTMLElement> document.getElementsByClassName("fa-clock")[0] ;
const calElem = <HTMLElement> document.getElementsByClassName("fa-calculator")[0];
const btnElem = <HTMLElement> document.getElementsByClassName('buttons')[0];
const histElem = <HTMLElement> document.getElementsByClassName('history-view')[0];
let unit:string;
// Event Listner for onlick input
const buttons : NodeListOf<HTMLButtonElement> = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('click', function() {
        const value:string | null = button.getAttribute("value");
        if (value === '=') {
            calculate_answer();
        } 
        else {
            unit = reply(button.id,unit);
        }
    });
});


// Event listner for key input
document.addEventListener('keydown' , (event) => {
    const key:string = event.key;

    if(key === 'Enter'){
        calculate_answer();
    }
    else{
        keyboardInput(key);
    }
})

// Event listner for dark mode
document.getElementsByClassName('fa-circle-half-stroke')[0].addEventListener('click', function(){
    let element = document.body;
    element.classList.toggle("dark-mode");
})


// Event listener for history icon
document.getElementsByClassName('fa-clock')[0].addEventListener('click', ()=>{
    clockElem.style.display="none";
    calElem.style.display="block";
    btnElem.style.display="none";
    histElem.style.display="flex";
    displayHistory();
});

// Event listener for calculator icon
document.getElementsByClassName('fa-calculator')[0].addEventListener('click', ()=>{
    clockElem.style.display="block";
    calElem.style.display="none";
    btnElem.style.display="grid";
    histElem.style.display="none";
});

function calculate_answer(){
    const input = <HTMLInputElement> document.querySelector('input');
    const equation = <string> input.value; 
    const resultElement = <HTMLElement> document.getElementById("result");
    let openCount:number = 0;
    let closeCount:number = 0;
    if(equation.length === 0){
        resultElement.innerHTML = "Error: Enter input";
        return;
    }
    for (const char of equation) {
        if (char === '(') {
            openCount++;
        } else if (char === ')') {
            closeCount++;
        }
    }
    if(openCount !== closeCount){
        resultElement.innerHTML = "Error: Missmatched brackets";
        return;
    }
    else{
        const infix_arr = convert_to_infix(equation);
        const postfix_arr = convert_to_postfix(infix_arr);
        const Answer = evaluatePostfix(postfix_arr,unit);
        resultElement.innerHTML = Answer;
        history(equation,Answer);
    }
}