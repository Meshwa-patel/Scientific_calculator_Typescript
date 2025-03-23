import { Calculate, CalculateBinary, CalculateUnary } from "./calculate.js";
export function evaluatePostfix(postfix, unit) {
    var _a;
    const binary_operator = ['+', '-', '*', '/', '%', '^', '%'];
    const unary_operator = ['√', '!', 'sin', 'cos', 'tan', 'asin', 'acos', 'atan', 'abs', 'log', 'ln', 'sinh', 'cosh', 'tanh', 'asinh', 'acosh', 'atanh'];
    const postlen = postfix.length;
    if (postlen === 0) {
        const result = document.getElementById('result');
        if (typeof result.innerHTML === 'string' && result.innerHTML.length > 0) {
            return result.innerHTML;
        }
    }
    const stack = [];
    for (let i = 0; i < postlen; i++) {
        // Convert to number
        if (!isNaN(Number(postfix[i]))) {
            stack.push(parseFloat(postfix[i]));
        }
        // Handle pi and e
        else if (['e', 'π'].includes(postfix[i])) {
            const calc = new Calculate();
            if (postfix[i] === 'e') {
                stack.push(calc.e());
            }
            else {
                stack.push(calc.pi());
            }
        }
        // Handle binary operations
        else if (binary_operator.includes(postfix[i])) {
            if (stack.length < 2) {
                return "Error: Invalid Operation";
            }
            const n2 = stack.pop();
            const n1 = stack.pop();
            let ans1 = 0;
            if (n1 === undefined || n2 === undefined) {
                return "Error: Invalid operation";
            }
            const calc = new CalculateBinary(n1, n2);
            try {
                switch (postfix[i]) {
                    case '+':
                        ans1 = calc.addition();
                        break;
                    case '-':
                        ans1 = calc.substract();
                        break;
                    case '*':
                        ans1 = calc.multiply();
                        break;
                    case '/':
                        if (n2 === 0) {
                            throw new Error("Cannot divide by 0");
                        }
                        ans1 = calc.divide();
                        break;
                    case '%':
                        ans1 = calc.modulus();
                        break;
                    case '^':
                        ans1 = calc.power();
                        break;
                    case '%':
                        if (n2 === 0) {
                            throw new Error("Module by 0 is undefined");
                        }
                        ans1 = calc.modulus();
                        break;
                    default:
                        break;
                }
                stack.push(ans1);
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error(error.message);
                    return "Error: " + error.message;
                }
                else {
                    return "Error: Unknown error";
                }
            }
        }
        // Handle unary operators
        else if (unary_operator.includes(postfix[i])) {
            if (stack.length < 1) {
                return "Error: Invalid operation";
            }
            let n = stack.pop();
            let ans2 = 0;
            if (n === undefined) {
                return "Error: Invalid operation";
            }
            const calc = new CalculateUnary(n);
            if (unit === 'deg' && n !== undefined) {
                n = n * (Math.PI / 180);
            }
            const calc_trig = new CalculateUnary(n);
            try {
                switch (postfix[i]) {
                    case '√':
                        if (n === undefined || n < 0) {
                            throw new Error("√ of negative number is undefined");
                        }
                        ans2 = calc.squareroot();
                        break;
                    case '!':
                        if (n === undefined || !Number.isInteger(n) || n < 0) {
                            throw new Error("factorial of negative/decimal number is undefined");
                        }
                        ans2 = calc.factorial();
                        break;
                    case 'sin':
                        ans2 = calc_trig.sin();
                        break;
                    case 'cos':
                        ans2 = calc_trig.cos();
                        break;
                    case 'tan':
                        ans2 = calc_trig.tan();
                        break;
                    case 'asin':
                        if (n === undefined || n < -1 || n > 1) {
                            throw new Error("invalid input range for sin-1");
                        }
                        ans2 = calc_trig.asin();
                        break;
                    case 'acos':
                        if (n === undefined || n < -1 || n > 1) {
                            throw new Error("invalid input range for cos-1");
                        }
                        ans2 = calc_trig.acos();
                        break;
                    case 'atan':
                        ans2 = calc_trig.atan();
                        break;
                    case 'abs':
                        ans2 = calc.abs();
                        break;
                    case 'log':
                        if (n === undefined || n < 0) {
                            throw new Error("log of negative number is undefined");
                        }
                        ans2 = calc.log();
                        break;
                    case 'ln':
                        if (n === undefined || n < 0) {
                            throw new Error("log of negative number is undefined");
                        }
                        ans2 = calc.ln();
                        break;
                    case 'sinh':
                        ans2 = calc_trig.sinh();
                        break;
                    case 'cosh':
                        ans2 = calc_trig.cosh();
                        break;
                    case 'tanh':
                        ans2 = calc_trig.tanh();
                        break;
                    case 'asinh':
                        ans2 = calc_trig.asinh();
                        break;
                    case 'acosh':
                        if (n === undefined || n < 1) {
                            throw new Error("invalid input range for acosh-1");
                        }
                        ans2 = calc_trig.acosh();
                        break;
                    case 'atanh':
                        if (n === undefined || n < -1 || n > 1) {
                            throw new Error("invalid input range for atanh-1");
                        }
                        ans2 = calc_trig.atanh();
                        break;
                    default:
                        break;
                }
                stack.push(ans2);
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error(error.message);
                    return "Error: " + error.message;
                }
                else {
                    return "Error: Unknown error";
                }
            }
        }
        else {
            return "Error: Invalid input.";
        }
    }
    const Answer = (_a = stack.pop()) === null || _a === void 0 ? void 0 : _a.toString();
    if (!Answer) {
        return '';
    }
    return Answer;
}
