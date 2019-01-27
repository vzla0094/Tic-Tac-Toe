const nodeMaker = (nodeType, parent, text) => {
  const newNode = document.createElement(nodeType);
  if (text) newNode.textContent = text;
  parent.appendChild(newNode);
  return newNode;
}

const gameBoard = (() => {
  const board = Array.from(document.querySelectorAll(".box"));
  const winnerArrays = [
    [board[0], board[1], board[2]],
    [board[3], board[4], board[5]],
    [board[6], board[7], board[8]],
    [board[0], board[3], board[6]],
    [board[1], board[4], board[7]],
    [board[2], board[5], board[8]],
    [board[0], board[4], board[8]],
    [board[2], board[4], board[6]],
  ];
  const getWinnerArrays = () => winnerArrays;
  const startEventListener = () => {
    board.forEach(e => e.addEventListener('click', playGame));
  }
  const stopEventListener = () => {
    board.forEach(e => e.removeEventListener('click', playGame));
  }
  const clearBoard = () => {
    board.forEach(e => {
      if(e.firstChild) e.removeChild(e.firstChild);
    });
  }
  return {stopEventListener, startEventListener, getWinnerArrays, clearBoard};
}
)();

const CreatePlayers = () => {
  const player1 = {name: null, weapon: 'x'};
  const player2 = {name: null, weapon: 'o'};
  let playerTurn = Object.assign({}, player1);
  const setPlayers = (playerX, playerO) =>{
    player1.name = `${playerX}`;
    player2.name = `${playerO}`;
  }
  const changeTurn = () => {
    if (playerTurn.name === player1.name){
      playerTurn = Object.assign({}, player2);
    }else playerTurn = Object.assign({}, player1);
    return playerTurn;
  }
  const nameChecker = () => {
    if(player1.name || player2.name){
      return 1;
    }else return null;
  }
  return {setPlayers, changeTurn, nameChecker};
};

let players = undefined;

const gameControls = (() => {
  const form = document.querySelector('form');
  form.addEventListener('submit', startGame);
  function startGame (event){
    event.preventDefault();
    gameBoard.clearBoard();
    players = CreatePlayers();
    players.setPlayers(form.elements.playerXsetter.value, form.elements.playerOsetter.value);
    if(!players.nameChecker()){
      nodeMaker('p', document.body, 'Please set names for both players');
      return;
    }
    gameBoard.startEventListener();
  }
}
)();

function playGame(event){
  if (event.target.textContent !== "") return; //this won't allow selecting a space that's already marked
  let currentPlayer = players.changeTurn();
  nodeMaker('p', event.target, currentPlayer.weapon); //this will log an 'x' or 'o' to the board
  const winnerArrays = gameBoard.getWinnerArrays();
  for(let arr in winnerArrays){
    if (winnerArrays[arr].every(e => e.textContent === currentPlayer.weapon)){
      nodeMaker('p', document.body, `${currentPlayer.name} won!`);
      gameBoard.stopEventListener();
    }
  }
}
