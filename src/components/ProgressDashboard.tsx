
import React from 'react';
import { motion } from 'framer-motion';
import { Area, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUp, ArrowDown, Zap, Target } from 'lucide-react';

interface ProgressData {
  date: string;
  wpm: number;
  accuracy: number;
}

interface ProgressDashboardProps {
  progressData: ProgressData[];
  averageWpm: number;
  averageAccuracy: number;
  bestWpm: number;
  totalPracticeTime: number;
}

const ProgressDashboard: React.FC<ProgressDashboardProps> = ({
  progressData,
  averageWpm,
  averageAccuracy,
  bestWpm,
  totalPracticeTime,
}) => {
  // Calculate trend (is performance improving?)
  const dataLength = progressData.length;
  let trend = 0;
  
  if (dataLength > 3) {
    const recentAvg = progressData.slice(-3).reduce((sum, item) => sum + item.wpm, 0) / 3;
    const previousAvg = progressData.slice(-6, -3).reduce((sum, item) => sum + item.wpm, 0) / 3;
    trend = recentAvg - previousAvg;
  }

  // Format total practice time
  const formatPracticeTime = () => {
    const hours = Math.floor(totalPracticeTime / 3600);
    const minutes = Math.floor((totalPracticeTime % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatsCard 
          title="Average WPM" 
          value={averageWpm.toFixed(1)}
          icon={<Zap className="h-5 w-5 text-yellow-400" />}
          trend={trend}
        />
        
        <StatsCard 
          title="Best WPM" 
          value={bestWpm.toFixed(1)}
          icon={<Target className="h-5 w-5 text-green-400" />}
        />
        
        <StatsCard 
          title="Accuracy" 
          value={`${averageAccuracy.toFixed(1)}%`}
          icon={<Target className="h-5 w-5 text-blue-400" />}
        />
        
        <StatsCard 
          title="Practice Time" 
          value={formatPracticeTime()}
          icon={<Zap className="h-5 w-5 text-purple-400" />}
        />
      </div>

      {/* Progress Chart */}
      <motion.div 
        className="glass-card p-4 rounded-lg"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-lg font-medium mb-4">WPM Progress</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={progressData}
              margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
            >
              <defs>
                <linearGradient id="wpmGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }} 
                tickLine={false} 
                axisLine={false}
              />
              <YAxis 
                tick={{ fontSize: 12 }} 
                tickLine={false} 
                axisLine={false} 
                domain={['auto', 'auto']}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                  borderRadius: '8px', 
                  border: 'none',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' 
                }} 
              />
              <Area 
                type="monotone" 
                dataKey="wpm" 
                stroke="hsl(var(--primary))" 
                fillOpacity={1} 
                fill="url(#wpmGradient)" 
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Accuracy Chart */}
      <motion.div 
        className="glass-card p-4 rounded-lg"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="text-lg font-medium mb-4">Accuracy Progress</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={progressData}
              margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
            >
              <defs>
                <linearGradient id="accuracyGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }} 
                tickLine={false} 
                axisLine={false} 
              />
              <YAxis 
                tick={{ fontSize: 12 }} 
                tickLine={false} 
                axisLine={false} 
                domain={[60, 100]}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                  borderRadius: '8px', 
                  border: 'none',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' 
                }} 
              />
              <Area 
                type="monotone" 
                dataKey="accuracy" 
                stroke="#10b981" 
                fillOpacity={1} 
                fill="url(#accuracyGradient)" 
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </motion.div>
  );
};

interface StatsCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: number;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon, trend }) => {
  return (
    <motion.div 
      className="glass-card p-4 rounded-lg"
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
      </div>
      <div className="text-2xl font-bold">{value}</div>
      
      {trend !== undefined && (
        <div className={`flex items-center text-xs mt-1 ${trend > 0 ? 'text-green-500' : trend < 0 ? 'text-red-500' : 'text-muted-foreground'}`}>
          {trend > 0 ? (
            <>
              <ArrowUp className="h-3 w-3 mr-1" />
              <span>+{trend.toFixed(1)}</span>
            </>
          ) : trend < 0 ? (
            <>
              <ArrowDown className="h-3 w-3 mr-1" />
              <span>{trend.toFixed(1)}</span>
            </>
          ) : (
            <span>No change</span>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default ProgressDashboard;
