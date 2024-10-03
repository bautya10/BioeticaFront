// Verificar si el usuario está autenticado
document.addEventListener("DOMContentLoaded", function() {
    const email = localStorage.getItem("userEmail");
    const isAuthenticated = localStorage.getItem("isLoggedIn");
    const role = localStorage.getItem("role"); // Asumimos que almacenas el rol del usuario al registrarlo

    const misActividadesNav = document.getElementById("mis-actividades-nav");
    const loginLink = document.getElementById("login-link");
    const logoutLink = document.getElementById("logout-link");
    const registerLink = document.getElementById("register-link");
    const adminLink = document.getElementById("admin-link"); // Asegúrate de dar ID a este elemento

    if (isAuthenticated === "true") {
        // Usuario autenticado
        if (role === "admin") {
            misActividadesNav.style.display = "block"; // Mostrar "Mis Actividades"
            adminLink.style.display = "block"; // Mostrar enlace de admin
        } else {
            misActividadesNav.style.display = "none"; // Mostrar "Mis Actividades" para usuarios
            adminLink.style.display = "none"; // Ocultar "Admin" para usuarios normales
        }
        loginLink.style.display = "none"; // Ocultar "Iniciar Sesión"
        registerLink.style.display = "none"; // Ocultar "Registrar"
        logoutLink.style.display = "block"; // Mostrar "Cerrar Sesión"
    } else {
        // Usuario no autenticado
        misActividadesNav.style.display = "none"; // Ocultar "Mis Actividades"
        loginLink.style.display = "block"; // Mostrar "Iniciar Sesión"
        registerLink.style.display = "block"; // Mostrar "Registrar"
        logoutLink.style.display = "none"; // Ocultar "Cerrar Sesión"
        adminLink.style.display = "none"; // Asegúrate de ocultar "Admin" si no está autenticado
    }

    // Función para cerrar sesión
    document.getElementById("logout-btn").addEventListener("click", function() {
        localStorage.removeItem("userEmail");
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("role"); // Limpiar el rol al cerrar sesión
        window.location.href = "./index.html"; // Redirigir a la página principal
    });
});

// Cargar las últimas actividades
document.addEventListener('DOMContentLoaded', () => {
    loadLatestActivities();
});

async function loadLatestActivities() {
    const API_URL = 'http://localhost:8000/api/activities'; // Reemplaza esto si cambias la URL
    const latestActivitiesContainer = document.getElementById('latest-activities');
    
    try {
        const response = await fetch(API_URL);
        const activities = await response.json();

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
    } catch (error) {
        console.error('Error al cargar las actividades:', error);
        // Manejar errores (por ejemplo, mostrar un mensaje de error al usuario)
    }
}

// Función para verificar si el usuario es administrador
function checkAdmin() {
    const role = localStorage.getItem('role'); // Obtener el rol del localStorage
    const adminLink = document.getElementById('admin-link');

    if (role === 'admin') {
        adminLink.style.display = 'block'; // Mostrar enlace de admin
    } else {
        adminLink.style.display = 'none'; // Ocultar "Admin" para usuarios normales
    }
}

// Llama a checkAdmin después de iniciar sesión o cargar la página
document.addEventListener('DOMContentLoaded', checkAdmin);
