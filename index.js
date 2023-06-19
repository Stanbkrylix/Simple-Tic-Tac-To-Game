"use strict";

const players = (name, symbol) => {
    const player = {
        name,
        symbol,
    };

    return player;
};

const ui = (() => {
    const playersModalOverlay = document.querySelector(
        ".players-name-modal-overlay"
    );
    const startGameModal = document.querySelector(".startGame-modal-overlay");
    const playerOneInput = document.querySelector(".player1-input");
    const playerTwoInput = document.querySelector(".player2-input");
    const marker1 = document.querySelector(".marker1");
    const marker2 = document.querySelector(".marker2");
    const playerOneMarker = document.querySelector(".player-one-symbol");
    const playerTwoMarker = document.querySelector(".player-two-symbol");
    const playerOneName = document.querySelector(".player-name-one");
    const playerTwoName = document.querySelector(".player-name-two");
    const finishBtn = document.querySelector(".players-modal-btn");
    const startBtn = document.querySelector(".start-btn");
    const grid = document.querySelectorAll(".grid");
    const playerOneUnderline = document.querySelector(".player-one");
    const playerTwoUnderline = document.querySelector(".player-two");

    const playAgainBtn = document.querySelector(".play-again-btn");
    const winner = document.querySelector(".theWinner");
    const gameOverOverlay = document.querySelector(".game-over-modal-overlay");

    startBtn.addEventListener("click", (e) => {
        startGameModal.classList.add("hidden");
        playersModalOverlay.classList.remove("hidden");
    });

    finishBtn.addEventListener("click", (e) => {
        const oneInput = playerOneInput.value;
        const twoInput = playerTwoInput.value;
        const XorO1 = marker1.value;
        const XorO2 = marker2.value;
        const upperXorO1 = XorO1.toUpperCase();
        const upperXorO2 = XorO2.toUpperCase();

        if (
            oneInput === "" ||
            twoInput === "" ||
            XorO1 === "" ||
            XorO2 === ""
        ) {
            alert("You must fill all available input field value");
        } else if (
            (upperXorO1 === "X" && upperXorO2 === "O") ||
            (upperXorO1 === "O" && upperXorO2 === "X")
        ) {
            console.log(upperXorO1, upperXorO2);
            playerOneName.textContent = oneInput;
            playerTwoName.textContent = twoInput;
            playerOneMarker.textContent = upperXorO1;
            playerTwoMarker.textContent = upperXorO2;
            playersModalOverlay.classList.add("hidden");
        } else if (
            upperXorO1 !== "X" ||
            upperXorO1 !== "O" ||
            upperXorO2 !== "X" ||
            upperXorO2 !== "O"
        ) {
            alert("Markers must be either An 'X' or an 'O'");
        } else {
            alert("Markers cannot be the same");
        }
    });

    return {
        grid,
        playerOneMarker,
        playerTwoMarker,
        playerOneName,
        playerTwoName,
        playerOneUnderline,
        playerTwoUnderline,
        playAgainBtn,
        winner,
        gameOverOverlay,
    };
})();

console.log(ui.grid);

const gameBoard = (() => {
    // const pSymbol = gameController.switchPlayer().symbol;

    let gameBoardArray = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
    ];
    const getBoard = () => gameBoardArray;
    const displayBoard = (grid) => {
        for (let i = 0; i < gameBoardArray.length; i++) {
            console.log(gameBoardArray[i]);
        }
    };
    const updateGridUi = (grid, symbol, winnerFound) => {
        const gridDiv = grid.target;

        gridDiv.textContent = symbol;
        console.log(symbol, winnerFound);
        if (winnerFound) return;
    };
    const resetBoard = () => {
        const resetBoardArray = getBoard();
        for (let i = 0; i < resetBoardArray.length; i++) {
            for (let j = 0; j < resetBoardArray[i].length; j++) {
                resetBoardArray[i][j] = "";
            }
        }
        // console.log(resetBoardArray);
        displayBoard();
    };

    return { getBoard, displayBoard, updateGridUi, resetBoard };
})();

console.log(gameBoard.getBoard());
gameBoard.displayBoard();

const gameController = (() => {
    const playerOneUnderline = ui.playerOneUnderline;
    const playerTwoUnderline = ui.playerTwoUnderline;
    let player;
    let winnerFound = false;
    const grid = ui.grid;

    const switchPlayer = (playerOne, playerTwo) => {
        if (player === playerOne) {
            player = playerTwo;
            playerTwoUnderline.classList.remove("underLine");
            playerOneUnderline.classList.add("underLine");
        } else if (player === playerTwo) {
            playerOneUnderline.classList.remove("underLine");
            playerTwoUnderline.classList.add("underLine");
            player = playerOne;
        }

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
    const populateBoard = (row, col, currentPlayer) => {
        //
        const gameOverOverlay = ui.gameOverOverlay;
        const winnersName = ui.winner;

        console.log(winnerFound);
        if (winnerFound) {
            return;
        }

        const board = gameBoard.getBoard();

        if (board[row][col] === "") {
            board[row][col] = currentPlayer;

            const winner = checkWinningCombination(board, currentPlayer);
            if (winner) {
                winnerFound = true;
                gameOverOverlay.classList.remove("hidden");
                winnersName.textContent = "Player " + winner + " is the winner";
            }
        } else {
            return;
        }
    };

    const playGame = () => {
        grid.forEach((tile) => {
            tile.addEventListener("click", (event) => {
                const playerOneMarker = ui.playerOneMarker.textContent;
                const playerTwoMarker = ui.playerTwoMarker.textContent;
                const playerOneName = ui.playerOneName.textContent;
                const playerTwoName = ui.playerTwoName.textContent;
                const gridDataSetNum = Number(event.target.dataset.number);

                if (!player) {
                    player = playerOneMarker;
                }

                const currentPlayer = switchPlayer(
                    playerOneMarker,
                    playerTwoMarker
                );

                // console.log(playerOneName, playerTwoName);
                const row = Math.floor(gridDataSetNum / 3);
                const col = gridDataSetNum % 3;
                populateBoard(row, col, currentPlayer);
                console.log(
                    "================== gameBoard ===================="
                );
                gameBoard.displayBoard();
                gameBoard.updateGridUi(event, currentPlayer, winnerFound);
            });
        });
    };
    const resetGridUi = () => {
        grid.forEach((tile) => {
            tile.textContent = "";
        });
    };
    const resetWinnerFound = () => {
        winnerFound = false;
    };

    const resetGame = () => {
        const playAgainBtn = ui.playAgainBtn;
        const gameOverOverlay = ui.gameOverOverlay;
        playAgainBtn.addEventListener("click", () => {
            gameBoard.resetBoard();
            resetWinnerFound();
            resetGridUi();
            gameOverOverlay.classList.add("hidden");
            player = undefined;
        });
    };

    return {
        populateBoard,
        switchPlayer,
        playGame,
        resetGame,
    };
})();
gameController.playGame();
gameController.resetGame();
