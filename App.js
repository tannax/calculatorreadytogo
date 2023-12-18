/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-bitwise */

import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';

export default function App() {
  const buttons = [
    'LIMPAR', 'DEL', '%', '/',
    7, 8, 9, 'x',
    4, 5, 6, '-',
    1, 2, 3, '+',
    0, '.', '+/-', '=',
  ];

  const [currentNumber, setCurrentNumber] = useState('');
  const [lastNumber, setLastNumber] = useState('');

  function calculator() {
    const splitNumbers = currentNumber.split(' ');
    const firstNumber = parseFloat(splitNumbers[0]);
    const secondNumber = parseFloat(splitNumbers[2]);
    const operator = splitNumbers[1];

    // Faz ação referente tecla pressionada
    switch (operator) {
      case '+':
        setCurrentNumber((firstNumber + secondNumber).toString());
        return;
      case '-':
        setCurrentNumber((firstNumber - secondNumber).toString());
        return;
      case 'x':
        setCurrentNumber((firstNumber * secondNumber).toString());
        return;
      case '/':
        setCurrentNumber((firstNumber / secondNumber).toString());
        return;
      case '%':
        // Calculate the percentage of the first number
        setCurrentNumber((firstNumber * (secondNumber / 100)).toString());
        return;
    }
  }

  function handleInput(buttonPressed) {
    console.log(buttonPressed); // Mostra no Console a tecla pressionada
    if(buttonPressed === '+' | buttonPressed === "-" | buttonPressed === "x" | buttonPressed === "/" | buttonPressed ==='%' ){
      setCurrentNumber(currentNumber + " " + buttonPressed + " ")
      return
    }
    switch (buttonPressed) {
      case 'DEL':
        setCurrentNumber(currentNumber.substring(0, currentNumber.length - 1));
        return;
      case 'LIMPAR': // Limpa todo o conteúdo
        setLastNumber('');
        setCurrentNumber('');
        return;
      case '=':
        setLastNumber(currentNumber + ' = ');
        calculator();
        return;
      case '%': //Porcentagem
        setCurrentNumber((parseFloat(currentNumber) * 0.01).toString());
        break;
      //Logica de inversão de sinal
      case '+/-':
        setCurrentNumber(currentNumber * -1)
        return
    }

    setCurrentNumber(currentNumber + buttonPressed);
  }

  return (
    <View style={styles.container}>
      <View style={styles.results}>
        <Text style={styles.historyText}>{lastNumber}</Text>
        <Text style={styles.resultText}>{currentNumber}</Text>
      </View>

      <View style={styles.buttons}>
        {buttons.map(button => (
          <TouchableOpacity
            onPress={() => handleInput(button)}
            key={button}
            style={[
              styles.button,
              button === '=' ? { backgroundColor: '#170B3B' } : null,
            ]}
          >
            <Text style={[
              styles.textButton,
              { color: typeof button === 'number' ? 'white' : '#7c7c7c' },
            ]}>
              {button}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const { height } = Dimensions.get('window');
const buttonHeight = height * 0.1; // Set the button height as a percentage of the screen height

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  results: {
    flex: 2,
    justifyContent: 'center',
    backgroundColor: '#323B36',
  },
  resultText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    padding: 12,
    textAlign: 'right',
  },
  historyText: {
    color: '#7c7c7c',
    fontSize: 20,
    marginRight: 10,
    alignSelf: 'flex-end',
  },
  buttons: {
    backgroundColor: '#603F8B',
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: height * 0.5, // Set the button area height as a percentage of the screen height
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 90,
    minHeight: buttonHeight, // Use the calculated button height
    flex: 1,
  },
  textButton: {
    color: '#7c7c7c',
    fontSize: 20,
  },
});
