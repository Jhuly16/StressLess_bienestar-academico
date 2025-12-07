import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipForward, Volume2, Music, Headphones, Waves } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const MusicTherapy: React.FC = () => {
  const { user, setUser, addXP, soundEnabled } = useApp();
  const [currentTrack, setCurrentTrack] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [testPhase, setTestPhase] = useState(0);
  const [testResults, setTestResults] = useState<string[]>([]);
  const [showTest, setShowTest] = useState(!user.musicPreference || user.musicPreference === 'none');

  const musicCategories = [
    {
      id: 'nature',
      name: 'Sonidos de la Naturaleza',
      description: 'Lluvia, océano, bosque, pájaros',
      icon: '🌿',
      color: 'green',
      tracks: [
        { id: 'rain', name: 'Lluvia Suave', duration: '10:00', mood: 'calma' },
        { id: 'ocean', name: 'Olas del Océano', duration: '15:00', mood: 'relajación' },
        { id: 'forest', name: 'Bosque Tranquilo', duration: '12:00', mood: 'concentración' },
        { id: 'birds', name: 'Canto de Pájaros', duration: '8:00', mood: 'energía' }
      ]
    },
    {
      id: 'classical',
      name: 'Música Clásica',
      description: 'Composiciones relajantes y armoniosas',
      icon: '🎼',
      color: 'purple',
      tracks: [
        { id: 'debussy', name: 'Clair de Lune - Debussy', duration: '5:30', mood: 'serenidad' },
        { id: 'bach', name: 'Air on G String - Bach', duration: '6:00', mood: 'paz' },
        { id: 'chopin', name: 'Nocturno Op.9 - Chopin', duration: '4:30', mood: 'contemplación' },
        { id: 'satie', name: 'Gymnopédie No.1 - Satie', duration: '3:45', mood: 'minimalismo' }
      ]
    },
    {
      id: 'ambient',
      name: 'Música Ambiental',
      description: 'Sonidos etéreos y atmosféricos',
      icon: '🌌',
      color: 'blue',
      tracks: [
        { id: 'space', name: 'Deriva Espacial', duration: '20:00', mood: 'meditación' },
        { id: 'crystal', name: 'Cuencos Tibetanos', duration: '15:00', mood: 'sanación' },
        { id: 'drone', name: 'Ondas Binaurales', duration: '30:00', mood: 'concentración' },
        { id: 'pad', name: 'Texturas Suaves', duration: '18:00', mood: 'relajación' }
      ]
    }
  ];

  const testSamples = [
    { id: 'nature', name: 'Sonidos Naturales', sample: '🌊 Escucha: Olas suaves del océano...', category: 'nature' },
    { id: 'classical', name: 'Música Clásica', sample: '🎼 Escucha: Melodía de piano suave...', category: 'classical' },
    { id: 'ambient', name: 'Ambiental', sample: '🌌 Escucha: Texturas etéreas flotantes...', category: 'ambient' }
  ];

  const getTimeBasedRecommendation = () => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 12) {
      return {
        title: 'Energía Matutina',
        description: 'Sonidos que te ayudan a despertar suavemente',
        tracks: ['birds', 'chopin', 'crystal'],
        icon: '☀️'
      };
    } else if (hour >= 12 && hour < 18) {
      return {
        title: 'Concentración Diurna',
        description: 'Música para mantener el foco en tus estudios',
        tracks: ['forest', 'bach', 'drone'],
        icon: '🧠'
      };
    } else {
      return {
        title: 'Relajación Nocturna',
        description: 'Sonidos para liberar el estrés del día',
        tracks: ['rain', 'debussy', 'space'],
        icon: '🌙'
      };
    }
  };

  const handleTestChoice = (category: string) => {
    const newResults = [...testResults, category];
    setTestResults(newResults);
    
    if (testPhase < testSamples.length - 1) {
      setTestPhase(testPhase + 1);
    } else {
      // Determine preference based on most chosen category
      const counts = newResults.reduce((acc, cat) => {
        acc[cat] = (acc[cat] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      
      const preference = Object.keys(counts).reduce((a, b) => 
        counts[a] > counts[b] ? a : b
      );
      
      setUser({ ...user, musicPreference: preference as any });
      setShowTest(false);
      addXP(25);
    }
  };

  const playTrack = (trackId: string) => {
    if (!soundEnabled) return;
    
    setCurrentTrack(trackId);
    setIsPlaying(true);
    addXP(5);
    
    // Simulate track ending after some time
    setTimeout(() => {
      setIsPlaying(false);
    }, 3000);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  if (showTest) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl p-8 text-white">
          <div className="flex items-center space-x-4">
            <div className="text-6xl">🐱</div>
            <div>
              <h2 className="text-3xl font-bold">Test Sonoro Inicial</h2>
              <p className="text-purple-100">Lessy dice: "¡Vamos a encontrar los sonidos que más te relajan! 🎵"</p>
            </div>
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-100 shadow-sm p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Muestra {testPhase + 1} de {testSamples.length}
            </h3>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
              <div 
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${((testPhase + 1) / testSamples.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-xl border border-purple-200 mb-8">
              <div className="text-center">
                <div className="text-6xl mb-4">🎧</div>
                <h4 className="text-xl font-semibold text-gray-800 mb-4">
                  {testSamples[testPhase].name}
                </h4>
                <p className="text-gray-600 mb-6">
                  {testSamples[testPhase].sample}
                </p>
                <div className="bg-white/50 p-4 rounded-lg">
                  <div className="text-2xl mb-2">🐱</div>
                  <p className="text-sm text-purple-700">
                    Lessy: "Cierra los ojos y siente cómo reacciona tu cuerpo a este sonido 🌸"
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center space-y-4">
              <p className="text-gray-700 font-medium">¿Cómo te hace sentir este sonido?</p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => handleTestChoice(testSamples[testPhase].category)}
                  className="bg-green-500 text-white px-8 py-3 rounded-lg hover:bg-green-600 transition-all transform hover:scale-105"
                >
                  😌 Me relaja mucho
                </button>
                <button
                  onClick={() => handleTestChoice('neutral')}
                  className="bg-gray-500 text-white px-8 py-3 rounded-lg hover:bg-gray-600 transition-all transform hover:scale-105"
                >
                  😐 Es neutral
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const recommendation = getTimeBasedRecommendation();
  const preferredCategory = musicCategories.find(cat => cat.id === user.musicPreference);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-blue-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-6xl animate-pulse">🐱</div>
            <div>
              <h2 className="text-3xl font-bold">Terapia Musical</h2>
              <p className="text-purple-100">
                Lessy dice: "La música es medicina para el alma 🎵"
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowTest(true)}
            className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
          >
            🎧 Repetir Test
          </button>
        </div>
      </div>

      {/* Time-based Recommendation */}
      <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="text-3xl">{recommendation.icon}</div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">{recommendation.title}</h3>
            <p className="text-gray-600">{recommendation.description}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recommendation.tracks.map((trackId) => {
            const category = musicCategories.find(cat => 
              cat.tracks.some(track => track.id === trackId)
            );
            const track = category?.tracks.find(t => t.id === trackId);
            
            if (!track) return null;
            
            return (
              <button
                key={trackId}
                onClick={() => playTrack(trackId)}
                className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border border-blue-200 hover:border-blue-300 transition-all text-left"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-800">{track.name}</h4>
                    <p className="text-sm text-gray-600">{track.mood}</p>
                  </div>
                  <Play className="w-5 h-5 text-blue-500" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Music Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {musicCategories.map((category) => (
          <div
            key={category.id}
            className={`
              bg-white/70 backdrop-blur-sm rounded-xl border border-gray-100 shadow-sm p-6
              ${category.id === user.musicPreference ? 'ring-2 ring-purple-300 bg-purple-50/70' : ''}
            `}
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="text-3xl">{category.icon}</div>
              <div>
                <h3 className="text-lg font-bold text-gray-800">{category.name}</h3>
                <p className="text-sm text-gray-600">{category.description}</p>
              </div>
            </div>

            <div className="space-y-3">
              {category.tracks.map((track) => (
                <div
                  key={track.id}
                  className={`
                    p-3 rounded-lg border transition-all
                    ${currentTrack === track.id && isPlaying 
                      ? 'bg-purple-100 border-purple-300' 
                      : 'bg-white/50 border-gray-200 hover:border-gray-300'
                    }
                  `}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-800">{track.name}</h4>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <span>{track.duration}</span>
                        <span>•</span>
                        <span>{track.mood}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => playTrack(track.id)}
                      disabled={!soundEnabled}
                      className={`
                        p-2 rounded-full transition-all
                        ${currentTrack === track.id && isPlaying
                          ? 'bg-purple-500 text-white'
                          : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                        }
                        disabled:opacity-50 disabled:cursor-not-allowed
                      `}
                    >
                      {currentTrack === track.id && isPlaying ? (
                        <Pause className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Music Player */}
      {currentTrack && (
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Music className="w-8 h-8" />
              </div>
              <div>
                <h4 className="font-semibold">Reproduciendo ahora</h4>
                <p className="text-purple-100">
                  {musicCategories
                    .flatMap(cat => cat.tracks)
                    .find(track => track.id === currentTrack)?.name}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={togglePlayPause}
                className="bg-white/20 hover:bg-white/30 p-3 rounded-full transition-colors"
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6" />
                ) : (
                  <Play className="w-6 h-6" />
                )}
              </button>
              <button className="bg-white/20 hover:bg-white/30 p-3 rounded-full transition-colors">
                <SkipForward className="w-6 h-6" />
              </button>
              <button className="bg-white/20 hover:bg-white/30 p-3 rounded-full transition-colors">
                <Volume2 className="w-6 h-6" />
              </button>
            </div>
          </div>
          
          <div className="mt-4 bg-white/20 rounded-full h-2">
            <div className="bg-white rounded-full h-2 w-1/3 transition-all duration-1000" />
          </div>
        </div>
      )}

      {/* Lessy's Music Tips */}
      <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-100 shadow-sm p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">🐱 Consejos de Lessy para la Terapia Musical</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="text-2xl">🎧</div>
              <div>
                <h4 className="font-medium text-gray-800">Usa auriculares</h4>
                <p className="text-sm text-gray-600">Para una experiencia más inmersiva y personal</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="text-2xl">🌙</div>
              <div>
                <h4 className="font-medium text-gray-800">Escucha antes de dormir</h4>
                <p className="text-sm text-gray-600">La música relajante mejora la calidad del sueño</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="text-2xl">🧘</div>
              <div>
                <h4 className="font-medium text-gray-800">Combina con meditación</h4>
                <p className="text-sm text-gray-600">La música potencia los ejercicios de relajación</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="text-2xl">📚</div>
              <div>
                <h4 className="font-medium text-gray-800">Música para estudiar</h4>
                <p className="text-sm text-gray-600">Los sonidos ambientales mejoran la concentración</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};