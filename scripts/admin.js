const API_URL = 'http://localhost:8000/api/users'; // Cambia la URL según tu configuración

document.addEventListener('DOMContentLoaded', () => {
    loadUsers();
});

// Función para cargar usuarios
async function loadUsers() {
    try {
        const response = await fetch(API_URL);
        const users = await response.json();
        renderUsers(users);
    } catch (error) {
        console.error('Error al cargar usuarios:', error);
    }
}

// Función para renderizar usuarios en la tabla
function renderUsers(users) {
    const userList = document.getElementById('user-list');
    userList.innerHTML = ''; // Limpiar la lista

    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.role}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="openEditModal('${user._id}')">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="openDeleteModal('${user._id}')">Eliminar</button>
            </td>
        `;
        userList.appendChild(row);
    });
}

function openEditModal(id) {
  // Obtener el usuario y abrir el modal
  fetch(`${API_URL}/${id}`)
      .then(response => response.json())
      .then(user => {
          document.getElementById('edit-user-name').value = user.name;
          document.getElementById('edit-user-email').value = user.email;
          document.getElementById('edit-user-role').value = user.role;

          const editModal = new bootstrap.Modal(document.getElementById('editUserModal'));
          editModal.show();

          document.getElementById('edit-user-form').onsubmit = (e) => {
              e.preventDefault();
              saveEditedUser(user._id); // Cambia userId a user._id
          };
      });
}



// Función para guardar el usuario editado
async function saveEditedUser(id) {
  const userToEdit = {
    name: document.getElementById('edit-user-name').value,
    email: document.getElementById('edit-user-email').value,
    role: document.getElementById('edit-user-role').value,
};
    

    try {
        await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userToEdit)
        });
        loadUsers();
        const editModal = bootstrap.Modal.getInstance(document.getElementById('editUserModal'));
        editModal.hide(); // Recargar usuarios
    } catch (error) {
        console.error('Error al editar usuario:', error);
    }
}

// Función para abrir el modal de eliminación
function openDeleteModal(userId) {
    const deleteModal = new bootstrap.Modal(document.getElementById('deleteUserModal'));
    deleteModal.show();

    document.getElementById('confirmDelete').onclick = async () => {
        await deleteUser(userId);
        deleteModal.hide();
    };
}

// Función para eliminar un usuario
async function deleteUser(userId) {
    try {
        await fetch(`${API_URL}/${userId}`, { method: 'DELETE' });
        loadUsers(); // Recargar usuarios
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
    }
}
