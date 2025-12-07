import React, { useState } from 'react';
import { Plus, Heart, Star, Smile, Target, Trash2, Volume2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CalmWall: React.FC = () => {
  const { user, calmNotes, addCalmNote, addCalmPoints, soundEnabled } = useApp();
  const [showAddNote, setShowAddNote] = useState(false);
  const [newNote, setNewNote] = useState({
    text: '',
    color: 'blue',
    category: 'gratitud'
  });
  const [readingMode, setReadingMode] = useState(false);
  const [currentReadingIndex, setCurrentReadingIndex] = useState(0);

  const noteCategories = [
    { id: 'gratitud', name: 'Agradezco por...', color: 'green', emoji: '💚' },
    { id: 'logro', name: 'Hoy logré...', color: 'yellow', emoji: '⭐' },
    { id: 'soltar', name: 'Me gustaría soltar...', color: 'purple', emoji: '🕊️' },
    { id: 'positivo', name: 'Pensamiento positivo del día', color: 'pink', emoji: '🌸' },
    { id: 'libre', name: 'Pensamiento libre', color: 'blue', emoji: '💭' }
  ];

  const colorOptions = [
    { name: 'Azul Calma', value: 'blue', bg: 'bg-blue-100', border: 'border-blue-300', text: 'text-blue-800' },
    { name: 'Verde Gratitud', value: 'green', bg: 'bg-green-100', border: 'border-green-300', text: 'text-green-800' },
    { name: 'Amarillo Motivación', value: 'yellow', bg: 'bg-yellow-100', border: 'border-yellow-300', text: 'text-yellow-800' },
    { name: 'Lila Logros', value: 'purple', bg: 'bg-purple-100', border: 'border-purple-300', text: 'text-purple-800' },
    { name: 'Rosa Amor', value: 'pink', bg: 'bg-pink-100', border: 'border-pink-300', text: 'text-pink-800' }
  ];

  const addNote = () => {
    if (newNote.text.trim()) {
      addCalmNote(newNote);
      addCalmPoints(10);
      setNewNote({ text: '', color: 'blue', category: 'gratitud' });
      setShowAddNote(false);
    }
  };

  const startReadingMode = () => {
    if (calmNotes.length > 0) {
      setReadingMode(true);
      setCurrentReadingIndex(0);
    }
  };

  const nextNote = () => {
    if (currentReadingIndex < calmNotes.length - 1) {
      setCurrentReadingIndex(currentReadingIndex + 1);
    } else {
      setReadingMode(false);
    }
  };

  const getColorClasses = (color: string) => {
    const colorMap = colorOptions.find(c => c.value === color);
    return colorMap || colorOptions[0];
  };

  const getCategoryEmoji = (category: string) => {
    const cat = noteCategories.find(c => c.id === category);
    return cat?.emoji || '💭';
  };

  const getLessyComment = (note: any) => {
    const comments = {
      gratitud: [
        "Qué hermoso corazón agradecido tienes 💚",
        "La gratitud es el camino hacia la felicidad 🌸",
        "Me encanta ver todo lo bueno que reconoces ✨"
      ],
      logro: [
        "¡Estoy tan orgullosa de ti! 🌟",
        "Cada logro merece ser celebrado 🎉",
        "Mira todo lo que has conseguido ⭐"
      ],
      soltar: [
        "Soltar es un acto de valentía 🕊️",
        "Está bien dejar ir lo que no te sirve 🌿",
        "Liberar es liberarse 💫"
      ],
      positivo: [
        "Qué pensamiento tan luminoso 🌞",
        "Tu mente positiva es tu superpoder ✨",
        "Estos pensamientos nutren tu alma 🌸"
      ],
      libre: [
        "Me encanta cuando expresas tu verdad 💭",
        "Tus pensamientos son únicos y valiosos 🦋",
        "Gracias por compartir esto conmigo 💙"
      ]
    };
    
    const categoryComments = comments[note.category as keyof typeof comments] || comments.libre;
    return categoryComments[Math.floor(Math.random() * categoryComments.length)];
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-400 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-6xl animate-bounce">🐱</div>
            <div>
              <h2 className="text-3xl font-bold">Mural de la Calma</h2>
              <p className="text-pink-100">
                Lessy dice: "Aquí puedes liberar tus pensamientos y emociones 🌸"
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {calmNotes.length > 0 && (
              <button
                onClick={startReadingMode}
                disabled={!soundEnabled}
                className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 disabled:opacity-50"
              >
                <Volume2 className="w-4 h-4" />
                <span>Lessy Lee</span>
              </button>
            )}
            <button
              onClick={() => setShowAddNote(true)}
              className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Nueva Nota</span>
            </button>
          </div>
        </div>
      </div>

      {/* Reading Mode */}
      {readingMode && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-8 max-w-2xl w-full">
            <div className="text-center">
              <div className="text-6xl mb-4">🐱</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Lessy te lee tus pensamientos
              </h3>
              
              {calmNotes[currentReadingIndex] && (
                <div className="space-y-6">
                  <div className={`
                    p-6 rounded-lg border-2 ${getColorClasses(calmNotes[currentReadingIndex].color).bg} 
                    ${getColorClasses(calmNotes[currentReadingIndex].color).border}
                  `}>
                    <div className="text-3xl mb-3">
                      {getCategoryEmoji(calmNotes[currentReadingIndex].category)}
                    </div>
                    <p className={`text-lg ${getColorClasses(calmNotes[currentReadingIndex].color).text}`}>
                      "{calmNotes[currentReadingIndex].text}"
                    </p>
                  </div>
                  
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <div className="text-2xl mb-2">🐱</div>
                    <p className="text-purple-700 italic">
                      {getLessyComment(calmNotes[currentReadingIndex])}
                    </p>
                  </div>
                  
                  <div className="flex justify-center space-x-4">
                    <button
                      onClick={nextNote}
                      className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition-colors"
                    >
                      {currentReadingIndex < calmNotes.length - 1 ? 'Siguiente' : 'Terminar'}
                    </button>
                    <button
                      onClick={() => setReadingMode(false)}
                      className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Add Note Modal */}
      {showAddNote && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-800 mb-4">✨ Nueva Nota de Calma</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Categoría
                </label>
                <select
                  value={newNote.category}
                  onChange={(e) => setNewNote({ ...newNote, category: e.target.value })}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                >
                  {noteCategories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.emoji} {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tu pensamiento
                </label>
                <textarea
                  value={newNote.text}
                  onChange={(e) => setNewNote({ ...newNote, text: e.target.value })}
                  placeholder="Escribe aquí lo que sientes o piensas..."
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none"
                  rows={4}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Color de la nota
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {colorOptions.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => setNewNote({ ...newNote, color: color.value })}
                      className={`
                        p-3 rounded-lg border-2 transition-all text-sm
                        ${newNote.color === color.value 
                          ? `${color.bg} ${color.border} scale-105` 
                          : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                        }
                      `}
                    >
                      {color.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={addNote}
                  disabled={!newNote.text.trim()}
                  className="flex-1 bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Agregar Nota
                </button>
                <button
                  onClick={() => setShowAddNote(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notes Wall */}
      <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-100 shadow-sm p-6 min-h-96">
        {calmNotes.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🐱</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Tu mural está esperando</h3>
            <p className="text-gray-600 mb-6">
              Lessy dice: "¡Comienza escribiendo tu primer pensamiento de calma!"
            </p>
            <button
              onClick={() => setShowAddNote(true)}
              className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-3 rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all"
            >
              Escribir Primera Nota
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {calmNotes.map((note) => {
              const colorClasses = getColorClasses(note.color);
              return (
                <div
                  key={note.id}
                  className={`
                    ${colorClasses.bg} ${colorClasses.border} ${colorClasses.text}
                    p-4 rounded-lg border-2 transform rotate-1 hover:rotate-0 transition-all duration-300
                    hover:scale-105 hover:shadow-lg cursor-pointer
                  `}
                  style={{
                    transform: `rotate(${Math.random() * 6 - 3}deg)`,
                  }}
                >
                  <div className="text-2xl mb-2">
                    {getCategoryEmoji(note.category)}
                  </div>
                  <p className="text-sm font-medium mb-2">
                    {note.text}
                  </p>
                  <div className="flex items-center justify-between text-xs opacity-70">
                    <span>
                      {new Date(note.date).toLocaleDateString()}
                    </span>
                    <div className="text-lg">🐱</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-100 shadow-sm p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">📊 Estadísticas de tu Mural</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {noteCategories.map((category) => {
            const count = calmNotes.filter(note => note.category === category.id).length;
            return (
              <div key={category.id} className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl mb-2">{category.emoji}</div>
                <p className="text-2xl font-bold text-gray-800">{count}</p>
                <p className="text-xs text-gray-600">{category.name}</p>
              </div>
            );
          })}
        </div>
        
        <div className="mt-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">🐱</div>
            <div>
              <p className="text-sm text-purple-700">
                <strong>Lessy observa:</strong> "Has escrito {calmNotes.length} pensamientos de calma. 
                {calmNotes.length >= 10 
                  ? '¡Tu mural está floreciendo hermosamente! 🌸' 
                  : 'Cada pensamiento que compartes hace crecer tu jardín interior 🌱'
                }"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};