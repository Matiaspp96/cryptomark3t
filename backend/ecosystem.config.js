module.exports = {
    apps: [
      {
        name: 'nestjs-app', // El nombre que desees para tu aplicación.
        script: 'dist/main.js', // La ruta al archivo compilado de tu proyecto NestJS.
        instances: 1, // El número de instancias que deseas ejecutar.
        autorestart: true, // Reinicia automáticamente la aplicación en caso de fallas.
        watch: false, // No reinicia automáticamente cuando se detectan cambios en los archivos.
        max_memory_restart: '3G', // Restarta la aplicación si el uso de memoria supera este límite.
        env: {
          NODE_ENV: 'development',
        },
        env_production: {
          NODE_ENV: 'production',
        },
      },
    ],
  };