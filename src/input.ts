import { clearHistory } from "./history.js";

export function reply(clicked_id: string, unit: string): string {
    const input = <HTMLInputElement> document.querySelector('input');
    const elm = <HTMLElement> document.getElementById(clicked_id);
    const value = <string> elm.getAttribute("value");
    let input_value = <string> input.value;
    const result = <HTMLElement> document.getElementById('result');

    const op1: ReadonlyArray<string> = ['+', '-', 'x', '*', '/', '%', '^(', '^2', '!', '^3',')'];
    const op2: ReadonlyArray<string> = ['x', '*', '/', '%', '^(', '^2', '!', '^3'];
    const op3: ReadonlyArray<string> = ['sin(', 'cos(', 'tan(', '√(', '(', 'log(', 'ln(', '(-', 'asin(', 'acos(', 'atan(', 'sinh(', 'cosh(', 'tanh(', 'asinh(', 'acosh(', 'atanh(', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    if (value === 'nd') {
        toggle_text();
    } else if (value === 'cl') {
        input_value = '';
        result.innerHTML = "";
        input.value = input_value;
    } else if (value === 'bs' ) {
        const functions: ReadonlyArray<string> = ['asin(', 'acos(', 'atan(', 'sin(', 'cos(', 'tan(', 'asinh(', 'acosh(', 'atanh(', 'sinh(', 'cosh(', 'tanh(', 'log(', 'ln(', 'abs(', '^2', '√(', '^(', '(-', '^3'];
        for (const func of functions) {
            if (input_value.endsWith(func)) {
                input_value = input_value.slice(0, -func.length);
                input.value = input_value;
                return '';
            }
        }
        // If no function match is found, remove the last character
        input_value = input_value.slice(0, -1);
    } else if (clicked_id === 'clear-history') {
        clearHistory();
    } else if (value === 'deg' || value === 'rad') {
        toggle_unit();
        unit = value;
    } else if (input_value === '' && op1.includes(value)) {  
        alert("Invalid format used");
    } else if (input_value.charAt(input_value.length - 1) === '(' && op2.includes(value)) {
        alert("Invalid format used");
    } else if (input_value === '' && value === '.') {
        input_value += '0';
        input_value += value;
    } else if (input_value.charAt(input_value.length - 1) === ')' && op3.includes(value)) {
        input_value += 'x';
        input_value += value;
    } else {
        input_value ? input_value += value : input_value = value;
    }

    input.value = input_value;
    return unit;
}

function toggle_unit() {
    const x = <HTMLElement> document.getElementById("percent");
    let value = <string>  x.getAttribute("value");
    if (x.innerHTML === "deg") {
        x.innerHTML = "rad";
        value = "rad";

    } else if(x.innerHTML === "rad"){
        x.innerHTML = "deg";
        value = "deg";
    }
    x.setAttribute('value',value)
}
//togle fuction to toggle buttons when 2nd is clicked
function toggle_text() {
    const buttons = [
        { id: "pi", default: "π", default_value:"π", alt: "2<sup>x</sup>", value: "2^(" },
        { id: "e", default: "e", default_value:"e", alt: "x<sup>3</sup>", value: "^3" },
        { id: "percent", default: "%", default_value:"%", alt: "deg", value: "deg" },
        { id: "sin", default: "sin", default_value:"sin(", alt: "sin<sup>-1</sup>", value: "asin(" },
        { id: "cos", default: "cos", default_value:"cos(", alt: "cos<sup>-1</sup>", value: "acos(" },
        { id: "tan", default: "tan", default_value:"tan(", alt: "tan<sup>-1</sup>", value: "atan(" },
        { id: "square", default: "x<sup>2</sup>", default_value:"^2", alt: "sinh", value: "sinh(" },
        { id: "sqrt", default: "√x", default_value:"√(", alt: "cosh", value: "cosh(" },
        { id: "power", default: "x<sup>y</sup>", default_value:"^(", alt: "tanh", value: "tanh(" },
        { id: "abs", default: "|x|", default_value:"abs(", alt: "sinh<sup>-1</sup>", value: "asinh(" },
        { id: "log", default: "log", default_value:"log(", alt: "cosh<sup>-1</sup>", value: "acosh(" },
        { id: "ln", default: "ln", default_value:"ln(", alt: "tanh<sup>-1</sup>", value: "atanh(" }
    ];

    buttons.forEach(button => {
        let btn = <HTMLElement> document.getElementById(button.id);
        if (btn) {
            const currentValue = btn.innerHTML;
            const newValue = (currentValue === button.default) ? button.alt : button.default;
            btn.innerHTML = newValue;
            btn.setAttribute('value', (currentValue === button.default) ? button.value : button.default_value);
        }
    });
}