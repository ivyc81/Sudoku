import React from 'react';
import styled from 'styled-components';
// import './Board.css';
const darkSet = new Set([1, 3, 5, 7, 9]);

const StyledBoard = styled.div`
  height: 100vh;
  display: flex;
`;

const StyledTable = styled.table`
  border-collapse: collapse;
  margin: auto;

  table, td {
    border: 1px solid black;
  }

  td {
    width: 3rem;
    height: 3rem;
  }
`;

const StyledTd = styled.td`
  background-color: ${({block}) => {
    return darkSet.has(block) ? 'grey': 'white';
  }}
`;

function Board() {
  function createBoard(){
    const arrForNewSet = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const sets = {};
    const board = Array.from({length: 9}, () => Array.from({length: 9}, () => ''));

    for(let i = 1; i <= 9; i++){
      sets[i] = new Set(arrForNewSet); //block
      sets[String.fromCharCode(64+i)] = new Set(arrForNewSet); //x
      sets[String.fromCharCode(64+i).toLocaleLowerCase()] = new Set(arrForNewSet); //y
    }

    for(let i = 0; i < 81; i++){
      let randomNum;
      let x = Math.floor(i / 9);
      let y = i % 9;
      const setX = sets[String.fromCharCode(65+x)];
      const setY = sets[String.fromCharCode(65+y).toLocaleLowerCase()];
      const setBlock = sets[findBlock(x, y)];
      const pickFrom = setX.size <= setBlock.size ? setX : setBlock;
      let count = 0;

      do{
        count++;
        randomNum = chooseRandom(Array.from(pickFrom));
      } while(count <= 10 && (!setY.has(randomNum) || !setX.has(randomNum) || !setBlock.has(randomNum)))

      if(setY.has(randomNum) && setX.has(randomNum) && setBlock.has(randomNum)){
        board[x][y] = randomNum;
        setY.delete(randomNum);
        setX.delete(randomNum);
        setBlock.delete(randomNum);
      } else {
        i = reverseBack(i, board, sets);
      }
    }

    return board;
  }

  function chooseRandom(arr){
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function findBlock(x, y){
    let block;

    if(x < 3){
      if(y < 3){
        block = 1;
      } else if(y >= 3 && y <6){
        block = 2;
      } else {
        block = 3;
      }
    } else if(x >= 3 && x <6){
      if(y < 3){
        block = 4;
      } else if(y >= 3 && y <6){
        block = 5;
      } else {
        block = 6;
      }
    } else {
      if(y < 3){
        block = 7;
      } else if(y >= 3 && y <6){
        block = 8;
      } else {
        block = 9;
      }
    }

    return block;
  }

  function reverseBack(startIndex, board, sets){
    for(let i = 0; i < 10; i++){
      let currIndex = startIndex - i;
      let x = Math.floor(currIndex / 9);
      let y = currIndex % 9;
      const setX = sets[String.fromCharCode(65+x)];
      const setY = sets[String.fromCharCode(65+y).toLocaleLowerCase()];
      const setBlock = sets[findBlock(x, y)];

      if(board[x][y] !== ''){
        setX.add(board[x][y]);
        setY.add(board[x][y]);
        setBlock.add(board[x][y]);
        board[x][y] = '';
      }

    }

    return startIndex - 10;
  }

  function renderBoard(){
    let board = createBoard();

    // let boardHTML = [];

    // for(let i = 0; i < board.length ; i++){
    //   boardHTML.push([]);
    //   for(let j = 0; j < board[i].length; j++){
    //     boardHTML[i].push()
    //   }
    // }

    return (
      board.map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => <StyledTd key={`${rowIndex}, ${cellIndex}`}
          x={rowIndex}
          y={cellIndex}
          block={findBlock(rowIndex, cellIndex)}>
        {cell}</StyledTd>)}
      </tr>)
    );
  }

  let b = renderBoard();
  return (
    <StyledBoard className="Board">
      <StyledTable>
        <tbody>
          {b}
        </tbody>
      </StyledTable>
    </StyledBoard>
  );
}

export default Board;