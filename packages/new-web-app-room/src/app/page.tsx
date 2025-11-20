'use client';

import { useState } from 'react';
import ThemeToggle from './components/ThemeToggle';

export default function MacCalculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return firstValue / secondValue;
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const handleEquals = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const toggleSign = () => {
    if (display !== '0') {
      setDisplay(display.charAt(0) === '-' ? display.slice(1) : '-' + display);
    }
  };

  const percentage = () => {
    const value = parseFloat(display) / 100;
    setDisplay(String(value));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 dark:from-gray-900 dark:via-gray-800 dark:to-black flex items-center justify-center p-4 transition-colors duration-300">
      <ThemeToggle />
      <div className="rounded-2xl shadow-2xl p-6 border transition-colors duration-300" style={{ backgroundColor: 'var(--calculator-bg)', borderColor: 'var(--calculator-border)' }}>
        {/* Display */}
        <div className="rounded-lg p-6 mb-4 text-right transition-colors duration-300" style={{ backgroundColor: 'var(--display-bg)' }}>
          <div className="text-4xl font-light tracking-wider min-h-[60px] flex items-center justify-end overflow-hidden transition-colors duration-300" style={{ color: 'var(--display-text)' }}>
            {display}
          </div>
        </div>

        {/* Button Grid */}
        <div className="grid grid-cols-4 gap-3">
          {/* Row 1 */}
          <button
            onClick={clear}
            className="font-semibold text-xl rounded-full h-16 w-16 transition-all duration-150 active:scale-95 hover:opacity-80"
            style={{ 
              backgroundColor: 'var(--button-gray)', 
              color: 'var(--button-gray-text)' 
            }}
          >
            AC
          </button>
          <button
            onClick={toggleSign}
            className="font-semibold text-xl rounded-full h-16 w-16 transition-all duration-150 active:scale-95 hover:opacity-80"
            style={{ 
              backgroundColor: 'var(--button-gray)', 
              color: 'var(--button-gray-text)' 
            }}
          >
            ±
          </button>
          <button
            onClick={percentage}
            className="font-semibold text-xl rounded-full h-16 w-16 transition-all duration-150 active:scale-95 hover:opacity-80"
            style={{ 
              backgroundColor: 'var(--button-gray)', 
              color: 'var(--button-gray-text)' 
            }}
          >
            %
          </button>
          <button
            onClick={() => performOperation('÷')}
            className="font-semibold text-2xl rounded-full h-16 w-16 transition-all duration-150 active:scale-95 hover:opacity-80"
            style={{
              backgroundColor: operation === '÷' ? 'white' : 'var(--button-orange)',
              color: operation === '÷' ? 'var(--button-orange)' : 'var(--button-orange-text)'
            }}
          >
            ÷
          </button>

          {/* Row 2 */}
          <button
            onClick={() => inputNumber('7')}
            className="font-semibold text-xl rounded-full h-16 w-16 transition-all duration-150 active:scale-95 hover:opacity-80"
            style={{ 
              backgroundColor: 'var(--button-dark)', 
              color: 'var(--button-dark-text)' 
            }}
          >
            7
          </button>
          <button
            onClick={() => inputNumber('8')}
            className="font-semibold text-xl rounded-full h-16 w-16 transition-all duration-150 active:scale-95 hover:opacity-80"
            style={{ 
              backgroundColor: 'var(--button-dark)', 
              color: 'var(--button-dark-text)' 
            }}
          >
            8
          </button>
          <button
            onClick={() => inputNumber('9')}
            className="font-semibold text-xl rounded-full h-16 w-16 transition-all duration-150 active:scale-95 hover:opacity-80"
            style={{ 
              backgroundColor: 'var(--button-dark)', 
              color: 'var(--button-dark-text)' 
            }}
          >
            9
          </button>
          <button
            onClick={() => performOperation('×')}
            className="font-semibold text-2xl rounded-full h-16 w-16 transition-all duration-150 active:scale-95 hover:opacity-80"
            style={{
              backgroundColor: operation === '×' ? 'white' : 'var(--button-orange)',
              color: operation === '×' ? 'var(--button-orange)' : 'var(--button-orange-text)'
            }}
          >
            ×
          </button>

          {/* Row 3 */}
          <button
            onClick={() => inputNumber('4')}
            className="font-semibold text-xl rounded-full h-16 w-16 transition-all duration-150 active:scale-95 hover:opacity-80"
            style={{ 
              backgroundColor: 'var(--button-dark)', 
              color: 'var(--button-dark-text)' 
            }}
          >
            4
          </button>
          <button
            onClick={() => inputNumber('5')}
            className="font-semibold text-xl rounded-full h-16 w-16 transition-all duration-150 active:scale-95 hover:opacity-80"
            style={{ 
              backgroundColor: 'var(--button-dark)', 
              color: 'var(--button-dark-text)' 
            }}
          >
            5
          </button>
          <button
            onClick={() => inputNumber('6')}
            className="font-semibold text-xl rounded-full h-16 w-16 transition-all duration-150 active:scale-95 hover:opacity-80"
            style={{ 
              backgroundColor: 'var(--button-dark)', 
              color: 'var(--button-dark-text)' 
            }}
          >
            6
          </button>
          <button
            onClick={() => performOperation('-')}
            className="font-semibold text-2xl rounded-full h-16 w-16 transition-all duration-150 active:scale-95 hover:opacity-80"
            style={{
              backgroundColor: operation === '-' ? 'white' : 'var(--button-orange)',
              color: operation === '-' ? 'var(--button-orange)' : 'var(--button-orange-text)'
            }}
          >
            −
          </button>

          {/* Row 4 */}
          <button
            onClick={() => inputNumber('1')}
            className="font-semibold text-xl rounded-full h-16 w-16 transition-all duration-150 active:scale-95 hover:opacity-80"
            style={{ 
              backgroundColor: 'var(--button-dark)', 
              color: 'var(--button-dark-text)' 
            }}
          >
            1
          </button>
          <button
            onClick={() => inputNumber('2')}
            className="font-semibold text-xl rounded-full h-16 w-16 transition-all duration-150 active:scale-95 hover:opacity-80"
            style={{ 
              backgroundColor: 'var(--button-dark)', 
              color: 'var(--button-dark-text)' 
            }}
          >
            2
          </button>
          <button
            onClick={() => inputNumber('3')}
            className="font-semibold text-xl rounded-full h-16 w-16 transition-all duration-150 active:scale-95 hover:opacity-80"
            style={{ 
              backgroundColor: 'var(--button-dark)', 
              color: 'var(--button-dark-text)' 
            }}
          >
            3
          </button>
          <button
            onClick={() => performOperation('+')}
            className="font-semibold text-2xl rounded-full h-16 w-16 transition-all duration-150 active:scale-95 hover:opacity-80"
            style={{
              backgroundColor: operation === '+' ? 'white' : 'var(--button-orange)',
              color: operation === '+' ? 'var(--button-orange)' : 'var(--button-orange-text)'
            }}
          >
            +
          </button>

          {/* Row 5 */}
          <button
            onClick={() => inputNumber('0')}
            className="font-semibold text-xl rounded-full h-16 w-32 col-span-2 transition-all duration-150 active:scale-95 hover:opacity-80"
            style={{ 
              backgroundColor: 'var(--button-dark)', 
              color: 'var(--button-dark-text)' 
            }}
          >
            0
          </button>
          <button
            onClick={inputDecimal}
            className="font-semibold text-xl rounded-full h-16 w-16 transition-all duration-150 active:scale-95 hover:opacity-80"
            style={{ 
              backgroundColor: 'var(--button-dark)', 
              color: 'var(--button-dark-text)' 
            }}
          >
            .
          </button>
          <button
            onClick={handleEquals}
            className="font-semibold text-2xl rounded-full h-16 w-16 transition-all duration-150 active:scale-95 hover:opacity-80"
            style={{ 
              backgroundColor: 'var(--button-orange)', 
              color: 'var(--button-orange-text)' 
            }}
          >
            =
          </button>
        </div>
      </div>
    </div>
  );
}









