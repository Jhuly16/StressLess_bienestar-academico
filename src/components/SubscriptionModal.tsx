import React, { useState } from 'react'
import { X, Check, Crown, Zap, Star } from 'lucide-react'
import { SUBSCRIPTION_PLANS, createCheckoutSession } from '../lib/stripe'
import { useAuth } from '../hooks/useAuth'
import toast from 'react-hot-toast'

interface SubscriptionModalProps {
  isOpen: boolean
  onClose: () => void
}

export const SubscriptionModal: React.FC<SubscriptionModalProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth()
  const [loading, setLoading] = useState<string | null>(null)

  if (!isOpen) return null

  const handleSubscribe = async (planId: string) => {
    if (!user) return
    
    const plan = SUBSCRIPTION_PLANS[planId as keyof typeof SUBSCRIPTION_PLANS]
    if (!plan.priceId) return

    try {
      setLoading(planId)
      await createCheckoutSession(plan.priceId, user.id)
    } catch (error) {
      toast.error('Error al procesar el pago')
      console.error('Subscription error:', error)
    } finally {
      setLoading(null)
    }
  }

  const plans = Object.values(SUBSCRIPTION_PLANS).filter(plan => plan.id !== 'free')

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="text-center">
            <div className="text-6xl mb-4">🐱</div>
            <h2 className="text-3xl font-bold mb-2">Mejora tu Experiencia</h2>
            <p className="text-purple-100">
              Lessy dice: "¡Desbloquea todo tu potencial de bienestar! 💜"
            </p>
          </div>
        </div>

        {/* Plans */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {plans.map((plan) => {
              const Icon = plan.id === 'premium' ? Crown : Zap
              const isPopular = plan.id === 'premium'
              
              return (
                <div
                  key={plan.id}
                  className={`
                    relative p-6 rounded-xl border-2 transition-all
                    ${isPopular 
                      ? 'border-blue-300 bg-blue-50 scale-105' 
                      : 'border-gray-200 hover:border-gray-300'
                    }
                  `}
                >
                  {isPopular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                        Más Popular
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center mb-6">
                    <div className={`w-16 h-16 bg-${plan.id === 'premium' ? 'blue' : 'purple'}-100 rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <Icon className={`w-8 h-8 text-${plan.id === 'premium' ? 'blue' : 'purple'}-600`} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">{plan.name}</h3>
                    <div className="mt-2">
                      <span className="text-3xl font-bold text-gray-800">${plan.price}</span>
                      <span className="text-gray-600 ml-1">por mes</span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => handleSubscribe(plan.id)}
                    disabled={loading === plan.id}
                    className={`
                      w-full py-3 px-4 rounded-lg font-medium transition-all
                      ${plan.id === 'premium'
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700'
                        : 'bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700'
                      }
                      disabled:opacity-50 disabled:cursor-not-allowed
                    `}
                  >
                    {loading === plan.id ? 'Procesando...' : 'Suscribirse'}
                  </button>
                </div>
              )
            })}
          </div>

          {/* Current Plan Info */}
          {user && (
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span className="font-medium text-gray-800">
                    Plan actual: {SUBSCRIPTION_PLANS[user.subscription_plan].name}
                  </span>
                </div>
                <span className={`
                  px-3 py-1 rounded-full text-sm font-medium
                  ${user.subscription_status === 'active' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-red-100 text-red-700'
                  }
                `}>
                  {user.subscription_status === 'active' ? 'Activo' : 'Inactivo'}
                </span>
              </div>
            </div>
          )}

          {/* Benefits */}
          <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4">💎 ¿Por qué actualizar?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
              <div className="flex items-start space-x-2">
                <div className="text-purple-500">🧠</div>
                <span>Acceso completo a todas las técnicas de relajación</span>
              </div>
              <div className="flex items-start space-x-2">
                <div className="text-purple-500">📊</div>
                <span>Seguimiento avanzado de tu progreso</span>
              </div>
              <div className="flex items-start space-x-2">
                <div className="text-purple-500">🎵</div>
                <span>Biblioteca musical completa</span>
              </div>
              <div className="flex items-start space-x-2">
                <div className="text-purple-500">🤝</div>
                <span>Soporte prioritario del equipo</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}