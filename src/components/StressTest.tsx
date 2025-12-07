import React, { useState } from 'react';
import { Brain, ArrowRight, CheckCircle, AlertCircle, Target } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const StressTest: React.FC = () => {
  const { addXP } = useApp();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      category: "Carga Académica",
      question: "¿Con qué frecuencia sientes que tienes demasiadas tareas o proyectos?",
      options: [
        { text: "Nunca o casi nunca", value: 1 },
        { text: "Ocasionalmente", value: 2 },
        { text: "Frecuentemente", value: 3 },
        { text: "Casi siempre", value: 4 },
        { text: "Siempre", value: 5 }
      ]
    },
    {
      category: "Exámenes y Evaluaciones",
      question: "¿Cómo te afectan emocionalmente los exámenes importantes?",
      options: [
        { text: "No me afectan", value: 1 },
        { text: "Me ponen un poco nervioso", value: 2 },
        { text: "Me causan ansiedad moderada", value: 3 },
        { text: "Me estresan mucho", value: 4 },
        { text: "Me paralizan de ansiedad", value: 5 }
      ]
    },
    {
      category: "Procrastinación",
      question: "¿Con qué frecuencia postergas tareas importantes?",
      options: [
        { text: "Nunca", value: 1 },
        { text: "Rara vez", value: 2 },
        { text: "A veces", value: 3 },
        { text: "Frecuentemente", value: 4 },
        { text: "Casi siempre", value: 5 }
      ]
    },
    {
      category: "Perfeccionismo",
      question: "¿Te preocupas excesivamente por obtener calificaciones perfectas?",
      options: [
        { text: "Para nada", value: 1 },
        { text: "Un poco", value: 2 },
        { text: "Moderadamente", value: 3 },
        { text: "Bastante", value: 4 },
        { text: "Extremadamente", value: 5 }
      ]
    },
    {
      category: "Tiempo y Organización",
      question: "¿Sientes que no tienes suficiente tiempo para todo lo que necesitas hacer?",
      options: [
        { text: "Nunca", value: 1 },
        { text: "Rara vez", value: 2 },
        { text: "A veces", value: 3 },
        { text: "Frecuentemente", value: 4 },
        { text: "Siempre", value: 5 }
      ]
    },
    {
      category: "Síntomas Físicos",
      question: "¿Experimentas síntomas físicos cuando estás estresado? (dolor de cabeza, tensión muscular, problemas digestivos)",
      options: [
        { text: "Nunca", value: 1 },
        { text: "Rara vez", value: 2 },
        { text: "A veces", value: 3 },
        { text: "Frecuentemente", value: 4 },
        { text: "Muy frecuentemente", value: 5 }
      ]
    }
  ];

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
      addXP(30); // Reward for completing test
    }
  };

  const getStressLevel = () => {
    const total = answers.reduce((sum, answer) => sum + answer, 0);
    const average = total / answers.length;
    
    if (average <= 2) return { level: 'Bajo', color: 'green', description: 'Tu nivel de estrés es manejable' };
    if (average <= 3) return { level: 'Moderado', color: 'yellow', description: 'Podrías beneficiarte de algunas técnicas de manejo del estrés' };
    if (average <= 4) return { level: 'Alto', color: 'orange', description: 'Es importante que implementes estrategias de reducción del estrés' };
    return { level: 'Muy Alto', color: 'red', description: 'Te recomendamos buscar apoyo profesional y usar nuestras herramientas diariamente' };
  };

  const getRecommendations = () => {
    const total = answers.reduce((sum, answer) => sum + answer, 0);
    const recommendations = [];

    if (answers[0] >= 3) recommendations.push("📚 Usa técnicas de planificación como el método Pomodoro");
    if (answers[1] >= 3) recommendations.push("🧘 Practica ejercicios de respiración antes de los exámenes");
    if (answers[2] >= 3) recommendations.push("⏰ Implementa técnicas anti-procrastinación");
    if (answers[3] >= 3) recommendations.push("🎯 Trabaja en establecer expectativas realistas");
    if (answers[4] >= 3) recommendations.push("📅 Mejora tu organización y gestión del tiempo");
    if (answers[5] >= 3) recommendations.push("💪 Incorpora ejercicio regular y técnicas de relajación");

    return recommendations;
  };

  if (showResults) {
    const stressLevel = getStressLevel();
    const recommendations = getRecommendations();

    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-100 shadow-sm p-8">
          <div className="text-center mb-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-800 mb-2">¡Test Completado! 🎉</h2>
            <p className="text-gray-600">Has ganado 30 XP por completar tu evaluación</p>
          </div>

          <div className={`bg-gradient-to-r from-${stressLevel.color}-50 to-white p-6 rounded-xl border border-${stressLevel.color}-200 mb-6`}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Tu Nivel de Estrés: {stressLevel.level}</h3>
                <p className={`text-${stressLevel.color}-700 font-medium`}>{stressLevel.description}</p>
              </div>
              <Target className={`w-12 h-12 text-${stressLevel.color}-500`} />
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800">🎯 Recomendaciones Personalizadas:</h4>
            {recommendations.map((rec, index) => (
              <div key={index} className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <ArrowRight className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <p className="text-gray-700">{rec}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100">
            <h4 className="font-semibold text-gray-800 mb-2">💡 Próximos Pasos</h4>
            <p className="text-gray-600 mb-4">
              Basándose en tus resultados, te sugerimos comenzar con nuestras herramientas de relajación y organización académica.
            </p>
            <div className="flex space-x-4">
              <button className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-lg hover:from-green-600 hover:to-green-700 transition-all">
                Comenzar Meditación
              </button>
              <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all">
                Organizar Tareas
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-100 shadow-sm p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <Brain className="w-8 h-8 text-blue-500" />
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Test de Estrés Académico</h2>
              <p className="text-gray-600">Evaluación personalizada para identificar tus fuentes de estrés</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Pregunta {currentQuestion + 1} de {questions.length}</p>
            <div className="w-32 bg-gray-200 rounded-full h-2 mt-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="mb-4">
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
              {questions[currentQuestion].category}
            </span>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-6">
            {questions[currentQuestion].question}
          </h3>
        </div>

        <div className="space-y-3">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option.value)}
              className="w-full p-4 text-left border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-800 group-hover:text-blue-700">
                  {option.text}
                </span>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
              </div>
            </button>
          ))}
        </div>

        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-yellow-800 font-medium">Confidencialidad Garantizada</p>
              <p className="text-xs text-yellow-700 mt-1">
                Tus respuestas son completamente privadas y se utilizan únicamente para brindarte recomendaciones personalizadas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};