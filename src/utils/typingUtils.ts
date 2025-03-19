
/**
 * Calculate the typing speed in words per minute (WPM)
 * In programming, we consider 5 characters as one word
 */
export const calculateWPM = (characterCount: number, seconds: number): number => {
  if (seconds === 0) return 0;
  
  // 5 characters = 1 word
  const words = characterCount / 5;
  const minutes = seconds / 60;
  
  return words / minutes;
};

/**
 * Calculate the accuracy percentage
 */
export const calculateAccuracy = (typed: string, original: string): number => {
  let correctChars = 0;
  const minLength = Math.min(typed.length, original.length);
  
  for (let i = 0; i < minLength; i++) {
    if (typed[i] === original[i]) {
      correctChars++;
    }
  }
  
  // Account for extra characters typed (penalties)
  const extraChars = Math.max(0, typed.length - original.length);
  
  const totalChars = Math.max(typed.length, original.length);
  return (correctChars / totalChars) * 100;
};

/**
 * Get the current date formatted as YYYY-MM-DD
 */
export const getFormattedDate = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
};

/**
 * Save typing session results to local storage
 */
export const saveResult = (wpm: number, accuracy: number, time: number): void => {
  const date = getFormattedDate();
  
  // Get existing results
  const resultsJson = localStorage.getItem('typingResults');
  const results = resultsJson ? JSON.parse(resultsJson) : [];
  
  // Add new result
  results.push({
    date,
    wpm,
    accuracy,
    time
  });
  
  // Save back to localStorage
  localStorage.setItem('typingResults', JSON.stringify(results));
};

/**
 * Get all saved typing results
 */
export const getResults = () => {
  const resultsJson = localStorage.getItem('typingResults');
  return resultsJson ? JSON.parse(resultsJson) : [];
};

/**
 * Get the average WPM from all results
 */
export const getAverageWPM = (): number => {
  const results = getResults();
  
  if (results.length === 0) return 0;
  
  const totalWPM = results.reduce((sum: number, result: any) => sum + result.wpm, 0);
  return totalWPM / results.length;
};

/**
 * Get the average accuracy from all results
 */
export const getAverageAccuracy = (): number => {
  const results = getResults();
  
  if (results.length === 0) return 0;
  
  const totalAccuracy = results.reduce((sum: number, result: any) => sum + result.accuracy, 0);
  return totalAccuracy / results.length;
};

/**
 * Get the best WPM score
 */
export const getBestWPM = (): number => {
  const results = getResults();
  
  if (results.length === 0) return 0;
  
  return Math.max(...results.map((result: any) => result.wpm));
};

/**
 * Get total practice time in seconds
 */
export const getTotalPracticeTime = (): number => {
  const results = getResults();
  
  if (results.length === 0) return 0;
  
  return results.reduce((sum: number, result: any) => sum + result.time, 0);
};
