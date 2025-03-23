
export function convert_to_infix(equation:string):string[] {
    const infix_arr:string[] = [];
    let temp_num:string = '';
    const functions: ReadonlyArray<string> = [
        'sin', 'cos', 'tan', 'abs', 'log', 'ln',
        'asin', 'acos', 'atan', 'sinh', 'cosh', 'tanh',
        'asinh', 'acosh', 'atanh'
    ];
    const eqnleng:number = equation.length
    for (let i:number = 0; i < eqnleng; i++) {
        const char:string = equation[i];

        if (!/\d|\./.test(char)) {
            const operators:ReadonlyArray<string> = ['+', '*', '/', '(', '^'];
            // If we encounter a digit, handle multi-digit numbers
            if (temp_num !== '') {
                infix_arr.push(temp_num);
                temp_num = '';
            }

            // Handle negative sign at the beginning or after operators
            if (char === '-' && i === 0) {
                infix_arr.push('0'); 
                infix_arr.push(char);
            }
            else if(char === '-' &&  operators.includes(equation[i - 1]))
            {
                temp_num += char;
            }
            else if(char === 'x'){
                infix_arr.push('*')
            }
            // Handle functions (trigonometric, logarithmic, etc.)
            else {
                let flag = 0;
                for (const func of functions) {
                    if (equation.substring(i, i + func.length) === func && equation[i + func.length] === '(') {
                        infix_arr.push(func);
                        i += func.length - 1; // Skip over the function name
                        flag = 1;
                        break;
                    }
                }
                // For any other operator or symbol, just push it
                if(!flag){
                    infix_arr.push(char);
                }
            }
        } 
        else {
            // Handle multi-digit numbers
            temp_num += char;
        }
    }

    // If a number is left in temp_num at the end, push it to infix_arr
    if (temp_num !== '') {
        infix_arr.push(temp_num);
    }

    return infix_arr;
}
