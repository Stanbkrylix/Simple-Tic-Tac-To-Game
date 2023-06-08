"use strict";

const players = (name, symbol) => {
    const player = {
        name,
        symbol,
    };

    return player;
};

const gameBoard = (() => {
    // const pSymbol = gameController.switchPlayer().symbol;

    let gameBoardArray = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
    ];
    const getBoard = () => gameBoardArray;
    const displayBoard = () => {
        for (let i = 0; i < gameBoardArray.length; i++) {
            console.log(gameBoardArray[i]);
        }
    };

    return { getBoard, displayBoard };
})();

console.log(gameBoard.getBoard());
gameBoard.displayBoard();

const gameController = (() => {
    const player1 = players("Stanley", "X").symbol;
    const player2 = players("Daho", "O").symbol;
    let player = player1;
    let winnerFound = false;

    const switchPlayer = () => {
        player = player === player1 ? (player = player2) : (player = player1);

        console.log(player + "'s turn");
        return player;
    };

    const checkWinningCombination = (board, player) => {
        //
        // checking if rows has a winning combination
        for (let i = 0; i < board.length; i++) {
            if (
                board[i][0] === player &&
                board[i][1] === player &&
                board[i][2] === player
            ) {
                return player;
            }
        }
        //
        //checking if columns has a winning combination
        for (let i = 0; i < board.length; i++) {
            if (
                board[0][i] === player &&
                board[1][i] === player &&
                board[2][i] === player
            ) {
                return player;
            }
        }
        //
        // checking if the right diagonal have a winning combination
        if (
            board[0][0] === player &&
            board[1][1] === player &&
            board[2][2] === player
        ) {
            return player;
        }
        //
        // checking if left diagonal have a winning combination
        if (
            board[0][2] === player &&
            board[1][1] === player &&
            board[2][0] === player
        ) {
            return player;
        }
        //
        // if combination is not found
        return null;
    };

    // creating 2d array
    const populateBoard = (row, col) => {
        //
        console.log(winnerFound);
        if (winnerFound) {
            return;
        }

        const board = gameBoard.getBoard();

        if (board[row][col] === "") {
            const currentPlayer = switchPlayer();
            board[row][col] = currentPlayer;
            const winner = checkWinningCombination(board, currentPlayer);
            if (winner) {
                winnerFound = true;
                console.log("Player " + winner + " is the winner");
            }
        } else {
            return;
        }
    };

    return {
        populateBoard,
        switchPlayer,
    };
})();
gameController.populateBoard(1, 0);
gameController.populateBoard(1, 0);
gameController.populateBoard(1, 1);
gameController.populateBoard(1, 1);
gameController.populateBoard(1, 2);
gameController.populateBoard(0, 2);
gameController.populateBoard(0, 2);
gameController.populateBoard(0, 2);
gameController.populateBoard(1, 2);
gameController.populateBoard(0, 0);
gameController.populateBoard(2, 1);
gameController.populateBoard(2, 0);
gameController.populateBoard(2, 2);

console.log("================== gameBoard ====================");
gameBoard.displayBoard();

// winning combinations
/*
first combination
top => (0,0) (0,1) (0,2)
bottom => (2,0)(2,1)(2,2)
left => (0,0)(1,0)(2,0)
left dia => (0,0)(1,1)(2,2)
right dia =>(0,2)(1,1)(2,0)
*/

// previous winning combination logic
//if (
//     (board[0][0] === "X" &&
//         board[0][1] === "X" &&
//         board[0][2] === "X") ||
//     (board[2][0] === "X" &&
//         board[2][1] === "X" &&
//         board[2][2] === "X") ||
//     (board[0][0] === "X" &&
//         board[1][0] === "X" &&
//         board[2][0] === "X") ||
//     (board[0][0] === "X" &&
//         board[1][1] === "X" &&
//         board[2][2] === "X") ||
//     (board[0][2] === "X" &&
//         board[1][1] === "X" &&
//         board[2][0] === "X") ||
//     (board[0][1] === "X" &&
//         board[1][1] === "X" &&
//         board[2][1] === "X") ||
//     (board[1][0] === "X" && board[1][1] === "X" && board[1][2] === "X")
// ) {
//     winnerFound = true;
//     console.log("Player X is the winner " + winnerFound);
// } else if (
//     (board[0][0] === "O" &&
//         board[0][1] === "O" &&
//         board[0][2] === "O") ||
//     (board[2][0] === "O" &&
//         board[2][1] === "O" &&
//         board[2][2] === "O") ||
//     (board[0][0] === "O" &&
//         board[1][0] === "O" &&
//         board[2][0] === "O") ||
//     (board[0][0] === "O" &&
//         board[1][1] === "O" &&
//         board[2][2] === "O") ||
//     (board[0][2] === "O" &&
//         board[1][1] === "O" &&
//         board[2][0] === "O") ||
//     (board[0][1] === "O" &&
//         board[1][1] === "O" &&
//         board[2][1] === "O") ||
//     (board[1][0] === "O" && board[1][1] === "O" && board[1][2] === "O")
// ) {
//     winnerFound = true;
//     console.log("Player O is the Winner");
// } else {
//     // console.log("no winner yet");
//     return;
// }
