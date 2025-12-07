import React from 'react';
import { Brain, Heart, Star, Volume2, VolumeX } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Header: React.FC = () => {
  const { user, soundEnabled, setSoundEnabled } = useApp();

  const getMotivationalMessage = () => {
    const stressType = user.stressType || 'general';
    
    if (user.mood === 'negative') {
      const messages = {
        fatigue: [
          "🌙 Tu esfuerzo también merece descanso",
          "💤 Está bien tomarse un respiro, eres humano",
          "🌸 El descanso no es pereza, es autocuidado"
        ],
        anxiety: [
          "🌊 Respira, este momento también pasará",
          "🦋 Tu ansiedad no define tu valor",
          "🌿 Cada respiración te acerca a la calma"
        ],
        overwhelm: [
          "🧩 Un paso a la vez, no necesitas hacer todo hoy",
          "🌱 Está bien no tenerlo todo bajo control",
          "⭐ Eres capaz de más de lo que imaginas"
        ],
        general: [
          "🌟 Cada pequeño paso cuenta, ¡tú puedes!",
          "💪 Eres más fuerte de lo que crees",
          "🌈 Los días difíciles no duran, pero las personas resilientes sí"
        ]
      };
      const typeMessages = messages[stressType] || messages.general;
      return messages[Math.floor(Math.random() * messages.length)];
    } else if (user.mood === 'positive') {
      const messages = [
        "🎉 ¡Qué energía tan increíble tienes hoy!",
        "⭐ Tu actitud positiva es contagiosa",
        "🚀 Aprovecha este momento de claridad mental",
        "🌟 Estás radiante, sigue brillando"
      ];
      return messages[Math.floor(Math.random() * messages.length)];
    }
    return "🌸 Lessy y yo te damos la bienvenida a tu espacio de bienestar";
  };

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Brain className="w-8 h-8 text-blue-600" />
              <Heart className="w-4 h-4 text-pink-500 absolute -top-1 -right-1" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                StressLess
              </h1>
              <p className="text-xs text-gray-600">Tu bienestar académico</p>
            </div>
          </div>
          
          {user.name && (
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                title={soundEnabled ? "Silenciar sonidos" : "Activar sonidos"}
              >
                {soundEnabled ? (
                  <Volume2 className="w-5 h-5 text-gray-600" />
                ) : (
                  <VolumeX className="w-5 h-5 text-gray-600" />
                )}
              </button>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-800">
                  Hola, {user.name} {user.avatar}
                </p>
                <p className="text-xs text-blue-600 flex items-center">
                  <Star className="w-3 h-3 mr-1" />
                  Nivel {user.level} • {user.xp} XP
                </p>
              </div>
            </div>
          )}
        </div>
        
        {user.name && (
          <div className="mt-3 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100">
            <div className="flex items-center justify-center space-x-3">
              <div className="text-2xl animate-pulse">🐱</div>
              <div className="text-center">
                <p className="text-xs text-gray-500">Lessy dice:</p>
                <p className="text-sm text-gray-700 font-medium">
              {getMotivationalMessage()}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};