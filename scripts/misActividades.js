// Selección de elementos del DOM
const activityForm = document.getElementById('activity-form');
const activitiesContainer = document.getElementById('activities-container');
const sortSelect = document.getElementById('sort-activities');
let activities = JSON.parse(localStorage.getItem('professorActivities')) || [];

// Cargar las actividades al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    loadActivities();
});

// Recargar la lista de actividades cuando se cambie la opción de orden
sortSelect.addEventListener('change', () => {
    loadActivities();
});

// Función para agregar una nueva actividad
activityForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addActivity();
});

// Función para agregar una actividad
function addActivity() {
    const title = document.getElementById('activity-title').value;
    const description = document.getElementById('activity-description').value;
    const professorName = document.getElementById('professor-name').value;

    // Validar que todos los campos están llenos antes de agregar
    if (!title || !description || !professorName) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    const newActivity = {
        id: Date.now(),
        title,
        description,
        professorName,
        date: new Date().toLocaleString()
    };

    // Guardar actividad en el array y en localStorage
    activities.push(newActivity);
    localStorage.setItem('professorActivities', JSON.stringify(activities));

    // Limpiar el formulario
    activityForm.reset();

    // Recargar la lista de actividades
    loadActivities();
}

// Función para cargar las actividades en la lista
function loadActivities() {
    const sortOption = sortSelect.value;
    let sortedActivities = [...activities];

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
            <button class="btn btn-warning btn-sm" onclick="openEditModal(${activity.id})">Editar</button>
            <button class="btn btn-danger btn-sm" onclick="openDeleteModal(${activity.id})">Eliminar</button>
        `;

        activitiesContainer.appendChild(activityItem);
    });
}

// Función para abrir el modal de edición
function openEditModal(id) {
    const activity = activities.find(a => a.id === id);
    document.getElementById('activity-title-edit').value = activity.title;
    document.getElementById('activity-description-edit').value = activity.description;
    document.getElementById('professor-name-edit').value = activity.professorName;

    const editModal = new bootstrap.Modal(document.getElementById('editActivityModal'));
    editModal.show();

    // Manejar el envío del formulario de edición
    document.getElementById('edit-activity-form').onsubmit = function(e) {
        e.preventDefault();
        saveEditedActivity(id);
    };
}

// Función para guardar la actividad editada
function saveEditedActivity(id) {
    const activityToEdit = activities.find(a => a.id === id);
    activityToEdit.title = document.getElementById('activity-title-edit').value;
    activityToEdit.description = document.getElementById('activity-description-edit').value;
    activityToEdit.professorName = document.getElementById('professor-name-edit').value;

    // Actualizar la lista de actividades en localStorage
    localStorage.setItem('professorActivities', JSON.stringify(activities));
    loadActivities();

    const editModal = bootstrap.Modal.getInstance(document.getElementById('editActivityModal'));
    editModal.hide();
}

// Función para abrir el modal de eliminación
function openDeleteModal(id) {
    const deleteModal = new bootstrap.Modal(document.getElementById('deleteActivityModal'));
    deleteModal.show();

    // Manejar el evento de confirmación de eliminación
    document.getElementById('confirmDelete').onclick = function() {
        deleteActivity(id);
        deleteModal.hide();
    };
}

// Función para eliminar una actividad
function deleteActivity(id) {
    activities = activities.filter(a => a.id !== id);
    localStorage.setItem('professorActivities', JSON.stringify(activities));
    loadActivities();
}
