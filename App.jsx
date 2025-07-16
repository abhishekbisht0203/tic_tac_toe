import { View, Text, TouchableOpacity, SafeAreaView, Switch } from 'react-native';
import React, { useState } from 'react';

export default function App() {
  const [board, setBoard] = useState(Array(9).fill(''));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [status, setStatus] = useState("Player X's turn");
  const [isActive, setIsActive] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const checkWin = (board) => {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6]             // Diagonals
    ];
    return winPatterns.some(([a, b, c]) =>
      board[a] !== '' && board[a] === board[b] && board[a] === board[c]
    );
  };

  const handlePress = (index) => {
    if (!isActive || board[index] !== '') return;

    const updatedBoard = [...board];
    updatedBoard[index] = currentPlayer;
    setBoard(updatedBoard);

    if (checkWin(updatedBoard)) {
      setStatus(`🎉 Player ${currentPlayer} wins!`);
      setIsActive(false);
    } else if (updatedBoard.every(cell => cell !== '')) {
      setStatus("🤝 It's a draw!");
      setIsActive(false);
    } else {
      const nextPlayer = currentPlayer === 'X' ? 'O' : 'X';
      setCurrentPlayer(nextPlayer);
      setStatus(`Player ${nextPlayer}'s turn`);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(''));
    setCurrentPlayer('X');
    setStatus("Player X's turn");
    setIsActive(true);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: isDarkMode ? '#0f0f1a' : '#e0e0ff',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16
      }}
    >
      {/* Dark Mode Toggle */}
      <View
        style={{
          position: 'absolute',
          top: 40,
          right: 20,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8
        }}
      >
        <Text style={{ color: isDarkMode ? '#fff' : '#333', fontWeight: '600' }}>
          {isDarkMode ? '🌙 Dark' : '☀️ Light'}
        </Text>
        <Switch
          value={isDarkMode}
          onValueChange={() => setIsDarkMode(!isDarkMode)}
          thumbColor={isDarkMode ? '#fff' : '#333'}
          trackColor={{ false: '#ccc', true: '#555' }}
        />
      </View>

      {/* Title */}
      <Text
        style={{
          fontSize: 32,
          fontWeight: 'bold',
          color: isDarkMode ? '#fff' : '#222',
          marginBottom: 12,
          textShadowColor: isDarkMode ? '#000' : '#aaa',
          textShadowOffset: { width: 1, height: 1 },
          textShadowRadius: 6
        }}
      >
        Tic Tac Toe
      </Text>

      {/* Status */}
      <Text
        style={{
          fontSize: 20,
          fontWeight: '600',
          marginBottom: 20,
          color: isDarkMode ? '#ccc' : '#444'
        }}
      >
        {status}
      </Text>

      {/* Board */}
      <View
        style={{
          width: 300,
          height: 300,
          flexDirection: 'row',
          flexWrap: 'wrap',
          marginBottom: 20
        }}
      >
        {board.map((cell, index) => (
          <TouchableOpacity
            key={index}
            style={{
              width: '33.33%',
              height: '33.33%',
              borderWidth: 1,
              borderColor: isDarkMode ? '#444' : '#999',
              backgroundColor: isDarkMode ? '#1a1a2e' : '#f0f0f5',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onPress={() => handlePress(index)}
          >
            <Text
              style={{
                fontSize: 36,
                fontWeight: 'bold',
                color: cell === 'X' ? '#00f0ff' : '#ff007f',
                textShadowColor:
                  cell === 'X'
                    ? (isDarkMode ? '#00c0cc' : '#00f0ff')
                    : (isDarkMode ? '#cc0055' : '#ff007f'),
                textShadowOffset: { width: 0, height: 0 },
                textShadowRadius: isDarkMode ? 0 : 10
              }}
            >
              {cell}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Reset Button */}
      <TouchableOpacity
        onPress={resetGame}
        style={{
          backgroundColor: isDarkMode ? '#444' : '#007bff',
          paddingVertical: 12,
          paddingHorizontal: 30,
          borderRadius: 10,
          shadowColor: '#000',
          shadowOpacity: 0.3,
          shadowRadius: 4,
          elevation: 5
        }}
      >
        <Text
          style={{
            color: '#fff',
            fontSize: 18,
            fontWeight: 'bold'
          }}
        >
          🔄 Reset Game
        </Text>
      </TouchableOpacity>

      <Text
        style={{
          fontSize: 12,
          marginTop: 12,
          color: isDarkMode ? '#aaa' : '#666'
        }}
      >
        Made with ❤️ by Abhishek Bisht
      </Text>
    </SafeAreaView>
  );
}
