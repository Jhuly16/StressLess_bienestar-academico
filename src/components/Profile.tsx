import React, { useState } from 'react';
import { User, Star, Trophy, Settings, Heart, Brain } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Profile: React.FC = () => {
  const { user, setUser, addXP } = useApp();
  const [isEditing, setIsEditing] = useState(!user.name);
  const [formData, setFormData] = useState({
    name: user.name,
    pseudonym: user.pseudonym,
    email: user.email,
    avatar: user.avatar,
    mood: user.mood,
    stressType: user.stressType,
    musicPreference: user.musicPreference
  });

  const avatars = [
    '🧑‍🎓', '👨‍🎓', '👩‍🎓', '🤓', '😊', '🌟', '🚀', '💪', '🧠', '❤️',
    '🐱', '🐶', '🦋', '🌸', '🌿', '🌊', '🍃', '🌙', '☀️', '🌈'
  ];
  
  const handleSave = () => {
    setUser({ ...user, ...formData });
    setIsEditing(false);
    if (!user.name && formData.name) {
      addXP(50); // Bonus for completing profile
    }
  };

  const progressToNextLevel = (user.xp % 100);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="text-6xl">{user.avatar || '🧑‍🎓'}</div>
            <div>
              <h2 className="text-3xl font-bold">{user.name || 'Usuario'}</h2>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center">
                  <Star className="w-5 h-5 mr-1" />
                  <span className="text-lg">Nivel {user.level}</span>
                </div>
                <div className="flex items-center">
                  <Trophy className="w-5 h-5 mr-1" />
                  <span>{user.xp} XP</span>
                </div>
              </div>
              <div className="mt-3">
                <div className="bg-white/20 rounded-full h-2 w-64">
                  <div 
                    className="bg-white rounded-full h-2 transition-all duration-500"
                    style={{ width: `${progressToNextLevel}%` }}
                  />
                </div>
                <p className="text-sm mt-1">{100 - progressToNextLevel} XP para el siguiente nivel</p>
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-white/20 hover:bg-white/30 p-3 rounded-lg transition-colors"
          >
            <Settings className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Edit Profile */}
      {isEditing && (
        <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6">✨ Personaliza tu Perfil</h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tu Nombre
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="¿Cómo te gustaría que te llamemos?"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pseudónimo (opcional)
              </label>
              <input
                type="text"
                value={formData.pseudonym}
                onChange={(e) => setFormData({ ...formData, pseudonym: e.target.value })}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="¿Cómo te gustaría que otros te conozcan?"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Correo Electrónico (opcional)
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="tu@email.com"
              />
              <p className="text-xs text-gray-500 mt-1">
                Para recibir recordatorios y notificaciones de bienestar (opcional)
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Elige tu Avatar
              </label>
              <div className="grid grid-cols-10 gap-2">
                {avatars.map((avatar) => (
                  <button
                    key={avatar}
                    onClick={() => setFormData({ ...formData, avatar })}
                    className={`
                      text-2xl p-2 rounded-lg border-2 transition-all
                      ${formData.avatar === avatar 
                        ? 'border-blue-500 bg-blue-50 scale-110' 
                        : 'border-gray-200 hover:border-gray-300 hover:scale-105'
                      }
                    `}
                  >
                    {avatar}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ¿Cómo te sientes hoy?
              </label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => setFormData({ ...formData, mood: 'positive' })}
                  className={`
                    p-4 rounded-lg border-2 transition-all text-center
                    ${formData.mood === 'positive' 
                      ? 'border-green-500 bg-green-50' 
                      : 'border-gray-200 hover:border-gray-300'
                    }
                  `}
                >
                  <Heart className="w-6 h-6 text-green-500 mx-auto mb-2" />
                  <span className="text-sm font-medium">Positivo</span>
                </button>
                
                <button
                  onClick={() => setFormData({ ...formData, mood: 'neutral' })}
                  className={`
                    p-4 rounded-lg border-2 transition-all text-center
                    ${formData.mood === 'neutral' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                    }
                  `}
                >
                  <Brain className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                  <span className="text-sm font-medium">Neutral</span>
                </button>
                
                <button
                  onClick={() => setFormData({ ...formData, mood: 'negative' })}
                  className={`
                    p-4 rounded-lg border-2 transition-all text-center
                    ${formData.mood === 'negative' 
                      ? 'border-purple-500 bg-purple-50' 
                      : 'border-gray-200 hover:border-gray-300'
                    }
                  `}
                >
                  <User className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                  <span className="text-sm font-medium">Necesito apoyo</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ¿Cuál es tu principal fuente de estrés?
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setFormData({ ...formData, stressType: 'fatigue' })}
                  className={`
                    p-3 rounded-lg border-2 transition-all text-center
                    ${formData.stressType === 'fatigue' 
                      ? 'border-purple-500 bg-purple-50' 
                      : 'border-gray-200 hover:border-gray-300'
                    }
                  `}
                >
                  <span className="text-sm font-medium">😴 Cansancio/Fatiga</span>
                </button>
                
                <button
                  onClick={() => setFormData({ ...formData, stressType: 'anxiety' })}
                  className={`
                    p-3 rounded-lg border-2 transition-all text-center
                    ${formData.stressType === 'anxiety' 
                      ? 'border-yellow-500 bg-yellow-50' 
                      : 'border-gray-200 hover:border-gray-300'
                    }
                  `}
                >
                  <span className="text-sm font-medium">😰 Ansiedad</span>
                </button>
                
                <button
                  onClick={() => setFormData({ ...formData, stressType: 'overwhelm' })}
                  className={`
                    p-3 rounded-lg border-2 transition-all text-center
                    ${formData.stressType === 'overwhelm' 
                      ? 'border-red-500 bg-red-50' 
                      : 'border-gray-200 hover:border-gray-300'
                    }
                  `}
                >
                  <span className="text-sm font-medium">🤯 Abrumado</span>
                </button>
                
                <button
                  onClick={() => setFormData({ ...formData, stressType: 'general' })}
                  className={`
                    p-3 rounded-lg border-2 transition-all text-center
                    ${formData.stressType === 'general' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                    }
                  `}
                >
                  <span className="text-sm font-medium">📚 Estrés General</span>
                </button>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={handleSave}
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all font-medium"
              >
                Guardar Perfil
              </button>
              {user.name && (
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Achievements */}
      <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-100 shadow-sm p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6">🏆 Logros Desbloqueados</h3>
        
        {/* Account Status */}
        {user.email && (
          <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600">✓</span>
              </div>
              <div>
                <h4 className="font-semibold text-green-800">Cuenta Vinculada</h4>
                <p className="text-sm text-green-700">
                  Tu progreso está vinculado a: {user.email}
                </p>
              </div>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
            <div className="text-2xl mb-2">🌟</div>
            <h4 className="font-semibold text-gray-800">Primer Paso</h4>
            <p className="text-sm text-gray-600">Perfil completado</p>
          </div>
          
          {user.level >= 2 && (
            <div className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border border-blue-200">
              <div className="text-2xl mb-2">🚀</div>
              <h4 className="font-semibold text-gray-800">En Marcha</h4>
              <p className="text-sm text-gray-600">Nivel 2 alcanzado</p>
            </div>
          )}
          
          {user.streakDays >= 3 && (
            <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-200">
              <div className="text-2xl mb-2">🔥</div>
              <h4 className="font-semibold text-gray-800">Constancia</h4>
              <p className="text-sm text-gray-600">3 días seguidos</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};