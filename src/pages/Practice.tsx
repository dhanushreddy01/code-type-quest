
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import LanguageSelector, { Language } from '../components/LanguageSelector';
import CodeTypingArea from '../components/CodeTypingArea';
import StatisticsDisplay from '../components/StatisticsDisplay';
import { getRandomSnippet } from '../utils/codeSnippets';
import { saveResult, getAverageWPM } from '../utils/typingUtils';
import { RefreshCw } from 'lucide-react';

const Practice = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('javascript');
  const [currentSnippet, setCurrentSnippet] = useState(getRandomSnippet(selectedLanguage));
  const [stats, setStats] = useState({ wpm: 0, accuracy: 100, errors: 0, time: 0 });
  const [prevWpm, setPrevWpm] = useState<number | undefined>(undefined);
  
  // Update snippet when language changes
  useEffect(() => {
    loadNewSnippet();
  }, [selectedLanguage]);
  
  const loadNewSnippet = () => {
    // Save previous WPM for comparison
    if (stats.wpm > 0) {
      setPrevWpm(stats.wpm);
    }
    
    setCurrentSnippet(getRandomSnippet(selectedLanguage));
    setStats({ wpm: 0, accuracy: 100, errors: 0, time: 0 });
  };
  
  const handleComplete = (newStats: { wpm: number; accuracy: number; errors: number; time: number }) => {
    setStats(newStats);
    
    // Save results to local storage
    saveResult(newStats.wpm, newStats.accuracy, newStats.time);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Code Typing Practice</h1>
              <p className="text-muted-foreground">
                Type the code snippet as accurately and quickly as possible.
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <LanguageSelector
                selectedLanguage={selectedLanguage}
                onLanguageChange={setSelectedLanguage}
              />
              
              <button 
                onClick={loadNewSnippet}
                className="glass-card p-2.5 rounded-lg hover:bg-white/20 dark:hover:bg-white/10 transition-colors duration-200"
                aria-label="Load new snippet"
              >
                <RefreshCw className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          <div className="glass-card p-6 rounded-xl mb-8">
            <div className="flex flex-col sm:flex-row items-start justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl font-medium mb-1">{currentSnippet.title}</h2>
                <p className="text-sm text-muted-foreground">{currentSnippet.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block px-2.5 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                  {currentSnippet.difficulty}
                </span>
                <span className="inline-block px-2.5 py-1 bg-secondary text-secondary-foreground text-xs font-medium rounded-full">
                  {currentSnippet.language}
                </span>
              </div>
            </div>
            
            <CodeTypingArea 
              code={currentSnippet.code} 
              language={selectedLanguage}
              onComplete={handleComplete}
            />
          </div>
          
          <div className="mb-6">
            <h2 className="text-xl font-medium mb-4">Your Performance</h2>
            <StatisticsDisplay 
              wpm={stats.wpm} 
              accuracy={stats.accuracy} 
              errors={stats.errors} 
              time={stats.time}
              prevWpm={prevWpm}
            />
          </div>
          
          <div className="glass-card p-6 rounded-xl">
            <h2 className="text-xl font-medium mb-4">Tips for Improvement</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="inline-block h-5 w-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center mt-0.5">1</span>
                <span>Focus on accuracy first, then speed will follow naturally.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="inline-block h-5 w-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center mt-0.5">2</span>
                <span>Practice consistently, even just 10-15 minutes per day makes a difference.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="inline-block h-5 w-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center mt-0.5">3</span>
                <span>Pay attention to common mistakes and work specifically on those characters or patterns.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="inline-block h-5 w-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center mt-0.5">4</span>
                <span>Try different languages to develop familiarity with various syntax patterns.</span>
              </li>
            </ul>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Practice;
