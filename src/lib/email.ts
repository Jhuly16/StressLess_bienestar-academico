// Email service using Resend
export const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to,
        subject,
        html,
      }),
    })

    return await response.json()
  } catch (error) {
    console.error('Error sending email:', error)
    throw error
  }
}

// Email templates
export const emailTemplates = {
  welcome: (name: string) => ({
    subject: '¡Bienvenido a StressLess! 🐱',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px; text-align: center; color: white;">
          <h1 style="margin: 0; font-size: 28px;">¡Hola ${name}! 🌟</h1>
          <p style="margin: 10px 0 0 0; font-size: 18px;">Bienvenido a StressLess</p>
        </div>
        <div style="padding: 40px; background: #f8f9fa;">
          <div style="text-align: center; margin-bottom: 30px;">
            <div style="font-size: 60px; margin-bottom: 20px;">🐱</div>
            <h2 style="color: #333; margin: 0;">¡Lessy te da la bienvenida!</h2>
          </div>
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            Estamos emocionados de tenerte en nuestra comunidad. StressLess está diseñado para ayudarte a manejar el estrés académico de manera efectiva y encontrar el equilibrio perfecto entre estudios y bienestar.
          </p>
          <div style="background: white; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h3 style="color: #667eea; margin-top: 0;">🚀 Primeros pasos:</h3>
            <ul style="color: #666; line-height: 1.8;">
              <li>Completa tu perfil personalizado</li>
              <li>Realiza el test de estrés inicial</li>
              <li>Explora nuestras técnicas de relajación</li>
              <li>Conoce a Lessy, tu compañera de bienestar</li>
            </ul>
          </div>
          <div style="text-align: center; margin-top: 30px;">
            <a href="${import.meta.env.VITE_APP_URL}" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold;">Comenzar mi viaje de bienestar</a>
          </div>
        </div>
        <div style="background: #333; color: white; padding: 20px; text-align: center;">
          <p style="margin: 0;">Con mucho amor, el equipo de StressLess 💜</p>
        </div>
      </div>
    `
  }),

  levelUp: (name: string, level: number) => ({
    subject: `¡Felicidades ${name}! Has alcanzado el nivel ${level} 🎉`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 40px; text-align: center; color: white;">
          <div style="font-size: 80px; margin-bottom: 20px;">🎉</div>
          <h1 style="margin: 0; font-size: 28px;">¡Nivel ${level} Desbloqueado!</h1>
        </div>
        <div style="padding: 40px; background: #f8f9fa; text-align: center;">
          <div style="font-size: 60px; margin-bottom: 20px;">🐱</div>
          <h2 style="color: #333;">¡Lessy está orgullosa de ti, ${name}!</h2>
          <p style="color: #666; line-height: 1.6; margin: 20px 0;">
            Has demostrado un compromiso increíble con tu bienestar. Cada nivel que alcanzas es una prueba de tu dedicación al crecimiento personal y al manejo saludable del estrés.
          </p>
          <div style="background: white; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h3 style="color: #f5576c; margin-top: 0;">🌟 Nuevas funciones desbloqueadas:</h3>
            <p style="color: #666;">Explora las nuevas herramientas y ejercicios disponibles en tu nivel actual.</p>
          </div>
          <a href="${import.meta.env.VITE_APP_URL}" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold;">Continuar mi progreso</a>
        </div>
      </div>
    `
  }),

  taskReminder: (name: string, tasks: string[]) => ({
    subject: `${name}, tienes tareas pendientes 📋`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); padding: 40px; text-align: center; color: white;">
          <div style="font-size: 60px; margin-bottom: 20px;">📋</div>
          <h1 style="margin: 0; font-size: 24px;">Recordatorio amigable</h1>
        </div>
        <div style="padding: 40px; background: #f8f9fa;">
          <div style="text-align: center; margin-bottom: 30px;">
            <div style="font-size: 50px; margin-bottom: 15px;">🐱</div>
            <h2 style="color: #333;">Lessy te recuerda, ${name}</h2>
          </div>
          <p style="color: #666; line-height: 1.6;">
            Tienes algunas tareas pendientes. No te preocupes, ¡vamos paso a paso!
          </p>
          <div style="background: white; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h3 style="color: #4facfe; margin-top: 0;">📝 Tareas pendientes:</h3>
            <ul style="color: #666; line-height: 1.8;">
              ${tasks.map(task => `<li>${task}</li>`).join('')}
            </ul>
          </div>
          <p style="color: #666; line-height: 1.6;">
            Recuerda: cada pequeño paso cuenta. ¡Tú puedes! 💪
          </p>
          <div style="text-align: center; margin-top: 30px;">
            <a href="${import.meta.env.VITE_APP_URL}" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold;">Ver mis tareas</a>
          </div>
        </div>
      </div>
    `
  })
}