
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Code, BarChart2, Zap, ArrowRight } from 'lucide-react';
import Header from '../components/Header';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      
      <main className="flex-1">
        {/* Hero section */}
        <section className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-block mb-3 px-3 py-1 bg-primary/10 rounded-full">
                <span className="text-sm font-medium text-primary">Improve your coding speed</span>
              </div>
              
              <h1 className="text-5xl font-bold mb-6 leading-tight">
                <span className="text-gradient">Master Code Typing</span> with 
                Precision and Speed
              </h1>
              
              <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
                Enhance your coding skills through interactive typing practice. 
                Train your muscle memory, improve accuracy, and code faster with real-world examples.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/practice" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-200">
                  Start Typing Practice
                  <ArrowRight className="h-4 w-4" />
                </Link>
                
                <Link to="/dashboard" className="inline-flex items-center justify-center gap-2 px-6 py-3 glass-card hover:bg-white/20 dark:hover:bg-white/10 rounded-lg transition-all duration-200">
                  View Your Progress
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Features section */}
        <section className="py-16 bg-secondary/50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Key Features</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our typing practice platform is designed specifically for programmers to improve their coding efficiency.
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard 
                icon={<Code className="h-6 w-6 text-primary" />}
                title="Multiple Languages"
                description="Practice with real code snippets in JavaScript, TypeScript, Python, Java, C++, and C#."
                delay={0.3}
              />
              
              <FeatureCard 
                icon={<Zap className="h-6 w-6 text-primary" />}
                title="Real-time Feedback"
                description="Get instant feedback on your typing speed, accuracy, and errors to track improvement."
                delay={0.4}
              />
              
              <FeatureCard 
                icon={<BarChart2 className="h-6 w-6 text-primary" />}
                title="Progress Tracking"
                description="Monitor your improvement over time with detailed statistics and visualizations."
                delay={0.5}
              />
            </div>
          </div>
        </section>
        
        {/* How it works section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">How It Works</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Simple steps to improve your code typing skills
              </p>
            </motion.div>
            
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-3 gap-6">
                <StepCard 
                  number={1}
                  title="Choose a Language"
                  description="Select from multiple programming languages based on your preference."
                  delay={0.7}
                />
                
                <StepCard 
                  number={2}
                  title="Type the Code"
                  description="Practice typing code snippets with real-time error highlighting and feedback."
                  delay={0.8}
                />
                
                <StepCard 
                  number={3}
                  title="Track Progress"
                  description="Analyze your performance metrics and watch your typing skills improve over time."
                  delay={0.9}
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA section */}
        <section className="py-16 bg-primary/5">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.0 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="text-3xl font-bold mb-6">Ready to Become a Faster Coder?</h2>
              <p className="text-muted-foreground mb-8">
                Join thousands of developers who are improving their coding speed and accuracy with our typing practice platform.
              </p>
              
              <Link to="/practice" className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-200">
                Start Practice Now
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      
      <footer className="bg-secondary/80 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            © {new Date().getFullYear()} CodeTypr. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, delay }) => {
  return (
    <motion.div 
      className="glass-card p-6 rounded-xl hover:shadow-lg transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="p-3 bg-primary/10 rounded-lg inline-block mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  );
};

interface StepCardProps {
  number: number;
  title: string;
  description: string;
  delay: number;
}

const StepCard: React.FC<StepCardProps> = ({ number, title, description, delay }) => {
  return (
    <motion.div 
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="glass-card p-6 rounded-xl relative z-10 h-full">
        <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center mb-4">
          <span className="text-primary font-bold">{number}</span>
        </div>
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </motion.div>
  );
};

export default Index;
