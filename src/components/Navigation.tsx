import React from 'react';
import { Home, User, Brain, Bot as Lotus, BookOpen, MessageCircle, TrendingUp, Zap, Flower2, Music, StickyNote, Phone } from 'lucide-react';

interface NavigationProps {
  currentSection: string;
  onSectionChange: (section: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentSection, onSectionChange }) => {
  const navItems = [
    { id: 'dashboard', label: 'Inicio', icon: Home, color: 'blue' },
    { id: 'profile', label: 'Perfil', icon: User, color: 'purple' },
    { id: 'stress-test', label: 'Test de Estrés', icon: Brain, color: 'indigo' },
    { id: 'meditation', label: 'Relajación', icon: Lotus, color: 'green' },
    { id: 'garden', label: 'Jardín', icon: Flower2, color: 'emerald' },
    { id: 'music', label: 'Música', icon: Music, color: 'violet' },
    { id: 'academic', label: 'Académico', icon: BookOpen, color: 'orange' },
    { id: 'support', label: 'Apoyo', icon: MessageCircle, color: 'pink' },
    { id: 'calm-wall', label: 'Mural', icon: StickyNote, color: 'cyan' },
    { id: 'progress', label: 'Progreso', icon: TrendingUp, color: 'emerald' },//
    { id: 'contact', label: 'Contacto', icon: Phone, color: 'gray' }
  ];

  return (
    <nav className="bg-white/90 backdrop-blur-md border-b border-gray-100 sticky top-16 z-40">
      <div className="container mx-auto px-4">
        <div className="flex space-x-1 overflow-x-auto py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={`
                  flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap
                  transition-all duration-200 transform hover:scale-105
                  ${isActive 
                    ? `bg-${item.color}-100 text-${item.color}-700 border-2 border-${item.color}-200 shadow-sm` 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                  }
                `}
              >
                <Icon className={`w-4 h-4 ${isActive ? `text-${item.color}-600` : ''}`} />
                <span className="text-sm font-medium">{item.label}</span>
                {isActive && <Zap className="w-3 h-3 text-yellow-500" />}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};