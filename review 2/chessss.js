// script.js
document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('chess-board');
    const resetBtn = document.getElementById('reset-btn');
    let selectedPiece = null;

    const initialBoardSetup = [
        ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
        ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
        ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
    ];

    const pieceSymbols = {
        'r': '♜', 'n': '♞', 'b': '♝', 'q': '♛', 'k': '♚', 'p': '♟',
        'R': '♖', 'N': '♘', 'B': '♗', 'Q': '♕', 'K': '♔', 'P': '♙'
    };

    function createBoard() {
        board.innerHTML = '';
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const square = document.createElement('div');
                square.classList.add('square');
                square.classList.add((row + col) % 2 === 0 ? 'light' : 'dark');
                square.dataset.row = row;
                square.dataset.col = col;

                const piece = initialBoardSetup[row][col];
                if (piece) {
                    const pieceElement = document.createElement('span');
                    pieceElement.classList.add('piece');
                    pieceElement.textContent = pieceSymbols[piece];
                    square.appendChild(pieceElement);
                }

                square.addEventListener('click', () => onSquareClick(square));
                board.appendChild(square);
            }
        }
    }

    function onSquareClick(square) {
        if (selectedPiece) {
            // Move logic here
            selectedPiece.classList.remove('selected');
            selectedPiece = null;
        } else {
            const piece = square.querySelector('.piece');
            if (piece) {
                selectedPiece = piece;
                piece.classList.add('selected');
            }
        }
    }

    resetBtn.addEventListener('click', createBoard);

    createBoard();
});
