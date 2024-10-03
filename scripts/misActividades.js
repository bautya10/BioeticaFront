// URL base de la API
const API_URL = 'http://localhost:8000/api/activities';

// Selección de elementos del DOM
const activityForm = document.getElementById('activity-form');
const activitiesContainer = document.getElementById('activities-container');
const sortSelect = document.getElementById('sort-activities');

// Cargar las actividades al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    loadActivities();
});

// Añadir evento para cambiar el orden de las actividades
sortSelect.addEventListener('change', loadActivities);

// Función para agregar una nueva actividad
activityForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    await addActivity();
});

// Función para agregar una actividad
async function addActivity() {
    const title = document.getElementById('activity-title').value;
    const description = document.getElementById('activity-description').value;
    const professorName = document.getElementById('professor-name').value;

    // Validar que todos los campos están llenos antes de agregar
    if (!title || !description || !professorName) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    const newActivity = {
        title,
        description,
        professorName,
        date: new Date().toLocaleString()
    };

    try {
        await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newActivity)
        });
        loadActivities(); // Recargar actividades
        activityForm.reset(); // Limpiar el formulario
    } catch (error) {
        console.error('Error al agregar actividad:', error);
    }
}

// Función para cargar las actividades en la lista
async function loadActivities() {
    const sortOption = sortSelect.value; // Obtener la opción de ordenamiento actual
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
            <button class="btn btn-warning btn-sm" onclick="openEditModal('${activity._id}')">Editar</button>
            <button class="btn btn-danger btn-sm" onclick="openDeleteModal('${activity._id}')">Eliminar</button>
        `;

        activitiesContainer.appendChild(activityItem);
    });
}

// Resto del código permanece igual...


// Función para abrir el modal de edición
function openEditModal(id) {
    // Obtener la actividad desde el backend
    fetch(`${API_URL}/${id}`)
        .then(response => response.json())
        .then(activity => {
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
        });
}

// Función para guardar la actividad editada
async function saveEditedActivity(id) {
    const activityToEdit = {
        title: document.getElementById('activity-title-edit').value,
        description: document.getElementById('activity-description-edit').value,
        professorName: document.getElementById('professor-name-edit').value,
    };

    try {
        await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(activityToEdit)
        });
        loadActivities(); // Recargar actividades
    } catch (error) {
        console.error('Error al editar actividad:', error);
    }

    const editModal = bootstrap.Modal.getInstance(document.getElementById('editActivityModal'));
    editModal.hide();
}

// Función para abrir el modal de eliminación
function openDeleteModal(id) {
    const deleteModal = new bootstrap.Modal(document.getElementById('deleteActivityModal'));
    deleteModal.show();

    // Manejar el evento de confirmación de eliminación
    document.getElementById('confirmDelete').onclick = async function() {
        await deleteActivity(id);
        deleteModal.hide();
    };
}

// Función para eliminar una actividad
async function deleteActivity(id) {
    try {
        await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        loadActivities(); // Recargar actividades
    } catch (error) {
        console.error('Error al eliminar actividad:', error);
    }
}
