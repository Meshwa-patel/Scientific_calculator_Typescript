export function convert_to_postfix(infix_arr:string[]):string[] {
    const precedence: Readonly<{ [key:string]: number }> = {
        '+' : 1, '-' : 1,
        '*' : 2, '/' : 2,
        '^' : 3, '%' : 3, '!' : 3, '√' : 3,        
        'π' : 4, 'e' : 4,
        'sin' : 5, 'cos' : 5, 'tan' : 5, 'abs' : 5, 'log' : 5, 'ln' : 5, 'asin' : 5, 'acos' : 5, 'atan' : 5, 
        'sinh' : 5, 'cosh' : 5, 'tanh' : 5, 'asinh' : 5, 'acosh' : 5, 'atanh' : 5
    };

    function topostfix(infix_arr: string[]): string[] {
        const stack: string[] = [];
        const postfix: string[] = [];
        let temp_num: string = '';  // Temporary storage for multi-digit numbers or decimals
        const validOperators:ReadonlyArray<string> = ['e','π','√','sin','cos','tan','asin','acos','atan','abs','log','ln','sinh','cosh','tanh','asinh','acosh','atanh']
        const infleng:number = infix_arr.length;
        for(let i = 0; i < infleng; i++){
            const char: string = infix_arr[i];
            if(char === '-' && infix_arr[i+1] === '+'){
                infix_arr.splice(i+1,1);
            }
            else if(char === '-' && infix_arr[i+1] === '-'){
                infix_arr.splice(i,2,"+");
            }
            else if((char === '+' && infix_arr[i+1] === '+') || (char === '/' && infix_arr[i+1] === '/') 
                        || (char === '*' && infix_arr[i+1] === '*')|| (char === '%' && infix_arr[i+1] === '%')){
                document.getElementById("result")!.innerHTML = `Error: Two ${char} cannot be together`;
                return [];
            }
            else if(char==='(' && infix_arr[i+1]===')'){
                document.getElementById("result")!.innerHTML = "Error: Empty Parentheses";
                return [];
            }
            else if(!isNaN(Number(char)) && infix_arr[i+1]==='('){
                infix_arr.splice(i+1,0,'*');
                i++;
            }
            else if(!isNaN(Number(char)) && validOperators.includes(infix_arr[i+1])){
                infix_arr.splice(i+1,0,'*');
                i++;
            }
            else if (char === '+' && i === 0) {
                infix_arr.unshift('0'); 
            }
            else if (char === '(' && (infix_arr[i+1]==='+' || infix_arr[i+1]==='-') ){
                infix_arr.splice(i+1,0,'0'); 
                i++;
            }
        }
        for (let i = 0; i < infleng; i++) {
            const char: string = infix_arr[i];

            // If the character is a number or a decimal point
            if (!isNaN(Number(char)) || char === '.') {
                temp_num += char;  // Build the number (including decimal point)
            } 
            else {
                // push number to postfix
                if (temp_num !== '') {
                    postfix.push(temp_num);
                    temp_num = '';  
                }

                // Handle parentheses
                if (char === '(') {
                    stack.push(char);
                } else if (char === ')') {
                    while (stack[stack.length - 1] !== '(') {
                        postfix.push(stack.pop()!);
                    }
                    stack.pop(); 
                } else {
                    // Handle operators and functions
                    while (stack.length && 
                        ((precedence[char] < precedence[stack[stack.length - 1]]) || 
                         (precedence[char] === precedence[stack[stack.length - 1]] && char !== '^'))) {
                        postfix.push(stack.pop()!);
                    }
                    stack.push(char);
                }
            }
        }

        // If there's a number left in temp_num, push it
        if (temp_num !== '') {
            postfix.push(temp_num);
        }

        // Push any remaining operators in the stack to postfix
        while (stack.length) {
            postfix.push(stack.pop()!);
        }

        return postfix;
    }

    return topostfix(infix_arr);
}
