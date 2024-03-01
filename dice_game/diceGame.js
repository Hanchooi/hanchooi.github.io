let balance = 100;
let currentBetAmount = 5; // Default bet amount
var betBigButton = document.getElementById('bet-big-button');
var betSmallButton = document.getElementById('bet-small-button');
var restartButton = document.getElementById('restart-button');

function disableBetButtons(){
    betBigButton.disabled = true;
    betSmallButton.disabled = true;
}

function enableBetButtons(){
    betBigButton.disabled = false;
    betSmallButton.disabled = false;
}

function disallowPlay() {
    disableBetButtons();
    betBigButton.classList.add('hidden-button');
    betSmallButton.classList.add('hidden-button');
    restartButton.classList.remove('hidden-button');
}

function allowPlay() {
    betBigButton.classList.remove('hidden-button');
    betSmallButton.classList.remove('hidden-button');
    restartButton.classList.add('hidden-button');
    enableBetButtons();
}

function insufficientBalance() {
    disableBetButtons();
    document.getElementById('result').innerText = "Not enough money !";
}

function setBetAmount(amount) {
    currentBetAmount = amount;
    document.getElementById('current-bet-amount').innerText = amount;

    if (balance < amount){
        insufficientBalance();
    } else {
        enableBetButtons();
    };
}

function playDiceRollSound() {
    const audio = document.getElementById('dice-roll-audio');
    audio.play();
}

function initialRoll() {
    const diceResults = [];
    for (let i = 0; i < 3; i++) {
        diceResults.push(Math.floor(Math.random() * 6) + 1);
    }

    displayDiceImages(diceResults.map(result => `assets/dice${result}.png`));
}


function placeBet(betType) {
    const betAmount = currentBetAmount;
    
    if (betAmount > balance) {
        insufficientBalance();
        return;
    }

    playDiceRollSound();

    balance -= betAmount;
    document.getElementById('balance').innerText = balance;

    const diceResults = [];
    for (let i = 0; i < 3; i++) {
        diceResults.push(Math.floor(Math.random() * 6) + 1);
    }

    displayDiceImages(diceResults.map(result => `assets/dice${result}.png`));

    // Update the roll history
    updateHistory(diceResults);

    const sum = diceResults.reduce((acc, val) => acc + val, 0);
    let resultMessage = `You rolled ${diceResults.join(', ')}. Total: ${sum}. `;
    
    if ((betType === 'big' && sum > 10) || (betType === 'small' && sum <= 10)) {
        balance += betAmount * 2;
        resultMessage += `You won $${betAmount * 2}!`;
    } else {
        resultMessage += `You lost $${betAmount}.`;
    }

    if (balance === 0) {
        resultMessage += `\n You are bankrupt!`;
        disallowPlay()
    }

    document.getElementById('balance').innerText = balance;
    document.getElementById('result').innerText = resultMessage;
}

function displayDiceImages(diceImages) {
    const diceImagesContainer = document.getElementById('dice-images');
    diceImagesContainer.innerHTML = '';

    diceImages.forEach((diceImage, index) => {
        const imgElement = document.createElement('img');
        imgElement.src = diceImage;
        imgElement.alt = 'dice';
        imgElement.classList.add('dice-image');
        
        // Add space between dice images except for the last one
        if (index < diceImages.length - 1) {
            imgElement.style.marginRight = '10px';
        }

        diceImagesContainer.appendChild(imgElement);
    });
}

function updateHistory(diceResults) {
    const historyDiceImagesContainer = document.getElementById('history-dice-images');
    
    diceResults.forEach(result => {
        const imgElement = document.createElement('img');
        imgElement.src = `assets/dice${result}.png`;
        imgElement.alt = 'dice';
        imgElement.classList.add('dice-image-history');
        historyDiceImagesContainer.appendChild(imgElement);
    });
}

function resetHistory() {
    document.getElementById('history-dice-images').innerHTML = '';
    allowPlay()
}

function resetGame() {
    balance = 100;
    currentBetAmount = 5;
    document.getElementById('balance').innerText = balance;
    document.getElementById('current-bet-amount').innerText = currentBetAmount;
    document.getElementById('result').innerText = '';
    document.getElementById('dice-images').innerHTML = '';

    resetHistory();

    // Simulate an initial roll after resetting the game
    playDiceRollSound();
    initialRoll();
}

// Simulate an initial roll when the page loads
playDiceRollSound();
window.onload = initialRoll;
