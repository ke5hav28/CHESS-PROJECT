// Updated JavaScript Code with Guidelines Implementation

// Inserting Images with Modular Approach
function insertImages() {
    document.querySelectorAll('.box').forEach(box => {
        if (box.textContent.trim().length > 0) {
            const piece = box.textContent.trim();
            const imgClass = piece.includes('pawn') ? 'allpawn' : '';
            box.innerHTML = `${piece} <img class='allimg ${imgClass}' src="${piece}.png" alt="">`;
            box.style.cursor = 'pointer';
        }
    });
}

// Apply Colors to Chessboard Squares
function applySquareColors() {
    document.querySelectorAll('.box').forEach(square => {
        const id = square.id.slice(1);
        const [row, col] = [parseInt(id[0]), parseInt(id[1])];
        square.style.backgroundColor = (row + col) % 2 === 0 ? 'rgb(240, 201, 150)' : 'rgb(100, 75, 43)';
    });
}

// Validate Moves to Prevent Same-Team Capture
function validateMoves() {
    document.querySelectorAll('.box').forEach(square => {
        if (square.style.backgroundColor === 'pink') {
            document.querySelectorAll('.box').forEach(target => {
                if (target.style.backgroundColor === 'green' && target.textContent.trim()) {
                    const attackerColor = square.textContent.trim()[0];
                    const targetColor = target.textContent.trim()[0];

                    if (attackerColor === targetColor) {
                        applySquareColors();
                    }
                }
            });
        }
    });
}

// Toggle Turn and Update Display
function toggleTurn(turn) {
    document.getElementById('tog').textContent = `${turn === 'W' ? "White's Turn" : "Black's Turn"}`;
}

// Handle Winning Conditions
function checkWinCondition() {
    const kings = [...document.querySelectorAll('.box')].filter(box => box.textContent.includes('king'));
    if (kings.length === 1) {
        setTimeout(() => {
            alert(`${kings[0].textContent.includes('W') ? 'White' : 'Black'} Wins!!`);
            location.reload();
        }, 100);
    }
}

// Modular Event Handler for Moves
function handleMoveClick(event) {
    const box = event.target.closest('.box');
    if (!box) return;

    const turn = document.getElementById('tog').textContent.includes('White') ? 'W' : 'B';
    const piece = box.textContent.trim();

    if (piece.startsWith(turn)) {
        applySquareColors();
        box.style.backgroundColor = 'pink';
        highlightAvailableMoves(box, turn);
    } else if (box.style.backgroundColor === 'green') {
        executeMove(box, turn);
    }

    validateMoves();
    checkWinCondition();
}

// Highlight Available Moves Based on Piece
function highlightAvailableMoves(box, turn) {
    // Logic for specific pieces (pawn, rook, etc.)
    // Modularize per piece type, similar to original implementation
}

// Execute Move
function executeMove(targetBox, turn) {
    const selectedBox = document.querySelector('.box[style*="pink"]');
    if (!selectedBox) return;

    targetBox.textContent = selectedBox.textContent;
    selectedBox.textContent = '';

    applySquareColors();
    insertImages();
    toggleTurn(turn === 'W' ? 'B' : 'W');
}

// Initialize Game
function initializeGame() {
    applySquareColors();
    insertImages();

    document.querySelectorAll('.box').forEach(box => {
        box.addEventListener('click', handleMoveClick);
    });
}

initializeGame();
