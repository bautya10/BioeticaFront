// activity-detail.js

document.addEventListener("DOMContentLoaded", function() {
  const activityDetailDiv = document.getElementById('activity-detail');

  // Obtener los parámetros de la URL
  const urlParams = new URLSearchParams(window.location.search);
  const index = urlParams.get('index');
  const owner = urlParams.get('owner'); // Puede ser 'me' si es una "Mis Actividades"

  let activities;

  if (owner === 'me') {
      // Obtener "Mis Actividades"
      activities = JSON.parse(localStorage.getItem('myActivities')) || [];
  } else {
      // Obtener actividades públicas
      activities = JSON.parse(localStorage.getItem('publicActivities')) || [];
  }

  const activity = activities[index];

  if (activity) {
      activityDetailDiv.innerHTML = `
          <h2>${activity.title}</h2>
          <p>${activity.description}</p>
          <a href="./activities.html" class="btn btn-secondary">Volver a Actividades</a>
      `;
  } else {
      activityDetailDiv.innerHTML = `
        <h2>Actividad no encontrada</h2>
          <p>La actividad que buscas no existe.</p>
          <a href="./activities.html" class="btn btn-secondary">Volver a Actividades</a>
      `;
  }
});
