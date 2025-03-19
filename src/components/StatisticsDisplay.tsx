
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  ChevronUp, 
  ChevronDown, 
  Zap
} from 'lucide-react';

interface StatisticsDisplayProps {
  wpm: number;
  accuracy: number;
  errors: number;
  time: number;
  prevWpm?: number;
}

const StatisticsDisplay: React.FC<StatisticsDisplayProps> = ({ 
  wpm, 
  accuracy, 
  errors, 
  time,
  prevWpm 
}) => {
  // Calculate if performance is better or worse than previous
  const hasImproved = prevWpm !== undefined && wpm > prevWpm;
  const hasDegraded = prevWpm !== undefined && wpm < prevWpm;
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <StatCard 
        title="WPM" 
        value={wpm.toFixed(1)} 
        icon={<Zap className="h-5 w-5 text-yellow-400" />}
        improved={hasImproved}
        degraded={hasDegraded}
        diff={prevWpm ? Math.abs(wpm - prevWpm).toFixed(1) : undefined}
      />
      
      <StatCard 
        title="Accuracy" 
        value={`${accuracy.toFixed(1)}%`} 
        icon={<CheckCircle className="h-5 w-5 text-green-400" />}
      />
      
      <StatCard 
        title="Errors" 
        value={errors.toString()} 
        icon={<XCircle className="h-5 w-5 text-red-400" />}
      />
      
      <StatCard 
        title="Time" 
        value={formatTime(time)} 
        icon={<Clock className="h-5 w-5 text-blue-400" />}
      />
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  improved?: boolean;
  degraded?: boolean;
  diff?: string;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon,
  improved,
  degraded,
  diff
}) => {
  return (
    <motion.div 
      className="glass-card p-4 flex flex-col items-center justify-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
      </div>
      
      <div className="text-2xl font-bold">{value}</div>
      
      {(improved || degraded) && diff && (
        <div className={`flex items-center text-xs mt-1 ${improved ? 'text-green-500' : 'text-red-500'}`}>
          {improved ? (
            <ChevronUp className="h-3 w-3 mr-1" />
          ) : (
            <ChevronDown className="h-3 w-3 mr-1" />
          )}
          <span>{diff}</span>
        </div>
      )}
    </motion.div>
  );
};

// Helper function to format time in MM:SS format
const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

export default StatisticsDisplay;
