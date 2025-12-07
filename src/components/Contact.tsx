import React, { useState } from 'react';
import { Mail, Phone, MessageCircle, Star, Crown, Zap, Check } from 'lucide-react';

export const Contact: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: '$0',
      period: 'Gratis para siempre',
      icon: Star,
      color: 'gray',
      features: [
        'Test de estrés básico',
        'Ejercicios de respiración (3)',
        'Gestor de tareas básico',
        'Chat con Lessy limitado',
        'Jardín de calma básico',
        'Música (selección limitada)'
      ],
      limitations: [
        'Máximo 10 tareas por mes',
        'Solo 3 tipos de meditación',
        'Sin seguimiento avanzado'
      ]
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '$9.99',
      period: 'por mes',
      icon: Crown,
      color: 'blue',
      popular: true,
      features: [
        'Todo lo de Free +',
        'Test de estrés avanzado',
        'Ejercicios de respiración ilimitados',
        'Planificador académico completo',
        'Chat con Lessy 24/7',
        'Jardín de calma completo',
        'Biblioteca musical completa',
        'Seguimiento de progreso avanzado',
        'Recomendaciones personalizadas',
        'Mural de calma sin límites'
      ]
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '$19.99',
      period: 'por mes',
      icon: Zap,
      color: 'purple',
      features: [
        'Todo lo de Premium +',
        'Sesiones con psicólogos certificados',
        'Coaching académico personalizado',
        'Análisis de patrones de estrés con IA',
        'Planes de estudio adaptativos',
        'Acceso prioritario a nuevas funciones',
        'Reportes detallados para padres/tutores',
        'Integración con calendarios externos',
        'Backup en la nube ilimitado',
        'Soporte técnico prioritario'
      ]
    }
  ];

  const contactInfo = [
    {
      type: 'Email',
      value: 'contacto@stressless.app',
      icon: Mail,
      description: 'Para consultas generales y soporte'
    },
    {
      type: 'Instagram',
      value: '@stressless_app',
      icon: MessageCircle,
      description: 'Síguenos para tips diarios de bienestar'
    }
  ];

  const team = [
    {
      role: 'Psicóloga Clínica',
      specialty: 'Especialista en estrés académico',
      avatar: '👩‍⚕️'
    },
    {
      role: 'Coach Académico',
      specialty: 'Técnicas de estudio y organización',
      avatar: '👨‍🏫'
    },
    {
      role: 'Terapeuta Musical',
      specialty: 'Musicoterapia y relajación',
      avatar: '👩‍🎤'
    },
    {
      role: 'Asistente IA Empática',
      specialty: 'Compañía emocional 24/7',
      avatar: '🐱'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-8 text-white text-center">
        <div className="text-6xl mb-4">🐱</div>
        <h2 className="text-3xl font-bold mb-2">¡Estamos aquí para ti!</h2>
        <p className="text-blue-100 text-lg">
          Lessy y todo nuestro equipo esta listo para apoyarte en tu bienestar académico!💗
        </p>
      </div>

      {/* Plans */}
      <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-100 shadow-sm p-8">
        <h3 className="text-2xl font-bold text-gray-800 text-center mb-8">
          💎 Elige tu Plan de Bienestar
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <div
                key={plan.id}
                className={`
                  relative p-6 rounded-xl border-2 transition-all cursor-pointer
                  ${selectedPlan === plan.id 
                    ? `border-${plan.color}-500 bg-${plan.color}-50 scale-105` 
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-lg'
                  }
                  ${plan.popular ? 'ring-2 ring-blue-300' : ''}
                `}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Más Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <div className={`w-16 h-16 bg-${plan.color}-100 rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <Icon className={`w-8 h-8 text-${plan.color}-600`} />
                  </div>
                  <h4 className="text-xl font-bold text-gray-800">{plan.name}</h4>
                  <div className="mt-2">
                    <span className="text-3xl font-bold text-gray-800">{plan.price}</span>
                    <span className="text-gray-600 ml-1">{plan.period}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                  
                  {plan.limitations && (
                    <div className="pt-3 border-t border-gray-200">
                      {plan.limitations.map((limitation, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <span className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0">×</span>
                          <span className="text-sm text-gray-500">{limitation}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  className={`
                    w-full mt-6 py-3 px-4 rounded-lg font-medium transition-all
                    ${plan.id === 'free' 
                      ? 'bg-gray-500 text-white hover:bg-gray-600' 
                      : `bg-gradient-to-r from-${plan.color}-500 to-${plan.color}-600 text-white hover:from-${plan.color}-600 hover:to-${plan.color}-700`
                    }
                  `}
                >
                  {plan.id === 'free' ? 'Comenzar Gratis' : 'Suscribirse'}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Contact Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6">📞 Información de Contacto</h3>
          
          <div className="space-y-4">
            {contactInfo.map((contact, index) => {
              const Icon = contact.icon;
              return (
                <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{contact.type}</h4>
                    <p className="text-blue-600 font-medium">{contact.value}</p>
                    <p className="text-sm text-gray-600">{contact.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <h4 className="font-semibold text-red-800 mb-2">🚨 Línea de Crisis</h4>
            <p className="text-sm text-red-700 mb-2">
              Si estás experimentando una crisis emocional o pensamientos de autolesión:
            </p>
            <p className="font-bold text-red-800">📞 Emergencias: 911</p>
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6">👥 Nuestro Equipo</h3>
          
          <div className="space-y-4">
            {team.map((member, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="text-3xl">{member.avatar}</div>
                <div>
                  <p className="text-blue-600 text-sm font-medium">{member.role}</p>
                  <p className="text-xs text-gray-600">{member.specialty}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="text-2xl">🐱</div>
              <div>
                <p className="text-sm text-purple-700">
                  <strong>Lessy dice:</strong> "Recuerda que nunca estás solo en este viaje. 
                  Nuestro equipo y yo estamos aquí para apoyarte las 24 horas del día 💜"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-100 shadow-sm p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6">❓ Preguntas Frecuentes</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">¿Es segura mi información personal?</h4>
              <p className="text-sm text-gray-600">
                Sí, utilizamos encriptación de extremo a extremo y cumplimos con todas las 
                regulaciones de privacidad. Tu información nunca se comparte sin tu consentimiento.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">¿Puedo cambiar de plan en cualquier momento?</h4>
              <p className="text-sm text-gray-600">
                Absolutamente. Puedes actualizar o cancelar tu suscripción en cualquier momento 
                desde tu perfil, sin penalizaciones.
              </p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">¿Lessy reemplaza la terapia profesional?</h4>
              <p className="text-sm text-gray-600">
                No, Lessy es un complemento de apoyo emocional. Para casos serios, siempre 
                recomendamos consultar con profesionales de la salud mental.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">¿Funciona sin conexión a internet?</h4>
              <p className="text-sm text-gray-600">
                Algunas funciones como ejercicios de respiración y el jardín funcionan offline. 
                Las funciones de IA y sincronización requieren conexión.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};