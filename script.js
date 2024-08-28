const words = [
    "apple", "banana", "cherry", "date", "elderberry",
    "fig", "grape", "honeydew", "kiwi", "lemon",
    "mango", "nectarine", "orange", "papaya", "quince",
    "raspberry", "strawberry", "tangerine", "ugli", "valencia",
    "watermelon", "xigua", "yellowfruit", "zucchini", "plum"
];

const board = document.getElementById('board');
const clueInput = document.getElementById('clue-input');
const clueNumber = document.getElementById('clue-number');
const giveClueButton = document.getElementById('give-clue');
const setSpymasterButton = document.getElementById('set-spymaster');
const setTeamMemberButton = document.getElementById('set-team-member');
const spymasterView = document.getElementById('spymaster-view');
const teamMemberView = document.getElementById('team-member-view');
const teamMessage = document.getElementById('team-message');
const roleSelection = document.getElementById('role-selection');

let teamTurn = 'red'; // 'red' or 'blue'
let wordsAssigned = [];
let isSpymaster = false;
let currentClue = "";
let currentClueNumber = 0;

// Shuffle and assign words
function setupBoard() {
    let shuffledWords = words.sort(() => 0.5 - Math.random()).slice(0, 25);
    wordsAssigned = shuffledWords.map((word, index) => ({
        word: word,
        team: Math.random() < 0.5 ? 'red' : 'blue' // Randomly assign words to teams
    }));
    wordsAssigned[Math.floor(Math.random() * 25)].team = 'assassin'; // Assign one assassin word
    renderBoard();
}

function renderBoard() {
    board.innerHTML = '';
    wordsAssigned.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.index = index;
        card.innerText = item.word;
        card.addEventListener('click', () => handleCardClick(index));
        board.appendChild(card);
    });
}

function handleCardClick(index) {
    const card = board.querySelector(`[data-index='${index}']`);
    if (card.classList.contains('clicked') || isSpymaster) return;

    const word = wordsAssigned[index];
    card.classList.add('clicked');

    if (word.team === 'assassin') {
        teamMessage.innerText = "Game Over! Assassin picked.";
        card.classList.add('assassin');
        return;
    } else if (word.team === teamTurn) {
        card.classList.add(teamTurn);
        teamMessage.innerText = `${teamTurn} team guessed correctly!`;
    } else {
        card.classList.add('clicked');
        teamMessage.innerText = `${teamTurn} team guessed incorrectly.`;
    }

    // Switch team turn
    teamTurn = teamTurn === 'red' ? 'blue' : 'red';
}

function handleClue() {
    currentClue = clueInput.value;
    currentClueNumber = parseInt(clueNumber.value);
    if (currentClue && !isNaN(currentClueNumber)) {
        teamMessage.innerText = `${teamTurn} team, use the clue: ${currentClue} (${currentClueNumber})`;
    } else {
        teamMessage.innerText = "Invalid clue or number.";
    }
}

setSpymasterButton.addEventListener('click', () => {
    roleSelection.classList.add('hidden');
    spymasterView.classList.remove('hidden');
    isSpymaster = true;
    setupBoard();
});

setTeamMemberButton.addEventListener('click', () => {
    roleSelection.classList.add('hidden');
    teamMemberView.classList.remove('hidden');
    isSpymaster = false;
    setupBoard();
});

giveClueButton.addEventListener('click', handleClue);
