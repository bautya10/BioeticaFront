document.addEventListener("DOMContentLoaded", function() {
  const registerForm = document.getElementById('register-form');
  const registerError = document.getElementById('register-error');

  registerForm.addEventListener('submit', async function(event) {
      event.preventDefault();

      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      try {
          const response = await fetch('http://localhost:8000/api/users/register', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ name, email, password }),
          });

          const data = await response.json();

          if (!response.ok) {
              throw new Error(data.message || 'Error en el registro');
          }

          // Redirige o muestra un mensaje de éxito
          window.location.href = './login.html'; // Cambia esto según tu flujo
      } catch (error) {
          registerError.style.display = 'block';
          registerError.textContent = error.message;
      }
  });

  document.getElementById('toggle-password').addEventListener('click', function() {
        const passwordInput = document.getElementById('password');
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            this.textContent = 'Ocultar';
        } else {
            passwordInput.type = 'password';
            this.textContent = 'Mostrar';
        }
    });
});
