import { loadStripe } from '@stripe/stripe-js'

const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_your_key'

export const stripe = loadStripe(stripePublishableKey)

export const SUBSCRIPTION_PLANS = {
  free: {
    id: 'free',
    name: 'Free',
    price: 0,
    priceId: null,
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
  premium: {
    id: 'premium',
    name: 'Premium',
    price: 9.99,
    priceId: 'price_premium_monthly', // Replace with actual Stripe price ID
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
  pro: {
    id: 'pro',
    name: 'Pro',
    price: 19.99,
    priceId: 'price_pro_monthly', // Replace with actual Stripe price ID
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
}

export const createCheckoutSession = async (priceId: string, userId: string) => {
  try {
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        priceId,
        userId,
        successUrl: `${window.location.origin}/success`,
        cancelUrl: `${window.location.origin}/contact`,
      }),
    })

    const session = await response.json()
    
    if (session.url) {
      window.location.href = session.url
    }
  } catch (error) {
    console.error('Error creating checkout session:', error)
    throw error
  }
}