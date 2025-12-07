# StressLess - Aplicación Integral para Manejo del Estrés Académico

Una aplicación web completa diseñada para ayudar a estudiantes a manejar el estrés académico de manera efectiva, con funcionalidades de gamificación, seguimiento de progreso y apoyo emocional.

## 🌟 Características Principales

### 🐱 Lessy - Mascota IA Empática
- Compañía emocional 24/7
- Respuestas personalizadas según el estado del usuario
- Comentarios motivacionales y de apoyo

### 🧠 Herramientas de Bienestar
- **Test de Estrés**: Evaluación personalizada del nivel de estrés
- **Meditación y Relajación**: Ejercicios de respiración y mindfulness
- **Jardín de Calma**: Juegos relajantes y actividades terapéuticas
- **Musicoterapia**: Biblioteca de sonidos y música relajante

### 📚 Herramientas Académicas
- **Gestor de Tareas**: Organización y seguimiento de actividades
- **Técnicas de Estudio**: Métodos probados como Pomodoro, Cornell, etc.
- **Planificador Semanal**: Organización del tiempo de estudio

### 💬 Apoyo Emocional
- **Chat IA**: Conversaciones empáticas y apoyo emocional
- **Check-in Emocional**: Seguimiento diario del estado de ánimo
- **Diario Personal**: Espacio privado para reflexiones
- **Mural de Calma**: Notas y pensamientos positivos

### 🎮 Gamificación
- Sistema de niveles y experiencia (XP)
- Puntos de calma por actividades completadas
- Logros y reconocimientos
- Seguimiento de progreso visual

## 🚀 Tecnologías Utilizadas

### Frontend
- **React 18** con TypeScript
- **Tailwind CSS** para estilos
- **Lucide React** para iconografía
- **React Hot Toast** para notificaciones

### Backend y Servicios
- **Supabase** - Base de datos y autenticación
- **Stripe** - Procesamiento de pagos y suscripciones
- **Resend** - Servicio de emails transaccionales
- **Netlify** - Hosting y funciones serverless

## 📋 Configuración del Proyecto

### Prerrequisitos
- Node.js 18+
- Cuenta en Supabase
- Cuenta en Stripe (modo test)
- Cuenta en Resend
- Cuenta en Netlify

### Instalación Local

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd stressless-app
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
cp .env.example .env
```

Completar las variables en `.env`:
```env
VITE_SUPABASE_URL=https://xbbyjwyemhulrkhydtai.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhiYnlqd3llbWh1bHJraHlkdGFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUwNDg5NDksImV4cCI6MjA4MDYyNDk0OX0.ApdYb7u_UBmGGHlBHH7zC0FulE04TrJcQns53AqCO0U
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
VITE_RESEND_API_KEY=your_resend_api_key
VITE_APP_URL=http://localhost:5173
```

4. **Configurar Supabase**
- Crear proyecto en Supabase
- Ejecutar las migraciones en `supabase/migrations/`
- Configurar autenticación por email

5. **Ejecutar en desarrollo**
```bash
npm run dev
```

## 🗄️ Estructura de la Base de Datos

### Tablas Principales
- **users**: Perfiles de usuario y configuraciones
- **tasks**: Tareas académicas y seguimiento
- **mood_entries**: Registros de estado emocional
- **calm_notes**: Notas del mural de calma

### Seguridad
- Row Level Security (RLS) habilitado
- Políticas de acceso por usuario autenticado
- Datos encriptados en tránsito y reposo

## 💳 Planes de Suscripción

### Free (Gratuito)
- Funcionalidades básicas
- Límites en tareas y meditaciones
- Chat con Lessy limitado

### Premium ($9.99/mes)
- Acceso completo a todas las herramienías
- Chat ilimitado con Lessy
- Seguimiento avanzado de progreso

### Pro ($19.99/mes)
- Todo lo de Premium +
- Sesiones con profesionales
- Análisis avanzado con IA
- Soporte prioritario

## 📧 Sistema de Emails

### Emails Automáticos
- **Bienvenida**: Al registrarse
- **Subida de Nivel**: Al alcanzar nuevos niveles
- **Recordatorios**: Para tareas pendientes
- **Logros**: Al desbloquear achievements

### Templates Personalizados
- Diseño responsive
- Branding consistente
- Mensajes de Lessy incluidos

## 🚀 Despliegue en Netlify

### Configuración Automática
1. Conectar repositorio a Netlify
2. Configurar variables de entorno en Netlify
3. Deploy automático en cada push

### Variables de Entorno en Netlify
```
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
VITE_STRIPE_PUBLISHABLE_KEY
VITE_RESEND_API_KEY
VITE_APP_URL
STRIPE_SECRET_KEY
RESEND_API_KEY
```

### Funciones Serverless
- `create-checkout-session`: Manejo de pagos con Stripe
- `send-email`: Envío de emails con Resend

## 🔧 Desarrollo y Mantenimiento

### Scripts Disponibles
```bash
npm run dev          # Desarrollo local
npm run build        # Build para producción
npm run preview      # Preview del build
npm run lint         # Linting del código
```

### Estructura de Archivos
```
src/
├── components/      # Componentes React
├── hooks/          # Custom hooks
├── lib/            # Configuraciones y utilidades
├── context/        # Context providers (legacy)
└── main.tsx        # Punto de entrada

netlify/
└── functions/      # Funciones serverless

supabase/
└── migrations/     # Migraciones de base de datos
```

## 🎯 Roadmap Futuro

### Funcionalidades Planificadas
- [ ] App móvil nativa
- [ ] Integración con calendarios externos
- [ ] Análisis predictivo de estrés
- [ ] Comunidad de usuarios
- [ ] Sesiones grupales virtuales
- [ ] Integración con wearables

### Mejoras Técnicas
- [ ] PWA (Progressive Web App)
- [ ] Modo offline
- [ ] Optimización de rendimiento
- [ ] Tests automatizados
- [ ] CI/CD pipeline

## 👥 Equipo

- **Psicóloga Clínica**: Especialista en estrés académico
- **Coach Académico**: Técnicas de estudio y organización
- **Terapeuta Musical**: Musicoterapia y relajación
- **Lessy**: Asistente IA Empática 🐱

## 📞 Contacto

- **Email**: contacto@stressless.app
- **Instagram**: @stressless_app
- **Emergencias**: 911

## 📄 Licencia

© 2025 StressLess. Todos los derechos de autor reservados.

---

**Con mucho amor, el equipo de StressLess** 🐱💜