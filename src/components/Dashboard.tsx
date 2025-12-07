import React from 'react';
import { Calendar, Target, Award, Clock, Heart, BookOpen } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Dashboard: React.FC = () => {
  const { user, tasks, moodEntries } = useApp();

  const todayTasks = tasks.filter(task => {
    const today = new Date().toISOString().split('T')[0];
    return task.dueDate === today && !task.completed;
  });

  const completedTasks = tasks.filter(task => task.completed).length;
  const todayMood = moodEntries[0];

  const quickActions = [
    { 
      title: 'Hora de Meditar', 
      desc: 'Ejercicios de respiración', 
      icon: Heart, 
      color: 'green',
      section: 'meditation'
    },
    { 
      title: 'Organiza tu Día', 
      desc: 'Planifica tus tareas', 
      icon: Calendar, 
      color: 'blue',
      section: 'academic'
    },
    { 
      title: 'Check-in Emocional', 
      desc: 'Registra tu estado', 
      icon: Heart, 
      color: 'pink',
      section: 'support'
    },
    { 
      title: 'Mini Curso', 
      desc: 'Técnicas de estudio', 
      icon: BookOpen, 
      color: 'purple',
      section: 'academic'
    }
  ];

  if (!user.name) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center py-16">
          <div className="mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full mx-auto flex items-center justify-center mb-6">
              <Heart className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              ¡Bienvenido a StressLess! 
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Tu compañero personal para manejar el estrés académico y encontrar el equilibrio perfecto entre estudios y bienestar.
            </p>
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-100 max-w-md mx-auto">
              <p className="text-blue-700 font-medium mb-2">🌟 Comienza tu viaje hacia el bienestar</p>
              <p className="text-sm text-gray-600">
                Configura tu perfil personalizado para recibir recomendaciones adaptadas a ti
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white/70 backdrop-blur-sm p-6 rounded-xl border border-blue-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Tareas Hoy</p>
              <p className="text-2xl font-bold text-blue-600">{todayTasks.length}</p>
            </div>
            <Target className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-sm p-6 rounded-xl border border-green-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Completadas</p>
              <p className="text-2xl font-bold text-green-600">{completedTasks}</p>
            </div>
            <Award className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-sm p-6 rounded-xl border border-purple-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Nivel Actual</p>
              <p className="text-2xl font-bold text-purple-600">{user.level}</p>
            </div>
            <Award className="w-8 h-8 text-purple-500" />
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-sm p-6 rounded-xl border border-pink-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Estado Hoy</p>
              <p className="text-sm font-medium text-pink-600">
                {todayMood ? `${todayMood.mood}/10` : 'Sin registrar'}
              </p>
            </div>
            <Heart className="w-8 h-8 text-pink-500" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-100 shadow-sm p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6">🚀 Acciones Rápidas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <button
                key={index}
                className={`
                  p-6 rounded-xl border-2 border-${action.color}-100 
                  bg-gradient-to-br from-${action.color}-50 to-white
                  hover:border-${action.color}-200 hover:shadow-md
                  transition-all duration-200 transform hover:scale-105
                  text-left group
                `}
              >
                <div className={`w-12 h-12 bg-${action.color}-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-${action.color}-200 transition-colors`}>
                  <Icon className={`w-6 h-6 text-${action.color}-600`} />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">{action.title}</h4>
                <p className="text-sm text-gray-600">{action.desc}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Today's Schedule */}
      {todayTasks.length > 0 && (
        <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6">📅 Agenda de Hoy</h3>
          <div className="space-y-3">
            {todayTasks.slice(0, 5).map((task) => (
              <div key={task.id} className="flex items-center space-x-4 p-4 bg-white/50 rounded-lg border border-gray-100">
                <div className={`w-3 h-3 rounded-full ${
                  task.priority === 'high' ? 'bg-red-400' :
                  task.priority === 'medium' ? 'bg-yellow-400' : 'bg-green-400'
                }`} />
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{task.title}</p>
                  <p className="text-sm text-gray-600">{task.subject}</p>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="w-4 h-4 mr-1" />
                  {task.estimatedTime}min
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};