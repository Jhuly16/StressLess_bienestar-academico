import React, { useState, useEffect } from 'react';
import { Plus, Calendar, Clock, CheckCircle, Target, BookOpen, Brain } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AcademicTools: React.FC = () => {
  const { tasks, setTasks, addXP, user } = useApp();
  const [showAddTask, setShowAddTask] = useState(false);
  const [activeTab, setActiveTab] = useState('tasks');
  const [newTask, setNewTask] = useState({
    title: '',
    subject: '',
    dueDate: '',
    priority: 'medium' as 'high' | 'medium' | 'low',
    estimatedTime: 60
  });
  const [recommendations, setRecommendations] = useState<string[]>([]);

  // Generate personalized recommendations based on user data
  useEffect(() => {
    const generateRecommendations = () => {
      const recs = [];
      const now = new Date();
      const hour = now.getHours();
      
      // Time-based recommendations
      if (hour >= 9 && hour <= 11) {
        recs.push("🌅 Es tu hora de máxima concentración. Dedica este tiempo a las tareas más difíciles.");
      } else if (hour >= 14 && hour <= 16) {
        recs.push("☕ Después del almuerzo, toma un descanso de 10 minutos antes de continuar.");
      }
      
      // Task-based recommendations
      const incompleteTasks = tasks.filter(t => !t.completed);
      if (incompleteTasks.length > 5) {
        recs.push("📋 Tienes muchas tareas pendientes. Prioriza las 3 más importantes para hoy.");
      }
      
      // Stress-based recommendations
      if (user.stressType === 'overwhelm') {
        recs.push("🧘 Cuando te sientas abrumado, usa la técnica 5-4-3-2-1: 5 cosas que ves, 4 que tocas, 3 que escuchas, 2 que hueles, 1 que saboreas.");
      } else if (user.stressType === 'fatigue') {
        recs.push("💤 Levántate cada 45 minutos y haz 5 respiraciones profundas.");
      }
      
      // General wellness tips
      recs.push("💧 Hidrátate: bebe un vaso de agua cada hora.");
      recs.push("🚶 Camina 5 minutos entre sesiones de estudio para oxigenar tu cerebro.");
      
      setRecommendations(recs.slice(0, 4));
    };
    
    generateRecommendations();
  }, [tasks, user.stressType]);

  const addTask = () => {
    if (newTask.title && newTask.subject && newTask.dueDate) {
      const task = {
        id: Date.now().toString(),
        ...newTask,
        completed: false
      };
      setTasks([...tasks, task]);
      setNewTask({
        title: '',
        subject: '',
        dueDate: '',
        priority: 'medium',
        estimatedTime: 60
      });
      setShowAddTask(false);
      addXP(10);
    }
    
  };

  const toggleTask = (taskId: string) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        if (!task.completed) {
          addXP(15); // Reward for completing task
        }
        return { ...task, completed: !task.completed };
      }
      return task;
    }));
  };

  const studyTechniques = [
    {
      name: 'Técnica Pomodoro',
      description: '25 min de estudio + 5 min descanso',
      icon: '🍅',
      time: '25 min',
      color: 'red'
    },
    {
      name: 'Método Cornell',
      description: 'Sistema de toma de notas estructurado',
      icon: '📝',
      time: 'Variable',
      color: 'blue'
    },
    {
      name: 'Mapas Mentales',
      description: 'Visualización de conceptos conectados',
      icon: '🧠',
      time: '20-30 min',
      color: 'purple'
    },
    {
      name: 'Método Feynman',
      description: 'Explicar conceptos con palabras simples',
      icon: '🎯',
      time: '15-20 min',
      color: 'green'
    },
    {
      name: 'SQ3R',
      description: 'Survey, Question, Read, Recite, Review',
      icon: '📚',
      time: '45-60 min',
      color: 'orange'
    },
    {
      name: 'Flashcards',
      description: 'Tarjetas de repaso con preguntas y respuestas',
      icon: '🃏',
      time: '10-15 min',
      color: 'pink'
    }
  ];

  const weeklyPlanner = [
    { day: 'Lunes', tasks: ['Revisar apuntes de matemáticas', 'Leer capítulo 3 de historia'] },
    { day: 'Martes', tasks: ['Resolver ejercicios de física', 'Preparar presentación'] },
    { day: 'Miércoles', tasks: ['Estudiar para examen de química', 'Escribir ensayo'] },
    { day: 'Jueves', tasks: ['Repasar vocabulario de inglés', 'Práctica de laboratorio'] },
    { day: 'Viernes', tasks: ['Completar proyecto grupal', 'Revisión semanal'] },
    { day: 'Sábado', tasks: ['Tiempo libre', 'Actividades recreativas'] },
    { day: 'Domingo', tasks: ['Planificar la próxima semana', 'Descanso'] }
  ];

  const tabs = [
    { id: 'tasks', label: 'Tareas', icon: Target },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'techniques', label: 'Técnicas', icon: Brain },
    { id: 'planner', label: 'Planificador', icon: BookOpen }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Tab Navigation */}
      <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-100 shadow-sm p-2">
        <div className="flex space-x-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center space-x-2 px-6 py-3 rounded-lg transition-all
                  ${activeTab === tab.id 
                    ? 'bg-blue-100 text-blue-700 border-2 border-blue-200' 
                    : 'text-gray-600 hover:bg-gray-50'
                  }
                `}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tasks Tab */}
      {activeTab === 'tasks' && (
        <div className="space-y-6">
          {/* Personalized Recommendations */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="text-2xl">🐱</div>
              <h3 className="text-lg font-bold text-gray-800">Recomendaciones de Lessy para ti</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recommendations.map((rec, index) => (
                <div key={index} className="bg-white/70 p-4 rounded-lg border border-blue-200">
                  <p className="text-sm text-gray-700">{rec}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800">📋 Gestor de Tareas</h3>
              <button
                onClick={() => setShowAddTask(true)}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Nueva Tarea</span>
              </button>
            </div>

            {/* Add Task Form */}
            {showAddTask && (
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 mb-6">
                <h4 className="font-semibold text-gray-800 mb-4">✨ Agregar nueva tarea</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Título de la tarea"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    className="p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Materia"
                    value={newTask.subject}
                    onChange={(e) => setNewTask({ ...newTask, subject: e.target.value })}
                    className="p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <input
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                    className="p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as 'high' | 'medium' | 'low' })}
                    className="p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="low">Prioridad Baja</option>
                    <option value="medium">Prioridad Media</option>
                    <option value="high">Prioridad Alta</option>
                  </select>
                  <input
                    type="number"
                    placeholder="Tiempo estimado (min)"
                    value={newTask.estimatedTime}
                    onChange={(e) => setNewTask({ ...newTask, estimatedTime: parseInt(e.target.value) })}
                    className="p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="flex space-x-4 mt-4">
                  <button
                    onClick={addTask}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Agregar
                  </button>
                  <button
                    onClick={() => setShowAddTask(false)}
                    className="border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}

            {/* Tasks List */}
            <div className="space-y-3">
              {tasks.length === 0 ? (
                <div className="text-center py-12">
                  <Target className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">No tienes tareas pendientes</p>
                  <p className="text-gray-400">¡Agrega tu primera tarea para comenzar!</p>
                </div>
              ) : (
                tasks.map((task) => (
                  <div
                    key={task.id}
                    className={`
                      p-4 rounded-lg border transition-all
                      ${task.completed 
                        ? 'bg-green-50 border-green-200' 
                        : 'bg-white border-gray-200 hover:border-gray-300'
                      }
                    `}
                  >
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => toggleTask(task.id)}
                        className={`
                          w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all
                          ${task.completed 
                            ? 'bg-green-500 border-green-500' 
                            : 'border-gray-300 hover:border-green-400'
                          }
                        `}
                      >
                        {task.completed && <CheckCircle className="w-4 h-4 text-white" />}
                      </button>
                      
                      <div className="flex-1">
                        <h4 className={`font-medium ${task.completed ? 'text-green-700 line-through' : 'text-gray-800'}`}>
                          {task.title}
                        </h4>
                        <p className="text-sm text-gray-600">{task.subject}</p>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className={`w-3 h-3 rounded-full ${
                          task.priority === 'high' ? 'bg-red-400' :
                          task.priority === 'medium' ? 'bg-yellow-400' : 'bg-green-400'
                        }`} />
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(task.dueDate).toLocaleDateString()}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {task.estimatedTime}min
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Study Techniques Tab */}
      {activeTab === 'techniques' && (
        <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">🧠 Técnicas de Estudio Efectivas</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {studyTechniques.map((technique, index) => (
              <div
                key={index}
                className={`
                  p-6 rounded-xl border-2 border-${technique.color}-100 
                  bg-gradient-to-br from-${technique.color}-50 to-white
                  hover:border-${technique.color}-200 hover:shadow-lg
                  transition-all duration-300 transform hover:scale-105
                `}
              >
                <div className="text-4xl mb-4">{technique.icon}</div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  {technique.name}
                </h4>
                <p className="text-sm text-gray-600 mb-4">
                  {technique.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-medium text-${technique.color}-600`}>
                    ⏱️ {technique.time}
                  </span>
                  <button className={`
                    bg-gradient-to-r from-${technique.color}-500 to-${technique.color}-600 
                    text-white px-4 py-2 rounded-lg hover:from-${technique.color}-600 
                    hover:to-${technique.color}-700 transition-all text-sm
                  `}>
                    Comenzar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Weekly Planner Tab */}
      {activeTab === 'planner' && (
        <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">📅 Planificador Semanal</h3>
          <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
            {weeklyPlanner.map((day, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <h4 className="font-semibold text-gray-800 mb-3 text-center">
                  {day.day}
                </h4>
                <div className="space-y-2">
                  {day.tasks.map((task, taskIndex) => (
                    <div
                      key={taskIndex}
                      className="text-xs p-2 bg-blue-50 rounded border border-blue-100"
                    >
                      {task}
                    </div>
                  ))}
              
                <button className="w-full mt-3 text-xs text-blue-600 hover:text-blue-700 border border-blue-200 rounded py-1 hover:bg-blue-50 transition-colors">
                  + Agregar tarea
                </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};