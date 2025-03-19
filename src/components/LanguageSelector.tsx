
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Code, FileJson, Braces, Blocks, FileText, Server, ScrollText, ArrowRightLeft } from 'lucide-react';

export type Language = 
  | 'javascript' 
  | 'python' 
  | 'typescript' 
  | 'java' 
  | 'cpp' 
  | 'csharp'
  | 'html'
  | 'css'
  | 'reactjs'
  | 'nodejs'
  | 'r'
  | 'reactnative'
  | 'nextjs'
  | 'golang'
  | 'ruby'
  | 'php'
  | 'swift';

interface LanguageSelectorProps {
  selectedLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

const languages: { value: Language; label: string; icon: React.ReactNode }[] = [
  { value: 'javascript', label: 'JavaScript', icon: <Code className="h-4 w-4" /> },
  { value: 'typescript', label: 'TypeScript', icon: <FileJson className="h-4 w-4" /> },
  { value: 'python', label: 'Python', icon: <Code className="h-4 w-4" /> },
  { value: 'java', label: 'Java', icon: <Code className="h-4 w-4" /> },
  { value: 'cpp', label: 'C++', icon: <Braces className="h-4 w-4" /> },
  { value: 'csharp', label: 'C#', icon: <Braces className="h-4 w-4" /> },
  { value: 'html', label: 'HTML', icon: <FileText className="h-4 w-4" /> },
  { value: 'css', label: 'CSS', icon: <ScrollText className="h-4 w-4" /> },
  { value: 'reactjs', label: 'React.js', icon: <ArrowRightLeft className="h-4 w-4" /> },
  { value: 'nodejs', label: 'Node.js', icon: <Server className="h-4 w-4" /> },
  { value: 'r', label: 'R', icon: <Code className="h-4 w-4" /> },
  { value: 'reactnative', label: 'React Native', icon: <ArrowRightLeft className="h-4 w-4" /> },
  { value: 'nextjs', label: 'Next.js', icon: <ArrowRightLeft className="h-4 w-4" /> },
  { value: 'golang', label: 'Go', icon: <Code className="h-4 w-4" /> },
  { value: 'ruby', label: 'Ruby', icon: <Code className="h-4 w-4" /> },
  { value: 'php', label: 'PHP', icon: <Code className="h-4 w-4" /> },
  { value: 'swift', label: 'Swift', icon: <Code className="h-4 w-4" /> },
];

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ selectedLanguage, onLanguageChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedLanguageItem = languages.find(lang => lang.value === selectedLanguage);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="glass-card px-4 py-2 rounded-lg flex items-center justify-between min-w-40 text-sm font-medium text-foreground"
      >
        <div className="flex items-center gap-2">
          {selectedLanguageItem?.icon}
          <span>{selectedLanguageItem?.label || 'Select Language'}</span>
        </div>
        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 top-full left-0 mt-2 w-full max-h-80 overflow-y-auto rounded-lg glass-card shadow-lg border border-white/20"
          >
            <div className="p-1">
              {languages.map((language) => (
                <motion.button
                  key={language.value}
                  whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                  className={`w-full px-3 py-2 text-left rounded-md flex items-center gap-2 text-sm ${
                    selectedLanguage === language.value ? 'bg-primary/10 text-primary' : 'text-foreground'
                  }`}
                  onClick={() => {
                    onLanguageChange(language.value);
                    setIsOpen(false);
                  }}
                >
                  {language.icon}
                  {language.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSelector;
