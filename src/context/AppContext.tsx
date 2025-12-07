import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  name: string;
  pseudonym: string;
  email: string;
  avatar: string;
  mood: 'positive' | 'neutral' | 'negative';
  stressType: 'fatigue' | 'anxiety' | 'overwhelm' | 'general';
  musicPreference: 'nature' | 'classical' | 'ambient' | 'none';
  level: number;
  xp: number;
  streakDays: number;
  calmPoints: number;
  gardenProgress: any[];
}

interface Task {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
  estimatedTime: number;
}

interface MoodEntry {
  date: string;
  mood: number;
  stressLevel: number;
  notes: string;
}

interface CalmNote {
  id: string;
  text: string;
  color: string;
  category: string;
  date: string;
}

interface AppContextType {
  user: User;
  setUser: (user: User) => void;
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  moodEntries: MoodEntry[];
  addMoodEntry: (entry: MoodEntry) => void;
  addXP: (amount: number) => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  calmNotes: CalmNote[];
  addCalmNote: (note: Omit<CalmNote, 'id' | 'date'>) => void;
  addCalmPoints: (points: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>({
    name: '',
    pseudonym: '',
    email: '',
    avatar: '🧑‍🎓',
    mood: 'neutral',
    stressType: 'general',
    musicPreference: 'none',
    level: 1,
    xp: 0,
    streakDays: 0,
    calmPoints: 0,
    gardenProgress: []
  });

  const [tasks, setTasks] = useState<Task[]>([]);
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [calmNotes, setCalmNotes] = useState<CalmNote[]>([]);

  const addMoodEntry = (entry: MoodEntry) => {
    setMoodEntries(prev => [entry, ...prev.slice(0, 29)]); // Keep last 30 entries
  };

  const addXP = (amount: number) => {
    setUser(prev => {
      const newXP = prev.xp + amount;
      const newLevel = Math.floor(newXP / 100) + 1;
      return { ...prev, xp: newXP, level: newLevel };
    });
  };

  const addCalmPoints = (points: number) => {
    setUser(prev => ({ ...prev, calmPoints: prev.calmPoints + points }));
  };

  const addCalmNote = (note: Omit<CalmNote, 'id' | 'date'>) => {
    const newNote: CalmNote = {
      ...note,
      id: Date.now().toString(),
      date: new Date().toISOString()
    };
    setCalmNotes(prev => [newNote, ...prev]);
  };

  // Load data from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('stressless-user');
    const savedTasks = localStorage.getItem('stressless-tasks');
    const savedMoods = localStorage.getItem('stressless-moods');
    const savedSound = localStorage.getItem('stressless-sound');
    const savedNotes = localStorage.getItem('stressless-notes');

    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedTasks) setTasks(JSON.parse(savedTasks));
    if (savedMoods) setMoodEntries(JSON.parse(savedMoods));
    if (savedSound) setSoundEnabled(JSON.parse(savedSound));
    if (savedNotes) setCalmNotes(JSON.parse(savedNotes));
  }, []);

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem('stressless-user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('stressless-tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('stressless-moods', JSON.stringify(moodEntries));
  }, [moodEntries]);

  useEffect(() => {
    localStorage.setItem('stressless-sound', JSON.stringify(soundEnabled));
  }, [soundEnabled]);

  useEffect(() => {
    localStorage.setItem('stressless-notes', JSON.stringify(calmNotes));
  }, [calmNotes]);

  return (
    <AppContext.Provider value={{
      user,
      setUser,
      tasks,
      setTasks,
      moodEntries,
      addMoodEntry,
      addXP,
      soundEnabled,
      setSoundEnabled,
      calmNotes,
      addCalmNote,
      addCalmPoints
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};