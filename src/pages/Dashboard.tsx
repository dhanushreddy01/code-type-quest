
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import ProgressDashboard from '../components/ProgressDashboard';
import { 
  getResults, 
  getAverageWPM, 
  getAverageAccuracy, 
  getBestWPM, 
  getTotalPracticeTime 
} from '../utils/typingUtils';

interface TypingResult {
  date: string;
  wpm: number;
  accuracy: number;
  time: number;
}

const Dashboard = () => {
  const [progressData, setProgressData] = useState<TypingResult[]>([]);
  const [averageWpm, setAverageWpm] = useState(0);
  const [averageAccuracy, setAverageAccuracy] = useState(0);
  const [bestWpm, setBestWpm] = useState(0);
  const [totalPracticeTime, setTotalPracticeTime] = useState(0);
  
  useEffect(() => {
    // Load data from localStorage
    loadStats();
  }, []);
  
  const loadStats = () => {
    const results = getResults();
    setProgressData(results);
    
    setAverageWpm(getAverageWPM());
    setAverageAccuracy(getAverageAccuracy());
    setBestWpm(getBestWPM());
    setTotalPracticeTime(getTotalPracticeTime());
  };
  
  // For demo purposes, add some sample data if none exists
  useEffect(() => {
    if (progressData.length === 0) {
      const sampleData = generateSampleData();
      setProgressData(sampleData);
      
      // Calculate stats from sample data
      const totalWpm = sampleData.reduce((sum, item) => sum + item.wpm, 0);
      const totalAccuracy = sampleData.reduce((sum, item) => sum + item.accuracy, 0);
      const maxWpm = Math.max(...sampleData.map(item => item.wpm));
      const totalTime = sampleData.reduce((sum, item) => sum + item.time, 0);
      
      setAverageWpm(totalWpm / sampleData.length);
      setAverageAccuracy(totalAccuracy / sampleData.length);
      setBestWpm(maxWpm);
      setTotalPracticeTime(totalTime);
    }
  }, [progressData]);
  
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
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Your Progress Dashboard</h1>
            <p className="text-muted-foreground">
              Track your typing performance and see how you've improved over time.
            </p>
          </div>
          
          {progressData.length > 0 ? (
            <ProgressDashboard 
              progressData={progressData}
              averageWpm={averageWpm}
              averageAccuracy={averageAccuracy}
              bestWpm={bestWpm}
              totalPracticeTime={totalPracticeTime}
            />
          ) : (
            <div className="glass-card p-8 rounded-xl text-center">
              <h2 className="text-xl font-medium mb-4">No Practice Data Yet</h2>
              <p className="text-muted-foreground mb-6">
                Complete some typing practice exercises to see your statistics here.
              </p>
              <a 
                href="/practice" 
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-200"
              >
                Start Practicing
              </a>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
};

// Generate sample data for demonstration
const generateSampleData = () => {
  const data = [];
  const today = new Date();
  
  // Generate data for the last 14 days
  for (let i = 13; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    // Format date as YYYY-MM-DD
    const formattedDate = date.toISOString().split('T')[0];
    
    // Generate random WPM with an upward trend
    const baseWpm = 30 + Math.floor(Math.random() * 10);
    const trendWpm = baseWpm + (13 - i) * 1.5;
    
    // Generate random accuracy between 85-98%
    const accuracy = 85 + Math.floor(Math.random() * 13);
    
    // Random practice time between 3-10 minutes
    const time = (3 + Math.floor(Math.random() * 7)) * 60;
    
    data.push({
      date: formattedDate,
      wpm: trendWpm,
      accuracy,
      time
    });
  }
  
  return data;
};

export default Dashboard;
