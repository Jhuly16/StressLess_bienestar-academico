import React, { useState } from 'react';
import { MessageCircle, Heart, PenTool, Users, Send, Smile } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const EmotionalSupport: React.FC = () => {
  const { user, addMoodEntry, addXP } = useApp();
  const [activeTab, setActiveTab] = useState('chat');
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'ai', message: string }>>([
    { sender: 'ai', message: '¡Hola! Soy tu asistente de apoyo emocional. ¿Cómo te sientes hoy? Estoy aquí para escucharte y ayudarte. 💙' }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [journalEntry, setJournalEntry] = useState('');
  const [moodCheck, setMoodCheck] = useState({
    mood: 5,
    stress: 5,
    notes: ''
  });

  const sendMessage = () => {
    if (!currentMessage.trim()) return;

    const newMessages = [...chatMessages, { sender: 'user' as 'user', message: currentMessage }];
    setChatMessages(newMessages);
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(currentMessage);
      setChatMessages(prev => [...prev, { sender: 'ai', message: aiResponse }]);
    }, 1000);
    
    setCurrentMessage('');
    addXP(5);
  };

  const generateAIResponse = (userMessage: string) => {
    const message = userMessage.toLowerCase();
    
    // More sophisticated response system
    if (message.includes('triste') || message.includes('mal') || message.includes('deprimido')) {
      const responses = [
        "Entiendo que te sientes triste. ¿Puedes contarme qué específicamente te está afectando hoy? 🤗",
        "La tristeza es una emoción válida. ¿Hay algo en particular que haya desencadenado estos sentimientos? 💙",
        "Me preocupo por ti. ¿Te gustaría hablar sobre lo que está pasando en tu vida ahora mismo? 🌸"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    if (message.includes('estrés') || message.includes('estresado') || message.includes('agobiado')) {
      const responses = [
        "El estrés puede ser abrumador. ¿Qué situaciones específicas te están causando más tensión? 🌊",
        "Entiendo que te sientes estresado. ¿Has probado alguna técnica de respiración hoy? Podríamos practicar juntos. 🌿",
        "¿Qué aspectos de tu vida académica te están generando más estrés en este momento? Hablemos de estrategias. 📚"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    if (message.includes('ansiedad') || message.includes('ansioso') || message.includes('nervioso')) {
      const responses = [
        "La ansiedad puede ser muy intensa. ¿Puedes describir qué sensaciones físicas estás experimentando? 🦋",
        "Entiendo tu ansiedad. ¿Hay pensamientos específicos que se repiten en tu mente? Podemos trabajar en ellos. ✨",
        "¿Qué situaciones o pensamientos tienden a disparar tu ansiedad? Conocerlos nos ayuda a manejarlos mejor. 🌱"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    if (message.includes('feliz') || message.includes('bien') || message.includes('contento')) {
      const responses = [
        "¡Me alegra mucho escuchar eso! ¿Qué ha contribuido a que te sientas tan bien hoy? 🌟",
        "Qué hermoso que te sientes feliz. ¿Te gustaría compartir qué te está trayendo esta alegría? ✨",
        "Es maravilloso verte así. ¿Cómo podemos mantener y cultivar estos sentimientos positivos? 🌸"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    if (message.includes('cansado') || message.includes('agotado') || message.includes('fatiga')) {
      const responses = [
        "El cansancio puede afectar mucho nuestro bienestar. ¿Cómo has estado durmiendo últimamente? 😴",
        "Entiendo esa fatiga. ¿Qué actividades te han estado demandando más energía? Veamos cómo equilibrar. ⚖️",
        "¿Has podido tomar descansos regulares? A veces necesitamos pausas más frecuentes de las que creemos. 🌙"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    // Follow-up questions for deeper conversation
    const followUpQuestions = [
      "¿Cómo te sientes físicamente en este momento? A veces nuestro cuerpo nos da pistas importantes. 🧘",
      "¿Hay algo específico que te gustaría cambiar en tu situación actual? 🌱",
      "¿Qué te ha ayudado en el pasado cuando te has sentido así? 💡",
      "¿Te gustaría que exploremos algunas estrategias juntos? Estoy aquí para apoyarte. 🤝"
    ];
    
    const responses = {
      default: [
        "Me alegra que hayas compartido eso conmigo. ¿Cómo te sientes al expresar estos pensamientos? 💫",
        "Cada paso que das hacia el autoconocimiento es valioso. " + followUpQuestions[Math.floor(Math.random() * followUpQuestions.length)],
        "Tu bienestar emocional es importante. " + followUpQuestions[Math.floor(Math.random() * followUpQuestions.length)]
      ]
    };
    
    return responses.default[Math.floor(Math.random() * responses.default.length)];
  };

  const saveMoodEntry = () => {
    const entry = {
      date: new Date().toISOString().split('T')[0],
      mood: moodCheck.mood,
      stressLevel: moodCheck.stress,
      notes: moodCheck.notes
    };
    addMoodEntry(entry);
    setMoodCheck({ mood: 5, stress: 5, notes: '' });
    addXP(15);
  };

  const saveJournalEntry = () => {
    if (journalEntry.trim()) {
      // In a real app, this would save to a database
      localStorage.setItem(`journal-${Date.now()}`, journalEntry);
      setJournalEntry('');
      addXP(20);
      alert('¡Entrada guardada! 📝 Has ganado 20 XP por escribir en tu diario.');
    }
  };

  const tabs = [
    { id: 'chat', label: 'Chat IA', icon: MessageCircle },
    { id: 'mood', label: 'Check-in', icon: Heart },
    { id: 'journal', label: 'Diario', icon: PenTool },
    { id: 'support', label: 'Ayuda Profesional', icon: Users }
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
                    ? 'bg-pink-100 text-pink-700 border-2 border-pink-200' 
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

      {/* Chat Tab */}
      {activeTab === 'chat' && (
        <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">💬 Chat de Apoyo Emocional</h3>
          
          <div className="bg-white rounded-lg border border-gray-200 h-96 flex flex-col">
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {chatMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`
                      max-w-xs lg:max-w-md px-4 py-2 rounded-lg
                      ${msg.sender === 'user' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-100 text-gray-800'
                      }
                    `}
                  >
                    {msg.message}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Comparte lo que sientes..."
                  className="flex-1 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                />
                <button
                  onClick={sendMessage}
                  className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-3 rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mood Check-in Tab */}
      {activeTab === 'mood' && (
        <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">❤️ Check-in Emocional</h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ¿Cómo calificarías tu estado de ánimo hoy? (1-10)
              </label>
              <div className="flex items-center space-x-4">
                <span className="text-red-500">😔</span>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={moodCheck.mood}
                  onChange={(e) => setMoodCheck({ ...moodCheck, mood: parseInt(e.target.value) })}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-green-500">😊</span>
                <span className="text-lg font-bold text-gray-800">{moodCheck.mood}</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ¿Cuál es tu nivel de estrés? (1-10)
              </label>
              <div className="flex items-center space-x-4">
                <span className="text-green-500">😌</span>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={moodCheck.stress}
                  onChange={(e) => setMoodCheck({ ...moodCheck, stress: parseInt(e.target.value) })}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-red-500">😰</span>
                <span className="text-lg font-bold text-gray-800">{moodCheck.stress}</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ¿Algo específico que quieras registrar?
              </label>
              <textarea
                value={moodCheck.notes}
                onChange={(e) => setMoodCheck({ ...moodCheck, notes: e.target.value })}
                placeholder="Describe cómo te sientes, qué te preocupa o qué te alegra..."
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 resize-none"
                rows={4}
              />
            </div>

            <button
              onClick={saveMoodEntry}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 px-6 rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all font-medium"
            >
              Guardar Check-in
            </button>
          </div>
        </div>
      )}

      {/* Journal Tab */}
      {activeTab === 'journal' && (
        <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">📝 Tu Diario Personal</h3>
          
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border border-purple-100">
              <h4 className="font-semibold text-gray-800 mb-2">💡 Espacio para la reflexión</h4>
              <p className="text-sm text-gray-600">
                Este es tu espacio privado para escribir tus pensamientos, sentimientos y reflexiones. 
                La escritura emocional puede ayudarte a procesar experiencias y encontrar claridad.🪷
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ¿Qué hay en tu mente hoy?
              </label>
              <textarea
                value={journalEntry}
                onChange={(e) => setJournalEntry(e.target.value)}
                placeholder="Escribe libremente... tus pensamientos, preocupaciones, alegrías, metas, reflexiones..."
                className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none"
                rows={12}
              />
            </div>

            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">
                {journalEntry.length} caracteres
              </p>
              <button
                onClick={saveJournalEntry}
                disabled={!journalEntry.trim()}
                className="bg-gradient-to-r from-purple-500 to-pink-600 text-white py-2 px-6 rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Guardar Entrada
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Professional Support Tab */}
      {activeTab === 'support' && (
        <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">🤝 Ayuda Profesional</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-lg border border-blue-200">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">
                Psicólogos Especializados
              </h4>
              <p className="text-sm text-gray-600 mb-4">
                Conecta con profesionales especializados en bienestar estudiantil y manejo del estrés académico.
              </p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Buscar Profesional
              </button>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-white p-6 rounded-lg border border-green-200">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">
                Coaches Académicos
              </h4>
              <p className="text-sm text-gray-600 mb-4">
                Trabaja con coaches especializados en técnicas de estudio y organización académica.
              </p>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                Encontrar Coach
              </button>
            </div>
          </div>

          <div className="mt-8 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-start space-x-3">
              <Smile className="w-6 h-6 text-yellow-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">🚨 ¿Necesitas ayuda inmediata?</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Si estás experimentando una crisis emocional o pensamientos de autolesión, 
                  busca ayuda profesional inmediatamente.
                </p>
                <div className="space-y-2 text-sm">
                  <p><strong>Línea de Crisis:</strong> Llamar a un ser querido!</p>
                  <p><strong>Orientación sobre Salud:</strong> 113</p>
                  <p><strong>Emergencias:</strong> 911</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};