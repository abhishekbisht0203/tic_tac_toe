import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native'
import React, {useState} from 'react'
import './global.css'

export default function App() {

  const [board, setBoard] = useState(Array(9).fill(''));
  const [currentPlayer , setCurrentPlayer] =useState('X');
  const [status, setStatus] = useState("Player X's turn");
  const [isActive, setIsActive] = useState(true);

  const checkwin = (board)=>{
    const winPatterns = [
      [0, 1, 2],[3, 4, 5],[6, 7, 8],    // rows

      [0, 3, 6],[1, 4, 7],[2, 5, 8],    // columns

      [0, 4, 8],[2, 4, 6]    // diagonals
    ];
    return winPatterns.some(([a, b ,c]) =>
    board[a] !== '' && board[a] === board[b] && board[a] === board[c] 
  );
  };

  const handlepress = (index) =>{
    if (!isActive || board[index] !== '')return;

    const updatedBoard = [...board];
    updatedBoard[index] = currentPlayer;
    setBoard(updatedBoard);

    if (checkwin(updatedBoard)){
      setStatus(`Player ${currentPlayer} wins`);
      setIsActive(false);
    }else if(updatedBoard.every(cell => cell !== '')){
      setStatus("It's a draw");
      setIsActive(false);
    }else{
        const nextplayer = currentPlayer === 'X' ? 'O' : 'X';
        setCurrentPlayer(nextplayer);
        setStatus(`Player ${nextplayer}'s turn`);
      }
  };

  const resetgame = () =>{
    setBoard(Array(9).fill(''));
    setCurrentPlayer('X');
    setStatus("Player X's turn");
    setIsActive(true);

  }

  return (
    <SafeAreaView className='flex-1 bg-gradient-to-br from-purple-100 to-blue-200 items-center justify-center p-4'>
      <Text className='text-3xl text-center font-bold mb-4'>Tic Tac Toe</Text>
      <Text className='text-2xl text-center font-bold mb-6'>{status}</Text>

      <View className='w-[300px] h-[300px] flex-row flex-wrap mb-6'>
        {board.map((cell, index) => (
          <TouchableOpacity
            key={index}
            className="w-1/3 h-1/3 border border-slate-300 bg-gray-100 items-center justify-center"
            onPress={() => handlepress(index)}
          >
            <Text className={`text-4xl font-bold ${cell === 'X' ? 'text-blue-500' : 'text-red-500'}`}>
            {cell}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity className= "bg-blue-500 px-6 py-3 rounded-lg"
      onPress={resetgame}
      >
        <Text className='text-white text-lg font-bold'>Reset Game</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}


