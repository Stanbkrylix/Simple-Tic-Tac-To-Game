"use strict";

// const players = (name, symbol) => {
//     const player = {
//         name,
//         symbol,
//     };

//     return player;
// };

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
    const player1Container = document.querySelector(".player-1-container");
    const player2Container = document.querySelector(".player-2-container");

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
            // console.log(upperXorO1, upperXorO2);
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

    const resetStartModal = () => {
        startGameModal.classList.remove("hidden");
        playerOneInput.value = "";
        playerTwoInput.value = "";
        marker1.value = "";
        marker2.value = "";
        playerOneName.textContent = "";
        playerTwoName.textContent = "";
        playerOneMarker.textContent = "";
        playerTwoMarker.textContent = "";
        playerOneUnderline.classList.remove("underLine");
        playerTwoUnderline.classList.remove("underLine");
    };

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
        resetStartModal,
        player1Container,
        player2Container,
    };
})();

const gameBoard = (() => {
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

    const updateGridUi = (grid, symbol) => {
        const gridDiv = grid.target;
        gridDiv.textContent = symbol;
    };

    const resetBoard = () => {
        const resetBoardArray = getBoard();
        for (let i = 0; i < resetBoardArray.length; i++) {
            for (let j = 0; j < resetBoardArray[i].length; j++) {
                resetBoardArray[i][j] = "";
            }
        }
    };

    return { getBoard, displayBoard, updateGridUi, resetBoard };
})();

const gameController = (() => {
    const playerOneUnderline = ui.playerOneUnderline;
    const playerTwoUnderline = ui.playerTwoUnderline;
    const player1Container = ui.player1Container;
    const player2Container = ui.player2Container;
    let player;
    let winnerFound = false;
    const grid = ui.grid;

    const switchPlayer = (playerOne, playerTwo) => {
        if (player === playerTwo) {
            player = playerOne;
            playerOneUnderline.classList.remove("underLine");
            playerTwoUnderline.classList.add("underLine");
        } else if (player === playerOne) {
            playerTwoUnderline.classList.remove("underLine");
            playerOneUnderline.classList.add("underLine");
            player = playerTwo;
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

    const determineWinner = (
        marker1,
        marker2,
        player1Name,
        player2Name,
        player1NameUi,
        player2NameUi
    ) => {
        let emptyArray = [player1NameUi, player2NameUi];
        return { marker1, marker2, player1Name, player2Name, emptyArray };
    };

    // to highlight the winner;
    const toShowSideOfWinner = (
        nameOfWinner,
        dWinner,
        winner,
        pOneUline,
        pTwoUline,
        play1Grid,
        play2Grid
    ) => {
        pOneUline.classList.remove("underLine");
        pTwoUline.classList.remove("underLine");

        // to link winner and corresponding side
        if (
            (dWinner.marker1 === "X" && winner === "X") ||
            (dWinner.marker1 === "O" && winner === "O")
        ) {
            nameOfWinner.textContent =
                "Player " + dWinner.player1Name + " is the winner";
            play1Grid.style.backgroundColor = "rgb(0, 110, 253)";
            play1Grid.style.color = "white";
        } else if (
            (dWinner.marker2 === "X" && winner === "X") ||
            (dWinner.marker2 === "O" && winner === "O")
        ) {
            nameOfWinner.textContent =
                "Player " + dWinner.player2Name + " is the winner";
            play2Grid.style.backgroundColor = "rgb(0, 110, 253)";
            play2Grid.style.color = "white";
        }
    };

    // populating 2d Array
    const populateBoard = (row, col, currentPlayer, dWinner) => {
        if (winnerFound) {
            return;
        }
        //
        const gameOverOverlay = ui.gameOverOverlay;
        const winnersName = ui.winner;

        // both players side
        const play1Grid = dWinner.emptyArray[0];
        const play2Grid = dWinner.emptyArray[1];

        const board = gameBoard.getBoard();
        // console.log(winnerFound);

        if (board[row][col] === "") {
            board[row][col] = currentPlayer;

            const winner = checkWinningCombination(board, currentPlayer);
            if (winner) {
                winnerFound = true;
                console.log(board);
                gameOverOverlay.classList.remove("hidden");
                toShowSideOfWinner(
                    winnersName,
                    dWinner,
                    winner,
                    playerOneUnderline,
                    playerTwoUnderline,
                    play1Grid,
                    play2Grid
                );
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

                const dWinner = determineWinner(
                    playerOneMarker,
                    playerTwoMarker,
                    playerOneName,
                    playerTwoName,
                    player1Container,
                    player2Container
                );

                if (!player) {
                    player = playerTwoMarker;
                }

                const currentPlayer = switchPlayer(
                    playerOneMarker,
                    playerTwoMarker
                );

                const row = Math.floor(gridDataSetNum / 3);
                const col = gridDataSetNum % 3;
                populateBoard(row, col, currentPlayer, dWinner);
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

    const resetPlayersColors = () => {
        player1Container.style.backgroundColor = "white";
        player2Container.style.backgroundColor = "white";
        player1Container.style.color = "black";
        player2Container.style.color = "black";
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
            ui.resetStartModal();
            resetPlayersColors();
        });
    };

    return {
        playGame,
        resetGame,
    };
})();
gameController.playGame();
gameController.resetGame();
