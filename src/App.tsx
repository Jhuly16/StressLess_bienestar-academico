import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { Dashboard } from './components/Dashboard';
import { Profile } from './components/Profile';
import { StressTest } from './components/StressTest';
import { Meditation } from './components/Meditation';
import { Garden } from './components/Garden';
import { MusicTherapy } from './components/MusicTherapy';
import { AcademicTools } from './components/AcademicTools';
import { EmotionalSupport } from './components/EmotionalSupport';
import { CalmWall } from './components/CalmWall';
import { Progress } from './components/Progress';
import { Contact } from './components/Contact';
import { Auth } from './components/Auth';
import { useAuth } from './hooks/useAuth';

function App() {
  const { user, loading } = useAuth();
  const [currentSection, setCurrentSection] = useState('dashboard');

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto flex items-center justify-center mb-4 animate-pulse">
            <div className="text-3xl">🐱</div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">StressLess</h2>
          <p className="text-gray-600">Cargando tu espacio de bienestar...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <>
        <Auth />
        <Toaster position="top-right" />
      </>
    );
  }

  const renderSection = () => {
    switch (currentSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'profile':
        return <Profile />;
      case 'stress-test':
        return <StressTest />;
      case 'meditation':
        return <Meditation />;
      case 'garden':
        return <Garden />;
      case 'music':
        return <MusicTherapy />;
      case 'academic':
        return <AcademicTools />;
      case 'support':
        return <EmotionalSupport />;
      case 'calm-wall':
        return <CalmWall />;
      case 'progress':
        return <Progress />;
      case 'contact':
        return <Contact />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-purple-50">
        <Header />
        <Navigation currentSection={currentSection} onSectionChange={setCurrentSection} />
        <main className="container mx-auto px-4 py-6">
          {renderSection()}
        </main>
        
        {/* Footer */}
        <footer className="bg-white/80 backdrop-blur-md border-t border-gray-100 mt-12">
          <div className="container mx-auto px-4 py-6 text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <div className="text-2xl">🐱</div>
              <p className="text-gray-600">Con mucho amor, el equipo de StressLess</p>
            </div>
            <p className="text-sm text-gray-500">
              © 2025 StressLess. Todos los derechos de autor reservados.
            </p>
          </div>
        </footer>
      </div>
      <Toaster position="top-right" />
    </>
  );
}

export default App;