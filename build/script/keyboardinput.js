export function keyboardInput(key) {
    const input = document.querySelector('input');
    const validOperators = ['+', '-', 'x', '*', '/', '%', '^', '!'];
    if (key === 'Backspace') {
        input.value = input.value.slice(0, -1);
    }
    else if (key === 'Delete' || key === 'Escape') {
        input.value = '';
        const resultElement = document.getElementById('result');
        if (resultElement) {
            resultElement.innerHTML = "";
        }
    }
    else if (input.value === '' && validOperators.includes(key)) {
        alert("Invalid format used"); // Don't allow operators at the beginning
    }
    else if (input.value.charAt(input.value.length - 1) === '(' && validOperators.includes(key)) {
        alert("Invalid format used"); // Prevent operators after opening parenthesis
    }
    else if (input.value === '' && key === '.') {
        input.value += '0' + key; // Automatically add '0.' when the input is empty
    }
    else if (key === '*') {
        input.value += 'x'; // Replace '*' with 'x'
    }
    else if (!isNaN(Number(key))) {
        input.value += key; // Allow numbers to be added to the input
    }
    else if (validOperators.includes(key)) {
        input.value += key; // Allow operators to be added
    }
    else if (key === '(' || key === ')') {
        input.value += key;
    }
}
