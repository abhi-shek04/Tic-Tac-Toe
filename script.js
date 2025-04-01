class TicTacToe {
    constructor() {
        this.currentPlayer = 'X';
        this.gameBoard = Array(9).fill('');
        this.gameActive = true;
        this.winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];
        
        this.initializeGame();
    }

    initializeGame() {
        // Add click event listeners to all cells
        document.querySelectorAll('[data-cell]').forEach(cell => {
            cell.addEventListener('click', (e) => this.handleCellClick(e));
        });

        // Add click event listener to restart button
        document.getElementById('restart').addEventListener('click', () => this.restartGame());
    }

    handleCellClick(e) {
        const cell = e.target;
        const cellIndex = parseInt(cell.getAttribute('data-cell'));

        if (this.gameBoard[cellIndex] !== '' || !this.gameActive) return;

        this.updateCell(cell, cellIndex);
        this.checkWinner();
    }

    updateCell(cell, index) {
        this.gameBoard[index] = this.currentPlayer;
        cell.textContent = this.currentPlayer;
        cell.classList.add(`text-${this.currentPlayer === 'X' ? 'primary' : 'danger'}`);
    }

    checkWinner() {
        for (const combination of this.winningCombinations) {
            const [a, b, c] = combination;
            if (this.gameBoard[a] && 
                this.gameBoard[a] === this.gameBoard[b] && 
                this.gameBoard[a] === this.gameBoard[c]) {
                this.handleWin();
                return;
            }
        }

        if (!this.gameBoard.includes('')) {
            this.handleDraw();
            return;
        }

        this.switchPlayer();
    }

    handleWin() {
        this.gameActive = false;
        document.getElementById('status').textContent = `Player ${this.currentPlayer} Wins!`;
        document.getElementById('status').classList.add('text-success');
    }

    handleDraw() {
        this.gameActive = false;
        document.getElementById('status').textContent = "Game Draw!";
        document.getElementById('status').classList.add('text-warning');
    }

    switchPlayer() {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        document.getElementById('status').textContent = `Player ${this.currentPlayer}'s Turn`;
    }

    restartGame() {
        this.currentPlayer = 'X';
        this.gameBoard = Array(9).fill('');
        this.gameActive = true;
        
        // Reset all cells
        document.querySelectorAll('[data-cell]').forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('text-primary', 'text-danger');
        });

        // Reset status
        const status = document.getElementById('status');
        status.textContent = `Player ${this.currentPlayer}'s Turn`;
        status.classList.remove('text-success', 'text-warning');
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new TicTacToe();
}); 