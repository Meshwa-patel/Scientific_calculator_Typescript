// Function to save history in local storage
function history(equation: string, Answer: string): void {
    const historyArray: { equation: string, Answer: string }[] = JSON.parse(localStorage.getItem('history') || '[]');
    const data = {
        equation,
        Answer
    };
    historyArray.push(data);
    localStorage.setItem('history', JSON.stringify(historyArray));
}


// Function to display history
function displayHistory() {
    const historyContent = <HTMLElement> document.getElementById('history-content');
    historyContent.innerHTML = ''; // Clear previous history content
    const historyArray: { equation: string, Answer: string }[] = JSON.parse(localStorage.getItem('history') || '[]');
    const historyLength = historyArray.length
    for (let i = 0; i < historyLength; i++) {
        const historyEntry = document.createElement('div');
        historyEntry.innerHTML = `<p>${historyArray[i].equation} = </p><h4>${historyArray[i].Answer}</h4>`;
        historyContent.appendChild(historyEntry);
    }
    historyContent.scrollTop = historyContent.scrollHeight;
}

// Function to clear history
function clearHistory() {
    const historyArray: { equation: string, Answer: string }[] = JSON.parse(localStorage.getItem('history') || '[]');
    const historyLength = historyArray.length;
    if ( historyLength === 0) {
        alert("No history to clear.");
        return;
    }
    localStorage.removeItem('history');
    displayHistory(); // Re-display the empty history
}

export { history, displayHistory, clearHistory };