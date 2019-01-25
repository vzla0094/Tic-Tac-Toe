const nodeMaker = (nodeType, parent, text) => {
  const newNode = document.createElement(nodeType);
  if (text) newNode.textContent = text;
  parent.appendChild(newNode);
  return newNode;
}

const game = (() => {
  const gameBoard = Array.from(document.querySelectorAll(".box"));
  const player1 = {name: "", weapon: "x",}
  const player2 = {name: "", weapon: "o",}
  let currentPlayer = Object.assign({}, player1);
  const changeCurrPlayer = () => {
    if (currentPlayer.weapon === player1.weapon){
      currentPlayer = Object.assign({}, player2)
    }else currentPlayer = Object.assign({}, player1);
  }
  const renderMove = (event) => {
    if (event.target.textContent !== "") return; //this won't allow selecting a space that's already marked
    nodeMaker('p', event.target, currentPlayer.weapon);
    playGame(gameBoard, player1, player2);
  }
  gameBoard.forEach(e => e.addEventListener('click', renderMove));
  return {changeCurrPlayer};
}
)();

function playGame(gameBoard, player1, player2){
  game.changeCurrPlayer();
  const winArrMaker = (startIndex, increment) => {
    const newArr = []
    for(let i = startIndex; newArr.length < 3; i += increment){
      newArr.push(gameBoard[i].textContent);
    }
    return newArr;
  }
  const winArrays = [
    winArrMaker(0, 1),
    winArrMaker(3, 1),
    winArrMaker(6, 1),
    winArrMaker(0, 3),
    winArrMaker(1, 3),
    winArrMaker(2, 3),
    winArrMaker(0, 4),
    winArrMaker(2, 2)
  ]
  for(let arr in winArrays){
    if (winArrays[arr].every(e => e === player1.weapon)){
      nodeMaker('p', document.body, `${player1.name} won!`);
    }else if(winArrays[arr].every(e => e === player2.weapon)){
      nodeMaker('p', document.body, `${player2.name} won!`);
    }
  }
}
