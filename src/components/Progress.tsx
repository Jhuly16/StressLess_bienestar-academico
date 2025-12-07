import React from 'react';
import { TrendingUp, Calendar, Award, Target, BarChart3, Zap } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Progress: React.FC = () => {
  const { user, tasks, moodEntries } = useApp();

  // Calculate stats
  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  
  const recentMoods = moodEntries.slice(0, 7);
  const avgMood = recentMoods.length > 0 
    ? Math.round(recentMoods.reduce((sum, entry) => sum + entry.mood, 0) / recentMoods.length)
    : 5;
  
  const avgStress = recentMoods.length > 0 
    ? Math.round(recentMoods.reduce((sum, entry) => sum + entry.stressLevel, 0) / recentMoods.length)
    : 5;

  // Mock data for charts (in a real app, this would come from actual usage data)
  const weeklyProductivity = [
    { day: 'Lun', tasks: 3, mood: 7 },
    { day: 'Mar', tasks: 5, mood: 8 },
    { day: 'Mié', tasks: 2, mood: 6 },
    { day: 'Jue', tasks: 4, mood: 7 },
    { day: 'Vie', tasks: 6, mood: 9 },
    { day: 'Sáb', tasks: 1, mood: 8 },
    { day: 'Dom', tasks: 2, mood: 7 }
  ];

  const achievements = [
    { 
      title: 'Primer Perfil', 
      description: 'Completaste tu perfil personalizado', 
      earned: !!user.name,
      icon: '🌟',
      xp: 50 
    },
    { 
      title: 'Evaluación Completa', 
      description: 'Realizaste el test de estrés', 
      earned: user.xp >= 30,
      icon: '🧠',
      xp: 30 
    },
    { 
      title: 'Primera Meditación', 
      description: 'Completaste tu primer ejercicio de relajación', 
      earned: user.xp >= 50,
      icon: '🧘',
      xp: 20 
    },
    { 
      title: 'Organizador', 
      description: 'Creaste y completaste 5 tareas', 
      earned: completedTasks >= 5,
      icon: '📋',
      xp: 75 
    },
    { 
      title: 'Constancia', 
      description: '7 días consecutivos usando la app', 
      earned: user.streakDays >= 7,
      icon: '🔥',
      xp: 100 
    },
    { 
      title: 'Nivel Superior', 
      description: 'Alcanzaste el nivel 3', 
      earned: user.level >= 3,
      icon: '🚀',
      xp: 150 
    }
  ];

  const earnedAchievements = achievements.filter(a => a.earned);
  const nextAchievements = achievements.filter(a => !a.earned).slice(0, 3);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white/70 backdrop-blur-sm p-6 rounded-xl border border-blue-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Tareas Completadas</p>
              <p className="text-2xl font-bold text-blue-600">{completedTasks}/{totalTasks}</p>
              <p className="text-xs text-blue-500">{completionRate}% completado</p>
            </div>
            <Target className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-sm p-6 rounded-xl border border-green-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Estado de Ánimo</p>
              <p className="text-2xl font-bold text-green-600">{avgMood}/10</p>
              <p className="text-xs text-green-500">Promedio semanal</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-sm p-6 rounded-xl border border-purple-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Nivel de Estrés</p>
              <p className="text-2xl font-bold text-purple-600">{avgStress}/10</p>
              <p className="text-xs text-purple-500">Promedio semanal</p>
            </div>
            <BarChart3 className="w-8 h-8 text-purple-500" />
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-sm p-6 rounded-xl border border-orange-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Experiencia Total</p>
              <p className="text-2xl font-bold text-orange-600">{user.xp} XP</p>
              <p className="text-xs text-orange-500">Nivel {user.level}</p>
            </div>
            <Zap className="w-8 h-8 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Progress Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Productivity Chart */}
        <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6">📊 Productividad vs Estado de Ánimo</h3>
          <div className="space-y-4">
            {weeklyProductivity.map((day, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="w-12 text-sm font-medium text-gray-600">{day.day}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-500">Tareas: {day.tasks}</span>
                    <span className="text-xs text-gray-500">Ánimo: {day.mood}/10</span>
                  </div>
                  <div className="flex space-x-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(day.tasks / 6) * 100}%` }}
                      />
                    </div>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(day.mood / 10) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mood Tracking */}
        <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6">💭 Seguimiento Emocional</h3>
          {recentMoods.length > 0 ? (
            <div className="space-y-4">
              {recentMoods.slice(0, 5).map((entry, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {new Date(entry.date).toLocaleDateString()}
                    </p>
                    {entry.notes && (
                      <p className="text-xs text-gray-600 mt-1">{entry.notes.slice(0, 50)}...</p>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500">Ánimo:</span>
                      <span className="text-sm font-bold text-green-600">{entry.mood}/10</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500">Estrés:</span>
                      <span className="text-sm font-bold text-red-600">{entry.stressLevel}/10</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No hay registros emocionales aún</p>
              <p className="text-sm text-gray-400">Comienza a hacer check-ins diarios</p>
            </div>
          )}
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-100 shadow-sm p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6">🏆 Logros y Reconocimientos</h3>
        
        {/* Earned Achievements */}
        {earnedAchievements.length > 0 && (
          <div className="mb-8">
            <h4 className="text-lg font-semibold text-gray-700 mb-4">✨ Logros Desbloqueados</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {earnedAchievements.map((achievement, index) => (
                <div key={index} className="p-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <h5 className="font-semibold text-gray-800">{achievement.title}</h5>
                      <p className="text-xs text-gray-600">{achievement.description}</p>
                      <p className="text-xs text-yellow-600 font-medium">+{achievement.xp} XP</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Next Achievements */}
        {nextAchievements.length > 0 && (
          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-4">🎯 Próximos Objetivos</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {nextAchievements.map((achievement, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200 opacity-75">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl grayscale">{achievement.icon}</div>
                    <div className="flex-1">
                      <h5 className="font-semibold text-gray-600">{achievement.title}</h5>
                      <p className="text-xs text-gray-500">{achievement.description}</p>
                      <p className="text-xs text-gray-400">+{achievement.xp} XP</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Recommendations */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100 p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">💡 Recomendaciones Personalizadas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {avgStress > 7 && (
            <div className="p-4 bg-white/70 rounded-lg border border-red-100">
              <h4 className="font-semibold text-red-700 mb-2">🚨 Alto nivel de estrés detectado</h4>
              <p className="text-sm text-gray-600">
                Te recomendamos aumentar tus sesiones de meditación y considerar técnicas de relajación progresiva.
              </p>
            </div>
          )}
          
          {completionRate < 50 && totalTasks > 0 && (
            <div className="p-4 bg-white/70 rounded-lg border border-orange-100">
              <h4 className="font-semibold text-orange-700 mb-2">📋 Mejora tu productividad</h4>
              <p className="text-sm text-gray-600">
                Prueba la técnica Pomodoro para aumentar tu enfoque y completar más tareas.
              </p>
            </div>
          )}
          
          {avgMood < 6 && (
            <div className="p-4 bg-white/70 rounded-lg border border-blue-100">
              <h4 className="font-semibold text-blue-700 mb-2">💙 Cuida tu bienestar emocional</h4>
              <p className="text-sm text-gray-600">
                Considera usar más nuestro chat de apoyo y escribir en tu diario personal.
              </p>
            </div>
          )}
          
          {user.level >= 2 && (
            <div className="p-4 bg-white/70 rounded-lg border border-green-100">
              <h4 className="font-semibold text-green-700 mb-2">🌟 ¡Excelente progreso!</h4>
              <p className="text-sm text-gray-600">
                Has mostrado un compromiso consistente con tu bienestar. ¡Sigue así!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};