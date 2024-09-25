// Verificar si el usuario está autenticado
document.addEventListener("DOMContentLoaded", function() {
  const email = localStorage.getItem("profesorEmail");
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  const misActividadesNav = document.getElementById("mis-actividades-nav");
  const loginLink = document.getElementById("login-link");
  const logoutLink = document.getElementById("logout-link");

  if (isAuthenticated === "true" && email === "jornada@bioetica.com") {
      misActividadesNav.style.display = "block";  // Mostrar "Mis Actividades"
      loginLink.style.display = "none";  // Ocultar "Iniciar Sesión"
      logoutLink.style.display = "block";  // Mostrar "Cerrar Sesión"
  } else {
      misActividadesNav.style.display = "none";  // Ocultar "Mis Actividades"
      loginLink.style.display = "block";  // Mostrar "Iniciar Sesión"
      logoutLink.style.display = "none";  // Ocultar "Cerrar Sesión"
  }

  // Función para cerrar sesión
  document.getElementById("logout-btn").addEventListener("click", function() {
      localStorage.removeItem("profesorEmail");
    localStorage.removeItem("isAuthenticated");
      window.location.href = "./index.html";  // Redirigir a la página principal
  });
});

document.addEventListener('DOMContentLoaded', () => {
    loadLatestActivities();
});

function loadLatestActivities() {
    const activities = JSON.parse(localStorage.getItem('professorActivities')) || [];
    const latestActivitiesContainer = document.getElementById('latest-activities');
    
    // Limpiar la lista de últimas actividades
    latestActivitiesContainer.innerHTML = '';

    if (activities.length === 0) {
        // Si no hay actividades, mostrar el mensaje
        const noActivitiesMessage = document.createElement('li');
        noActivitiesMessage.classList.add('list-group-item', 'text-muted');
        noActivitiesMessage.textContent = 'Aún no hay actividades';
        latestActivitiesContainer.appendChild(noActivitiesMessage);
    } else {
        // Tomar las 3 actividades más recientes
        const latestActivities = activities.slice(-3).reverse(); // Tomamos las últimas 3 y las invertimos para mostrarlas en orden

        // Crear y añadir cada actividad a la lista
        latestActivities.forEach(activity => {
            const activityItem = document.createElement('li');
            activityItem.classList.add('list-group-item');
            activityItem.textContent = activity.title; // Solo mostramos el título
            latestActivitiesContainer.appendChild(activityItem);
        });
    }
}
