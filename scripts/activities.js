// URL base de la API
const API_URL = 'http://localhost:8000/api/activities';

// Selección de elementos del DOM
const activitiesContainer = document.getElementById('activities-container');
const sortSelect = document.getElementById('sort-activities');

// Cargar las actividades al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    loadActivities();
});

// Recargar la lista de actividades cuando se cambie la opción de orden
sortSelect.addEventListener('change', () => {
    loadActivities();
});

// Función para cargar las actividades en la lista
async function loadActivities() {
    const sortOption = sortSelect.value;
    let sortedActivities;

    try {
        const response = await fetch(API_URL);
        sortedActivities = await response.json();
    } catch (error) {
        console.error('Error al cargar actividades:', error);
        return;
    }

    // Ordenar las actividades según la selección del usuario
    switch (sortOption) {
        case 'title-asc':
            sortedActivities.sort((a, b) => a.title.localeCompare(b.title));
            break;
        case 'title-desc':
            sortedActivities.sort((a, b) => b.title.localeCompare(a.title));
            break;
        case 'professor-asc':
            sortedActivities.sort((a, b) => a.professorName.localeCompare(b.professorName));
            break;
        case 'professor-desc':
            sortedActivities.sort((a, b) => b.professorName.localeCompare(a.professorName));
            break;
        default:
            break;
    }

    activitiesContainer.innerHTML = ''; // Limpiar la lista de actividades

    sortedActivities.forEach(activity => {
        const activityItem = document.createElement('li');
        activityItem.classList.add('list-group-item');

        // Contenido de la actividad
        activityItem.innerHTML = `
            <h5>${activity.title} <small class="text-muted">(${activity.date})</small></h5>
            <p>${activity.description}</p>
            <p><strong>Profesor:</strong> ${activity.professorName}</p>
        `;

        activitiesContainer.appendChild(activityItem);
    });
}

