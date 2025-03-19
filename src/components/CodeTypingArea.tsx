
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RefreshCw } from 'lucide-react';
import { Language } from './LanguageSelector';
import { calculateAccuracy, calculateWPM } from '../utils/typingUtils';

interface CodeTypingAreaProps {
  code: string;
  language: Language;
  onComplete: (stats: { wpm: number; accuracy: number; errors: number; time: number }) => void;
}

const CodeTypingArea: React.FC<CodeTypingAreaProps> = ({ code, language, onComplete }) => {
  const [typedCode, setTypedCode] = useState<string>('');
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [errors, setErrors] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [lastErrorPosition, setLastErrorPosition] = useState<number | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Split code into lines for display
  const codeLines = code.split('\n');
  const typedLines = typedCode.split('\n');

  // Effect for timer
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isStarted && !isPaused && !isCompleted) {
      interval = setInterval(() => {
        const elapsedSeconds = startTime ? Math.floor((Date.now() - startTime) / 1000) : 0;
        setCurrentTime(elapsedSeconds);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isStarted, isPaused, startTime, isCompleted]);

  // Handle keydown in textarea
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (!isStarted && !isPaused) {
      setIsStarted(true);
      setStartTime(Date.now());
    }

    const currentPosition = typedCode.length;
    const expectedChar = code[currentPosition];
    
    // Handle special cases like Tab key
    if (e.key === 'Tab' && expectedChar === '\t') {
      e.preventDefault();
      const cursorPosition = e.currentTarget.selectionStart;
      const newValue = typedCode.substring(0, cursorPosition) + '  ' + typedCode.substring(cursorPosition);
      setTypedCode(newValue);
      
      // Set cursor position after inserted tabs
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = cursorPosition + 2;
        }
      }, 0);
      return;
    }
    
    // Check if current input is incorrect and highlight it
    if (e.key.length === 1 && e.key !== expectedChar) {
      // Set the last error position to highlight the error
      setLastErrorPosition(currentPosition);
      
      // Block incorrect input
      e.preventDefault();
      return;
    } else {
      // Clear error highlight when typing correctly
      setLastErrorPosition(null);
    }
    
    // Block incorrect input - don't process it
    if (
      // Allow navigation keys
      !['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End', 'PageUp', 'PageDown'].includes(e.key) &&
      // Allow control keys
      !(e.ctrlKey || e.metaKey) &&
      // Allow expected character or backspace/delete
      e.key !== 'Backspace' && 
      e.key !== 'Delete' && 
      // Single character keys that don't match expected char
      (e.key.length === 1 && e.key !== expectedChar)
    ) {
      e.preventDefault();
      return;
    }
    
    // Allow backspace only if there's something to delete
    if (e.key === 'Backspace' && typedCode.length === 0) {
      e.preventDefault();
      return;
    }
  }, [isStarted, isPaused, typedCode, code]);

  // Handle input in textarea
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    
    // Only allow input that matches the expected characters
    let validInput = '';
    let currentErrors = 0;
    
    // Check each character to ensure it matches the expected character in the code
    for (let i = 0; i < newValue.length; i++) {
      if (i < code.length && newValue[i] === code[i]) {
        validInput += newValue[i];
      } else {
        // If character doesn't match, don't add it to validInput
        // but count it as an error if it's within code length
        if (i < code.length) {
          currentErrors++;
        }
        break; // Stop processing after first error
      }
    }
    
    // Update typed code with only valid input
    setTypedCode(validInput);
    setErrors(currentErrors);

    // Check if completed
    if (validInput.length >= code.length) {
      setIsCompleted(true);
      setIsPaused(true);
      
      // Calculate final stats
      const accuracy = calculateAccuracy(validInput, code);
      const wpm = calculateWPM(validInput.length, currentTime);
      
      onComplete({
        wpm,
        accuracy,
        errors: currentErrors,
        time: currentTime
      });
    }
  };

  // Focus the textarea
  useEffect(() => {
    if (textareaRef.current && !isPaused) {
      textareaRef.current.focus();
    }
  }, [isStarted, isPaused]);

  // Handle restart
  const handleRestart = () => {
    setTypedCode('');
    setIsStarted(false);
    setIsPaused(false);
    setStartTime(null);
    setCurrentTime(0);
    setErrors(0);
    setIsCompleted(false);
    setLastErrorPosition(null);
    
    // Focus the textarea after reset
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }, 0);
  };

  // Toggle pause
  const togglePause = () => {
    if (!isCompleted) {
      if (isPaused) {
        // Resume - adjust the start time
        setStartTime(startTime => startTime ? Date.now() - (currentTime * 1000) : Date.now());
      }
      setIsPaused(!isPaused);
    }
  };

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          <button
            onClick={togglePause}
            className="glass-card px-3 py-1.5 rounded-md flex items-center space-x-1 text-sm transition-colors duration-200 hover:bg-primary/10"
            disabled={!isStarted || isCompleted}
          >
            {isPaused ? (
              <>
                <Play className="h-4 w-4 mr-1" />
                Resume
              </>
            ) : (
              <>
                <Pause className="h-4 w-4 mr-1" />
                Pause
              </>
            )}
          </button>
          
          <button
            onClick={handleRestart}
            className="glass-card px-3 py-1.5 rounded-md flex items-center space-x-1 text-sm transition-colors duration-200 hover:bg-primary/10"
          >
            <RefreshCw className="h-4 w-4 mr-1" />
            Restart
          </button>
        </div>
        
        <div className="text-sm">
          <span className="text-muted-foreground">Time:</span>{' '}
          <span className="font-mono">{Math.floor(currentTime / 60)}:{(currentTime % 60).toString().padStart(2, '0')}</span>
        </div>
      </div>

      <div className="relative">
        {/* Visible code display */}
        <div 
          className="code-container font-mono text-sm leading-6 overflow-x-auto"
          style={{ minHeight: '300px' }}
        >
          {codeLines.map((line, lineIndex) => (
            <div key={lineIndex} className="code-line">
              <span className="line-number">{lineIndex + 1}</span>
              <div className="flex-1">
                {Array.from(line).map((char, charIndex) => {
                  const absoluteIndex = codeLines.slice(0, lineIndex).join('\n').length + (lineIndex > 0 ? 1 : 0) + charIndex;
                  const typedChar = typedLines[lineIndex]?.[charIndex];
                  
                  // Determine character class based on typing status
                  let className = "character character-pending";
                  
                  if (typedChar !== undefined) {
                    // Character has been typed - show as correct
                    className = "character character-correct";
                  }
                  
                  // Check if this is the position of the last error
                  if (absoluteIndex === lastErrorPosition) {
                    className = "character character-error";
                  }
                  
                  // Add cursor after the last typed character
                  const showCursor = typedCode.length === absoluteIndex;
                  
                  return (
                    <React.Fragment key={`${lineIndex}-${charIndex}`}>
                      <span className={className}>
                        {char === ' ' ? <>&nbsp;</> : char === '\t' ? <>&nbsp;&nbsp;</> : char}
                      </span>
                      {showCursor && <span className="typing-cursor"></span>}
                    </React.Fragment>
                  );
                })}
                {/* Handle cursor at end of line */}
                {typedCode.length === codeLines.slice(0, lineIndex + 1).join('\n').length + (lineIndex > 0 ? 1 : 0) && (
                  <span className="typing-cursor"></span>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {/* Hidden textarea for capturing input */}
        <textarea
          ref={textareaRef}
          value={typedCode}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="absolute top-0 left-0 w-full h-full opacity-0 resize-none cursor-default"
          spellCheck="false"
          autoCorrect="off"
          autoCapitalize="off"
          autoComplete="off"
          aria-label="Code typing area"
          disabled={isPaused || isCompleted}
        />
      </div>
      
      <AnimatePresence>
        {isCompleted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mt-6 glass-card p-4 rounded-lg"
          >
            <h3 className="text-lg font-semibold mb-2 text-center">Completed!</h3>
            <div className="flex justify-center space-x-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Typing Speed</p>
                <p className="text-xl font-bold">{calculateWPM(typedCode.length, currentTime).toFixed(1)} WPM</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Accuracy</p>
                <p className="text-xl font-bold">{calculateAccuracy(typedCode, code).toFixed(1)}%</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Errors</p>
                <p className="text-xl font-bold">{errors}</p>
              </div>
            </div>
            <div className="mt-4 flex justify-center">
              <button
                onClick={handleRestart}
                className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200"
              >
                Try Again
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CodeTypingArea;
